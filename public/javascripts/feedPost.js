document.addEventListener("DOMContentLoaded",function(){
    fetchPosts();
});

function fetchPosts(){

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getPosts" , true);

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var myArr = JSON.parse(xhttp.responseText);
            myFunction(myArr);
        }
    };

    function myFunction(arr) {
        for(var i = 0; i < arr.length; i++) {
            var newPost = new Post(arr[i]);
            document.getElementById("posts").appendChild(newPost.populateDom());
        }
    }

    xhttp.send();
}


