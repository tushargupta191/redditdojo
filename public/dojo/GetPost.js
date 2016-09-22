define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojoFiles/Posts",
    "dojoFiles/xhrUtils"
], function(declare, dom , Posts , xhrUtils){

    return declare(null , {

        _getPost: function () {
            var str = window.location.href;
            var res = str.split("=");

            xhrUtils.getPost({ "postId" : res[1] }).then(function (result) {
                var postObj = JSON.parse(result);
                var postElement = dom.byId('post');
                new Posts({postObj : postObj}).placeAt(postElement);
            });
        }
    });
});

