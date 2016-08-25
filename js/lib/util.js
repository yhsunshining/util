'use strict'

var base64 = require('./base64')
module.exports.ajax = (url, options) => {
    var data = options.data;
    var successfunc = options.onsuccess;
    var errorfunc = options.onerror;
    var type = options.type || "GET";
    var timeout = parseInt(options.timeout) || 600;
    var timeoutFlag = false;
    type = type.toUpperCase();
    if (type === 'JSONP') {
        var script = document.createElement("script");
        try {
            window.onsuccess = successfunc;
        } finally {
            // script.parentNode.removeChild(script);
        }
        script.setAttribute("src", url);
        document.getElementsByTagName("body")[0].appendChild(script);
    } else {
        var xhr = new XMLHttpRequest();
        var timer = setTimeout(function() {
            timeoutFlag = true;
            xhr.abort();
        }, timeout)
        xhr.open(type, url, true);

        if (type === "GET") {
            xhr.send(null);
        } else {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(JSON.stringify(data));
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && !timeoutFlag) {
                clearTimeout(timer);
                if (xhr.status === 200) {
                    if (successfunc) {
                        //if(xhr.getResponseHeader("Content-Type").match(/^text/)){
                        successfunc(xhr.responseText);
                        //}
                    }
                } else {
                    if (errorfunc) {
                        errorfunc();
                    }
                }
            }
        };
    }

};

// Array
module.exports.shuffle = (arr) => {
    return arr.sort(function(a, b) {
        return 0.5 - Math.random();
    })
}

module.exports.realShuffle = (arr) => {
    for (var i = arr.length; i > 0; i--) {
        var random = Math.floor(Math.random()*i);
        var tem = arr[random];
        arr[random] = arr[i-1];
        arr[i-1] = tem;
    }
    return arr;
}

module.exports.unique = (arr) => {
    return [...new Set(arr)];
}

module.exports.clone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}


// uri encode and decode

module.exports.unescapeRegExp = (str) => {
    var tem = str;
    var arr = ['(', ')', '[', ']', '{', '}', '.', '*', '+', '?', '!', '^', '=', ':', '$', '|'];
    arr.forEach(function(item) {
        tem = tem.replace(new RegExp('\\\\\\' + item, 'g'), item);
    });
    return tem;
};

module.exports.escapeRegExp = (str) => {
    return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$&"); //$&表示被匹配的字符串
};

module.exports.charEncodeURI = (char) => {
    return "%" + (char.charCodeAt().toString(16))
};

module.exports.forceEncodeURIComponent = (str) => {
    var _this = this;
    var tem = encodeURIComponent(str);
    var arr = ['(', ')', '.', '*', '!'];
    arr.forEach(function(item) {
        tem = tem.replace(new RegExp('\\' + item, 'g'), _this.charEncodeURI(item));
    });
    return tem;
};

module.exports.base64EncodeURI = (str) => {
    return base64.encode(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
};

module.exports.base64DecodeURI = (str) => {
    var offset = str.length % 4 == 0 ? 0 : (4 - str.length % 4);
    var tem = (str + '===').slice(0, str.length + offset);
    tem = tem.replace(/-/g, '+').replace(/_/g, '/');
    return base64.decode(tem)
};

