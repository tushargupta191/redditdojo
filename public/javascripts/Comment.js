function Comment(commentArr) {
    this.commentArr = commentArr;
    this.userId = localStorage.getItem("userId");
    this.domNode = document.createElement("div");

    var utils = new Utils();

    var incrementCommentVoteHelper = function () {
        utils.manageButtonUpColor(this.commentUp, this.commentDown);
        incrementCommentVote();
    }.bind(this);

    var decrementCommentVoteHelper = function () {
        utils.manageButtonDownColor(this.commentUp, this.commentDown);
        decrementCommentVote();
    }.bind(this);

    var getNestedComments = function () {
        this.nestedCommentButton.disabled = true;
        utils.fetchComments(this.commentArr["_id"] , this.nestedComments);
    }.bind(this);

    var incrementCommentVote = function () {
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.onload = function(){
            var myArr = JSON.parse(xhttp.responseText);
            this.commentVotes.innerHTML = myArr["commentVotes"];
        }.bind(this);

        var JSONObj = {"commentId" : this.commentArr["_id"] , "userId" : this.userId};
        xhttp.open("POST" , "/commentVoteIncrement");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));
    }.bind(this);

    var decrementCommentVote = function () {
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.onload = function(){
            var myArr = JSON.parse(xhttp.responseText);
            this.commentVotes.innerHTML = myArr["commentVotes"];
        }.bind(this);

        var JSONObj = {"commentId" : this.commentArr["_id"] , "userId" : this.userId};
        xhttp.open("POST" , "/commentVoteDecrement");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));
    }.bind(this);

    var checkCommentVoted = function () {
        var xhttp;
        xhttp = new XMLHttpRequest();

        var utils = new Utils();

        xhttp.onload = function () {
            var voteStatus = JSON.parse(xhttp.responseText);
            if(voteStatus == 1){
                this.commentUp.style.background = utils.colorIfVoted;
                this.commentDown.style.background = utils.colorIfNotVoted;
            }
            else if(voteStatus == -1){
                this.commentDown.style.background = utils.colorIfVoted;
                this.commentUp.style.background = utils.colorIfNotVoted;
            }
            else if(voteStatus == 0){
                this.commentUp.style.background = utils.colorIfNotVoted;
                this.commentDown.style.background = utils.colorIfNotVoted;
            }
        }.bind(this);

        var JSONObj = {"commentId" : this.commentArr["_id"] , "userId" : this.userId};
        xhttp.open("POST", "/checkCommentVoted");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));
    }.bind(this);



    this.populateDom = function(){

        var commentUp = utils.addButtonElement("+");
        this.commentUp = commentUp;

        var commentDown = utils.addButtonElement("-");
        this.commentDown = commentDown;
        utils.setStyleAttribute(commentUp, commentDown);

        var commentedBy = utils.addPElement(" " + this.commentArr["commentedByName"]);
        var commentVotes = utils.addPElement(this.commentArr["commentVotes"]);
        this.commentVotes = commentVotes;

        var commentText = utils.addPElement(this.commentArr["commentText"]);
        utils.addPadding(this.domNode, commentVotes , commentText);

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

        checkCommentVoted();

        commentUp.addEventListener("click" , incrementCommentVoteHelper);
        commentDown.addEventListener("click" , decrementCommentVoteHelper);
        nestedCommentButton.addEventListener("click" , getNestedComments);

        return this.domNode;
    };
}





