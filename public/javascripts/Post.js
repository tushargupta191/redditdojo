function PostArr(postArr) {

    function Post(postArr) {
        this.postArr = postArr;
        this.userId = localStorage.getItem("userId");
        this.domNode = document.createElement("div");
        this.JSONObj = {"postId": this.postArr["_id"], "userId": this.userId};
    }

    var post = new Post(postArr);
    var utils = new Utils();

    var incrementPostVoteHelper = function () {
        utils.manageButtonUpColor(this.buttonUp, this.buttonDown);
        utils.updateVote(this.JSONObj , "/postVoteIncrement" , this.postVotes , "postVotes");

    }.bind(post);

    var decrementPostVoteHelper = function () {
        utils.manageButtonDownColor(this.buttonUp, this.buttonDown);
        utils.updateVote(this.JSONObj , "/postVoteDecrement" , this.postVotes , "postVotes");

    }.bind(post);

    var getComments = function () {
        this.commentButton.disabled = true;
        utils.fetchComments(this.postArr["_id"], this.postComments);

    }.bind(post);

    var openParticularPost = function () {
        window.location.pathname = '/feed/post=' + this.postArr["_id"];
    }.bind(post);

    Post.prototype.populateDom = function () {

        var postVotes = utils.addPElement(this.postArr["postVotes"] + "  ");
        this.postVotes = postVotes;

        var buttonUp = utils.addButtonElement("Upvote");
        this.buttonUp = buttonUp;

        var buttonDown = utils.addButtonElement("Downvote");
        this.buttonDown = buttonDown;

        var paraOfButtons = document.createElement("p");
        paraOfButtons.setAttribute("style", "display:inline");

        var arrayButtons = [buttonUp, buttonDown];
        utils.appendMultipleChildren(paraOfButtons, arrayButtons);

        var postTitle = utils.addPElementWithMargin(this.postArr["postTitle"]);
        postTitle.style.marginTop = "5px";

        var paraOfSubTitle = document.createElement("p");
        var postedBy = document.createTextNode("Posted By ");
        var postedByName = document.createTextNode(this.postArr["postedByName"]);
        var postedOn = document.createTextNode(" on ");
        var postedOnDate = document.createTextNode(this.postArr["postDate"]);

        var arraySubtitle = [postedBy, postedByName, postedOn, postedOnDate];
        utils.appendMultipleChildren(paraOfSubTitle, arraySubtitle);

        paraOfSubTitle.setAttribute("style", "font-size:70%");
        paraOfSubTitle.style.margin = "0px";

        var postText = utils.addPElementWithMargin(this.postArr["postText"]);

        var commentButton = utils.addButtonElement("Comments");
        commentButton.style.marginTop = "5px";
        this.commentButton = commentButton;

        var postComments = document.createElement("p");
        this.postComments = postComments;

        var line = document.createElement("hr");

        var arrayPost = [postVotes, paraOfButtons, postTitle, paraOfSubTitle, postText, commentButton, postComments, line];
        utils.appendMultipleChildren(this.domNode, arrayPost);

        utils.checkVoted(this.JSONObj, "/checkPostVoted" , this.buttonUp , this.buttonDown);

        buttonUp.addEventListener("click", function () {
            incrementPostVoteHelper();
        });
        buttonDown.addEventListener("click", function () {
            decrementPostVoteHelper();
        });
        commentButton.addEventListener("click", function () {
            getComments();
        });
        postTitle.addEventListener("click", function () {
            openParticularPost();
        });

        return this.domNode;
    };

    return post;

}
