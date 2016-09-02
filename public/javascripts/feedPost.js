document.addEventListener("DOMContentLoaded",function(event){
    fetchPosts();

});

function fetchPosts(){

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getpost" , true);
    xhttp.onreadystatechange = function() {

        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var myArr = JSON.parse(xhttp.responseText);
            myFunction(myArr);
        }
    }

    function myFunction(arr) {
        for(i = 0; i < arr.length; i++) {
            createPostDom(arr[i]);
        }
    }

    xhttp.send();
}

function createPostDom(arr){

    var postVotes = document.createElement("p");
    var postVotesVal = document.createTextNode(arr["postVotes"] + "  ");
    postVotes.setAttribute("style","display:inline");
    postVotes.appendChild(postVotesVal);

    var buttonUp = document.createElement("button");
    var buttonUpVal = document.createTextNode("Upvote");
    buttonUp.appendChild(buttonUpVal);
    var buttonDown = document.createElement("button");
    var buttonDownVal = document.createTextNode("Downvote");
    buttonDown.appendChild(buttonDownVal);
    var paraOfButtons = document.createElement("p");
    paraOfButtons.setAttribute("style","display:inline");
    paraOfButtons.appendChild(buttonUp);
    paraOfButtons.appendChild(buttonDown);

    var postTitle = document.createElement("p");
    var postTitleText  =document.createTextNode(arr["postTitle"]);
    postTitle.appendChild(postTitleText);

    var paraOfSubTitle = document.createElement("p");
    var postedBy = document.createTextNode("Posted By ");
    var postedByName = document.createTextNode(arr["postedByName"]);
    var postedOn = document.createTextNode(" on ");
    var postedOnDate = document.createTextNode(arr["postDate"]);
    paraOfSubTitle.appendChild(postedBy);
    paraOfSubTitle.appendChild(postedByName);
    paraOfSubTitle.appendChild(postedOn);
    paraOfSubTitle.appendChild(postedOnDate);
    paraOfSubTitle.setAttribute("style","font-size:60%");

    var postText = document.createElement("p");
    var postTextInfo = document.createTextNode(arr["postText"]);
    postText.appendChild(postTextInfo);

    var commentButton = document.createElement("button");
    var comment = document.createTextNode("Comments");
    //commentButton.setAttribute("style","color:#6698FF ; font-size:80%");
    commentButton.appendChild(comment);

    var postComments = document.createElement("p");
    var line = document.createElement("hr");

    var post = document.createElement("div");
    post.appendChild(postVotes);
    post.appendChild(paraOfButtons);
    post.appendChild(postTitle);
    post.appendChild(paraOfSubTitle);
    post.appendChild(postText);
    post.appendChild(commentButton);
    post.appendChild(postComments);
    post.appendChild(line);

    document.getElementById("posts").appendChild(post);

    buttonUp.addEventListener("click" , function(event){
            incrementVote(arr["_id"] , postVotes);
    });

    buttonDown.addEventListener("click" , function(event){
            decrementVote(arr["_id"] , postVotes);
    });

    commentButton.addEventListener("click" , function(event){
            fetchComments(arr["_id"] , postComments);
    });

}

function fetchComments(postId , postComments){

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var commentArr = JSON.parse(xhttp.responseText);
            createCommentDom(commentArr , postId , postComments);
        }
    }
    var JSONObj = { "id" : postId };
    xhttp.open("POST", "/getComments");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}

function createCommentDom(arr , postId , postComments){

    for(i = 0; i<arr.length ; i++){
        var commentArr = arr[i];
        var commentVotes = document.createElement("p");
        var commentVotesVal = document.createTextNode(commentArr["commentVotes"]);
        commentVotes.setAttribute("style","display:inline");
        commentVotes.appendChild(commentVotesVal);

        var commentUp = document.createElement("button");
        var commentUpVal = document.createTextNode("+");
        commentUp.setAttribute("style","display:inline");
        commentUp.appendChild(commentUpVal);

        var commentDown = document.createElement("button");
        var commentDownVal = document.createTextNode("-");
        commentDown.setAttribute("style","display:inline");
        commentDown.appendChild(commentDownVal);

        var commentText = document.createElement("p");
        var commentTextVal = document.createTextNode(commentArr["commentText"]);
        commentText.setAttribute("style","display:inline");
        commentText.appendChild(commentTextVal);

        var comment = document.createElement("div");
        comment.appendChild(commentVotes);
        comment.appendChild(commentUp);
        comment.appendChild(commentDown);
        comment.appendChild(commentText);

        postComments.appendChild(comment);
    }

    var newCommentPara = document.createElement("p");
    var newComment = document.createElement("textarea");
    var submitButton = document.createElement("button");
    var submitButtonVal = document.createTextNode("submit");
    submitButton.appendChild(submitButtonVal);
    newCommentPara.appendChild(newComment);
    newCommentPara.appendChild(submitButton);
    postComments.appendChild(newCommentPara);

    submitButton.addEventListener("click" , function(event){
        var comText = newComment.value;
        if(comText !== "" ){
            postComment(postId , comText , postComments);
        }
    });

}

function postComment(postId , comText , postComments){

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onload = function (){

        postComments.innerHTML = "";
        fetchComments(postId , postComments);
    }
    var JSONObj = {"commentedOn" : postId , "commentedText" : comText , "commentedBy" : "abc" , "commentedByName" : "abc"};
    xhttp.open("POST", "/postComment");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}

function incrementVote(arr , postVotes){
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        var myArr = JSON.parse(xhttp.responseText);
        postVotes.innerHTML = myArr["postVotes"];
    }

    var JSONObj = { "id" : arr };
    xhttp.open("POST", "/voteIncrement");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));

}

function decrementVote(arr , postVotes){
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        var myArr = JSON.parse(xhttp.responseText);
        postVotes.innerHTML = myArr["postVotes"];
    }

    var JSONObj = { "id" : arr };
    xhttp.open("POST", "/voteDecrement");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));

}


