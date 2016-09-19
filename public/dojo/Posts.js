/**
 * Created by tushar.gu on 15/09/16.
 */
define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojoFiles/Utils',
    'dojoFiles/FetchComments'
],function ( declare , dom, domConstruct, on){

    return declare("Posts", null, {

        constructor : function(postArr){
            this.postArr = postArr;
            this.newPost = domConstruct.create("div" , null );
        },

        populateFeed : function () {

            var utils = new Utils();
            var fetchComments = new FetchComments();
            var userId = localStorage.getItem("userId");
            var JSONObj = {"postId": this.postArr["_id"], "userId": userId};
            var postId = this.postArr["_id"];

            var paraButtons = domConstruct.create("p" , {style : { display : "inline"} }, this.newPost);
            var postVotes = domConstruct.create("p" , {style : { display : "inline"} , innerHTML : this.postArr["postVotes"]} , this.newPost);
            var buttonUp = domConstruct.create("button" , {style : {backgroundColor : utils.colorIfNotVoted},innerHTML : "Up" } , paraButtons);
            var buttonDown = domConstruct.create("button" , {style : {backgroundColor : utils.colorIfNotVoted},innerHTML : "Down"} , paraButtons);
            var postTitle = domConstruct.create("p" , {style : {margin : "0px"}, innerHTML : this.postArr["postTitle"]} , this.newPost);
            var postedBy = domConstruct.create("p" , {style : {fontSize: "70%" , margin : "0px"}, innerHTML : "Posted By " + this.postArr["postedByName"] + " on " + this.postArr["postDate"]} , this.newPost);
            var postText = domConstruct.create("p" , {style : {margin : "0px"},innerHTML : this.postArr["postText"]} , this.newPost);
            var commentButton = domConstruct.create("button" , {style : {marginTop : "5px"},innerHTML : "Comments"} , this.newPost);
            var postComments = domConstruct.create("p",null,this.newPost);
            var line = domConstruct.create("hr" ,null , this.newPost);

            utils.checkVoted(JSONObj, "/checkPostVoted", buttonUp, buttonDown);

            on(buttonUp, "click", function(){
                utils.manageButtonUpColor(buttonUp, buttonDown);
                utils.updateVote(JSONObj, postVotes, "/postVoteIncrement", "postVotes");
            });

            on(buttonDown, "click", function() {
                utils.manageButtonDownColor(buttonUp, buttonDown);
                utils.updateVote(JSONObj, postVotes, "/postVoteDecrement", "postVotes");
            });

            on(commentButton, "click" , function(){
                commentButton.disabled = true;
                fetchComments.getComments(postId , postComments);
            });

            on(postTitle , "click" , function(){
                window.location.pathname = '/feed/post=' + postId;
            });

            return this.newPost;
        }
    })
});



