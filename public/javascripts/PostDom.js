var colorIfVoted = "rgb(255, 153, 51)";
var colorIfNotVoted = "rgb(254, 254, 254)";

function createPostObj(arr){

    var userId = localStorage.getItem("userId");

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

    checkVoted(arr["_id"] , userId , buttonUp , buttonDown);

    buttonUp.addEventListener("click" , function(){
        manageButtonUpColor(buttonUp , buttonDown);
        incrementVote(arr["_id"] , postVotes , userId);
    });

    buttonDown.addEventListener("click" , function(){
        manageButtonDownColor(buttonUp , buttonDown);
        decrementVote(arr["_id"] , postVotes , userId);
    });

    commentButton.addEventListener("click" , function(){
        commentButton.disabled = true;
        fetchComments(arr["_id"] , postComments);
    });

    postTitle.addEventListener("click" , function(){
        window.location = '/feed/post=' + arr["_id"];
    });

    return post;
}

function manageButtonUpColor(buttonUp , buttonDown){
    if(buttonDown.style.backgroundColor == colorIfVoted){
        buttonDown.style.backgroundColor = colorIfNotVoted;
    }
    if(buttonUp.style.backgroundColor == colorIfVoted){
        buttonUp.style.background = colorIfNotVoted;
    }
    else if(buttonUp.style.backgroundColor == colorIfNotVoted){
        buttonUp.style.background = colorIfVoted;
    }
}

function manageButtonDownColor(buttonUp , buttonDown) {
    if(buttonUp.style.backgroundColor == colorIfVoted){
        buttonUp.style.backgroundColor = colorIfNotVoted;
    }
    if(buttonDown.style.backgroundColor == colorIfVoted){
        buttonDown.style.background = colorIfNotVoted;
    }
    else if(buttonDown.style.backgroundColor == colorIfNotVoted){
        buttonDown.style.background = colorIfVoted;
    }
}


function checkVoted(postId , userId , buttonUp , buttonDown){
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        var voteStatus = JSON.parse(xhttp.responseText);
        if(voteStatus == 1){
            buttonUp.style.background = colorIfVoted;
            buttonDown.style.background = colorIfNotVoted;
        }
        else if(voteStatus == -1){
            buttonDown.style.background = colorIfVoted;
            buttonUp.style.background = colorIfNotVoted;
        }
        else if(voteStatus == 0){
            buttonUp.style.background = colorIfNotVoted;
            buttonDown.style.background = colorIfNotVoted;
        }
    };

    var JSONObj = {"postId" : postId , "userId" : userId};
    xhttp.open("POST", "/checkVoted");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}

function incrementVote(arr , postVotes , userId){
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onload = function (){
        var myArr = JSON.parse(xhttp.responseText);
        postVotes.innerHTML = myArr["postVotes"];
    };

    var JSONObj = { "id" : arr , "userId" : userId};
    xhttp.open("POST", "/voteIncrement");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}

function decrementVote(arr , postVotes , userId){
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onload = function (){
        var myArr = JSON.parse(xhttp.responseText);
        postVotes.innerHTML = myArr["postVotes"];
    };

    var JSONObj = { "id" : arr , "userId" : userId};
    xhttp.open("POST", "/voteDecrement");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}
