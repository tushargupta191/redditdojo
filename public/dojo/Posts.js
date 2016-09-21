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
    'dojoFiles/AddComment'

],function ( declare , domConstruct, on , _WidgetBase, _TemplatedMixin , template , Utils , Comments ,  AddComment){

    return declare([_WidgetBase, _TemplatedMixin], {

        templateString : template,

        constructor : function(postObj){
            this.postObj = postObj;
            this.userId = localStorage.getItem("userId");
            this.JSONObj = {"postId": this.postObj["_id"], "userId": this.userId};
        },

        postCreate: function(){
            Utils.checkVoted(this.JSONObj, "/checkPostVoted", this.buttonUp, this.buttonDown);
        },

        _incrementVote : function(){
            Utils.manageButtonUpColor(this.buttonUp, this.buttonDown);
            Utils.updateVote(this.JSONObj, this.postVotes, "/postVoteIncrement", "postVotes");
        },

        _decrementVote : function(){
            Utils.manageButtonDownColor(this.buttonUp, this.buttonDown);
            Utils.updateVote(this.JSONObj, this.postVotes, "/postVoteDecrement", "postVotes");
        },

        _openPost : function(){
            window.location.pathname = '/feed/post=' + this.postObj["_id"];
        },

        _openComments : function () {

            this.postComments.innerHTML = "";

            Utils.getAllComments(this.postObj["_id"]).then(function(result){
                var commentObj = JSON.parse(result);

                for(var i=0; i<commentObj.length ; i++){
                    new Comments(commentObj[i]).placeAt(this.postComments);
                }

                var replyButton = domConstruct.create("button", {style : {padding : "0px 0px 0px 20px"} , innerHTML : "Reply"} , this.postComments);
                on(replyButton , "click" , function(){
                    domConstruct.destroy(replyButton);
                    new AddComment(this._openComments.bind(this) , this.postObj["_id"]).placeAt(this.postComments);
                }.bind(this))

            }.bind(this));

        }

    })
});



