function Utils(){

    this.colorIfVoted = "rgb(255, 153, 51)";
    this.colorIfNotVoted = "rgb(254, 254, 254)";

    this.addButtonElement =  function (textVal) {
        var button = document.createElement("button");
        var buttonVal = document.createTextNode(textVal);
        button.className = "btn btn-default btn-xs";
        button.appendChild(buttonVal);

        return button;
    };

    this.addPElement = function (textVal) {
        var element = document.createElement("p");
        var elementVal = document.createTextNode(textVal);
        element.setAttribute("style","display:inline");
        element.appendChild(elementVal);

        return element;
    };

    this.addPElementWithMargin = function(textVal){
        var element = document.createElement("p");
        var elementVal = document.createTextNode(textVal);
        element.style.margin = "0px";
        element.appendChild(elementVal);

        return element;
    };

    this.addPadding = function () {
        for(var i=0; i < arguments.length ; i++){
            arguments[i].style.padding = "0px 0px 0px 20px";
        }
    };

    this.setStyleAttribute = function () {
        for(var i=0; i < arguments.length ; i++){
            arguments[i].setAttribute("style","display:inline");
        }
    };

    this.appendMultipleChildren = function (parentNode, array) {


        array.forEach(function (node) {
            parentNode.appendChild(node);
        });

    };

    this.manageButtonUpColor = function (buttonUp , buttonDown) {
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

    this.manageButtonDownColor = function (buttonUp , buttonDown) {
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

    this.fetchComments = function(postId, postComments){
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                var commentArr = JSON.parse(xhttp.responseText);
                for(var i = 0; i<commentArr.length ; i++){

                    var newComment = new Comment(commentArr[i]);
                    postComments.appendChild(newComment.populateDom());
                }
                var reply = new Reply(postComments, postId);
                postComments.appendChild(reply.populateDom());
            }
        };

        var JSONObj = { "id" : postId };
        xhttp.open("POST", "/getComments");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));
    };

}
