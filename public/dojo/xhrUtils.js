/**
 * Created by tushar.gu on 21/09/16.
 */
define([
    'dojoFiles/xhrModel',
    'dojoFiles/Utils'
], function ( xhrModel , Utils) {

    return {

        updateVote : function(requestParams, votesElement , route , voteId){
            xhrModel.xhrPostRequest(requestParams , route).then(function(result) {
                var arr = JSON.parse(result);
                votesElement.innerHTML = arr[voteId];
            })
        },

        checkVoted : function(requestParams, route , buttonUp , buttonDown){
            xhrModel.xhrPostRequest(requestParams , route).then( function(result){
                Utils.checkVoted(result, buttonUp , buttonDown)
            });
        }
    }
})