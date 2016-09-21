define([
    'dojo/_base/declare',
    'dojo/_base/xhr',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/newComment.html'
], function (declare , xhr , _WidgetBase, _TemplatedMixin , template ) {

    return declare([_WidgetBase, _TemplatedMixin] , {

        templateString : template,

        constructor : function(func , postId){
            this.postId = postId;
            this.func = func;
        },

        _addComment : function (JSONObj) {
            xhr.post({
                url: "/postComment",
                postData: JSON.stringify(JSONObj),
                headers : {"Content-type" : "application/json"},
                load: function() {
                    this.func();
                }.bind(this)
            });
        },

        _addNewComment : function(){
            var comText = this.newComment.value;
            var commentedById = localStorage.getItem("userId");
            var commentedByName = localStorage.getItem("username");
            var JSONObj = {
                "commentedOn": this.postId,
                "commentedText": comText,
                "commentedBy": commentedById,
                "commentedByName": commentedByName
            };

            if(comText !== ""){
                this._addComment(JSONObj);
            }
        }
    })
});
