//document.getElementById("up").addEventListener("click", function(){
//    var counter = document.getElementById("count").innerHTML;
//    counter++;
//    document.getElementById("count").innerHTML = counter;
//});
//
//document.getElementById("down").addEventListener("click", function(){
//    var counter = document.getElementById("count").innerHTML;
//    counter--;
//    document.getElementById("count").innerHTML = counter;
//});

//ajax call here

document.addEventListener("DOMContentLoaded",function(event){
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var myArr = JSON.parse(xhttp.responseText);
            myFunction(myArr);
        }
    }

    function myFunction(arr) {

    for(i = 0; i < arr.length; i++) {

       createDom(arr[i]);

//        var postingDate = document.createTextNode(arr[i]["postDate"]);
//        postDate.appendChild(postingDate);

     }

//        var out = "";
//        for(i = 0; i < arr.length; i++) {
//            out +=  '<p id = "postVotes">' + arr[i]["postVotes"] +
//                    '<button id="up">Upvote</button>' +
//                    '<button id="down">Downvote</button>' +
//                    '</p>' +
//                    '<div>' +
//                    '<p id = "postTitle">' + arr[i]["postTitle"] +
//                    '</p>' +
//                    '<div style="font-size:60%">' +
//                    ' Posted By ' + arr[i]["postedByName"] +
//                    ' on ' + arr[i]["postDate"]+
//                    '</div>' +
//                    '<p id = "postText">' + arr[i]["postText"] + '</p> </div> <hr>';
//
//        }
//        document.getElementById("posts").innerHTML = out;
    }

    xhttp.open("GET", "/getpost" , true);
    xhttp.send();

});

function createDom(arr){

    var buttonUp = document.createElement("button");
    var buttonUpVal = document.createTextNode("Upvote");
    buttonUp.appendChild(buttonUpVal);
    var buttonDown = document.createElement("button");
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

    var line = document.createElement('hr');

    var post = document.createElement("div");
    post.appendChild(paraOfButtons);
    post.appendChild(postTitle);
    post.appendChild(paraOfSubTitle);
    post.appendChild(postText);
    post.appendChild(line);

    document.getElementById("posts").appendChild(post);

    buttonUp.addEventListener("click", function(event){
        document.getElementById("a").innerHTML = "On click is working";
    })


}

//function incrementVote(){
//    var xhttp;
//    xhttp = new XMLHttpRequest();
//
//    xhttp.open("POST", "/voteincrement");
//
//    var data = new FormData();
//    data.append('postId' , this.id);
//    data.append('value' , 1);
//    data.append('userId' , user.id);
//
//    xhttp.send(data);
//
//}
//
document.getElementById("buttonUp").addEventListener("click",function(event){

    document.getElementById("a").innerHTML = "start";
    var xhttp;
    xhttp = new XMLHttpRequest();



//    xhhtp.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             callback(xhr.responseText);
//         }
//      }

    var data = new FormData();
    //data.append('postId' , this.id);
    data.append('value' , 1);
    //data.append('userId' , user.id);
      //  document.getElementById("a").innerHTML = "end";

    xhttp.open('POST', '/voteincrement' ,  true);

    //xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhttp.send(data);
    document.getElementById("a").innerHTML = "end";
});