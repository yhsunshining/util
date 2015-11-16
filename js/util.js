define(function (require, exports) {
	'use strict'
	exports.ajax = function (url,options) {
		var data = options.data;
		var successfunc = options.onsuccess;
		var errorfunc = options.onerror;
		var type = options.type || "GET";
		var timeout = parseInt(options.timeout) || 600;
		var timeoutFlag = false;
		type = type.toUpperCase();
		if(type==='JSONP'){
			var num = this.count++;
			var name = "callback"+num;
			var script = document.createElement("script");
        	try{
        		window.onsuccess=successfunc;
        	}
        	finally{
//      		script.parentNode.removeChild(script);
        	}
        	script.setAttribute("src",url);
        	document.getElementsByTagName("body")[0].appendChild(script);
		}
		else {
			var xhr = new XMLHttpRequest();
			var timer = setTimeout(function(){
				timeoutFlag = true;
				xhr.abort();
			},timeout)
			xhr.open(type,url,true);
			
			if(type ==="GET"){
				xhr.send(null);
			}
			else {
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhr.send(JSON.stringify(data));
			}
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && !timeoutFlag) {
					clearTimeout(timer);
					if (xhr.status === 200) {
						if (successfunc) {
	//						if(xhr.getResponseHeader("Content-Type").match(/^text/)){
								successfunc(xhr.responseText);
	//						}
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
	exports.ajax.count=0;
	exports.clone = function(){
		
	}
});