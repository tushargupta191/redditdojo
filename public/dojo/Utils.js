define([
    'dojo/_base/xhr',
], function (xhr){

     return {

        colorIfVoted : "rgb(255, 153, 51)",
        colorIfNotVoted : "rgb(254, 254, 254)",

        checkVoted : function(result , buttonUp , buttonDown){

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

        },

         manageButtonColor : function (buttonUp , buttonDown) {
            if(buttonDown.style.backgroundColor == this.colorIfVoted){
                buttonDown.style.backgroundColor = this.colorIfNotVoted;
            }
            if(buttonUp.style.backgroundColor == this.colorIfVoted){
                buttonUp.style.background = this.colorIfNotVoted;
            }
            else if(buttonUp.style.backgroundColor == this.colorIfNotVoted){
                buttonUp.style.background = this.colorIfVoted;
            }

        }
    };
});