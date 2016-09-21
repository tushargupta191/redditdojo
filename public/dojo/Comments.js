define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/on',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/comment.html',
    'dojoFiles/Utils',
    'dojoFiles/AddComment'
], function (declare , domConstruct, on , _WidgetBase, _TemplatedMixin , template , Utils , AddComment) {

    return declare("Comments" , [_WidgetBase, _TemplatedMixin] , {

        templateString : template,

        constructor : function (commentObj) {
            this.commentObj = commentObj;
            this.userId = localStorage.getItem("userId");

            this.JSONObj = {"commentId": this.commentObj["_id"], "userId": this.userId};
        },

        postCreate: function(){
            Utils.checkVoted(this.JSONObj, "/checkCommentVoted", this.buttonUp, this.buttonDown);
        },

        _incrementVote : function(){
            Utils.manageButtonUpColor(this.buttonUp, this.buttonDown);
            Utils.updateVote(this.JSONObj, this.commentVotes, "/commentVoteIncrement", "commentVotes");
        },

        _decrementVote : function(){
            Utils.manageButtonDownColor(this.buttonUp, this.buttonDown);
            Utils.updateVote(this.JSONObj, this.commentVotes, "/commentVoteDecrement", "commentVotes");
        },

        _openNestedComments : function(){

            this.nestedComments.innerHTML = "";

            Utils.getAllComments(this.commentObj["_id"]).then(function(result){
                var commentObj = JSON.parse(result);

                for(var i=0; i<commentObj.length ; i++){
                    new Comments(commentObj[i]).placeAt(this.nestedComments);
                }
                var replyButton = domConstruct.create("button", {style : {padding : "0px 0px 0px 20px"} , innerHTML : "Reply"} , this.nestedComments);
                on(replyButton , "click" , function(){
                    domConstruct.destroy(replyButton);
                    new AddComment(this._openNestedComments.bind(this) , this.commentObj["_id"]).placeAt(this.nestedComments);
                }.bind(this))

            }.bind(this));

        }

    })

});