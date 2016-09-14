function Utils(){

    this.colorIfVoted = "rgb(255, 153, 51)";
    this.colorIfNotVoted = "rgb(254, 254, 254)";
}

Utils.prototype.addButtonElement =  function (textVal) {
    var button = document.createElement("button");
    var buttonVal = document.createTextNode(textVal);
    button.className = "btn btn-default btn-xs";
    button.appendChild(buttonVal);

    return button;
};

Utils.prototype.addPElement = function (textVal) {
    var element = document.createElement("p");
    var elementVal = document.createTextNode(textVal);
    element.setAttribute("style","display:inline");
    element.appendChild(elementVal);

    return element;
};

Utils.prototype.addPElementWithMargin = function(textVal){
    var element = document.createElement("p");
    var elementVal = document.createTextNode(textVal);
    element.style.margin = "0px";
    element.appendChild(elementVal);

    return element;
};

Utils.prototype.addPadding = function () {
    for(var i=0; i < arguments.length ; i++){
        arguments[i].style.padding = "0px 0px 0px 20px";
    }
};

Utils.prototype.setStyleAttribute = function () {
    for(var i=0; i < arguments.length ; i++){
        arguments[i].setAttribute("style","display:inline");
    }
};

Utils.prototype.appendMultipleChildren = function (parentNode, array) {


    array.forEach(function (node) {
        parentNode.appendChild(node);
    });

};

Utils.prototype.manageButtonUpColor = function (buttonUp , buttonDown) {
    if(buttonDown.style.backgroundColor == this.colorIfVoted){
        buttonDown.style.backgroundColor = this.colorIfNotVoted;
    }
    if(buttonUp.style.backgroundColor == this.colorIfVoted){
        buttonUp.style.background = this.colorIfNotVoted;
    }
    else if(buttonUp.style.backgroundColor == this.colorIfNotVoted){
        buttonUp.style.background = this.colorIfVoted;
    }
};

Utils.prototype.manageButtonDownColor = function (buttonUp , buttonDown) {
    if(buttonUp.style.backgroundColor == this.colorIfVoted){
        buttonUp.style.backgroundColor = this.colorIfNotVoted;
    }
    if(buttonDown.style.backgroundColor == this.colorIfVoted){
        buttonDown.style.background = this.colorIfNotVoted;
    }
    else if(buttonDown.style.backgroundColor == this.colorIfNotVoted){
        buttonDown.style.background = this.colorIfVoted;
    }
};

Utils.prototype.fetchComments = function(postId, postComments){
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var commentArr = JSON.parse(xhttp.responseText);
            for(var i = 0; i<commentArr.length ; i++){

                var newComment = new CommentArr(commentArr[i]);
                postComments.appendChild(newComment.populateDom());
            }
            var reply = new AddReply(postComments, postId);
            postComments.appendChild(reply.populateDom());
        }
    };

    var JSONObj = { "id" : postId };
    xhttp.open("POST", "/getComments");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
};

Utils.prototype.updateVote = function (JSONObj , route , votesElement , votes) {
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        var myArr = JSON.parse(xhttp.responseText);
        votesElement.innerHTML = myArr[votes];
    };


    xhttp.open("POST", route );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
};

Utils.prototype.checkVoted = function(JSONObj, route , buttonUp , buttonDown){
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        var voteStatus = JSON.parse(xhttp.responseText);
        if (voteStatus == 1) {
            buttonUp.style.background = this.colorIfVoted;
            buttonDown.style.background = this.colorIfNotVoted;
        }
        else if (voteStatus == -1) {
            buttonDown.style.background = this.colorIfVoted;
            buttonUp.style.background = this.colorIfNotVoted;
        }
        else if (voteStatus == 0) {
            buttonUp.style.background = this.colorIfNotVoted;
            buttonDown.style.background = this.colorIfNotVoted;
        }
    }.bind(this);


    xhttp.open("POST", route);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
};
