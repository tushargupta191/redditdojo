define([
    "dojo/_base/declare",
    "dojo/_base/xhr",
    "dojo/dom",
    "dojoFiles/Posts"
],function(declare,xhr, dom , Posts){

    return declare( null , {
        _fetch : function(){
            xhr.get({
                url: "/getPosts",
                load: function (result) {
                    var postObj = JSON.parse(result);
                    for (var i = 0; i < postObj.length; i++) {
                        var postElement = dom.byId('posts');
                        new Posts(postObj[i]).placeAt(postElement);
                    }
                }
            })
         }
    })
});

