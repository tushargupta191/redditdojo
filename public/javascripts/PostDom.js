function createPostObj(arr){
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

    var userId = localStorage.getItem("userId");

    buttonUp.addEventListener("click" , function(){
        incrementVote(arr["_id"] , postVotes);
    });

    buttonDown.addEventListener("click" , function(){
        decrementVote(arr["_id"] , postVotes);
    });

    commentButton.addEventListener("click" , function(){
        commentButton.disabled = true;
        fetchComments(arr["_id"] , postComments);

    });

    postTitle.addEventListener("click" , function(){
        //redirect to a new page
        window.location = '/feed/post=' + arr["_id"];
    });

    return post;

}

function incrementVote(arr , postVotes){
    var xhttp;
    xhttp = new XMLHttpRequest();
    var userId = localStorage.getItem("userId");
    xhttp.onload = function (){
        var myArr = JSON.parse(xhttp.responseText);
        postVotes.innerHTML = myArr["postVotes"];
    }

    var JSONObj = { "id" : arr , "userId" : userId};
    xhttp.open("POST", "/voteIncrement");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));

}

function decrementVote(arr , postVotes){
    var xhttp;
    xhttp = new XMLHttpRequest();
    var userId = localStorage.getItem("userId");

    xhttp.onload = function (){
        var myArr = JSON.parse(xhttp.responseText);
        postVotes.innerHTML = myArr["postVotes"];
    }

    var JSONObj = { "id" : arr , "userId" : userId};
    xhttp.open("POST", "/voteDecrement");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));

}
