define([
    "dojo/_base/declare",
    "dojo/_base/xhr",
    "dojo/dom",
    "dojoFiles/Posts"
], function(declare, xhr, dom , Posts){

    return declare(null , {

        _getPost : function () {
            var str = window.location.href;
            var res = str.split("=");

            xhr.post({
                url: "/getPost",
                postData: JSON.stringify({ "postId" : res[1] }),
                headers : {"Content-type" : "application/json"},
                load: function(result) {
                    var postArr = JSON.parse(result);
                    var postElement = dom.byId('post');
                    new Posts(postArr).placeAt(postElement);
                }
            });
        }
    });
});

