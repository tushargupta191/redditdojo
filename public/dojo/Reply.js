define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojoFiles/NewCommentView'
], function (declare, dom, domConstruct, on) {

    return declare("Reply" , null , {

        constructor : function(postComments , postId){
            this.postComments = postComments;
            this.postId = postId;
            this.reply = domConstruct.create("div" , {style : { padding : "0px 0px 0px 20px"}});
        },

        addReply : function(){

            var replyButton = domConstruct.create("button" , {innerHTML : "Reply" } , this.reply);
            on(replyButton, "click" , function(){
                replyButton.disabled = true;

                var newCommentView = new NewCommentView(this.postComments , this.postId);
                this.postComments.appendChild(newCommentView.newComment());
            }.bind(this));

            return this.reply;
        }

    })
});
