var urlDict = [
	//Bad Case
	'www.baidu.com', //常规网址，未带协议头的地址
	'w.baidu.com', //常规网址，短子域名
	'baidu.com', //常规网址，仅有主域名
	'测试.com', //非常规合法网址，中文域名不在参考之列
	'1.2', //错误域名
	'  WWWW ', //无效字符串
	'111测试', //无效字符串
	//Correct Case
	'http://baidu.com', //常规网址，仅有主域名
	'http://www.baidu.com', //常规网址，带子域名
	'https://www.baidu.com/', //常规网址，使用https协议头，带根目录
	'http://www.baidu.com/api', //常规网址，有一级目录下资源
	'http://www.subdomain.baidu.com/index/subdir', //常规网址，多级子域名，多级目录
	'http://www.www.subdomain.baidu.com/index/subdir/', //常规网址，多级子域名，多级目录，目录地址闭合
	'http://io.io', //非常规网址，多级子域名，多级目录，目录地址闭合
	'http://q.qlogo.cn/qqapp/100229475/5102A7F86C80BDD88E19396C6D431506/100',
	':ds.cdncache.org/avatar-50/270/7085.jpg',
	'http://www.google.com.hk/',
	'http://www.google.com.hk/?gws_rd=ssl,cr#newwindow=1&safe=strict&q=%E5%A4%9A%E9%87%8Dif%E9%87%8D%E6%9E%84'
];

// 建议的正则
function isURL(str) {
	var urlReg = /^((((ht|f)tp(s)?:\/\/)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
	return !!str.match(urlReg);
}

// 不知道谁写的简单版的坑爹正则
function badRegFn(str) {
	return !!str.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/g);
}


// 测试用例覆盖
(function() {
	var ret = {};

	var collect = function(link) {
		var obj = {}, fnList = [isURL, badRegFn];
		for (var i = 0, j = fnList.length; i < j; i++) {
			var fn = fnList[i];
			obj[fn.name] = fn.call(null, link);
		}
		return obj;
	};

	for (var i = 0, j = urlDict.length; i < j; i++) {
		ret[urlDict[i]] = collect(urlDict[i]);
	}

	console.log(ret), console.table(ret);
}());