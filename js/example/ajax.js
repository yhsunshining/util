/**
 * Created by royhyang on 2016/8/24.
 */
var $ = require('../lib/util');
window.$ = $;
var flick = "http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=onsuccess"
var resutl = "js/result.js"
$.ajax(flick, {
    data: {
        x: 1,
        string: "string"
    },
    type: "jsonp",
    onsuccess: function(res) {
//          res=JSON.parse(res);
        console.log(res);
        delete window.onsuccess;
    }
});
