define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/on',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/comment.html',
    'dojoFiles/Utils',
    'dojoFiles/AddComment',
    'dojoFiles/xhrUtils',
    'dojoFiles/Parent'
], function (declare , domConstruct, on , _WidgetBase, _TemplatedMixin , template , Utils , AddComment , xhrUtils , Parent) {

    return declare("Comments" , [_WidgetBase, _TemplatedMixin, Parent] , {

        templateString : template,

        constructor : function (commentObj) {
            this.commentObj = commentObj;
            this.userId = localStorage.getItem("userId");
            this.JSONObj = {"commentId": this.commentObj["_id"], "userId": this.userId};
        },

        postCreate: function(){
            this.votesElement = this.commentVotes;
            this.routeIncrement = "/commentVoteIncrement";
            this.routeDecrement = "/commentVoteDecrement";
            this.voteId = "commentVotes";
            this.commentDom = this.nestedComments;
            this.uid = this.commentObj["_id"];
            xhrUtils.checkVoted(this.JSONObj, "/checkCommentVoted", this.buttonUp, this.buttonDown);
        },

        populateComments : function(commentObj){
            new Comments(commentObj).placeAt(this.commentDom);
        }

    })

});