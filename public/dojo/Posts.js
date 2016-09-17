/**
 * Created by tushar.gu on 15/09/16.
 */
define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on'
],function ( declare , dom, domConstruct, on){

    return declare("posts", null, {

        constructor : function(postArr){
            this.postArr = postArr;
        },

        populateFeed : function () {

            var colorIfNotVoted = "rgb(254, 254, 254)";

            var newPost = domConstruct.create("div" , null );
            var paraButtons = domConstruct.create("p" , {style : { display : "inline"} }, newPost);
            var postVotes = domConstruct.create("p" , {style : { display : "inline"} , innerHTML : this.postArr["postVotes"]} , newPost);
            var buttonUp = domConstruct.create("button" , {style : {backgroundColor : colorIfNotVoted},innerHTML : "Up" } , paraButtons);
            var buttonDown = domConstruct.create("button" , {style : {backgroundColor : colorIfNotVoted},innerHTML : "Down"} , paraButtons);
            var postTitle = domConstruct.create("p" , {style : {margin : "0px"}, innerHTML : this.postArr["postTitle"]} , newPost);
            var postedBy = domConstruct.create("p" , {style : {fontSize: "70%" , margin : "0px"}, innerHTML : "Posted By " + this.postArr["postedByName"] + " on " + this.postArr["postDate"]} , newPost);
            var postText = domConstruct.create("p" , {style : {margin : "0px"},innerHTML : this.postArr["postText"]} , newPost);
            var commentButton = domConstruct.create("button" , {style : {marginTop : "5px"},innerHTML : "Comments"} , newPost);
            var postComments = domConstruct.create("p",null,newPost);

            var userId = localStorage.getItem("userId");
            var JSONObj = {"postId": this.postArr["_id"], "userId": userId};

            var postId = this.postArr["_id"];

            //var line = domConstruct.create("hr" , node);
            //border-bottom:2px; border-bottom-style:solid

            require(["dojoFiles/Utils"], function () {
                checkVoted(JSONObj, "/checkPostVoted", buttonUp, buttonDown);
            });

            on(buttonUp, "click", function(){
                require(["dojoFiles/Utils"], function () {
                    manageButtonUpColor(buttonUp, buttonDown);
                    updateVote(JSONObj, postVotes, "/postVoteIncrement", "postVotes");
                });
            });

            on(buttonDown, "click", function(){
                require(["dojoFiles/Utils"], function () {
                    manageButtonDownColor(buttonUp, buttonDown);
                    updateVote(JSONObj, postVotes, "/postVoteDecrement", "postVotes");
                });
            });

            on(commentButton, "click" , function(){
                require(["dojoFiles/FetchComments"], function () {
                    commentButton.disabled = true;
                    fetchComments(postId , postComments);
                });
            });

            on(postTitle , "click" , function(){
                window.location.pathname = '/feed/post=' + postId;
            });

            return newPost;

        }

    })
});
// function populateFeed(postArr){
//     require([
//         'dojo/dom',
//         'dojo/dom-construct',
//         'dojo/on'
//     ], function ( dom, domConstruct, on){
//
//         var colorIfNotVoted = "rgb(254, 254, 254)";
//
//
//         var node = dom.byId('posts');
//
//         var newPost = domConstruct.create("div" , null );
//         var paraButtons = domConstruct.create("p" , {style : { display : "inline"} }, newPost);
//         var postVotes = domConstruct.create("p" , {style : { display : "inline"} , innerHTML : postArr["postVotes"]} , newPost);
//         var buttonUp = domConstruct.create("button" , {style : {backgroundColor : colorIfNotVoted},innerHTML : "Up" } , paraButtons);
//         var buttonDown = domConstruct.create("button" , {style : {backgroundColor : colorIfNotVoted},innerHTML : "Down"} , paraButtons);
//         var postTitle = domConstruct.create("p" , {style : {margin : "0px"}, innerHTML : postArr["postTitle"]} , newPost);
//         var postedBy = domConstruct.create("p" , {style : {fontSize: "70%" , margin : "0px"}, innerHTML : "Posted By " + postArr["postedByName"] + " on " + postArr["postDate"]} , newPost);
//         var postText = domConstruct.create("p" , {style : {margin : "0px"},innerHTML : postArr["postText"]} , newPost);
//         var commentButton = domConstruct.create("button" , {style : {marginTop : "5px"},innerHTML : "Comments"} , newPost);
//         var postComments = domConstruct.create("p",null,newPost);
//
//         var userId = localStorage.getItem("userId");
//         var JSONObj = {"postId": postArr["_id"], "userId": userId};
//
//         //var line = domConstruct.create("hr" , node);
//         //border-bottom:2px; border-bottom-style:solid
//
//         require(["dojoFiles/Utils"], function () {
//             checkVoted(JSONObj, "/checkPostVoted", buttonUp, buttonDown);
//         });
//
//         on(buttonUp, "click", function(){
//             require(["dojoFiles/Utils"], function () {
//                 manageButtonUpColor(buttonUp, buttonDown);
//                 updateVote(JSONObj, postVotes, "/postVoteIncrement", "postVotes");
//             });
//         });
//
//         on(buttonDown, "click", function(){
//             require(["dojoFiles/Utils"], function () {
//                 manageButtonDownColor(buttonUp, buttonDown);
//                 updateVote(JSONObj, postVotes, "/postVoteDecrement", "postVotes");
//             });
//         });
//
//         on(commentButton, "click" , function(){
//             require(["dojoFiles/FetchComments"], function () {
//                 commentButton.disabled = true;
//                 fetchComments(postArr["_id"] , postComments);
//             });
//         });
//
//         on(postTitle , "click" , function(){
//             window.location.pathname = '/feed/post=' + postArr["_id"];
//         });
//
//
//         node.appendChild(newPost);
//         //     console.log("I am called now");
//         //     return newPost;
//
//
//
//
//
//
//     });
//
// }



