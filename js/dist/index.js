/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var $ = __webpack_require__(2);
	window.util = $;
	console.log(window.util);

	var a = function a(board) {
	    var len = board.length;
	    for (var i = 0; i < len; i++) {
	        var arr = [].concat(_toConsumableArray(board[i])).filter(function (item) {
	            if (item != '.') {
	                return true;
	            }
	            return false;
	        });
	        if (arr.length != new Set(arr).size) {
	            return false;
	        }
	    }

	    for (var _i = 0; _i < len; _i++) {
	        var _arr = [];
	        for (var j = 0; j < len; j++) {
	            var tem = board[j][_i];
	            if (tem != '.') {
	                _arr.push(tem);
	            }
	        }
	        if (_arr.length != new Set(_arr).size) {
	            return false;
	        }
	    }

	    for (var _i2 = 0; _i2 < len; _i2 += 3) {
	        for (var _j = 0; _j < len; _j += 3) {
	            var _arr2 = [];
	            for (var m = 0; m < 3; m++) {
	                for (var n = 0; n < 3; n++) {
	                    var num = board[_i2 + m][_j + n];
	                    console.log(num);
	                    if (num != '.') {
	                        _arr2.push(num);
	                    }
	                }
	            }
	            if (_arr2.length != new Set(_arr2).size) {
	                return false;
	            }
	        }
	    }
	    return true;
	};
	console.log(a([".87654321", "2........", "3........", "4........", "5........", "6........", "7........", "8........", "9........"]));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var base64 = __webpack_require__(3);
	module.exports.ajax = function (url, options) {
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
	        var timer = setTimeout(function () {
	            timeoutFlag = true;
	            xhr.abort();
	        }, timeout);
	        xhr.open(type, url, true);

	        if (type === "GET") {
	            xhr.send(null);
	        } else {
	            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	            xhr.send(JSON.stringify(data));
	        }
	        xhr.onreadystatechange = function () {
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
	module.exports.shuffle = function (arr) {
	    return arr.sort(function (a, b) {
	        return 0.5 - Math.random();
	    });
	};

	module.exports.realShuffle = function (arr) {
	    for (var i = arr.length; i > 0; i--) {
	        var random = Math.floor(Math.random() * i);
	        var tem = arr[random];
	        arr[random] = arr[i - 1];
	        arr[i - 1] = tem;
	    }
	    return arr;
	};

	module.exports.unique = function (arr) {
	    return [].concat(_toConsumableArray(new Set(arr)));
	};

	module.exports.clone = function (obj) {
	    return JSON.parse(JSON.stringify(obj));
	};

	// uri encode and decode

	module.exports.unescapeRegExp = function (str) {
	    var tem = str;
	    var arr = ['(', ')', '[', ']', '{', '}', '.', '*', '+', '?', '!', '^', '=', ':', '$', '|'];
	    arr.forEach(function (item) {
	        tem = tem.replace(new RegExp('\\\\\\' + item, 'g'), item);
	    });
	    return tem;
	};

	module.exports.escapeRegExp = function (str) {
	    return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$&"); //$&表示被匹配的字符串
	};

	module.exports.charEncodeURI = function (char) {
	    return "%" + char.charCodeAt().toString(16);
	};

	module.exports.forceEncodeURIComponent = function (str) {
	    var _this = undefined;
	    var tem = encodeURIComponent(str);
	    var arr = ['(', ')', '.', '*', '!'];
	    arr.forEach(function (item) {
	        tem = tem.replace(new RegExp('\\' + item, 'g'), _this.charEncodeURI(item));
	    });
	    return tem;
	};

	module.exports.base64EncodeURI = function (str) {
	    return base64.encode(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
	};

	module.exports.base64DecodeURI = function (str) {
	    var offset = str.length % 4 == 0 ? 0 : 4 - str.length % 4;
	    var tem = (str + '===').slice(0, str.length + offset);
	    tem = tem.replace(/-/g, '+').replace(/_/g, '/');
	    return base64.decode(tem);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by royhyang on 2016/8/24.
	 */
	var Base64 = {

	    // private property
	    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	    // public method for encoding
	    encode: function encode(input) {
	        var output = "";
	        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	        var i = 0;

	        input = Base64._utf8_encode(input);

	        while (i < input.length) {

	            chr1 = input.charCodeAt(i++);
	            chr2 = input.charCodeAt(i++);
	            chr3 = input.charCodeAt(i++);

	            enc1 = chr1 >> 2;
	            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
	            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
	            enc4 = chr3 & 63;

	            if (isNaN(chr2)) {
	                enc3 = enc4 = 64;
	            } else if (isNaN(chr3)) {
	                enc4 = 64;
	            }
	            output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
	        }

	        return output;
	    },

	    // public method for decoding
	    decode: function decode(input) {
	        var output = "";
	        var chr1, chr2, chr3;
	        var enc1, enc2, enc3, enc4;
	        var i = 0;

	        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	        while (i < input.length) {

	            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
	            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
	            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
	            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

	            chr1 = enc1 << 2 | enc2 >> 4;
	            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
	            chr3 = (enc3 & 3) << 6 | enc4;

	            output = output + String.fromCharCode(chr1);

	            if (enc3 != 64) {
	                output = output + String.fromCharCode(chr2);
	            }
	            if (enc4 != 64) {
	                output = output + String.fromCharCode(chr3);
	            }
	        }

	        output = Base64._utf8_decode(output);

	        return output;
	    },

	    // private method for UTF-8 encoding
	    _utf8_encode: function _utf8_encode(string) {
	        string = string.replace(/\r\n/g, "\n");
	        var utftext = "";

	        for (var n = 0; n < string.length; n++) {

	            var c = string.charCodeAt(n);

	            if (c < 128) {
	                utftext += String.fromCharCode(c);
	            } else if (c > 127 && c < 2048) {
	                utftext += String.fromCharCode(c >> 6 | 192);
	                utftext += String.fromCharCode(c & 63 | 128);
	            } else {
	                utftext += String.fromCharCode(c >> 12 | 224);
	                utftext += String.fromCharCode(c >> 6 & 63 | 128);
	                utftext += String.fromCharCode(c & 63 | 128);
	            }
	        }

	        return utftext;
	    },

	    // private method for UTF-8 decoding
	    _utf8_decode: function _utf8_decode(utftext) {
	        var string = "";
	        var i = 0;
	        var c = 0,
	            c1 = 0,
	            c2 = 0;

	        while (i < utftext.length) {

	            c = utftext.charCodeAt(i);

	            if (c < 128) {
	                string += String.fromCharCode(c);
	                i++;
	            } else if (c > 191 && c < 224) {
	                c2 = utftext.charCodeAt(i + 1);
	                string += String.fromCharCode((c & 31) << 6 | c2 & 63);
	                i += 2;
	            } else {
	                c2 = utftext.charCodeAt(i + 1);
	                var c3 = utftext.charCodeAt(i + 2);
	                string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
	                i += 3;
	            }
	        }

	        return string;
	    }

	};
	module.exports.encode = Base64.encode;
	module.exports.decode = Base64.decode;

/***/ }
/******/ ]);