/**
 * Created by tushar.gu on 21/09/16.
 */
define([
    'dojo/_base/declare',
    'dojo/_base/xhr'
], function (declare, xhr) {

    return {
        xhrPostRequest : function(requestParams , route){

            return xhr.post({
                url : route,
                postData : JSON.stringify(requestParams),
                headers : {"Content-type" : "application/json"},
            });
        },

        xhrGetRequest : function(route){

            return xhr.get({
                url : route,
                headers : {"Content-type" : "application/json"},
            });
        }
    }


});