define([
    'dojo/_base/declare',
    'dojo/_base/xhr',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/newComment.html',
    'dojoFiles/xhrUtils'
], function (declare , xhr , _WidgetBase, _TemplatedMixin , template , xhrUtils) {

    return declare([_WidgetBase, _TemplatedMixin] , {

        templateString : template,

        constructor : function(paramsObj){
        },

        _addComment : function (paramsObj) {
            xhrUtils.addComment(paramsObj , this.func);
        },

        _addNewComment : function(){
            var comText = this.newComment.value;
            var commentedById = localStorage.getItem("userId");
            var commentedByName = localStorage.getItem("username");
            var requestParams = {
                "commentedOn": this.postId,
                "commentedText": comText,
                "commentedBy": commentedById,
                "commentedByName": commentedByName
            };

            if(comText !== ""){
                this._addComment(requestParams);
            }
        }
    })
});
