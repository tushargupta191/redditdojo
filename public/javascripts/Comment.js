function CommentArr(commentArr) {

    function Comment(commentArr) {
        this.commentArr = commentArr;
        this.userId = localStorage.getItem("userId");
        this.domNode = document.createElement("div");
        this.JSONObj = {"commentId": this.commentArr["_id"], "userId": this.userId};
    }

    var comment = new Comment(commentArr);
    var utils = new Utils();

    var incrementCommentVoteHelper = function () {
        utils.manageButtonUpColor(this.commentUp, this.commentDown);
        utils.updateVote(this.JSONObj , "/commentVoteIncrement" , this.commentVotes , "commentVotes");

    }.bind(comment);

    var decrementCommentVoteHelper = function () {
        utils.manageButtonDownColor(this.commentUp, this.commentDown);
        utils.updateVote(this.JSONObj , "/commentVoteDecrement" , this.commentVotes , "commentVotes");

    }.bind(comment);

    var getNestedComments = function () {
        this.nestedCommentButton.disabled = true;
        utils.fetchComments(this.commentArr["_id"], this.nestedComments);

    }.bind(comment);

    Comment.prototype.populateDom = function () {

        this.commentUp = utils.addButtonElement("+");

        this.commentDown = utils.addButtonElement("-");

        utils.setStyleAttribute(this.commentUp, this.commentDown);

        var commentedBy = utils.addPElement(" " + this.commentArr["commentedByName"]);
        this.commentVotes = utils.addPElement(this.commentArr["commentVotes"]);

        var commentText = utils.addPElement(this.commentArr["commentText"]);
        utils.addPadding(this.domNode, this.commentVotes, commentText);

        var commentFirstLine = document.createElement("div");
        var arrayCommentFirstLine = [this.commentUp, this.commentDown, commentedBy];
        utils.appendMultipleChildren(commentFirstLine, arrayCommentFirstLine);

        var commentSecondLine = document.createElement("div");
        var arrayCommentSecondLine = [this.commentVotes, commentText];
        utils.appendMultipleChildren(commentSecondLine, arrayCommentSecondLine);

        this.nestedCommentButton = utils.addButtonElement("Comments");

        this.nestedComments = document.createElement("p");
        var line = document.createElement("br");

        var arrayComment = [commentFirstLine, commentSecondLine, this.nestedCommentButton, this.nestedComments, line];
        utils.appendMultipleChildren(this.domNode, arrayComment);

        utils.checkVoted(this.JSONObj , "/checkCommentVoted" , this.commentUp , this.commentDown);

        this.commentUp.addEventListener("click", function () {
            incrementCommentVoteHelper();
        });
        this.commentDown.addEventListener("click", function () {
            decrementCommentVoteHelper();
        });
        this.nestedCommentButton.addEventListener("click", function () {
            getNestedComments();
        });

        return this.domNode;

    };

    return comment;
}





