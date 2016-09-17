function fetchComments(postId , postComments){
    require(["dojo/_base/xhr"],
        function(xhr ) {
            xhr.post({
                url: "/getComments",
                postData: JSON.stringify({ "id" : postId }),
                headers : {"Content-type" : "application/json"},
                load: function(result) {
                    require(["dojoFiles/Comments"], function () {

                        var commentArr = JSON.parse(result);
                        for(var i=0; i<commentArr.length ; i++){
                            populateComments(commentArr[i] , postComments);
                            /*
                            var newComment = populateComments(commentArr[i] , postComments);
                            postComments.appendChild(newComment);
                            */
                        }
                    });

                    require(["dojoFiles/Reply"], function () {
                        addReply(postComments , postId);
                    });
                }
            });

        });
}

