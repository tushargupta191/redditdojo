define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojoFiles/Posts",
    "dojoFiles/xhrModel"
],function(declare, dom , Posts , xhrModel){

    return declare(null , {
        _fetchPosts: function () {
            xhrModel.xhrGetRequest('/getPosts').then(function (result) {
                var postObj = JSON.parse(result);
                var postElement = dom.byId('posts');
                for (var i = 0; i < postObj.length; i++) {
                    new Posts({postObj : postObj[i]}).placeAt(postElement);
                }
            })
        }
    })
});

