define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojoFiles/Utils',
    'dojoFiles/FetchComments'
], function (declare , dom, domConstruct, on) {

    return declare("Comments" , null , {

        constructor : function (commentArr) {
            this.commentArr = commentArr;
            this.comment = domConstruct.create("div" , {style : { padding : "0px 0px 0px 20px"}});
        },

        populateComments : function () {

            var utils = new Utils();
            var fetchComments = new FetchComments();
            var userId = localStorage.getItem("userId");
            var JSONObj = {"commentId": this.commentArr["_id"], "userId": userId};

            var commentFirstLine = domConstruct.create("div", null , this.comment);
            var commentSecondLine = domConstruct.create("div" , null , this.comment);
            var buttonUp = domConstruct.create("button" , {style : {display : "inline", backgroundColor : utils.colorIfNotVoted},innerHTML : "+" } , commentFirstLine);
            var buttonDown = domConstruct.create("button" , {style : {display : "inline", backgroundColor : utils.colorIfNotVoted},innerHTML : "-"} , commentFirstLine);
            var commentedBy = domConstruct.create("p" , {style : {display : "inline"}, innerHTML : " " + this.commentArr["commentedByName"]} , commentFirstLine);
            var commentVotes = domConstruct.create("p" , {style : {display : "inline" , padding : "0px 0px 0px 20px"}, innerHTML : this.commentArr["commentVotes"]} , commentSecondLine );
            var commentText = domConstruct.create("p" , {style : {display : "inline" , padding :"0px 0px 0px 20px"},innerHTML : this.commentArr["commentText"]} , commentSecondLine);
            var nestedCommentButton = domConstruct.create("button" , {innerHTML : "Comments" }, this.comment);
            var nestedComments = domConstruct.create("p",null,this.comment);
            var line = domConstruct.create("hr" , null , this.comment);

            utils.checkVoted(JSONObj , "/checkCommentVoted" , buttonUp , buttonDown);

            on(buttonUp, "click", function(){
                utils.manageButtonUpColor(buttonUp , buttonDown);
                utils.updateVote(JSONObj, commentVotes, "/commentVoteIncrement" , "commentVotes");
            });

            on(buttonDown, "click", function(){
                utils.manageButtonDownColor(buttonUp , buttonDown);
                utils.updateVote(JSONObj, commentVotes, "/commentVoteDecrement" , "commentVotes");
            });

            on(nestedCommentButton, "click" , function(){
                nestedCommentButton.disabled = true;
                fetchComments.getComments(this.commentArr["_id"] , nestedComments);
            }.bind(this));

            return this.comment;
        }
    })

});