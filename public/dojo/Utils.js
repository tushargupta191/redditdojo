define([
    'dojo/_base/declare',
    'dojo/_base/xhr'
], function (declare, xhr){

     return {

        colorIfVoted : "rgb(255, 153, 51)",
        colorIfNotVoted : "rgb(254, 254, 254)",

        checkVoted : function(JSONObj , route , buttonUp , buttonDown){
            xhr.post({
                url: route,
                postData: JSON.stringify(JSONObj),
                headers : {"Content-type" : "application/json"},
                load: function(result) {
                    var voteStatus = JSON.parse(result);
                    if (voteStatus == 1) {
                        buttonUp.style.background = this.colorIfVoted;
                        buttonDown.style.background = this.colorIfNotVoted;
                    }
                    else if (voteStatus == -1) {
                        buttonDown.style.background = this.colorIfVoted;
                        buttonUp.style.background = this.colorIfNotVoted;
                    }
                    else if (voteStatus == 0) {
                        buttonUp.style.background = this.colorIfNotVoted;
                        buttonDown.style.background = this.colorIfNotVoted;
                    }
                }.bind(this)
            })
        },

        updateVote : function(JSONObj , votesElement , route , voteId){
            xhr.post({
            url: route,
            postData: JSON.stringify(JSONObj),
            headers : {"Content-type" : "application/json"},
            load: function(result) {
                var arr = JSON.parse(result);
                votesElement.innerHTML = arr[voteId];
                }
            });
        },

        manageButtonUpColor : function (buttonUp , buttonDown) {
            if(buttonDown.style.backgroundColor == this.colorIfVoted){
                buttonDown.style.backgroundColor = this.colorIfNotVoted;
            }
            if(buttonUp.style.backgroundColor == this.colorIfVoted){
                buttonUp.style.background = this.colorIfNotVoted;
            }
            else if(buttonUp.style.backgroundColor == this.colorIfNotVoted){
                buttonUp.style.background = this.colorIfVoted;
            }
        },

        manageButtonDownColor : function (buttonUp , buttonDown) {
            if(buttonUp.style.backgroundColor == this.colorIfVoted){
                buttonUp.style.backgroundColor = this.colorIfNotVoted;
            }
            if(buttonDown.style.backgroundColor == this.colorIfVoted){
                buttonDown.style.background = this.colorIfNotVoted;
            }
            else if(buttonDown.style.backgroundColor == this.colorIfNotVoted){
                buttonDown.style.background = this.colorIfVoted;
            }
        },

        getAllComments : function (postId) {
            return xhr.post({
                url: "/getComments",
                postData: JSON.stringify({"id": postId}),
                headers: {"Content-type": "application/json"},
            });
        }
    };
});