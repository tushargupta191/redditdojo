define([
    "dojo/_base/declare",
    "dojo/_base/xhr",
    "dojo/dom",
    "dojoFiles/Posts"
],function(declare,xhr, dom){

    return declare("fetchPosts" , null , {

        fetch : function(){
            xhr.get({
                url: "/getPosts",
                load: function (result) {
                        var postArr = JSON.parse(result);
                        for (var i = 0; i < postArr.length; i++) {
                            var postFeed = new posts(postArr[i]);
                            var node = dom.byId('posts');
                            node.appendChild(postFeed.populateFeed());
                        }

                }
            })

         }
    })
});

