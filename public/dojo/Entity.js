/**
 * Created by tushar.gu on 21/09/16.
 */
define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/on',
    'dojoFiles/AddComment',
    'dojoFiles/Utils',
    'dojoFiles/xhrUtils'

],function (declare , domConstruct ,on, AddComment, Utils , xhrUtils){

    return declare(null, {

        constructor : function(){
            this.userId = localStorage.getItem("userId");
        },

        _incrementVote : function(){
            Utils.manageButtonColor(this.buttonUp, this.buttonDown);
            xhrUtils.incrementVote(this.requestParams, this.votesElement, this.entity, this.voteId);
        },

        _decrementVote : function(){
            Utils.manageButtonColor(this.buttonDown, this.buttonUp);
            xhrUtils.decrementVote(this.requestParams, this.votesElement, this.entity, this.voteId);
        },

        _openComments : function () {

            domConstruct.destroy(this.comment);
            this.commentDom.innerHTML = "";

            xhrUtils.fetchComments({"id": this.uid}).then(function(result){
                var commentObj = JSON.parse(result);

                for(var i=0; i<commentObj.length ; i++){
                    this.populateComments(commentObj[i]);
                }

                var replyDiv = domConstruct.create("div" , {style : {padding : "0px 0px 0px 20px"}} , this.commentDom)
                var replyButton = domConstruct.create("button", {innerHTML : "Reply"} , replyDiv);
                on(replyButton , "click" , function(){
                    domConstruct.destroy(replyButton);
                    var paramsObj = {func : this._openComments.bind(this) , postId :this.uid  };
                    new AddComment(paramsObj).placeAt(this.commentDom);
                }.bind(this))

            }.bind(this));

        }

    })
})