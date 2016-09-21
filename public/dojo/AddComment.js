define([
    'dojo/_base/declare',
    'dojo/_base/xhr',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/newComment.html',
    'dojoFiles/xhrModel'
], function (declare , xhr , _WidgetBase, _TemplatedMixin , template , xhrModel) {

    return declare([_WidgetBase, _TemplatedMixin] , {

        templateString : template,

        constructor : function(paramsObj){
        },

        _addComment : function (paramsObj) {
            xhrModel.xhrPostRequest(paramsObj , "/postComment").then(function(){
                this.func();
            }.bind(this))
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
