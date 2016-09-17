function addReply(postComments , postId){
    require([
        'dojo/dom',
        'dojo/dom-construct',
        'dojo/on'
    ], function ( dom, domConstruct, on){


        var reply = domConstruct.create("div" , {style : { padding : "0px 0px 0px 20px"}});
        var replyButton = domConstruct.create("button" , {innerHTML : "Reply" } , reply);

        on(replyButton, "click", function(){
            require(["dojoFiles/NewCommentView"], function () {
                replyButton.disabled = true;
                newComment(postComments , postId);
            });

        });

        postComments.appendChild(reply);

    });

}