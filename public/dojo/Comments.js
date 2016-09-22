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
        },

        postCreate: function(){
            this.requestParams = {"commentId": this.commentObj["_id"], "userId": this.userId};
            this.votesElement = this.commentVotes;
            this.routeIncrement = "/commentVoteIncrement";
            this.routeDecrement = "/commentVoteDecrement";
            this.voteId = "commentVotes";
            this.commentDom = this.nestedComments;
            this.uid = this.commentObj["_id"];
            xhrUtils.checkVoted(this.requestParams, "/checkCommentVoted", this.buttonUp, this.buttonDown);
        },

        populateComments : function(commentObj){
            new Comments({commentObj : commentObj}).placeAt(this.commentDom);
        }

    })

});