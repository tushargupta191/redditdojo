/**
 * Created by tushar.gu on 21/09/16.
 */
define([
    'dojoFiles/Utils',
    'dojo/_base/xhr'
], function (Utils , xhr) {

    var xhrPostRequest = function(requestParams , route){

        return xhr.post({
            url : route,
            postData : JSON.stringify(requestParams),
            headers : {"Content-type" : "application/json"},
        });
    };

    var xhrGetRequest = function (route){

        return xhr.get({
            url : route,
            headers : {"Content-type" : "application/json"},
        });
    };

    return {

        incrementVote : function(requestParams, votesElement , entity , voteId){
            if(entity === "Posts"){
                xhrPostRequest(requestParams , "/postVoteIncrement").then(function(result) {
                    var arr = JSON.parse(result);
                    votesElement.innerHTML = arr[voteId];
                })
            }
            else if(entity === "Comments"){
                xhrPostRequest(requestParams , "/commentVoteIncrement").then(function(result) {
                    var arr = JSON.parse(result);
                    votesElement.innerHTML = arr[voteId];
                })
            }
        },

        decrementVote : function(requestParams, votesElement , entity , voteId){
            if(entity === "Posts"){
                xhrPostRequest(requestParams , "/postVoteDecrement").then(function(result) {
                    var arr = JSON.parse(result);
                    votesElement.innerHTML = arr[voteId];
                })
            }
            else if(entity === "Comments"){
                xhrPostRequest(requestParams , "/commentVoteDecrement").then(function(result) {
                    var arr = JSON.parse(result);
                    votesElement.innerHTML = arr[voteId];
                })
            }
        },

        checkVoted : function(requestParams, entity , buttonUp , buttonDown){
            if(entity === "Posts"){
                xhrPostRequest(requestParams , "/checkPostVoted").then(function(result){
                    Utils.checkVoted(result, buttonUp , buttonDown)
                });
            }
            else if(entity === "Comments"){
                xhrPostRequest(requestParams , "/checkCommentVoted").then(function(result){
                    Utils.checkVoted(result, buttonUp , buttonDown)
                });
            }

        },

        addComment : function(paramsObj){
            return xhrPostRequest(paramsObj , "/postComment");
        },

        fetchPosts :  function(){
            return xhrGetRequest("/getPosts");
        },

        getPost : function (requestParams){
            return xhrPostRequest(requestParams , "/getPost");
        },
        
        fetchComments : function (requestParams) {
            return xhrPostRequest(requestParams , "/getComments");
        }
    }
})