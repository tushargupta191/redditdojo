define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/_base/xhr',
    'dojoFiles/FetchComments'
], function (declare , dom , domConstruct , on , xhr) {

    return declare("NewCommentView" , null , {
        constructor : function (postComments , postId) {
            this.postComments = postComments;
            this.postId = postId;
            this.commentView = domConstruct.create("p" , {style : {padding :  "0px 0px 0px 20px"}});
        },

        addComment : function (JSONObj) {
            xhr.post({
                url: "/postComment",
                postData: JSON.stringify(JSONObj),
                headers : {"Content-type" : "application/json"},
                load: function() {
                    this.postComments.innerHTML = "";
                    var fetchComments = new FetchComments();
                    fetchComments.getComments(this.postId , this.postComments);

                }.bind(this)
            });
        },

        newComment : function(){

            var newComment = domConstruct.create("textarea",null , this.commentView);
            var submitButton = domConstruct.create("button",{innerHTML : "Submit"} , this.commentView);

            on(submitButton, "click", function(){
                var comText = newComment.value;
                var commentedById = localStorage.getItem("userId");
                var commentedByName = localStorage.getItem("username");
                var JSONObj = {
                    "commentedOn": this.postId,
                    "commentedText": comText,
                    "commentedBy": commentedById,
                    "commentedByName": commentedByName
                };

                if(comText !== ""){
                    this.addComment(JSONObj);
                }
            }.bind(this));

            return this.commentView;
        }

    })
});
