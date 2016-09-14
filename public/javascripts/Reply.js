function AddReply(postComments, postId) {

    function Reply(postComments, postId) {
        this.postComments = postComments;
        this.postId = postId;
        this.domNode = document.createElement("div");
    }

    var reply = new Reply(postComments, postId);
    var utils = new Utils();

    var createCommentView = function () {
        this.replyButton.disabled = true;
        var newCommentView = new NewCommentView(this.postId, this.postComments);
        this.postComments.appendChild(newCommentView.populateDom());

    }.bind(reply);

    Reply.prototype.populateDom = function () {
        var replyButton = utils.addButtonElement("Reply");
        this.replyButton = replyButton;

        this.domNode.appendChild(replyButton);
        utils.addPadding(this.domNode);

        replyButton.addEventListener("click", function () {
            createCommentView();
        });

        return this.domNode;
    };

    return reply;
}




