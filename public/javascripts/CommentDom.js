function createCommentObj(commentArr) {
    var commentUp = document.createElement("button");
    var commentUpVal = document.createTextNode("+");
    commentUp.setAttribute("style","display:inline");
    commentUp.appendChild(commentUpVal);

    var commentDown = document.createElement("button");
    var commentDownVal = document.createTextNode("-");
    commentDown.setAttribute("style","display:inline");
    commentDown.appendChild(commentDownVal);

    var commentedBy = document.createElement("p");
    var space = document.createTextNode("\u00A0");
    var commentedByVal = document.createTextNode(commentArr["commentedByName"]);
    commentedBy.setAttribute("style","display:inline");
    commentedBy.appendChild(space);
    commentedBy.appendChild(commentedByVal);

    var commentVotes = document.createElement("p");
    var commentVotesVal = document.createTextNode(commentArr["commentVotes"]);
    var space = document.createTextNode("\u00A0");
    commentVotes.setAttribute("style","display:inline");
    commentVotes.style.padding = "0px 0px 0px 20px";
    commentVotes.appendChild(commentVotesVal);
    commentVotes.appendChild(space);

    var commentText = document.createElement("p");
    var commentTextVal = document.createTextNode(commentArr["commentText"]);
    commentText.setAttribute("style","display:inline");
    commentText.style.padding = "0px 0px 0px 20px";
    commentText.appendChild(commentTextVal);

    var commentFirstLine = document.createElement("div");
    commentFirstLine.appendChild(commentUp);
    commentFirstLine.appendChild(commentDown);
    commentFirstLine.appendChild(commentedBy);

    var commentSecondLine = document.createElement("div");
    commentSecondLine.appendChild(commentVotes);
    commentSecondLine.appendChild(commentText);

    var nestedCommentButton = document.createElement("button");
    var nestedCommentButtonVal = document.createTextNode("Comments");
    nestedCommentButton.appendChild(nestedCommentButtonVal);


    var nestedComments = document.createElement("p");

    var line = document.createElement("br");
    var comments = document.createElement("div");
    comments.appendChild(commentFirstLine);
    comments.appendChild(commentSecondLine);
    comments.appendChild(nestedCommentButton);
    comments.appendChild(nestedComments);
    comments.appendChild(line);
    comments.style.padding = "0px 0px 0px 20px";

    commentUp.addEventListener("click" , function(){
        incrementCommentVote(commentArr["_id"] , commentVotes);
    });

    commentDown.addEventListener("click" , function () {
        decrementCommentVote(commentArr["_id"] , commentVotes);
    });

    nestedCommentButton.addEventListener("click" , function(){

        nestedCommentButton.disabled = true;
        fetchComments(commentArr["_id"] , nestedComments);
    });

    return comments;
}

function incrementCommentVote(commentId, commentVotes){
    var xhttp;
    xhttp = new XMLHttpRequest();
    var userId = localStorage.getItem("userId");
    xhttp.onload = function(){
        var myArr = JSON.parse(xhttp.responseText);
        commentVotes.innerHTML = myArr["commentVotes"];
    }


    var JSONObj = {"commentId" : commentId , "userId" : userId};
    xhttp.open("POST" , "/commentVoteIncrement");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}

function decrementCommentVote(commentId, commentVotes){
    var xhttp;
    xhttp = new XMLHttpRequest();
    var userId = localStorage.getItem("userId");
    xhttp.onload = function(){
        var myArr = JSON.parse(xhttp.responseText);
        commentVotes.innerHTML = myArr["commentVotes"];
    }

    var JSONObj = {"commentId" : commentId , "userId" : userId};
    xhttp.open("POST" , "/commentVoteDecrement");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}


function createReplyButton(postId, postComments){
    var reply = document.createElement("div");
    var replyButton = document.createElement("button");
    var replyButtonVal = document.createTextNode("Reply");
    replyButton.appendChild(replyButtonVal);
    reply.appendChild(replyButton);
    reply.style.padding = "0px 0px 0px 20px";
    postComments.appendChild(reply);

    replyButton.addEventListener("click" , function(){

        replyButton.disabled = true;
        createNewCommentView(postId, postComments);
    });

}
function createNewCommentView(postId, postComments){

    var newCommentPara = document.createElement("p");
    var newComment = document.createElement("textarea");
    var submitButton = document.createElement("button");
    var submitButtonVal = document.createTextNode("submit");
    submitButton.appendChild(submitButtonVal);
    newCommentPara.appendChild(newComment);
    newCommentPara.appendChild(submitButton);
    newCommentPara.style.padding = "0px 0px 0px 20px";
    postComments.appendChild(newCommentPara);

    submitButton.addEventListener("click" , function(){
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
    var commentedById = localStorage.getItem("userId");
    var commentedByName = localStorage.getItem("username");
    var JSONObj = {"commentedOn" : postId , "commentedText" : comText , "commentedBy" : commentedById , "commentedByName" : commentedByName};
    xhttp.open("POST", "/postComment");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}


function fetchComments(postId , postComments){

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var commentArr = JSON.parse(xhttp.responseText);

            for(var i = 0; i<commentArr.length ; i++){
                createCommentDom(commentArr[i]  , postComments);
            }
            createReplyButton(postId, postComments);
        }
    }

    var JSONObj = { "id" : postId };
    xhttp.open("POST", "/getComments");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}

function createCommentDom(commentArr , postComments){
    var newComment = createCommentObj(commentArr);
    postComments.appendChild(newComment);
}

