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

        updateVote : function(requestParams, votesElement , route , voteId){
            xhrPostRequest(requestParams , route).then(function(result) {
                var arr = JSON.parse(result);
                votesElement.innerHTML = arr[voteId];
            })
        },

        checkVoted : function(requestParams, route , buttonUp , buttonDown){
            xhrPostRequest(requestParams , route).then(function(result){
                Utils.checkVoted(result, buttonUp , buttonDown)
            });
        },

        addComment : function(paramsObj , onLoad){
            xhrPostRequest(paramsObj , "/postComment").then(onLoad);
        },

        fetchPosts :  function(onLoad){
            xhrGetRequest("/getPosts").then(onLoad);
        },

        getPost : function (requestParams , onLoad){
            xhrPostRequest(requestParams , "/getPost").then(onLoad);
        },
        
        fetchComments : function (requestParams , onLoad) {
            xhrPostRequest(requestParams , "/getComments").then(onLoad);
        }
    }
})