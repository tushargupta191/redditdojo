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
    'dojoFiles/Parent'

],function ( declare , domConstruct, on , _WidgetBase, _TemplatedMixin , template , Utils , Comments ,  AddComment , xhrUtils , Parent ){

    return declare([_WidgetBase, _TemplatedMixin, Parent], {

        templateString : template,

        constructor : function(postObj){
            this.postObj = postObj;
            this.userId = localStorage.getItem("userId");
            this.requestParams = {"postId": this.postObj["_id"], "userId": this.userId};
        },

        postCreate: function(){
            this.votesElement = this.postVotes;
            this.routeIncrement = "/postVoteIncrement";
            this.routeDecrement = "/postVoteDecrement";
            this.voteId = "postVotes";
            this.commentDom = this.postComments;
            this.uid = this.postObj["_id"];
            xhrUtils.checkVoted(this.requestParams, "/checkPostVoted", this.buttonUp, this.buttonDown);
        },

        _openPost : function(){
            window.location.pathname = '/feed/post=' + this.postObj["_id"];
        },

        populateComments : function(commentObj){
            new Comments(commentObj).placeAt(this.commentDom);
        }


    })
});



