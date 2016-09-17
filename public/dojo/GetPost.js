function getPost(){

    var str = window.location.href;
    var res = str.split("=");

    require(["dojo/_base/xhr"],
        function(xhr ) {
            xhr.post({
                url: "/getPost",
                postData: JSON.stringify({ "postId" : res[1] }),
                headers : {"Content-type" : "application/json"},
                load: function(result) {
                    require(["dojoFiles/Posts"], function () {
                        var postArr = JSON.parse(result);
                        populateFeed(postArr);

                    });
                }
            });
        });
}
