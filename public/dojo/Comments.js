function populateComments(commentArr , postComments){
    require([
        'dojo/dom',
        'dojo/dom-construct',
        'dojo/on'
    ], function ( dom, domConstruct, on){

        var colorIfNotVoted = "rgb(254, 254, 254)";

        var comment = domConstruct.create("div" , {style : { padding : "0px 0px 0px 20px"}});
        var commentFirstLine = domConstruct.create("div", null , comment);
        var commentSecondLine = domConstruct.create("div" , null , comment);
        var buttonUp = domConstruct.create("button" , {style : {display : "inline", backgroundColor : colorIfNotVoted},innerHTML : "+" } , commentFirstLine);
        var buttonDown = domConstruct.create("button" , {style : {display : "inline", backgroundColor : colorIfNotVoted},innerHTML : "-"} , commentFirstLine);
        var commentedBy = domConstruct.create("p" , {style : {display : "inline"}, innerHTML : " " + commentArr["commentedByName"]} , commentFirstLine);

        var commentVotes = domConstruct.create("p" , {style : {display : "inline" , padding : "0px 0px 0px 20px"}, innerHTML : commentArr["commentVotes"]} , commentSecondLine );
        var commentText = domConstruct.create("p" , {style : {display : "inline" , padding :"0px 0px 0px 20px"},innerHTML : commentArr["commentText"]} , commentSecondLine);


        var nestedCommentButton = domConstruct.create("button" , {innerHTML : "Comments" }, comment);

        var nestedComments = domConstruct.create("p",null,comment);

        var userId = localStorage.getItem("userId");
        var JSONObj = {"commentId": commentArr["_id"], "userId": userId};

        //var line = domConstruct.create("hr" , node);
        //border-bottom:2px; border-bottom-style:solid

        require(["dojoFiles/Utils"], function () {
            checkVoted(JSONObj , "/checkCommentVoted" , buttonUp , buttonDown);
        });

        on(buttonUp, "click", function(){
            require(["dojoFiles/Utils"], function () {
                manageButtonUpColor(buttonUp , buttonDown);
                updateVote(JSONObj, commentVotes, "/commentVoteIncrement" , "commentVotes");
            });

        });

        on(buttonDown, "click", function(){
            require(["dojoFiles/Utils"], function () {
                manageButtonDownColor(buttonUp , buttonDown);
                updateVote(JSONObj, commentVotes, "/commentVoteDecrement" , "commentVotes");
            });

        });

        on(nestedCommentButton, "click" , function(){
            require(["dojoFiles/FetchComments"], function () {
                nestedCommentButton.disabled = true;
                fetchComments(commentArr["_id"] , nestedComments);
            });
        });

        postComments.appendChild(comment);
        //return comment;
    });

}