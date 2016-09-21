/**
 * Created by tushar.gu on 21/09/16.
 */
define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/on',
    'dojoFiles/AddComment',
    'dojoFiles/Utils',
    'dojoFiles/xhrUtils',
    'dojoFiles/xhrModel'

],function (declare , domConstruct ,on, AddComment, Utils , xhrUtils , xhrModel){

    return declare(null, {

        constructor : function(){
        },

        _incrementVote : function(){
            Utils.manageButtonColor(this.buttonUp, this.buttonDown);
            xhrUtils.updateVote(this.requestParams, this.votesElement, this.routeIncrement, this.voteId);
        },

        _decrementVote : function(){
            Utils.manageButtonColor(this.buttonDown, this.buttonUp);
            xhrUtils.updateVote(this.requestParams, this.votesElement, this.routeDecrement, this.voteId);
        },

        _openComments : function () {

            this.commentDom.innerHTML = "";

            xhrModel.xhrPostRequest({"id": this.uid} , '/getComments').then(function(result){
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