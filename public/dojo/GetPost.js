define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojoFiles/Posts",
    "dojoFiles/xhrModel"
], function(declare, dom , Posts , xhrModel){

    return declare(null , {

        _getPost: function () {
            var str = window.location.href;
            var res = str.split("=");

            xhrModel.xhrPostRequest({ "postId" : res[1] } , '/getPost').then(function (result) {
                var postObj = JSON.parse(result);
                var postElement = dom.byId('post');
                new Posts(postObj).placeAt(postElement);
            })
        }
    });
});

