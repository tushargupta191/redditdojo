document.addEventListener("DOMContentLoaded",function(event){
    fetchPosts();

});

function fetchPosts(){

    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/getpost" , true);

    xhttp.onreadystatechange = function() {

        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var myArr = JSON.parse(xhttp.responseText);
            myFunction(myArr);
        }
    }

    function myFunction(arr) {

        for(i = 0; i < arr.length; i++) {
            createDom(arr[i]);
        }
    }


    xhttp.send();
}

function createDom(arr){

    var postVotes = document.createElement("p");
    var postVotesVal = document.createTextNode(arr["postVotes"]);
    postVotes.setAttribute("id","postVotes" + arr["_id"]);
    postVotes.appendChild(postVotesVal);

    var buttonUp = document.createElement("button");
    buttonUp.setAttribute("id","up" + arr["_id"]);
    var buttonUpVal = document.createTextNode("Upvote");
    buttonUp.appendChild(buttonUpVal);
    var buttonDown = document.createElement("button");
    buttonDown.setAttribute("id","down" + arr["_id"]);
    var buttonDownVal = document.createTextNode("Downvote");
    buttonDown.appendChild(buttonDownVal);
    var paraOfButtons = document.createElement("p");
    paraOfButtons.appendChild(buttonUp);
    paraOfButtons.appendChild(buttonDown);

    var postTitle = document.createElement("p");
    var postTitleText  =document.createTextNode(arr["postTitle"]);
    postTitle.appendChild(postTitleText);

    var paraOfSubTitle = document.createElement("p");
    var postedBy = document.createTextNode("Posted By ");
    var postedByName = document.createTextNode(arr["postedByName"]);
    var postedOn = document.createTextNode(" on ");
    var postedOnDate = document.createTextNode(arr["postDate"]);
    paraOfSubTitle.appendChild(postedBy);
    paraOfSubTitle.appendChild(postedByName);
    paraOfSubTitle.appendChild(postedOn);
    paraOfSubTitle.appendChild(postedOnDate);
    paraOfSubTitle.setAttribute("style","font-size:60%");


    var postText = document.createElement("p");
    var postTextInfo = document.createTextNode(arr["postText"]);
    postText.appendChild(postTextInfo);

    var line = document.createElement("hr");

    var post = document.createElement("div");
    post.appendChild(postVotes);
    post.appendChild(paraOfButtons);
    post.appendChild(postTitle);
    post.appendChild(paraOfSubTitle);
    post.appendChild(postText);
    post.appendChild(line);

    document.getElementById("posts").appendChild(post);


    document.getElementById("up" + arr["_id"]).addEventListener("click" , function(event){

            incrementVote(arr["_id"]);

    });

    document.getElementById("down" + arr["_id"]).addEventListener("click" , function(event){

            decrementVote(arr["_id"]);//this.id;

    });



}


function incrementVote(arr){
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onload = function (){
        checkVoteCount(arr);
    }

    var params = "id="+arr;
    xhttp.open("POST", "/voteIncrement");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);

}

function decrementVote(arr){
    var xhttp;
    xhttp = new XMLHttpRequest();



    xhttp.onload = function (){
        checkVoteCount(arr);
    }

    var params = "id="+arr;
    xhttp.open("POST", "/voteDecrement");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);

}

function checkVoteCount(arr){
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var myArr = JSON.parse(xhttp.responseText);
            document.getElementById("postVotes"+arr).innerHTML = myArr["postVotes"];
        }
    }

    var params = "id="+arr;
    xhttp.open("POST", "/checkVoteCount" );
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

