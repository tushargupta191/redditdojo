define([
    'dojo/_base/declare',
    'dojo/_base/xhr',
    'dojoFiles/Comments',
    'dojoFiles/Reply'
], function (declare , xhr) {

    return declare("FetchComments" , null , {

        getComments : function (postId, postComments) {
            xhr.post({
                url: "/getComments",
                postData: JSON.stringify({ "id" : postId }),
                headers : {"Content-type" : "application/json"},
                load: function(result) {

                    var commentArr = JSON.parse(result);
                    for(var i=0; i<commentArr.length ; i++){
                        var newComment = new Comments(commentArr[i]);
                        postComments.appendChild(newComment.populateComments())
                    }
                    var reply = new Reply(postComments , postId);
                    postComments.appendChild(reply.addReply());
                }
            });
        }
    })
});


