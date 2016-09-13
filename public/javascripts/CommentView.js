function CommentView(postId, postComments) {

    this.domNode = document.createElement("p");
    this.postId = postId;
    this.postComments = postComments;

    var utils = new Utils();

    var submitComment = function () {

        var comText = this.newComment.value;
        if(comText !== "" ){
            postComment(comText);
        }

    }.bind(this);

    var postComment = function (comText) {
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.onload = function (){
            postComments.innerHTML = "";
            utils.fetchComments(this.postId , this.postComments);
        }.bind(this);

        var commentedById = localStorage.getItem("userId");
        var commentedByName = localStorage.getItem("username");
        var JSONObj = {"commentedOn" : this.postId , "commentedText" : comText , "commentedBy" : commentedById , "commentedByName" : commentedByName};
        xhttp.open("POST", "/postComment");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));
    }.bind(this);

    this.populateDom = function () {

        var newComment = document.createElement("textarea");
        this.newComment = newComment;
        utils.addPadding(this.domNode);

        var submitButton = utils.addButtonElement("submit");

        var arrayComment = [newComment, submitButton];

        utils.appendMultipleChildren(this.domNode, arrayComment);
        submitButton.addEventListener("click", submitComment);

        return this.domNode;
    };

}
