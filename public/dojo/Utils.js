
function checkVoted(JSONObj , route , buttonUp , buttonDown){
    var colorIfVoted = "rgb(255, 153, 51)";
    var colorIfNotVoted = "rgb(254, 254, 254)";

    require(["dojo/_base/xhr"],
        function(xhr ) {
            xhr.post({
                url: route,
                postData: JSON.stringify(JSONObj),
                headers : {"Content-type" : "application/json"},
                load: function(result) {
                    var voteStatus = JSON.parse(result);
                    if (voteStatus == 1) {
                        buttonUp.style.background = colorIfVoted;
                        buttonDown.style.background = colorIfNotVoted;
                    }
                    else if (voteStatus == -1) {
                        buttonDown.style.background = colorIfVoted;
                        buttonUp.style.background = colorIfNotVoted;
                    }
                    else if (voteStatus == 0) {
                        buttonUp.style.background = colorIfNotVoted;
                        buttonDown.style.background = colorIfNotVoted;
                    }
                }
            });
        });
}
function updateVote(JSONObj , votesElement , route , voteId){
    require(["dojo/_base/xhr"],
        function(xhr ) {
            xhr.post({
                url: route,
                postData: JSON.stringify(JSONObj),
                headers : {"Content-type" : "application/json"},
                load: function(result) {
                    var arr = JSON.parse(result);
                    votesElement.innerHTML = arr[voteId];
                }
            });
        });
}

function manageButtonUpColor(buttonUp , buttonDown) {
    var colorIfVoted = "rgb(255, 153, 51)";
    var colorIfNotVoted = "rgb(254, 254, 254)";

    if(buttonDown.style.backgroundColor == colorIfVoted){
        buttonDown.style.backgroundColor = colorIfNotVoted;
    }
    if(buttonUp.style.backgroundColor == colorIfVoted){
        buttonUp.style.background = colorIfNotVoted;
    }
    else if(buttonUp.style.backgroundColor == colorIfNotVoted){
        buttonUp.style.background = colorIfVoted;
    }
}

function manageButtonDownColor(buttonUp , buttonDown) {
    var colorIfVoted = "rgb(255, 153, 51)";
    var colorIfNotVoted = "rgb(254, 254, 254)";

    if(buttonUp.style.backgroundColor == colorIfVoted){
        buttonUp.style.backgroundColor = colorIfNotVoted;
    }
    if(buttonDown.style.backgroundColor == colorIfVoted){
        buttonDown.style.background = colorIfNotVoted;
    }
    else if(buttonDown.style.backgroundColor == colorIfNotVoted){
        buttonDown.style.background = colorIfVoted;
    }
}