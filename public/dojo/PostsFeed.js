/**
 * Created by tushar.gu on 20/09/16.
 */
require([
    "dojoFiles/FetchPosts"
    ],
    function(FetchPosts){
        var fetchPosts = new FetchPosts();
        fetchPosts._fetchPosts();
    }
);