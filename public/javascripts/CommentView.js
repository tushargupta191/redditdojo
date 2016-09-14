function NewCommentView(postId, postComments) {

    function CommentView(postId, postComments) {
        this.domNode = document.createElement("p");
        this.postId = postId;
        this.postComments = postComments;
    }

    var commentView = new CommentView(postId, postComments);
    var utils = new Utils();

    var submitComment = function () {

        var comText = this.newComment.value;
        if (comText !== "") {
            postComment(comText);
        }

    }.bind(commentView);

    var postComment = function (comText) {
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            postComments.innerHTML = "";
            utils.fetchComments(this.postId, this.postComments);
        }.bind(this);

        var commentedById = localStorage.getItem("userId");
        var commentedByName = localStorage.getItem("username");
        var JSONObj = {
            "commentedOn": this.postId,
            "commentedText": comText,
            "commentedBy": commentedById,
            "commentedByName": commentedByName
        };
        xhttp.open("POST", "/postComment");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));
    }.bind(commentView);

    CommentView.prototype.populateDom = function () {

        this.newComment = document.createElement("textarea");
        utils.addPadding(this.domNode);

        var submitButton = utils.addButtonElement("submit");

        var arrayComment = [this.newComment, submitButton];

        utils.appendMultipleChildren(this.domNode, arrayComment);
        submitButton.addEventListener("click", function () {
            submitComment();
        });

        return this.domNode;
    };

    return commentView;
}
