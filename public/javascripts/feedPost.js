document.addEventListener("DOMContentLoaded",function(){
    fetchPosts();
});

function fetchPosts(){

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getposts" , true);
    xhttp.onreadystatechange = function() {

        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var myArr = JSON.parse(xhttp.responseText);
            myFunction(myArr);
        }
    }

    function myFunction(arr) {
        for(i = 0; i < arr.length; i++) {
            createPostDom(arr[i]);
        }
    }

    xhttp.send();
}


function createPostDom(arr){
    var newPost = createPostObj(arr);
    document.getElementById("posts").appendChild(newPost);
}

