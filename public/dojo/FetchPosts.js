define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojoFiles/Posts",
    "dojoFiles/xhrUtils"
],function(declare, dom , Posts , xhrUtils){

    return declare(null , {
        _fetchPosts: function () {

            xhrUtils.fetchPosts(function (result) {
                var postObj = JSON.parse(result);
                var postElement = dom.byId('posts');
                for (var i = 0; i < postObj.length; i++) {
                    new Posts({postObj: postObj[i]}).placeAt(postElement);
                }
            });
        }
    })
});

