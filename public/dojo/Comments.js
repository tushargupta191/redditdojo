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
    'dojoFiles/Entity'
], function (declare , domConstruct, on , _WidgetBase, _TemplatedMixin , template , Utils , AddComment , xhrUtils , Entity) {

    return declare("Comments" , [_WidgetBase, _TemplatedMixin, Entity] , {

        templateString : template,

        postCreate: function(){
            this.entity = "Comments";
            this.requestParams = {"commentId": this.commentObj["_id"], "userId": this.userId};
            this.votesElement = this.commentVotes;
            this.voteId = "commentVotes";
            this.commentDom = this.nestedComments;
            this.uid = this.commentObj["_id"];
            xhrUtils.checkVoted(this.requestParams, this.entity , this.buttonUp, this.buttonDown);
        },

        populateComments : function(commentObj){
            new Comments({commentObj : commentObj}).placeAt(this.commentDom);
        }

    })

});