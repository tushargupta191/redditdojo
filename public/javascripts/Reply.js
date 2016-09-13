function Reply(postComments, postId) {

    this.postComments = postComments;
    this.postId = postId;
    this.domNode = document.createElement("div");

    var utils = new Utils();

    var createCommentView = function () {

        this.replyButton.disabled = true;
        var newCommentView = new CommentView(this.postId, this.postComments);
        this.postComments.appendChild(newCommentView.populateDom());

    }.bind(this);

    this.populateDom = function () {

        var replyButton = utils.addButtonElement("Reply");
        this.replyButton = replyButton;

        this.domNode.appendChild(replyButton);
        utils.addPadding(this.domNode);

        replyButton.addEventListener("click" , createCommentView);

        return this.domNode;
    };
}





