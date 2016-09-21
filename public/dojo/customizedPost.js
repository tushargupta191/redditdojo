/**
 * Created by tushar.gu on 20/09/16.
 */
require([
    "dojoFiles/GetPost"
    ],
    function (GetPost) {
        var post = new GetPost();
        post._getPost();
    }
);