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

        var commentUp = utils.addButtonElement("+");
        this.commentUp = commentUp;

        var commentDown = utils.addButtonElement("-");
        this.commentDown = commentDown;
        utils.setStyleAttribute(commentUp, commentDown);

        var commentedBy = utils.addPElement(" " + this.commentArr["commentedByName"]);
        var commentVotes = utils.addPElement(this.commentArr["commentVotes"]);
        this.commentVotes = commentVotes;

        var commentText = utils.addPElement(this.commentArr["commentText"]);
        utils.addPadding(this.domNode, commentVotes, commentText);

        var commentFirstLine = document.createElement("div");
        var arrayCommentFirstLine = [commentUp, commentDown, commentedBy];
        utils.appendMultipleChildren(commentFirstLine, arrayCommentFirstLine);

        var commentSecondLine = document.createElement("div");
        var arrayCommentSecondLine = [commentVotes, commentText];
        utils.appendMultipleChildren(commentSecondLine, arrayCommentSecondLine);

        var nestedCommentButton = utils.addButtonElement("Comments");
        this.nestedCommentButton = nestedCommentButton;

        var nestedComments = document.createElement("p");
        this.nestedComments = nestedComments;
        var line = document.createElement("br");

        var arrayComment = [commentFirstLine, commentSecondLine, nestedCommentButton, nestedComments, line];
        utils.appendMultipleChildren(this.domNode, arrayComment);

        utils.checkVoted(this.JSONObj , "/checkCommentVoted" , commentUp , commentDown);

        commentUp.addEventListener("click", function () {
            incrementCommentVoteHelper();
        });
        commentDown.addEventListener("click", function () {
            decrementCommentVoteHelper();
        });
        nestedCommentButton.addEventListener("click", function () {
            getNestedComments();
        });

        return this.domNode;

    };

    return comment;
}





