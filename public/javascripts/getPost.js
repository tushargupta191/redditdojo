document.addEventListener("DOMContentLoaded",function(){

    var str = window.location.href;
    var res = str.split("=");
    getPost(res[1]);
});

function getPost(postId){

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var postArr = JSON.parse(xhttp.responseText);

            var post = createPostObj(postArr);
            document.getElementById("post").appendChild(post);
        }
    }

    var JSONObj = { "postId" : postId };
    xhttp.open("POST", "/getPost");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(JSONObj));
}