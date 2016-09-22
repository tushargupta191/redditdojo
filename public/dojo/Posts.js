/**
 * Created by tushar.gu on 15/09/16.
 */
define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/on',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/post.html',
    'dojoFiles/Utils',
    'dojoFiles/Comments',
    'dojoFiles/AddComment',
    'dojoFiles/xhrUtils',
    'dojoFiles/Entity'

],function ( declare , domConstruct, on , _WidgetBase, _TemplatedMixin , template , Utils , Comments ,  AddComment , xhrUtils , Entity ){

    return declare([_WidgetBase, _TemplatedMixin, Entity], {

        templateString : template,

        postCreate: function(){
            this.entity = "Posts";
            this.requestParams = {"postId": this.postObj["_id"], "userId": this.userId};
            this.votesElement = this.postVotes;
            this.voteId = "postVotes";
            this.commentDom = this.postComments;
            this.uid = this.postObj["_id"];
            xhrUtils.checkVoted(this.requestParams, this.entity, this.buttonUp, this.buttonDown);
        },

        _openPost : function(){
            window.location.pathname = '/feed/post=' + this.postObj["_id"];
        },

        populateComments : function(commentObj){
            new Comments({commentObj : commentObj}).placeAt(this.commentDom);
        }
    })
});



