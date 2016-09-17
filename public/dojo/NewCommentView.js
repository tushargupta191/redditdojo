function newComment(postComments , postId){
    require([
        'dojo/dom',
        'dojo/dom-construct',
        'dojo/on'
    ], function ( dom, domConstruct, on){

        var commentView = domConstruct.create("p" , {style : {padding :  "0px 0px 0px 20px"}});
        var newComment = domConstruct.create("textarea",null , commentView);
        var submitButton = domConstruct.create("button",{innerHTML : "Submit"} , commentView);

        on(submitButton, "click", function(){
            var comText = newComment.value;
            var commentedById = localStorage.getItem("userId");
            var commentedByName = localStorage.getItem("username");
            var JSONObj = {
                "commentedOn": postId,
                "commentedText": comText,
                "commentedBy": commentedById,
                "commentedByName": commentedByName
            };

            if(comText !== ""){
                addComment(JSONObj , postComments , postId);
            }
        });
        postComments.appendChild(commentView);
    });
}

function addComment(JSONObj , postComments , postId){
    require(["dojo/_base/xhr"],
        function(xhr ) {
            xhr.post({
                url: "/postComment",
                postData: JSON.stringify(JSONObj),
                headers : {"Content-type" : "application/json"},
                load: function() {
                    postComments.innerHTML = "";
                    require(["dojoFiles/FetchComments"], function () {
                        fetchComments(postId , postComments);
                    });
                }
            });
        });
}