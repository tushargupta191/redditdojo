function Post(postArr) {
    this.postArr = postArr;
    this.userId = localStorage.getItem("userId");
    this.domNode = document.createElement("div");

    var utils = new Utils();

    var incrementPostVoteHelper = function () {
        utils.manageButtonUpColor(this.buttonUp, this.buttonDown);
        incrementPostVote();
    }.bind(this);

    var decrementPostVoteHelper = function () {
        utils.manageButtonDownColor(this.buttonUp, this.buttonDown);
        decrementPostVote();
    }.bind(this);

    var getComments = function () {
        this.commentButton.disabled = true;
        utils.fetchComments(this.postArr["_id"], this.postComments);
    }.bind(this);

    var openParticularPost = function () {
        window.location.pathname = '/feed/post=' + this.postArr["_id"];
    }.bind(this);

    var checkVoted = function () {
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            var voteStatus = JSON.parse(xhttp.responseText);
            if(voteStatus == 1){
                this.buttonUp.style.background = utils.colorIfVoted;
                this.buttonDown.style.background = utils.colorIfNotVoted;
            }
            else if(voteStatus == -1){
                this.buttonDown.style.background = utils.colorIfVoted;
                this.buttonUp.style.background = utils.colorIfNotVoted;
            }
            else if(voteStatus == 0){
                this.buttonUp.style.background = utils.colorIfNotVoted;
                this.buttonDown.style.background = utils.colorIfNotVoted;
            }
        }.bind(this);

        var JSONObj = {"postId" : this.postArr["_id"] , "userId" : this.userId};
        xhttp.open("POST", "/checkVoted");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));

    }.bind(this);

    var incrementPostVote = function(){
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.onload = function (){
            var myArr = JSON.parse(xhttp.responseText);
            this.postVotes.innerHTML = myArr["postVotes"];
        }.bind(this);

        var JSONObj = { "id" : this.postArr["_id"] , "userId" : this.userId};
        xhttp.open("POST", "/voteIncrement");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));
    }.bind(this);

    var decrementPostVote = function () {
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.onload = function (){
            var myArr = JSON.parse(xhttp.responseText);
            this.postVotes.innerHTML = myArr["postVotes"];
        }.bind(this);

        var JSONObj = { "id" : this.postArr["_id"] , "userId" : this.userId};
        xhttp.open("POST", "/voteDecrement");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(JSONObj));
    }.bind(this);

    this.populateDom = function () {

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

        checkVoted();

        buttonUp.addEventListener("click", incrementPostVoteHelper());
        buttonDown.addEventListener("click", decrementPostVoteHelper());
        commentButton.addEventListener("click", getComments());
        postTitle.addEventListener("click", openParticularPost());

        return this.domNode;
    };
}
