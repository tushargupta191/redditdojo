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

        this.postVotes = utils.addPElement(this.postArr["postVotes"] + "  ");

        this.buttonUp = utils.addButtonElement("Upvote");

        this.buttonDown = utils.addButtonElement("Downvote");

        var paraOfButtons = document.createElement("p");
        paraOfButtons.setAttribute("style", "display:inline");

        var arrayButtons = [this.buttonUp, this.buttonDown];
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

        this.commentButton = utils.addButtonElement("Comments");
        this.commentButton.style.marginTop = "5px";

        this.postComments = document.createElement("p");

        var line = document.createElement("hr");

        var arrayPost = [this.postVotes, paraOfButtons, postTitle, paraOfSubTitle, postText, this.commentButton, this.postComments, line];
        utils.appendMultipleChildren(this.domNode, arrayPost);

        utils.checkVoted(this.JSONObj, "/checkPostVoted" , this.buttonUp , this.buttonDown);

        this.buttonUp.addEventListener("click", function () {
            incrementPostVoteHelper();
        });
        this.buttonDown.addEventListener("click", function () {
            decrementPostVoteHelper();
        });
        this.commentButton.addEventListener("click", function () {
            getComments();
        });
        postTitle.addEventListener("click", function () {
            openParticularPost();
        });

        return this.domNode;
    };

    return post;

}
