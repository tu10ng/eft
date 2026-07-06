// 获取元素id
function $id(str){
	return document.getElementById(str);
}

// 获取元素name
function $name(str){
	return document.getElementsByName(str);
}

// 把Option的text值覆盖toID文本框
// 应用例子 onchange="OptionTextTo('labItemID','labItemName');"
function OptionTextTo(sourceID,toID){
	document.getElementById(toID).value=document.getElementById(sourceID).options[document.getElementById(sourceID).selectedIndex].text;
}

// 获取下拉框的文本
function SelectGetText(selectName){
	return document.getElementById(selectName).options[document.getElementById(selectName).options.selectedIndex].text;
}

// 下拉框是否存在value值
function SelectValInArr(selectName,selVal){
	var jud = false;

	for (soi=0; soi<document.getElementById(selectName).options.length; soi++){
		if (selVal == document.getElementById(selectName).options[soi].value){ jud = true; return jud; }
	}
	return jud;
}

// 下拉框是否存在text值
function SelectTextInArr(selectName,selVal){
	var jud = false;

	for (soi=0; soi<document.getElementById(selectName).options.length; soi++){
		if (selVal == document.getElementById(selectName).options[soi].text){ jud = true; return jud; }
	}
	return jud;
}


// 判断是否含特殊符号
function Str_IsSign(str){
	var txt=new RegExp("[ ,\\`,\\~,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\{,\\},\\(,\\),\\',\\;,\\=,\"]");
	if (txt.test(str)){
		return true;
	}else{
		return false;
	}
}

// 计算字符串的字节数
function Str_Byte(str){
	var newStr = 0;
	// newStr=str.replace(/[^\u7F51\u949B\u5DE5\u4F5C\u5BA4]/g, '***');
	newStr=str.replace(/[^\u0000-\u00ff]/g, '***');
	return newStr.length;
}

function GetCookieStr(offset){
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

// 获取cookie信息
function GetCookie(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen){
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
		return GetCookieStr (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

function GetCookie2(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

// 设置cookie信息
function SetCookie(name, value){
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var path = "/";
	var domain = "";
	var secure = (argc > 6) ? argv[6] : false;
	document.cookie = name +"=;expires="+(new Date(0)).toGMTString();
	document.cookie = name +"="+ encodeURIComponent(value)+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))+((secure == true) ? "; secure" : "");
}

function ToInt(str){
	var newInt = parseInt(str);
	if(isNaN(newInt)) { newInt = 0; }
	return newInt;
}

function ToFloat(str){
	var newFloat = parseFloat(str);
	if(isNaN(newFloat)) { newFloat = 0; }
	return newFloat;
}

function ToGetStr(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return unescape(r[2]); return '';
}

function ToGetPara(str,name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = (str +'').match(reg);
	if(r!=null)return unescape(r[2]); return '';
}

function ToPinYinId(fromId,toId,mode,space){
	if ($id(fromId).value == ''){
		alert('中文内容不能为空.');$id(fromId).focus();return false;
	}
	//var a=window.open('read.php?mudi=pinyin&str='+ $id(fromId).value +'&mode='+ mode +'&space='+ space);
	return AjaxGetDealToInput('read.php?mudi=pinyin&str='+ $id(fromId).value +'&mode='+ mode +'&space='+ space, toId, 'base64');
}

// 检测邮箱的合法性。
function IsMail(str){
	if (str.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)!=-1){
		return true;
	}else{
		return false;
	}
}

// 检测手机号的合法性。
function IsPhone(str){
	if (str.search(/^\d{11}$/)!=-1){
		return true;
	}else{
		return false;
	}
}

// 检测文件框是否为图片文件
function IsImgFile(fileValue){
	var re = new RegExp("\.(gif|jpg|jpeg|png|bmp)","ig");
	return re.test(fileValue)
}

// 检测是否为http、https协议网址
function IsHttpUrl(urlStr){
	if (urlStr.substr(0,7).toLowerCase()=="http://" || urlStr.substr(0,8).toLowerCase()=="https://"){
		return true;
	}else{
		return false;
	}
}

function IsAbsUrl(urlStr){
	if (urlStr.substr(0,7).toLowerCase()=="http://" || urlStr.substr(0,8).toLowerCase()=="https://" || urlStr.substr(0,1)=="/"){
		return true;
	}else{
		return false;
	}
}

function FiltHtmlTag(str) {
	str = str.replace(/<\/?[^>]*>/g,'');			// 去除HTML tag
	str = str.replace(/(\t|\r|\n| |\&nbsp;|\&ensp;)/g,'');	// 去除空格、换行、制表符
	return str;
}


// 过滤字符串
// 应用例子 onkeyup="if (this.value!=FiltChar(this.value)){this.value=FiltChar(this.value)}"
// 应用例子 onkeyup="this.value=FiltChar(this.value)"
function FiltChar(str){
	return str.replace(/[^\w\u4E00-\u9FA5]/g, '');
}

// 过滤小数
// 应用例子 onkeyup="if (this.value!=FiltDecimal(this.value)){this.value=FiltDecimal(this.value)}"
// 应用例子 onkeyup="this.value=FiltDecimal(this.value)"
function FiltDecimal(str){
	return str.replace(/[^\d*\.?\d{0,2}$]/g,'')
}

// 过滤小数保留2位小数
// 应用例子 onkeyup="if (this.value!=FiltDecimal2(this.value)){this.value=FiltDecimal2(this.value)}"
// 应用例子 onkeyup="this.value=FiltDecimal2(this.value)"
function FiltDecimal2(str){
	return str.replace(/(^\d*\.?\d{0,2}).*/g,'$1')
}

// 过滤整数
// 应用例子 onkeyup="if (this.value!=FiltInt(this.value)){this.value=FiltInt(this.value)}"
// 应用例子 onkeyup="this.value=FiltInt(this.value)"
function FiltInt(str){
	return str.replace(/\D/g,'')
}

// 过滤非数字、字母
// 应用例子 onkeyup="if (this.value!=FiltABCNum(this.value)){this.value=FiltABCNum(this.value)}"
// 应用例子 onkeyup="this.value=FiltABCNum(this.value)"
function FiltABCNum(str){
	return str.replace(/[^A-Za-z0-9]/ig,'')
}

// 过滤非数字、字母、下划线
// 应用例子 onkeyup="if (this.value!=FiltAbcNum_(this.value)){this.value=FiltAbcNum_(this.value)}"
// 应用例子 onkeyup="this.value=FiltAbcNum_(this.value)"
function FiltAbcNum_(str){
	return str.replace(/[^A-Za-z0-9_]/ig,'')
}

// 生成随机数
// num：生成个数
function RndNum(num) {
	var a = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "Z", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	var b = "", c;
	for(i=1; i<=num; i++){
		c = Math.floor(Math.random() * a.length);
		b = b + a[c];
		// a = a.del(c);
	}
	return b;
}

// 生成随机数
// num：生成个数；type：num数字，abc小写字母，ABC大写字母
function RndNum2(num,type) {
	var a;
	if (type == 'num'){
		a = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
	}else if (type == 'abc'){
		a = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
	}else if (type == 'ABC'){
		a = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "Z", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	}else{
		a = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "Z", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	}
	var b = "", c;
	for(i=1; i<=num; i++){
		c = Math.floor(Math.random() * a.length);
		b = b + a[c];
	}
	return b;
}

// idc随机密码
function IdcRndPwd(type){
	return RndNum2(4,'ABC') + RndNum2(4,'num');
}

// 加载JS文件
function LoadJsFile(fileId,filePath,mode){
	var scriptTag = document.getElementById(fileId);
	var headObj = document.getElementsByTagName('head').item(0);
	if(scriptTag){
		if (mode==1){
			headObj.removeChild(scriptTag);
			jsFile = document.createElement('script');
			jsFile.src = filePath;
			jsFile.type = 'text/javascript';
			// jsFile.defer = 'defer';
			jsFile.id = fileId;
			if (fileId == 'ueditorJs1' || fileId == 'ueditorJs2' || fileId == 'ueditorJs3'){
				jsFile.charset = 'gbk';
			}
			headObj.appendChild(jsFile);
		}
	}else{
		jsFile = document.createElement('script');
		jsFile.src = filePath;
		jsFile.type = 'text/javascript';
		// jsFile.defer = 'defer';
		jsFile.id = fileId;
		if (fileId == 'ueditorJs1' || fileId == 'ueditorJs2' || fileId == 'ueditorJs3'){
			jsFile.charset = 'gbk';
		}
		headObj.appendChild(jsFile);
	}
}

// 加载CSS文件
function LoadCssFile(fileId,filePath,mode){
	var cssTag = document.getElementById(fileId);
	var headObj = document.getElementsByTagName('head').item(0);
	if(cssTag){
		if (mode==1){
			headObj.removeChild(cssTag);
			cssFile = document.createElement('link');
			cssFile.href = filePath;
			cssFile.rel = 'stylesheet';
			cssFile.type = 'text/css';
			cssFile.id = fileId;
			headObj.appendChild(cssFile);
		}
	}else{
		cssFile = document.createElement('link');
		cssFile.href = filePath;
		cssFile.rel = 'stylesheet';
		cssFile.type = 'text/css';
		cssFile.id = fileId;
		headObj.appendChild(cssFile);
	}
}

// 点击开启隐藏区，再点击隐藏
function ClickShowHidden(idStr){
	if ($id(idStr).style.display == ''){
		$id(idStr).style.display = 'none';
	}else{
		$id(idStr).style.display = '';
	}
	try {
		WindowHeight(0);
	}catch (e) {}
}


// 数组变量获取下拉框全部选项
function SelectOptionArr(selectName){
	var SelectOptionArray = new Array();

	for (soi=0; soi<document.getElementById(selectName).options.length; soi++){
		SelectOptionArray['OT'+ document.getElementById(selectName).options[soi].value] = document.getElementById(selectName).options[soi].text;
	}
	return SelectOptionArray;
}

// 下拉框内容检索
function SelectOptionSearch(sourceID,selectName,arrObj){
	document.getElementById(selectName).options.length=0;
	for (var key in arrObj){
		newKey = key.substr(0,2);
		if (newKey == "OT"){ newKey = key.substr(2); }else{ newKey = key; }
		if (arrObj[key].lastIndexOf(document.getElementById(sourceID).value)>=0){
			document.getElementById(selectName).options.add(new Option(arrObj[key],newKey));
		}
	}
}

// 清理下拉框内容
function SelectOptionClear(selectName,defText){
	document.getElementById(selectName).options.length=0; 
	document.getElementById(selectName).options.add(new Option(defText,""));
	document.getElementById(selectName).value = "";
}

// 光标待的地方添加字符串
function FocusAddText(inputId,str){
	var ubb=document.getElementById(inputId);
	var ubbLength=ubb.value.length;
	ubb.focus();
	if(typeof document.selection !="undefined"){
		document.selection.createRange().text=str;
	}else{
		ubb.value=ubb.value.substr(0,ubb.selectionStart)+str+ubb.value.substring(ubb.selectionStart,ubbLength);
	}
}

// 复制内容(获取ID所在的value)
function ValueToCopy(id){
	copy = $id(id).value
	if (window.clipboardData){
		window.clipboardData.setData("Text", copy);
	}else if(navigator.userAgent.indexOf("Opera") != -1){
		window.location = copy;
	}else if(window.netscape){
		try {
			netscape.security.PrivilegeManager
					.enablePrivilege("UniversalXPConnect");
		}catch (e){
			alert("你使用的FireFox浏览器,复制功能被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车。\n然后将“signed.applets.codebase_principal_support”双击，设置为“true”");
			return;
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1']
				.createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
			return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1']
				.createInstance(Components.interfaces.nsITransferable);
		if (!trans)
			return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"]
				.createInstance(Components.interfaces.nsISupportsString);
		str.data = copy;
		trans.setTransferData("text/unicode", str, copy.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
			return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
	}else{
		alert("你的浏览器不支持一键复制功能");
		return;
	}
	alert("复制成功")
	return false;
}

// webPathPart变形
function WppSign(str){
	return str.replace(/\.\.\//g,"a");
}

if (typeof(webPathPart) == "undefined"){
	try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
	webPathPart = "";
}
if (typeof(SYS_verCodeMode)=="undefined"){
	try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
	SYS_verCodeMode = 1;
}


// 通用Ajax提交表单
function CheckAjaxForm(formName){
	AjaxPostDeal(formName);
	return false;
}

// Ajax导航链接
function AjaxNavHref(){
	var outputID = arguments[0] ? arguments[0] : "";
	var urlStr = arguments[1] ? arguments[1] : "";
	var pageNum = arguments[2] ? arguments[2] : "";

	if (outputID==""){ outputID="dialogBody"; }
	if (urlStr==""){ urlStr=document.location.href; }
	if (! isNaN(parseInt(pageNum))){ pageNum="&page="+ pageNum; }else{ pageNum=""; }

	document.getElementById(outputID).innerHTML="<br /><br /><center style='font-size:14px;'><img src='"+ webPathPart +"inc_img/onload.gif' style='margin-right:5px;' />数据加载中...</center><br /><br />";
	$.ajaxSetup({cache:false});
	$.get(webPathPart + urlStr + pageNum, function(result){
		document.getElementById(outputID).innerHTML=result;
		try {
			backNavBtn = document.getElementById("backAjaxNavHeader").href;
			if (backNavBtn.indexOf ("#")!=-1){
				webCurrUrl = document.location.href;
				if (webCurrUrl.indexOf ("#")>-1){
					webCurrUrl=webCurrUrl.substring(0,webCurrUrl.lastIndexOf("#"));
				}
				webCurrUrl=webCurrUrl +"#"+ backNavBtn.substring(backNavBtn.lastIndexOf("#")+1,backNavBtn.length);
				document.getElementById("backAjaxNavHeader").href = webCurrUrl;
				setTimeout("document.getElementById('backAjaxNavHeader').click();",300);
			}
		}catch (e) {}
	});
}

// 分页链接
function ListPageHref(pageNum,mode1Url){
	if (pageNum<2){
		pageUrl = mode1Url.replace("_[page]","").replace("[page]",pageNum);
		if (pageUrl.substr(pageUrl.length-10)=="index.html"){ pageUrl = pageUrl.substr(0,pageUrl.length-10); }
		document.location.href=pageUrl;
	}else{
		document.location.href=mode1Url.replace("[page]",pageNum);
	}
}

// 分页链接2
function ListPageHref2(pageNum,maxPage,mode1Url,mode1Url2){
	if (pageNum < 2){
		pageUrl = mode1Url.replace("_[page]","").replace("[page]",pageNum);
		if (pageUrl.substr(pageUrl.length-10)=="index.html"){ pageUrl = pageUrl.substr(0,pageUrl.length-10); }
		document.location.href=pageUrl;
	}else{
		if (maxPage > 0 && pageNum > maxPage){
			mode1Url = mode1Url2;
		}
		document.location.href=mode1Url.replace("[page]",pageNum);
	}
}


ajaxDealStr = "数据处理中...";
ajaxLoadStr = "数据读取中...";

// POST表单AJAX处理
function AjaxPostDeal(formName){
	try {
		document.getElementById("loadingStr").innerHTML = "<span style='font-size:14px;'><img src='"+ webPathPart +"inc_img/onload.gif' style='margin-right:5px;' />"+ ajaxDealStr +"</span>";
	}catch (e) {}

	formNameObj = document.getElementById(formName);
	var formNameUrl = formNameObj.getAttribute("action"), formNameContent = formValueToStr(formNameObj);
	$.post(formNameUrl,formNameContent,function(result){
		try {
			document.getElementById("loadingStr").innerHTML = "";
		}catch (e) {}
		eval(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"").replace(/(<meta[^>]*>|<\/meta>)/gi,""));
		try {
			document.getElementById("loadingStr").innerHTML = "";
		}catch (e) {}
	});
	return false;
}

// 通过表单name获取该表单所有元素并组成GET字符串
function formValueToStr(formObj) {
	var qstr = "", and = "", elem, value;
	for(var i = 0; i< formObj.length; ++i) {
		elem = formObj[i];
		if (elem.name!='') {
			value=undefined;
			switch(elem.type) {
				case "select-one":
					if(elem.selectedIndex > -1) {
						value = elem.options[elem.selectedIndex].value;
					}
					else {
						value = "";
					}
					break;
				case"select-multiple":
					var selMul=elem.options;
					for(var w=0;w<selMul.length;++w){
						if(selMul[w].selected){
							qstr += and+elem.name +"="+ encodeURIComponent(selMul[w].value);
							and = "&";
						}
					}
					break;
				case "checkbox":
				case "radio":
					if (elem.checked == true) {
						value = elem.value;
					}
					break;
				default:
					value = elem.value;
			}
			if(value!=undefined){
				value = encodeURIComponent(value);
				qstr += and + elem.name + "=" + value;
				and = "&";
			}
		}
	}
	return qstr;
}

// GET提交AJAX处理
function AjaxGetDeal(urlStr){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		eval(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"").replace(/(<meta[^>]*>|<\/meta>)/gi,""));
	});
	return false;
}

// GET提交AJAX处理
function AjaxGetDealToAlert(urlStr){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		alert(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,""));
	});
	return false;
}

// GET提交AJAX处理返回值到input标签里
function AjaxGetDealToInput(urlStr, outputID, dealMode){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		if (dealMode == 'base64'){ result = base64decode(result); }
		document.getElementById(outputID).value = result;
		try{
			WindowHeight(0);
		}catch (e){}
	});
	return false;
}

// GET提交AJAX处理返回值到id标签下
function AjaxGetDealToId(urlStr,outputID,addiEvent){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		document.getElementById(outputID).innerHTML = result;
		AjaxAddiEvent(result,addiEvent)
	});

	return false;
}

// GET提交AJAX处理
function AjaxGetDealToIdNo(urlStr,outputID,badWords){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		if (result.lastIndexOf(badWords)!=-1){
			eval(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"").replace(/(<meta[^>]*>|<\/meta>)/gi,""));
		}else{
			document.getElementById(outputID).innerHTML = result;
		}
	});
	return false;
}

// GET提交AJAX处理（允许执行JS）
function AjaxGetDealToIdJs2(urlStr,outputID,addiEvent){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		document.getElementById(outputID).innerHTML = result;
		var jsFileStr="";
		var jsFileArr=result.match(/src\s*=\s*[\""|\']?\s*[^>\""\'\s]*\.js/gi);
		if(jsFileArr!=null){
			for(var i=0;i<jsFileArr.length;i++){
				// jsFileStr += jsFileArr[i].replace(/src\s*=\s*[\""|\']?(\s*[^>\""\'\s]*\.js)/gi,"$1");
				LoadJsFile("contJsFile"+ i,jsFileArr[i].replace(/src\s*=\s*[\""|\']?(\s*[^>\""\'\s]*\.js)/gi,"$1"),0);
			}
		}
		var jsStr="";
		var jsArr=result.match(/<\s*(script[^>]*)>([\s\S][^<]*)<\/\s*script>/gi);
		if(jsArr!=null){
			for(var i=0;i<jsArr.length;i++){
				jsStr += jsArr[i];
			}
		}
		jsStr = jsStr.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"");
		window.setTimeout(jsStr,1000);

		AjaxAddiEvent(result,addiEvent)
	});

	return false;
}

// GET提交AJAX处理（允许执行JS）
function AjaxGetDealToIdJs(urlStr,outputID,addiEvent){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		set_innerHTML(outputID,result);
		AjaxAddiEvent(result,addiEvent)
	});

	return false;
}


// Ajax附加事件
function AjaxAddiEvent(str,addiEvent){
	if (typeof(addiEvent)=="undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		addiEvent = '';
	}
	if (addiEvent.indexOf('video') != -1){
		try {
			LoadVideoFile(str);
		}catch (e) {}
	}else if (addiEvent.indexOf('geetest') != -1){
		try {
			if (SYS_verCodeMode == 20){
				LoadJsFile('geetestJs',webPathPart +'tools/geetest/gt.js?v=1.0',1);
			}
		}catch (e) {}
	}else if (addiEvent.indexOf('vote') != -1){
		try {
			VoteStyle();
		}catch (e) {}
	}
}


/* innerhtml.js
 * Copyright Ma Bingyao <andot@ujn.edu.cn>
 * Version: 1.9
 * LastModified: 2006-06-04
 * This library is free.  You can redistribute it and/or modify it.
 */

var global_html_pool = [];
var global_script_pool = [];
var global_script_src_pool = [];
var global_lock_pool = [];
var innerhtml_lock = null;
var document_buffer = "";

// js输出允许执行js脚本，obj_id：innerHTML的ID；html：输出字符串；time：延时多少秒执行，可以忽略
function set_innerHTML(obj_id, html, time){
	if (innerhtml_lock == null) {
		innerhtml_lock = obj_id;
	}
	else if (typeof(time) == "undefined") {
		global_lock_pool[obj_id + "_html"] = html;
		window.setTimeout("set_innerHTML('" + obj_id + "', global_lock_pool['" + obj_id + "_html']);", 10);
		return;
	}
	else if (innerhtml_lock != obj_id) {
		global_lock_pool[obj_id + "_html"] = html;
		window.setTimeout("set_innerHTML('" + obj_id + "', global_lock_pool['" + obj_id + "_html'], " + time + ");", 10);
		return;
	}

	function get_script_id() {
		return "script_" + (new Date()).getTime().toString(36) + Math.floor(Math.random() * 100000000).toString(36);
	}

	document_buffer = "";

	document.write = function (str) {
		document_buffer += str;
	}
	document.writeln = function (str) {
		document_buffer += str + "\n";
	}

	global_html_pool = [];

	var scripts = [];
	html = html.split(/<\/script>/i);
	for (var i = 0; i < html.length; i++) {
		global_html_pool[i] = html[i].replace(/<script[\s\S]*$/ig, "");
		scripts[i] = {text: '', src: '' };
		scripts[i].text = html[i].substr(global_html_pool[i].length);
		scripts[i].src = scripts[i].text.substr(0, scripts[i].text.indexOf('>') + 1);
		scripts[i].src = scripts[i].src.match(/src\s*=\s*(\"([^\"]*)\"|\'([^\']*)\'|([^\s]*)[\s>])/i);
		if (scripts[i].src) {
			if (scripts[i].src[2]) {
				scripts[i].src = scripts[i].src[2];
			}
			else if (scripts[i].src[3]) {
				scripts[i].src = scripts[i].src[3];
			}
			else if (scripts[i].src[4]) {
				scripts[i].src = scripts[i].src[4];
			}
			else {
				scripts[i].src = "";
			}
			scripts[i].text = "";
		}
		else {
			scripts[i].src = "";
			scripts[i].text = scripts[i].text.substr(scripts[i].text.indexOf('>') + 1);
			scripts[i].text = scripts[i].text.replace(/^\s*<\!--\s*/g, "");
		}
	}

	var s;
	if (typeof(time) == "undefined") {
		s = 0;
	}
	else {
		s = time;
	}

	var script, add_script, remove_script;

	for (var i = 0; i < scripts.length; i++) {
		var add_html = "document_buffer += global_html_pool[" + i + "];\n";
		add_html += "document.getElementById('" + obj_id + "').innerHTML = document_buffer;\n";
		script = document.createElement("script");
		if (scripts[i].src) {
			script.src = scripts[i].src;
			if (typeof(global_script_src_pool[script.src]) == "undefined") {
				global_script_src_pool[script.src] = true;
				s += 2000;
			}
			else {
				s += 10;
			}
		}
		else {
			script.text = scripts[i].text;
			s += 10;
		}
		script.defer = true;
		script.type =  "text/javascript";
		script.id = get_script_id();
		global_script_pool[script.id] = script;
		add_script = add_html;
		add_script += "document.getElementsByTagName('head').item(0)";
		add_script += ".appendChild(global_script_pool['" + script.id + "']);\n";
		window.setTimeout(add_script, s);
		remove_script = "document.getElementsByTagName('head').item(0)";
		remove_script += ".removeChild(document.getElementById('" + script.id + "'));\n";
		remove_script += "delete global_script_pool['" + script.id + "'];\n";
		window.setTimeout(remove_script, s + 10000);
	}

	var end_script = "if (document_buffer.match(/<\\/script>/i)) {\n";
	end_script += "set_innerHTML('" + obj_id + "', document_buffer, " + s + ");\n";
	end_script += "}\n";
	end_script += "else {\n";
	end_script += "document.getElementById('" + obj_id + "').innerHTML = document_buffer;\n";
	end_script += "innerhtml_lock = null;\n";
	end_script += "}";
	window.setTimeout(end_script, s);
}

/* JS版base64编解码算法。示例:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */
var base64EncodeChars = [
	"A", "B", "C", "D", "E", "F", "G", "H",
	"I", "J", "K", "L", "M", "N", "O", "P",
	"Q", "R", "S", "T", "U", "V", "W", "X",
	"Y", "Z", "a", "b", "c", "d", "e", "f",
	"g", "h", "i", "j", "k", "l", "m", "n",
	"o", "p", "q", "r", "s", "t", "u", "v",
	"w", "x", "y", "z", "0", "1", "2", "3",
	"4", "5", "6", "7", "8", "9", "+", "/"
];

var base64DecodeChars = [
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
	-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
	-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
];

function base64encode(str) {
	var out, i, j, len;
	var c1, c2, c3;

	len = str.length;
	i = j = 0;
	out = [];
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len)
		{
			out[j++] = base64EncodeChars[c1 >> 2];
			out[j++] = base64EncodeChars[(c1 & 0x3) << 4];
			out[j++] = "==";
			break;
		}
		c2 = str.charCodeAt(i++) & 0xff;
		if (i == len)
		{
			out[j++] = base64EncodeChars[c1 >> 2];
			out[j++] = base64EncodeChars[((c1 & 0x03) << 4) | ((c2 & 0xf0) >> 4)];
			out[j++] = base64EncodeChars[(c2 & 0x0f) << 2];
			out[j++] = "=";
			break;
		}
		c3 = str.charCodeAt(i++) & 0xff;
		out[j++] = base64EncodeChars[c1 >> 2];
		out[j++] = base64EncodeChars[((c1 & 0x03) << 4) | ((c2 & 0xf0) >> 4)];
		out[j++] = base64EncodeChars[((c2 & 0x0f) << 2) | ((c3 & 0xc0) >> 6)];
		out[j++] = base64EncodeChars[c3 & 0x3f];
	}
	return out.join('');
}

function base64decode(str) {
	var c1, c2, c3, c4;
	var i, j, len, out;

	len = str.length;
	i = j = 0;
	out = [];
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1) break;

		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1) break;

		out[j++] = String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61) return out.join('');
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1) break;

		out[j++] = String.fromCharCode(((c2 & 0x0f) << 4) | ((c3 & 0x3c) >> 2));

		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61) return out.join('');
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1) break;
		out[j++] = String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out.join('');
}

function StrToB2(str) {
	return base64encode(base64encode(str));
}

function B2ToStr(str) {
	return base64decode(base64decode(str));
}

// 让IE核心浏览器也支持placeholder属性；jQuery placeholder, fix for IE6,7,8,9
var JPlaceHolder = {
	// 检测
	_check : function(){
		return 'placeholder' in document.createElement('input');
	},
	// 初始化
	init : function(){
		if(!this._check()){
			this.fix();
		}
	},
	// 修复
	fix : function(){
		jQuery(':input[placeholder]').each(function(index, element) {
			var self = $(this), txt = self.attr('placeholder');
			self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
			var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
			var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left+15, top:pos.top+12, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
			self.focusin(function(e) {
				holder.hide();
			}).focusout(function(e) {
				if(!self.val()){
					holder.show();
				}
			});
			holder.click(function(e) {
				holder.hide();
				self.focus();
			});
		});
	}
};
// 执行
jQuery(function(){
	JPlaceHolder.init();	
});



// 检测邮箱的合法性
function CheckMail(){
	try{
		if ($id("mail").value == ''){
			$id("mailIsOk").innerHTML = "";
			$id("mailStr").style.display = "none";
		}else if (IsMail($id("mail").value)){
			$id("mailIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
			$id("mailStr").style.display = "none";
		}else{
			$id("mailIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
			$id("mailStr").style.display = "";
			$id("mailStr").innerHTML = "邮箱格式错误！";
		}
	}catch (e){}
}

// 发送邮件按钮倒计时
var mailSec = 0;
var mailCalcFunc;
function MailBtnCalc(btnId,sec){
	$id(btnId).disabled = true;
	mailSec = sec;
	$id(btnId).value = ""+ mailSec +"秒后可重试";
	mailCalcFunc = window.setInterval("CutMailCalc('"+ btnId +"')",1000);
}

function CutMailCalc(btnId){
	if (mailSec<=0){
		window.clearInterval(mailCalcFunc);
		$id(btnId).disabled = false;
		$id(btnId).value = "发送邮件验证码";
		return false;
	}else{
		mailSec --;
		$id(btnId).value = ""+ mailSec +"秒后可重试";
	}
}

// 发送邮件验证码
function SendMailCode(btnId,mailId,type,userId){
	var mailStr = $id(mailId).value;
	if (mailStr==""){
		alert("请先输入邮箱！");
		try{ $id(mailId).focus(); }catch (e){}
		return false;
	}
	if (! IsMail(mailStr)){
		alert("邮箱格式错误！");
		try{ $id(mailId).focus(); }catch (e){}
		return false;
	}

	var userStr = '';
	if (userId.length > 0 && $id(userId)){
		userStr = $id(userId).value;
	}

	$id(btnId).value = "处理中...";
	AjaxGetDeal(webPathPart +'users_deal.php?mudi=mailSend&type='+ type +'&btnId='+ btnId +'&mail='+ mailStr +'&username='+ userStr);
}


// 检测手机号的合法性
function CheckPhone(){
	if ($id("phone").value == ''){
		$id("phoneIsOk").innerHTML = "";
		$id("phoneStr").style.display = "none";
	}else if (IsPhone($id("phone").value)){
		$id("phoneIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		$id("phoneStr").style.display = "none";
	}else{
		$id("phoneIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		$id("phoneStr").style.display = "";
		$id("phoneStr").innerHTML = "手机号格式错误！";
	}
}

// 发送短信按钮倒计时
var phoneSec = 0;
var phoneCalcFunc;
function PhoneBtnCalc(btnId,sec){
	$id(btnId).disabled = true;
	phoneSec = sec;
	$id(btnId).value = ""+ phoneSec +"秒后可重试";
	phoneCalcFunc = window.setInterval("CutPhoneCalc('"+ btnId +"')",1000);
}

function CutPhoneCalc(btnId){
	if (phoneSec<=0){
		window.clearInterval(phoneCalcFunc);
		$id(btnId).disabled = false;
		$id(btnId).value = "发送短信验证码";
		return false;
	}else{
		phoneSec --;
		$id(btnId).value = ""+ phoneSec +"秒后可重试";
	}
}

// 开启发送短信验证码表单
function SendPhoneCode(btnId,phoneId,type,userId){
	var phoneStr = $id(phoneId).value;
	if (phoneStr==""){
		alert("请先输入手机");
		try{ $id(phoneId).focus(); }catch (e){}
		return false;
	}
	if (! IsPhone(phoneStr)){
		alert("手机号格式错误，长度11位！");
		try{ $id(phoneId).focus(); }catch (e){}
		return false;
	}

	var userStr = '';
	if (userId.length > 0 && $id(userId)){
		userStr = $id(userId).value;
	}

	$id(btnId).value = "处理中...";
	$.ajaxSetup({cache:false});
	$.get(webPathPart +'p.php?m=sendPhoneForm&type='+ type +'&btnId='+ btnId +'&phone='+ phoneStr +'&username='+ userStr, function(result){
		ShowMengceng(result, 0);
	});
}

// 发送短信验证码表单检测
function SendPhoneForm(){
	try {
		if (SYS_verCodeMode == 20){
			if ($("#geePopDiv input[name='geetest_challenge']").val() == "") {
				alert('请点击验证码按钮进行验证');return false;
			}
		}else{
			if ($id("verCodePop").value==""){alert("验证码不能为空.");$id("verCodePop").focus();return false;}
		}
	}catch (e){}

	AjaxPostDeal('phoneForm');
	return false;
}


// 签到
function QiandaoDeal(){
	AjaxGetDeal(webPathPart +'plugin_deal.php?m=qiandao&mode=ajax');
}

// 加入收藏
function AddShoucang(type, id){
	AjaxGetDeal(webPathPart +"plugin_deal.php?m=userMark&mode=ajax&type="+ type +"&dataID="+ id +'&webPathPart='+ WppSign(webPathPart));
}

// 加入举报
function AddReport(type, id, note){
	var alertStr = "", typeCN = "";
	if (note.length > 1){ alertStr = "【"+ note +"】"; }
	switch (type){
		case "info":	typeCN = "文章";	break;
		case "reply":	typeCN = "评论";	break;
		case "message":	typeCN = "留言";	break;
	}
	if(confirm("您确定要举报该"+ typeCN + alertStr +"？")){
		AjaxGetDeal(webPathPart +"plugin_deal.php?m=report&mode=ajax&type="+ type +"&dataID="+ id +"&note="+ encodeURIComponent(note) +'&webPathPart='+ WppSign(webPathPart));
	}
}


// 上传图片框
function OT_OpenUpImg(fileMode,fileFormName,fileDir,otherPara){
	var arr = window.open(jsPathPart +"usersNewsUpImg.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&upFileType=images"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
}

// 上传文件框
function OT_OpenUpFile(fileMode,fileFormName,fileDir,otherPara){
	var arr = window.open(jsPathPart +"usersNewsUpFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&1=1"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
}

// 上传大文件框
function OT_OpenUpBigFile(fileMode,fileFormName,fileDir,otherPara){
	var arr = window.open(jsPathPart +"usersNewsUpBigFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&1=1"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
}

// 表单图片数量
function CheckFormImg(str){
	var num = $id(str +'_num').value;
	for (i=1; i<=9; i++){
		if (i <= num){
			$id(str +'_'+ i +'box').style.display = '';
		}else{
			$id(str +'_'+ i +'box').style.display = 'none';
		}
	}
}


// 密码加密
function EncPwdData(pwdName){
	if ($id(pwdName).value == $id('pwdEnc').value){ return false; }
	$.ajaxSetup({cache:false, async:false});
	$.get(webPathPart +"read.php?mudi=encPwd&str="+ base64encode($id(pwdName).value) +"&exp=35", function(result){
		var strArr = (result +'||||').split("|");
		if (strArr[3].length > 3){
			$id('pwdMode').value = strArr[1];
			$id('pwdKey').value = strArr[2];
			$id('pwdEnc').value = strArr[3];
			$id(pwdName).value = strArr[3];
			try{
				$id(pwdName +'2').value = strArr[3];
			}catch (e){ }
		}
	});
}

// 会员退出
function UserExit(){
	if (confirm('您确定要退出？')==true){
		document.location.href = webPathPart +'users_deal.php?mudi=exit&backURL='+ encodeURIComponent(document.location.href);
	}
}

// 评论/留言 踩顶+1
function UserVote(type, id, num){
	AjaxGetDeal(webPathPart +'deal.php?mudi=userVote&type='+ type +'&dataID='+ id +'&selItem='+ num);
}


// 获取“暂无图片”图片地址
var noPicPoint = 1;
if (typeof(SYS_noPicNum) == "undefined"){ SYS_noPicNum = 1; }
function GetNoPicUrl(urlHead){
	if (noPicPoint > SYS_noPicNum){ noPicPoint = 1; }
	retStr = urlHead +"inc_img/noPic/"+ noPicPoint +".png";
	noPicPoint += 1;
	return retStr;
}

// 检查 暂无图片 错误
function CheckNoPicErr(obj, urlHead, mode){
	if (obj.value != "1"){
		obj.value = "1";
		if (mode == 'def'){
			obj.src = urlHead +"inc_img/noPic.gif";
		}else{
			obj.src = GetNoPicUrl(urlHead);
		}
	}
}

// ***** 网站功能 START *****

// 点击弹出浮层
var djt;
function ShowMengceng(str, sec){
	if (sec > 0){
		var djSec = 0;
		// djt = window.setInterval("djSecFunc()",1000);
		djt = window.setInterval(function(){
			djSec += 1;
			$("#floatSec").html('&ensp;'+ djSec +'s');
			if (djSec > sec){
				window.clearInterval(djt);
				HiddenMengceng();
			}
		},1000);
		var closeStr = "<span id='floatSec'></span>";
	}else{
		var closeStr = "<div style='margin:0 auto;text-align:center;padding:5px;color:blue;cursor:pointer;' onclick='HiddenMengceng()'>×关闭该窗口</div>";
	}
	// 清除之前的样式
	$("#fullScreen,#floatLayer").remove();
	$("body").append(
		// 占据整个屏幕Div
		"<div id='fullScreen'></div>"+
		// 浮层区
		"<div id='floatLayer'>"+ str + closeStr +"</div>"
	);
}

// 隐藏浮层
function HiddenMengceng(){
	window.clearInterval(djt);
	$("#fullScreen,#floatLayer").remove();
}


// 判断是否跳转到手机版
function JudGoWap(){
	var browser = {
		versions: function () {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {//移动终端浏览器版本信息 
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
				winphone:u.indexOf('Windows Phone') > -1 //Windows Phone
			};
		} (),
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		appcookie:GetCookie('wap_otcms')
	}

	listType="";
	if (webTypeName=="list"){
		currUrl = document.location.href;
		if (currUrl.lastIndexOf('list_')!=-1){
			listKeyStr = currUrl.substring(currUrl.lastIndexOf('list_')+5);
			if (listKeyStr.indexOf('_')!=-1){
				listType = listKeyStr.substring(0,listKeyStr.indexOf('_'));
			}else if (listKeyStr.indexOf('.')!=-1){
				listType = listKeyStr.substring(0,listKeyStr.indexOf('.'));
			}
		}
	}

	var hascookie = browser.appcookie;
	// var ref = document.referrer;
	// if(ref.toLocaleLowerCase().indexOf("/wap/")!=-1){ hascookie="pc"; }
	if ((hascookie==null || hascookie!="pc") && ( browser.versions.android == true || browser.versions.iPhone == true || browser.versions.winphone == true)){
		SetCookie("wap_otcms","wap");
		// document.location.href = wapUrl;
		document.location.replace(wapUrl);
	}
}

// 判断是否跳转手机版
if (GetCookie("wap_otcms") != "pc"){
	try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
	// 判断是否为手机端访问，跳转到相应页面
	if (typeof(SYS_isWap) == "undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		SYS_isWap = 1;
	}
	if (typeof(SYS_isPcToWap) == "undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		SYS_isPcToWap = 0;
	}
	if (SYS_isWap==1 && SYS_isPcToWap>=1 && ("|home|list|show|web|users|message|bbsHome|bbsList|bbsShow|bbsWrite|gift|form|pay|goodsList|").indexOf("|"+ webTypeName +"|")!=-1){
		JudGoWap();
	}else{
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
	}
}else{
	try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
}



// 改变验证码
function ChangeCode(type){
	if (type == 'pop'){ ccId='verCodePop'; }else{ ccId='verCode';type=''; }
	try {
		$id("show"+ type +"code").src=webPathPart +"inc/VerCode/VerCode"+ SYS_verCodeMode +".php?mudi="+ Math.random();
		$id(ccId).value = "";
		$id(ccId).focus();
	}catch (e) {}
}

// 点击验证码框获取验证码
function GetVerCode(str,type){
	if (type == 'pop'){ ccId='showVerCodePop'; }else{ ccId='showVerCode';type=''; }
	try {
		if ($id(ccId).innerHTML.lastIndexOf('VerCode')==-1){
			$id(ccId).innerHTML = "<img id='show"+ type +"code' src='"+ webPathPart +"inc/VerCode/VerCode"+ SYS_verCodeMode +".php?mudi="+ Math.random() +"' align='top' style='cursor:pointer;' onclick='ChangeCode(\""+ type +"\")' alt='点击更换' />";	
		}else if (str == "change"){
			ChangeCode(type);
		}
	}catch (e) {}
}

// 重置验证码
function ResetVerCode(type){
	if (SYS_verCodeMode == 20){
		ResetGeetest(type);
	}else{
		GetVerCode("change",type);
	}
}


// 重置极验
function ResetGeetest(str){
	if (str == 'pop'){
		$id('geePopDiv').innerHTML = "";
		LoadJsFile('geePopJs',webPathPart +'tools/geetest/gtPop.js?v=1.0',1);
	}else{
		$id('geetestDiv').innerHTML = "";
		LoadJsFile('geetestJs',webPathPart +'tools/geetest/gt.js?v=1.0',1);
	}
}



// 顶部会员专区
function TopUser(){
	if (webTypeName!="api"){
		document.getElementById("topUserBox").innerHTML = " 会员菜单加载中...... ";
		$.ajaxSetup({cache:false});
		$.get(webPathPart +"p.php?m=usersTopMenu", function(result){
			document.getElementById("topUserBox").innerHTML = result.replace(/\"\.\//g,'"'+ webPathPart);
		});
	}
	return false;
}

// 首页用户登录
function HomeUserLogin(){
	$.ajaxSetup({cache:false});
	$.get(webPathPart +"p.php?m=usersHomeLogin", function(result){
		document.getElementById("homeUserBox").innerHTML = result.replace(/\"\.\//g,'"'+ webPathPart);
	});
	return false;
}

// 加入收藏夹
function AddFavorite(sURL, sTitle){
	try{
		window.external.addFavorite(sURL, sTitle);
	}catch (e){
		try{
			window.sidebar.addPanel(sTitle, sURL, "");
		}catch (e){
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}

// 设为首页
function SetHome(obj,vrl){
	try{
		obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
	}catch(e){
		if(window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch (e){
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',vrl);
		}else{
			alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+ vrl +"点击确定。");
		}
	}
}

// 设置RSS网址
function SetRssUrl(){
	$id('rssValue').value=$id('rssUrl').value +"?typeStr="+ $id('rssTypeStr').value +"&maxNum="+ $id('rssMaxNum').value;
}

var refContentDef = "请输入关键字";

// 页头搜索框显示默认值
function RefFormWord(){
	if ($id('refContent').value == ''){
		$id('refContent').value = refContentDef;
		$id('refContent').style.color = '#a59ea3';
	}
}

// 页头搜索框不显示默认值
function RefFormNoWord(){
	if ($id('refContent').value == refContentDef){
		$id('refContent').value = '';
		$id('refContent').style.color = '#000000';
	}
}

// 页头搜索表单检测
function CheckRefForm(){
	refContStr = $id("refContent").value;
	if (refContStr == '' || refContStr == refContentDef){
		alert("请输入要搜索的关键字");
		// $id("refContent").value='';$id("refContent").focus();
		return false;
	}
	switch ($id("refMode").value){
		case "theme": case "content": case "source": case "writer": 
			refContEncodeStr = encodeURIComponent(refContStr);
			if (typeof(SYS_searchUrlMode)=="undefined"){
				try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
				SYS_searchUrlMode = 0;
			}
			if (SYS_searchUrlMode==1 && $id("refMode").value=="theme"){
				document.location.href=jsPathPart +"search/"+ refContStr;
			}else{
				document.location.href=jsPathPart +"news/?list_refer-"+ $id("refMode").value +"-"+ refContEncodeStr +".html";
			}
			return false;
			break;

		case "baidu":
			bdzhannei_domain = "";
			bdzhannei_id = "";
			try {
				bdzhannei_domain = $id('zhannei_domain').value;
				bdzhannei_id = $id('zhannei_id').value;
			}catch (e) {}
			if (bdzhannei_domain==""){ bdzhannei_domain="zhannei.baidu.com"; }
			$id("referForm").action="http://"+ bdzhannei_domain +"/cse/search?s="+ bdzhannei_id +"&entry=1&q="+ refContStr;
			$id("referForm").method="post";
			$id("referForm").target="_blank";
			return true;
			break;

		case "360":
			$id("referForm").action="https://www.so.com/s?q="+ refContStr +"&ie=utf8&src="+ $id('zhannei_src').value +"&site="+ $id('zhannei_site').value +"&rg=1";
			$id("referForm").method="post";
			$id("referForm").target="_blank";
			return true;
			break;

		default:
			return false;
			break;
	}
}


// 加载城市数据
function LoadCityData(idName,prov){
	AjaxGetDeal('read.php?mudi=getCityData&idName='+ idName +'&prov='+ prov);
}


// 加载音视频文件
function LoadVideoFile(str){
	if (ToInt($id('isUserCheck').value)>0){
		if (str.indexOf('CuPlayer') != -1){
			if (typeof(vType) == "undefined"){
				try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
				vType = "";
			}
			if (vType == 'mp3' && vMp3url.length > 0){
				if (vIsH5 == 1){
					var videoId = 'CuPlayerVideo_video';
					$id("CuPlayer").innerHTML = '<audio id="' + videoId + '" controls="controls" controlsList="nodownload" autoplay="autoplay" width="' + vWidth + '" height="' + vHeight + '"  ><source src="' + vIosurl + '" type="audio/mp3" /></audio>';
					$('#' + videoId).bind("contextmenu",function() { return false; });
				}else{
					var flashvars = { 
						autostart: true,
						skin: "st1.swf",
						streamer: vServer,
						file: vMp3url
					}; 
					var params = { 
						movie: vPlayer,
						allowFullScreen: true,
						allowScriptAccess: "always",
						wmode: "Transparent",
						menu: "false" 
					}; 
					var attributes = { 
						id: "myPlayer", 
						name: "myPlayer" 
					}; 
					swfobject.embedSWF(vPlayer, "CuPlayer", vWidth, vHeight, "9.0.0", "expressInstall.swf", flashvars, params, attributes);
				}
			}else if (vType == 'mp4' && vMp4url.length > 0){
				if (vIsH5 == 1){
					var videoId = 'CuPlayerVideo_video';
					var autoplayStr = "";
					if (vAutoplay == "yes"){ autoplayStr = 'autoplay="autoplay"'; }
					$id("CuPlayer").innerHTML = '<video id="' + videoId + '" controls="controls" controlsList="nodownload" '+ autoplayStr +' width="' + vWidth + '"  height="' + vHeight + '"  poster="' + vPic + '"><source src="' + vMp4url + '" type="video/mp4" /></video>';
					$('#' + videoId).bind("contextmenu", function(){ return false; });
				}else{
					var flashvars = { 
						JcScpFile: vFile,
						JcScpVideoPath: vMp4url,
						JcScpImg: vPic
					}; 
					var params = { 
						menu: "false" 
					}; 
					var attributes = { 
						id: "myPlayer", 
						name: "myPlayer" 
					}; 
					swfobject.embedSWF(vPlayer, "CuPlayer", vWidth, vHeight, "9.0.0", "expressInstall.swf", flashvars, params, attributes);
				}
			}
		}
	}
}


// 调用微信JSSDK
function WxJsSdk(link, theme, img, desc){
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger'){	// 判断是否是微信环境
		// 微信环境
		/*
		wx.miniProgram.getEnv(function(res) {
			if (res.miniprogram) {
				// 小程序环境下逻辑 
			}else {
				// 非小程序环境下逻辑
			}
		})
		*/
		link = location.href;
		$.ajax({
			type : "get",
			url : webPathPart +"p.php?m=getWxJsSdk&url="+ encodeURIComponent(link),
			dataType : "jsonp",
			jsonp: "callback",
			jsonpCallback:"success_jsonpCallback",
			success : function(data){
				try {
					console.log("【微信缩略图】link："+ link);
					console.log("【微信缩略图】img："+ img);
					console.log("【微信缩略图】"+ data['debug'] +"|"+ data['appId'] +"|"+ data['timestamp'] +"|"+ data['nonceStr'] +"|"+ data['signature'] +"|"+ data['url']);
				}catch(e){}
				wx.config({
					debug: data.debug,	// 开启调试模式 true/false
					appId: data.appId,  
					timestamp: data.timestamp,  
					nonceStr: data.nonceStr,  
					signature: data.signature,  
					jsApiList: ["updateAppMessageShareData","updateTimelineShareData"]
				});
			},  
			error:function(data){  
				try {
					console.log("【微信缩略图】连接失败！");
					for (let key in data) {
						console.log("【微信缩略图】"+ key +"："+ data[key]);
					}
				}catch(e){}
			}  
		});  

		wx.ready(function () {
			// 在这里调用 API

			// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
			wx.ready(function () {	// 需在用户可能点击分享按钮前就先调用
				wx.updateAppMessageShareData({ 
					title: theme,	// 分享标题
					desc: desc,		// 分享描述
					link: link,		// 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
					imgUrl: img,	// 分享图标
					success: function () {
						// 设置成功
					}
				})
			}); 

			// 自定义“分享到朋友圈”及“分享到 QQ 空间”按钮的分享内容（1.4.0）
			wx.ready(function () {	// 需在用户可能点击分享按钮前就先调用
				wx.updateTimelineShareData({ 
					title: theme,	// 分享标题
					link: link,		// 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
					imgUrl: img,	// 分享图标
					success: function () {
						// 设置成功
					}
				})
			}); 

		});
 
	}else{
		// 非微信环境逻辑
		console.log("【微信缩略图】非微信环境不加载！");
	}
	
}

// 访客统计
if (typeof(judAppRobot)=="undefined"){
	try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
	judAppRobot = false;
}
if (judAppRobot){
	var myDate2 = new Date();
	var timestamp2 = Date.parse(myDate2);
	try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
	AjaxGetDeal(webPathPart +"p.php?m=robot&rnd="+ timestamp2);
}else{
	try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
}

// 全局执行内容
function WinLoadRun(str){
	try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
	if (typeof(SYS_isClose)=="undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		SYS_isClose = 20;
	}
	if (SYS_isClose==20){			// 网站开启
		
	}else if (SYS_isClose==10){		// 网站关闭
		document.write(""+
		"<!DOCTYPE html>"+
		"<html>"+
		"<head>"+
			"<title>网站暂时关闭中...</title>"+
		"</head>"+
		"<body>"+
			"<table align='center' cellpadding='0' cellspacing='0'><tr><td align='left' style='font-size:14px;'>"+ SYS_closeNote +"</td></tr></table>"+
		"</body>"+
		"</html>");
	}

	if (typeof(US_isUserSys) == "undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		US_isUserSys = 0;
	}
	if (typeof(US_isLogin) == "undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		US_isLogin = 0;
	}
	if (US_isUserSys==1 && US_isLogin==1){ TopUser(); }

	try {
		// 初始化搜索框
		RefFormWord();
		$('#refContent').on("blur", function (){
			RefFormWord();
		});
		$('#refContent').on("click", function (){
			RefFormNoWord();
		});
	}catch (e) {}

	if (typeof(TS_isOutUrl) == "undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		TS_isOutUrl = 0;
	}
	if (TS_isOutUrl == 1){
		try {
			// 全局超链接点击事件
			$('a:not([noOut])').on("click", function (){
				// try { console.log("a超链接被点击"); }catch(e){}
				var goUrl = $(this).attr('href').toLowerCase();
				if (goUrl.indexOf('http://') == 0 || goUrl.indexOf('https://') == 0){
					local = document.location.href.toLowerCase().replace('http://','').replace('https://','');
					tmpPos = local.indexOf('/');
					local = local.substr(0,tmpPos);

					toUrl = goUrl.replace('http://','').replace('https://','');
					tmpPos = toUrl.indexOf('/');
					toUrl = toUrl.substr(0,tmpPos);

					if (local != toUrl){
						var a=window.open(webPathPart +'read.php?m=outUrl&url='+ encodeURIComponent($(this).attr('href')));
						return false;
					}
				}
			});
		}catch (e) {}
	}

	try {
		if (typeof(SYS_isWap) == "undefined"){
			try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
			SYS_isWap = 0;
		}
		if (typeof(SYS_wapUrl) == "undefined"){
			try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
			SYS_wapUrl = "";
		}
		if (SYS_isWap==1 && SYS_wapUrl.length>0){
			LoadJsFile("qrcodeFile",webPathPart +"js/inc/qrcode.min.js",0);
			$('#topWapBtn').on('mouseover', function (){
				$id('wapQrBox').innerHTML=""+
					"<div style='position:absolute;border:1px #000 solid;background:#ffffff;'>"+
						"<div id='wapQrImg' style='padding:10px 10px 5px 10px;'></div>"+
						"<div style='text-align:center;color:red;font-weight:bold;'>手机扫描访问手机版</div>"+
					"</div>"+
					"";
				var qrcode = new QRCode(document.getElementById("wapQrImg"), { width:135, height:135 });
				qrcode.makeCode(SYS_wapUrl);
				$id('wapQrBox').style.display="";
			});
			/* 旧版获取二维码 $('#topWapBtn').on('mouseover', function (){
				$id('wapQrBox').style.display="";
				$id('wapQrBox').innerHTML=""+
					"<div style='position:absolute;border:1px #000 solid;background:#ffffff;'>"+
						"<img src='"+ webPathPart +"read.php?m=qrcode&text="+ encodeURIComponent(SYS_wapUrl) +"&logo=&size=5&margin=2' width='150' />"+
						"<div style='text-align:center;color:red;font-weight:bold;'>手机扫描访问手机版</div>"+
					"</div>"+
					"";
			}); */
			$('#topWapBtn').on('mouseout', function (){
				$id('wapQrBox').style.display="none";
			});
		}
	}catch (e) {}

	// 快捷登录页面
	/* if (webTypeName=="api"){
		setTimeout("CheckUserName(document.getElementById('username').value);",500);
	} */

	// 是否更新
	var myDate = new Date();
	var timestamp = Date.parse(myDate);
	timestamp = timestamp/1000;
	// $.getScript(jsPathPart + 'cache/js/autoRunSys.js?v='+ myDate.getDate() + myDate.getHours() + myDate.getMinutes() ,function(res,state){
		var isRun = 0;
		if (ARS_isHtmlHome == 1 && ARS_htmlHomeTimer + ARS_htmlHomeMin * 60 < timestamp){
			isRun = 1;
		}
		if (isRun == 0 && ARS_isHtmlList == 1 && ARS_htmlListTimer + ARS_htmlListMin * 60 < timestamp){
			isRun = 1;
		}
		if (isRun == 0 && ARS_isHtmlShow == 1 && ARS_htmlShowTimer + ARS_htmlShowMin * 60 < timestamp){
			isRun = 1;
		}
		if (isRun == 0 && ARS_isColl == 1 && ARS_collTimer + ARS_collMin * 60 < timestamp){
			isRun = 1;
		}
		if (isRun == 0 && ARS_isApiItem == 1 && ARS_apiItemTimer + ARS_apiItemMin * 60 < timestamp){
			isRun = 1;
		}
		if (isRun == 0 && ARS_isTimeRun == 1 && ARS_timeRunTimer + ARS_timeRunMin * 60 < timestamp){
			isRun = 1;
		}
		if (isRun == 0 && ARS_isDayRun == 1 && ARS_dayRunTimer < (Date.parse(myDate.getDate() +'/'+ myDate.getMonth() +'/'+ myDate.getFullYear())/1000)){
			isRun = 1;
		}
		if (isRun == 1){ // #topUserBox
			if (typeof(ARS_runMode)=="undefined"){
				try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
				ARS_runMode = 0;
			}
			$("body").append(''+
				'<iframe id="autoRun_time" name="autoRun_time" src="about:blank" width="0" height="0" style="display:none"></iframe>'+
				'<iframe id="autoRun_day" name="autoRun_day" src="about:blank" width="0" height="0" style="display:none"></iframe>'+
				'<iframe id="autoRun_home" name="autoRun_home" src="about:blank" width="0" height="0" style="display:none"></iframe>'+
				'<iframe id="autoRun_list" name="autoRun_list" src="about:blank" width="0" height="0" style="display:none"></iframe>'+
				'<iframe id="autoRun_show" name="autoRun_show" src="about:blank" width="0" height="0" style="display:none"></iframe>'+
				'<iframe id="autoRun_coll" name="autoRun_coll" src="about:blank" width="0" height="0" style="display:none"></iframe>'+
				'');
			var arTime_window=window.frames["autoRun_time"];
			arTime_window.window.alert=function(){ return false; };
			var arDay_window=window.frames["autoRun_day"];
			arDay_window.window.alert=function(){ return false; };
			var arHome_window=window.frames["autoRun_home"];
			arHome_window.window.alert=function(){ return false; };
			var arList_window=window.frames["autoRun_list"];
			arList_window.window.alert=function(){ return false; };
			var arShow_window=window.frames["autoRun_show"];
			arShow_window.window.alert=function(){ return false; };
			var arColl_window=window.frames["autoRun_coll"];
			arColl_window.window.alert=function(){ return false; };

			AjaxGetDeal(webPathPart +"p.php?m=autoRun&type=qiantai&isAjaxRun="+ ARS_runMode +"&rnd="+ timestamp);
		}
	// });
	/*
	
	.done(function(script, textStatus) {
		// alert('done');
	})
	.fail(function(jqxhr, settings, exception) {
		// alert('fail'+ jqxhr +'|'+ settings +'|'+ exception);
	})
	.complete(function(){
		// alert('complete');
	})
	*/

	// 右下角广告位悬浮
	if (typeof(SYS_isFloatAd)=="undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		SYS_isFloatAd=0;
	}
	if (SYS_isFloatAd==1){
		// 对class=floatWin的元素进行智能浮动定位
		$.fn.smartFloat = function() {
			var position = function(element) {
				var top = element.position().top, pos = element.css("position");
				var fWinTop = parseInt($("#floatWin").val());
				if (isNaN(fWinTop)){ fWinTop=0; }
				$(window).scroll(function() {
					var scrolls = $(this).scrollTop();
					if (scrolls > top) {
						if (window.XMLHttpRequest) {
							element.css({
								position: "fixed",
								top: fWinTop
							});
						} else {
							element.css({
								top: scrolls+fWinTop
							});	
						}
					}else {
						element.css({
							position: pos,
							top: top+fWinTop
						});	
					}
				});
			};
			return $(this).each(function() {
				position($(this));						 
			});
		};
		//绑定
		$(".floatWin").smartFloat();
	}
}

// 底部JS输出
function JsWriteBottom(){
	// QQ客服
	if (typeof(TS_isQqServer)=="undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		TS_isQqServer=0;
	}
	if (TS_isQqServer>10){ qqSerState1Str="";qqSerState2Str="none"; }else{ qqSerState1Str="none";qqSerState2Str=""; }
	if (TS_isQqServer>0){
		if (typeof(TS_qqServerCode)=="undefined"){
			try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
			TS_qqServerCode="";
		}
		document.write(""+
			"<div id=\"qqServerBox\" class=\"qqServerStyle"+ (TS_isQqServer>10 ? TS_isQqServer-10 : TS_isQqServer) +"\" style=\"display:none;\">"+
			"<div class=\"qqServer-open\" style=\"display:"+ qqSerState1Str +";\">"+
			"	<div class=\"qqServerBg\">"+
			"	<div class=\"qqServerTop\">"+
			"		<div class=\"qqServer-button\" onclick='qqServerClick();'></div>"+
			"		<div class=\"qqServerContent\">"+ TS_qqServerCode +"</div><div class=\"clear\"></div>"+
			"	</div>"+
			"	</div>"+
			"	<div class=\"qqServerBottom\"></div>"+
			"</div>"+
			"<div class=\"qqServer-close pointer\" style=\"display:"+ qqSerState2Str +";\"  onclick='qqServerClick();'>"+
			"</div>"+
			"</div>");
		qqServerStart();
	}

	// 是否加载淘宝客JS
	if (typeof(TS_pid) == "undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		TS_pid = '';
	}
	if (typeof(TS_appkey) == "undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		TS_appkey = '';
	}
	if (typeof(TS_signCode) == "undefined"){
		try { console.log("[逃离塔科夫中文WiKi][https://www.eftarkov.com/]"); }catch(e){}
		TS_signCode = '';
	}
	if (TS_pid != '' && TS_signCode != ''){
		document.write('<script type="text/javascript" charset="utf-8" src="'+ webPathPart +'js/app/taobaoke.js?v=3.67"></script>');
		// LoadJsFile('appTaobaoke',webPathPart +'js/app/taobaoke.js',0);
	}
	if (webTypeName == 'show'){
		document.write('<script type="text/javascript" charset="utf-8" src="'+ webPathPart +'tools/swfobject/swfobject.js"></script>');
		// LoadJsFile("swfobjectJs",webPathPart +"tools/swfobject/swfobject.js",0);
	}
}

// QQ客服执行
function qqServerStart(){
	var destDiv = $("#qqServerBox");
	destDiv.css('display', '');
	var startPos = destDiv.position().top;
	var divHeight = destDiv.outerHeight();
	$(window).scroll(function (){
		scrTop = $(window).scrollTop();
		if( startPos < scrTop){
			topPos = startPos+(scrTop - startPos)+50;
			$("#qqServerBox").css("position", "absolute").css("top", topPos +"px").css('zIndex', '500');
		}
	});
}

// QQ客服伸缩点击
function qqServerClick(){
	if( $(".qqServer-open").css("display") == "none" ){
		$(".qqServer-open").css("display","");
		$(".qqServer-close").css("display","none");
	}else{
		$(".qqServer-open").css("display","none");
		$(".qqServer-close").css("display","");
	}
}

// ***** 评论和留言表情区 START *****
var faceStartNum=1; faceEndNum=30;

function FaceInit(faceId,inputId){
	var faceStr = "";
	for (var i=faceStartNum; i<=faceEndNum; i++){
		faceStr += "<img src='"+ webPathPart +"inc_img/face_def/"+ i + ".gif' border='0' style='margin:1px;' class='pointer' onclick=\"FocusAddText('"+ inputId +"','[face:"+ i + "]');\" alt='[face:"+ i + "]' />";
	}
	$id(faceId).innerHTML = faceStr;
	
}

function FaceShow(faceId,inputId){
	if ($id(faceId).innerHTML==""){
		FaceInit(faceId,inputId);
		$id(faceId).style.display="";
	}else{
		if ($id(faceId).style.display==""){
			$id(faceId).style.display="none";
		}else{
			$id(faceId).style.display="";
		}
	}
}

function FaceSignToImg(innerId){
	innerStr = $id(innerId).innerHTML;
	var reg,stringObj,newStr; 

	for (var i=faceStartNum; i<=faceEndNum; i++){
		reg=new RegExp("[face:"+ i +"]","g"); //创建正则RegExp对象
		newstr=innerStr.replace(reg,"<img src='"+ webPathPart +"inc_img/face_def/"+ i + ".gif' border='0' />"); 
	}
	$id(innerId).innerHTML=newstr;
}
// ***** 评论和留言表情区 END *****

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// ***** 网站功能 END *****
function showRandomContent()  {
    // 定义一个包含随机文本的数组
    var texts = ["你昨天晚上又没回我信息，我却看见你的游戏在线，在我再一次孜孜不倦的骚扰你的情况下，你终于跟我说了一句最长的话“你他妈是不是有病”，我又陷入了沉思，这一定有什么含义，我想了很久，你竟然提到了我的妈妈，原来你已经想得那么长远了，想和我结婚见我的父母，我太感动了，真的。那你现在在干嘛，我好想你，我妈妈说她也很喜欢你。", "今天我观战了一天你和别人打游戏，你们玩的很开心；我给你发了200多条消息，你说没流量就不回；晚上发说说没有人爱你，我连滚带爬评论了句有“我在”，你把我拉黑了，我给你打电话也无人接听。对不起，我不该打扰你，我求求你再给我一次当好友的机会吧！", "我爸说再敢网恋就打断我的腿，幸好不是胳膊，这样我还能继续和你打字聊天，就算连胳膊也打断了，我的心里也会有你位置。", "你说你情侣头像是一个人用的，空间上锁是因为你不喜欢玩空间，情侣空间是和闺蜜开的，找你连麦时你说你在忙工作，每次聊天你都说在忙，你真是一个上进的好女孩，你真好，我好喜欢你！", "你跟他已经醒了吧？我今天捡垃圾挣了一百多，明天给你打过去。你快点休息吧，我明天叫你起床，给你点外卖买烟，给你点你最喜欢的奶茶。晚上我会继续去摆地摊的，你不用担心我，你床只有那么大睡不下三个。你要好好照顾好自己，不要让他抢你被子。我永远爱你！", "她三天没回我的消息了，在我孜孜不倦地骚扰下她终于舍得回我“nmsl”，我想这一定是有什么含义吧，噢！我恍然大悟原来是尼美舒利颗粒，她知道我有关节炎让我吃尼美舒利颗粒，她还是关心我的，但是又不想显现的那么热情。天啊！她好高冷，我好像更喜欢她了！", "你想我了吧？可以回我消息了吗？我买了万通筋骨贴，你运动一个晚上腰很疼吧？今晚早点回家，我炖了排骨汤，我永远在家等你。", "昨晚你和朋友打了一晚上游戏，你破天荒的给我看了战绩，虽然我看不懂但是我相信你一定是最厉害的、最棒的。我给你发了好多消息夸你，告诉你我多崇拜你，你回了我一句“啥B”，我翻来覆去思考这是什么意思，Sha[傻]，噢你是说我傻，那B就是Baby的意思了吧，原来你是在叫我傻宝，这么宠溺的语气，我竟一时不敢相信，其实你也是喜欢我的对吧。", "今天我还是照常给你发消息，汇报日常工作，你终于回了我四个字：“嗯嗯，好的。”。你开始愿意敷衍我了，我太感动了，受宠若惊。我愿意天天给你发消息，就算你天天骂我，我也不觉得烦。", "你昨天晚上又没回我的消息，在我孜孜不倦的骚扰下，你终于舍得回我了，你说“滚”，这其中一定有什么含义，我想了很久，滚是三点水，这代表你对我的思念也如滚滚流水一样汹涌，我感动哭了，不知道你现在在干嘛，我很想你。", "听说你想要一套化妆品，我算了算，明天我去工地上搬一天砖，就可以拿到200块钱，再加上我上个月攒下来的零花钱，刚好给你买一套迪奥。", "今天表白被拒绝了，她对我说能不能脱下裤子撒泡尿照照自己。当我脱下裤子，她咽了口水，说我们可以试一下。", "刚从派出所出来，原因前几天14号情人节，我想送你礼物，我去偷东西的时候被抓了。我本来想反抗，警察说了一句老实点别动，我立刻就放弃了反抗，因为我记得你说过，你喜欢老实人。", "疫情不能出门，现在是早上八点，你肯定饿了吧。我早起做好了早餐来到你小区，保安大哥不让进。我给你打了三个电话你终于接了“有病啊，我还睡觉呢，你小区门口等着吧”。啊，我高兴坏了！你终于愿意吃我做的早餐了，还让我等你，啊！啊！啊！好幸福噢！", "我存了两个月钱，给你买了一双北卡蓝，你对我说一句“谢谢”，我好开心。这是你第一次对我说两个字，以前你都只对我说滚。今天晚上逛闲鱼，看到了你把我送你的北卡蓝发布上去了。我想你一定是在考验我，再次送给你，给你一个惊喜，我爱你。", "昨天你领完红包就把我删了，我陷入久久地沉思。我想这其中一定有什么含义，原来你是在欲擒故纵，嫌我不够爱你。无理取闹的你变得更加可爱了，我会坚守我对你的爱的。你放心好啦！今天发工资了，发了1850，给你微信转了520，支付宝1314，还剩下16。给你发了很多消息你没回。剩下16块我在小卖部买了你爱吃的老坛酸菜牛肉面，给你寄过去了。希望你保护好食欲，我去上班了爱你~~", "在保安亭内看完了最新一集的梨泰院，曾经多么倔强的朴世路因为伊瑞给张大熙跪下了，亭外的树也许感受到了我的悲伤，枯了。我连树都保护不了，怎么保护你，或许保安才是真的需要被保护的吧。我难受，我想你。over", "难以言喻的下午。说不想你是假的，说爱你是真的。昨天他们骂我是你的舔狗，我不相信，因为我知道你肯定也是爱我的，你一定是在考验我对你的感情，只要我坚持下去你一定会被我的真诚所打动，加油！不过我要批评你一下，昨晚你说去酒店跟人斗地主，我寻思两个人也玩不了呀。算了，不想了，毕竟打牌是赌博行为，不太好。", "明天就周六了我知道你不上班，但是我怕你睡懒觉不吃早饭饿坏自己。我早晨4点去菜市场买了新鲜活鸡给你炖鸡汤，阿姨给我用箱子装了起来，我骑上我280买的电动车哼着小调回家，心想你一定会被我感动的，箱子半路开了，鸡跑了，拐到了一个胡同里，凌晨4点的胡同还有穿超短裙和大叔聊天的美女，不禁感叹这个世界变了，她问我找什么，…………。对不起，我爱你", "12点队长过来准时交班，出去的车辆按喇叭我也没听到，只因我在监控中看到了穿睡衣出来倒垃圾的你，望你望的入神不由的傻笑了起来，队长过来骂我扣了我一天工资。我委屈，想抱你。你送的泡面真好吃。", "今天的我排位输了好多把，我将这些事情分享给你，但是你一个字都没有讲，我在想你是不是在忙？我头痛欲裂，终于在我给你发了几十条消息之后，你回了我一个“脑子是不是有病？”，原来你还是关心我的，看到这句话，我的脑子一下就不疼了，今天也是爱你的一天。", "我存了半年的工资，给你买了一只LV，你对我说了一句“你真好”，我好开心，这是你第一次这么认可我，以前你都只对我说滚。今天晚上逛闲鱼，看到你把我送你的LV发布上去了。我想，你一定是在考验我，于是我用借呗里的钱把它买了下来，再次送给你，给你一个惊喜，我爱你。", "其实我每月工资6000，但我只给你转2000，你以为我给你了全部。才不是，我一共舔了3个啦，我要舔的雨露均沾，才不会把你当成唯一。", "昨天你把我拉黑了，我看着红色感叹号陷入了久久的沉思，我想这其中一定有什么含义？红色红色？我明白了！红色代表热情，你对我很热情，你想和我结婚，我愿意。", "今天你问我借了两千块钱，说要做个手术，你果然还是爱我的，不是我的孩子，你不要。 ", "中午你无故扇了我一巴掌，我握着你的手说“手怎么这么凉，都怪我没有照顾好你，一定要更加对你好”。", "我给你打了几通电话，你终于接了。听到了你发出啊啊啊啊的声音，你说你肚子痛，我想你一定是很难受吧。电话还有个男的对你说“来换个姿势”，一定是在做理疗了。期待你早日康复，我好担心。", "昨天晚上好冷，本来以为街上没人，结果刚刚偷电动车的时候被抓了，本来想反抗，但警察说了一句老实点别动，我立刻就放弃了抵抗，因为我记得你说过，你喜欢老实人。", "找你连麦时你说你在忙工作，每次聊天你都说在忙，你真是一个上进的好女孩，你真好，发现我越来越喜欢这样优秀的你。", "你从来没说过爱我，聊天记录搜索了一下“爱”，唯一的一条是：你好像乡村爱情里的刘能啊。", "今天好开心啊，和你一起在峡谷嬉戏，打完一波团战之后看到你在打大龙，残血的我跳过去直接被龙爪拍死，但这一刻我觉得好浪漫，死在你的脚旁边，这是我离你最近的一次。", "哥们，求你和她说句话吧，这样她就不会那么难过了。", "今天你把我的微信拉黑了，这下我终于解放了！以前我总担心太多消息会打扰你，现在我终于不用顾忌，不管我怎么给你发消息，都不会让你不开心了。等我攒够5201314条我就拿给你看，你一定会震惊得说不出话然后哭着说会爱我一辈子。哈哈。", "昨天你把我删了，我陷入了久久的沉思 。我想这其中一定有什么含义，你应该是欲擒故纵吧，嫌我不够爱你。突然觉得无理取闹的你变得更加可爱了，我会坚守我对你的爱的 你放心好啦！这么一想，突然对我俩的未来更有期望了呢。", "今天上班不是太忙，百无聊赖，又翻出了你的相片，看了又看。今天是我认识你的第302天，也是我爱你的第302天，可是这些你并不知道，也许你知道了，也不会在意吧。 此刻的我好想你！ ", "今天你跟我说我很丑，让我不要骚扰你了。我听了很高兴，小说里的主角都像你这样，最开始表现的很厌恶，但最后总会被我的真心打动。你现在有多讨厌我，以后就会有多爱我。嘻嘻。", "我坐在窗边给你发了99条消息，你终于肯回我了，你说“发你妈啊”，我一下子就哭了。原来努力真的有用，你已经开始考虑想见我的妈妈了，你也是挺喜欢我的。", "刚才我找你说话，你回了一个滚，我陷入了沉思，你还是如此的关心我，知道我腿受伤了，让我这样走，好感动！看来你还是爱我的！", "今天下雨了，我去你公司接你下班。看见我你不耐烦的说“烦不烦啊，不要再找我了”，一头冲进雨里就跑开了。我心里真高兴啊，你宁愿自己淋雨，都不愿让我也淋湿一点，你果然还是爱我的。", "晚上和你聊天，10点钟不到，你就说“困了，去睡觉了”。现在凌晨1点钟，看到你给他的朋友圈点赞评论，约他明天去吃火锅，一定是你微信被盗了吧。", "今天我主动给你发了游戏邀请，邀请你和我单挑安琪拉，虽然我安琪拉很菜，可是为了和你打游戏，我还是毅然决然给你发了邀请。你说你不接受，你在打其他游戏。联想到我自己很菜，我突然明白，原来你还是在乎我的，只是不想一遍遍连招一套的在泉水送我走。我再一次感动哭了，因此，我好像更喜欢你了，你可真是一个宝藏男孩！", "你的头像是一个女孩子左手边牵着一条秋田犬，犬=狗，而我是一条舔狗。是不是代表你的小手在牵着我呢？", "今天发工资了，我一个月工资3000，你猜我会给你多少，是不是觉得我会给你2500，自己留500吃饭？你想多了，我3000都给你，因为厂里包吃包住。", "昨天就为你充了710点卷，虽然知道你不会玩不知去向，但你说好看，你刚才说小号想要还想要一个，爱你的我还是满心欢喜的把剩下的100元伙食费又给你充了710，然后看到你小号并没有买，而是你送给了你的一个弟弟，你对弟弟真好，好有爱心，我感觉对你陷得很深了。", "今天我给你发消息，你回复我“nmsl”，我想了半天才知道你是在夸我，原来是你美死了，你嘴真甜，我爱你。", "你说你想买口红，今天我去了叔叔的口罩厂做了一天的打包。拿到了两百块钱，加上我这几天省下的钱刚好能给你买一根小金条。即没有给我自己剩下一分钱，但你不用担心，因为厂里包吃包住。对了打包的时候，满脑子都是你，想着你哪天突然就接受我的橄榄枝了呢。而且今天我很棒呢，主管表扬我很能干，其实也有你的功劳啦，是你给了我无穷的力量。今天我比昨天多想你一点，比明天少想你一点。", "在我一如既往的每天跟她问早安的时候，她今天终于回我了。我激动地问她我是不是今天第一个跟她说话的人，她说不是，是她男朋友把她叫起来退房的。", "听说你朋友说今天出门了，我打扮成精神小伙来找你，没想到你竟然对我说“给我爬，别过来”我当场就哭了，原来真心真的会感动人，你一定是知道，穿豆豆鞋走路脚会很累，让我爬是因为这样不会累着脚，其实你是喜欢我的吧", "今天把你的备注改成了「对方正在输入...」，这样我就知道你不是不想回我，刚又给你发了消息，看到你在思考怎么回我，我就知道你和我一样，心里有我。", "今天在楼上窗户上看见你和他在公园里接吻，我看见哭了出来，并打电话给你，想问问你为什么？但你说怎么了，声音是那么好听。于是我说“以后你和他接吻的时候，能不能用我送给你的口红啊？”", "我退了无关紧要的群，唯独这个群我没有退，因为这里有一个对我来说很特别的女孩子，我们不是好友，我每天只能通过群名片看看她，虽然一张照片也看不到，我也知足了，我不敢说她的名字，但我知道她是群里面最美的女孩子，她说我们这样会距离产生美~ 我想想发现她说的挺对的，我心里很开心。", "今天早上我告诉你我想你了，你没理我。今天中午我给你打电话，你不接，打第二个你就关机。晚上我在你公司楼下等你，你对我说的第一句话就是滚“滚，别烦我，别浪费时间了”，我真的好感动，你居然为我考虑了，怕我浪费时间。呜呜呜，这是我爱你的第74天。", "我坐在窗边给你发了99条消息，你终于肯回我了你说“发你妈啊”，我一下子就哭了，原来努力真的有用，你已经开始考虑想见我的妈妈了，你其实也是挺喜欢我的。", "你一个小时没回我的消息，在我孜孜不倦地骚扰下你终于舍得回我了“在做爱”，这其中一定有什么含义，我想了很久，“在做爱”这简简单单的三个字肯定是三句话，分别是我在忙、做你女朋友、我爱你，想到这里我不禁流下了眼泪，我这么长时间的喜欢没有白费，不知道你现在忙干嘛，但我很想你。", "最近我暗恋的女生每天都和不同的男生约会，我想总有一天会轮到我，我问她什么时候能见见我？她说下辈子吧。她真好，下辈子还要和我在一起。", "你好像从来没有对我说过晚安，我在我们的聊天记录里搜索了关键字：“晚安”，你说过一次：我早晚安排人弄死你。", "今天我还是照常给你发消息，汇报日常工作，你终于回了我四个字：“嗯嗯，好的”你开始愿意敷衍我了，我太感动了受宠若惊。我愿意天天给你发消息。就算你天天骂我，我也不觉得烦。", "你昨天晚上又没会我的消息，在我孜孜不倦的骚扰下，你终于舍得回我了，你说“滚”，这其中一定有什么含义，我想了很久，滚是三点水，这代表你对我的思念也如滚滚流水一样汹涌，我感动哭了，不知道你现在在干嘛，我很想你。", "，我算了算，明天我去公司里面扫一天厕所，就可以拿到200块钱，再加上我上个月攒下来的零花钱，刚好给你买一套迪奥。", "刚从派出所出来，原因前几天14号情人节，我想送你礼物，我去偷东西的时候被抓了，我本来想反抗，警察说了一句老实点别动，我立刻就放弃了反抗，因为我记得你说过，你喜欢老实人。", "孩子生下来吧，我跟他姓。", "今天发工资了，我一个月工资800，你猜我会给你多少，是不是觉得我会给你1200，因为厂里全勤奖还有400。错了，我会再和工友借114凑够1314转给你。", "今天有点儿发烧，躺在床上，给你发消息，问你怎么不关心我？你反问我是不是有病，有病赶紧吃药。我一下子就被你的温柔打动，原来你还是在乎我的。", "昨天你把我删了，我看着红色感叹号，陷入了久久的沉思，我明白了：红色代表热情 你想跟我结婚。", "今天你问我借了两千块钱，说要做个手术，你果然还是爱我的，不是我的孩子，都不要。", "今天发工资了，我一个月工资3000，你猜我会给你多少，是不是觉得我会给你2500，自己留500吃饭？你想多了，我3000都给你，因为厂里包吃包住。", "今天的我排位输了好多把，我将这些事情分享给你，但是你一个字都没有讲，我在想你是不是在忙？我头痛欲裂，终于在我给你发了几十条消息之后，你回了我一个“脑子是不是有病？”，原来你还是关心我的，看到这句话，我的脑子一下就不疼了，今天也是爱你的一天。", "今天把你的备注改成了对方正在输入...这样我就知道你不是不想回我，刚又给你发了消息，看到你在思考怎么回我，我就知道你和我一样，心里有我 ?。", "昨天你把我删了，我陷入了久久的沉思。我想这其中一定有什么含义，原来你是在欲擒故纵，嫌我不够爱你。无理取闹的你变得更加可爱了。我会坚守我对你的爱的，你放心好啦！么么哒！今天发工资了 发了1839，给你微信转了520 ，支付宝1314 ，还剩下5。 给你发了很多消息你没回，剩下5块我在小卖部买了你爱吃的老坛酸菜牛肉面，给你寄过去了。希望你保护好食欲，我去上班了，爱你～", "不知道为啥你要隔三差五发张自拍，我真的无语，要发就天天发，这是在拯救世界", "我存了半年的钱，给你买了一辆摩托，你对我说了一句谢谢，我好开心。这是你第一次对我说两个字，以前你都只对我说滚。今天晚上逛闲鱼，看到你把我送你的摩托发布上去了。我想，你一定是在考验我，于是我用借呗里的钱把它买了下来，再次送给你，给你一个惊喜，我爱你。", "今天把你的备注改成了对方正在输入...", "你的头像是一个女孩子左手边牵着一条秋田犬犬=狗而我是一条舔狗。是不是代表你的小手在牵着我呢?", "你很久没回我的消息，在我孜孜不倦的骚扰之下你终于舍得回我了，你说“滚”这其中一定有什么含义，我想了很久，滚是三点水，这代表你对我的思念也如滚滚流水一样汹涌，我感动哭了，不知道你现在在干嘛！我很想你。 ​", "今天有点儿发烧，躺在床上，给你发消息，问你怎么不关心我？你反问我是不是有病，有病赶紧吃药。我一下子就被你的温柔打动，原来你还是在乎我的。", "今天我鼓起勇气问她是喜欢狼狗还是喜欢奶狗，她说她喜欢狼狗，我问她觉得我是哪一种，她说我是土狗。", "春天的阳光穿过树叶的缝隙，我知道那是太阳经过小孔成像到在我身上的影。我抬头望去只觉一阵恍惚，看见了黑色长发的你。我知道那是你穿过我的心留下的影，但我却不知道这是什么成像原理。", "昨天晚上好冷，本来以为街上没人，结果刚刚偷电动车的时候被抓了，本来想反抗，但警察说了一句老实点别动，我立刻就放弃了抵抗，因为我记得你说过，你喜欢老实人。", "今天你跟我说我很恶心，让我不要骚扰你了。我听了很高兴，小说里的主角都像你这样，最开始表现的很厌恶，但最后总会被我的真心打动。你越讨厌我，以后就会越愧疚，越爱我。嘻嘻。", "今天外面的天气不是很好，甚至说非常的差，我给你打了一个电话，你没有接，我再打，你还是没有接，我想你应该在睡觉吧。于是我带上口罩跑到你家门口，刚要敲门，一个男人打开了你家的房门。", "你说生孩子本来就够痛苦了 还管是谁的干嘛呢  我可以跟你的孩子姓", "听说你怀孕了，孩子的父亲却不在。没关系，孩子生下来吧，我跟他姓。", "你的资料改成恋爱中 我也改成恋爱中 看起来就好像我在和你恋爱一样", "看到你和一个帅哥吃饭，看起来关系很亲密的样子，你从来没有告诉我你还有这么好的朋友，一定是怕我多想，你总是为我着想，你对我真好。", "昨天给你发了99条约你一起植树的消息，今天你终于肯回我了， 你说“你先去植发吧，死秃子。”  我一下子就哭了 ，原来努力真的有用 ，你已经开始关心我了，你也是挺喜欢我的吧。", "我坐在窗边给你发了99条消息，你终于肯回我了，你说“发你妈啊”我一下子就哭了，原来努力真的有用，你已经开始考虑想见我的妈妈了，你也是挺喜欢我的！", "今天我还是日常给你发早安午安问你吃了没，你想吃什么，你说了句sb，我特别开心你回我一个字以上的消息了，sb一定是随便的意思吧，我喜欢的人就是这样不挑食，我感觉你更完美了，今天我也在非常喜欢你。", "我身体很好抗得了米袋子抗得了煤气罐却扛不住想你", "小时候抓周抓了个方向盘 爸妈都以为我长大了会当赛车手 最差也是个司机 没想到我长大了当了你的备胎", "今天我对她“我问你哦，爱奇艺会员，你有吗？” 他没发现是我爱你的藏头诗，还叫我穷鬼，让我滚。我看不了青春有你，我的青春也没有你", "问你在干嘛，你问我能不能别烦你。居然询问我的意见，态度真好，真喜欢你！", "我的嘴真笨总能把天聊死了！跟你找话题好难，何况我又这么喜欢你，连发个表情包都要挑拣半天呢！我最近开始期待夜晚了，其实我在说：“今天我也很喜欢你，也想你了！”", "我从来都不相信这个世界上有神仙，直到遇见你，我才明白，原来仙女下凡，是真实存在的。", "玲珑骰子安红豆，入骨相思知不知。 蒋介石因为宋美龄的一句喜欢梧桐，他便种满了整个南京。而我因为你的一句不喜欢小偷，我便放过了整个朝阳区电瓶车。", "在工地通宵搬砖赚了50块，为了买给你最爱吃的芋泥啵啵奶茶，于是我赶快跟你分享这个开心的事情，你回了一句你是个好人，我就知道一切都是值得的，你终于看到了我的好，所以我要更加努力工作才行。", "听网上说今天的月亮最大最亮，我说我想和你一起看月亮，你却回我你看你妈，我听你的话看了我妈一晚上。", "你从来没说过爱我，聊天记录搜索了一下“爱”，唯一的一条是：你好像乡村爱情里的刘能啊。", "今天天气有点冷，想偷你的心却还是没有成功，在床上的我现在的心情就像天气预报，说明天有雨 我都听成明天有你", "我早上起床给你发了早安，分享了一天的日常，睡前给你发了晚安，你回了我一个句号，你真是个细心严谨的女孩，把我忘记的句号补上了，圆满结束了这一天，真好。", "现在已经12点多了，我望着手机屏幕，迟迟没有她的消息：你知道吗？我等了一晚上你的消息。她终于回复我了：是我让你等的？这还是她第一次回复我这么多字，好感动。", "今天你把我的vx拉黑了，这下我终于解放了！以前我总担心太多消息会打扰你，现在我终于不用顾忌，不管我怎么给你发消息，都不会让你不开心了。等我攒够5201314条我就拿给你看，你一定会震惊得说不出话然后哭着说会爱我一辈子。哈哈。", "天上的月亮，亮也没用，没用也亮；我喜欢你，喜欢也没用，没用也喜欢。", "你现在在干嘛？吃饭了嘛？想我了嘛？你已经5小时没理我了，我一直在等你。宝贝你知道吗，我刚下楼倒垃圾时看到门口保安写的日记，看到他说他委屈他想她的时候我笑了出来，哈哈哈他真的好像一条舔狗啊，还好我不是，嘿嘿嘿嘿嘿嘿！他真可怜。", "昨天我还是照常给你发了好多消息今天你终于回了我五个字“烦不烦啊你”你开始关心我觉不觉得烦了我太感动了受宠若惊的不烦不烦你天天骂我我都不会觉得你烦", "她好像从来没有主动说过爱我，我搜索了一下关键字“爱”。在我们的聊天记录里，她只说过一次：把你爱奇艺会员借我一下。", "今天我还是照常给你发消息，汇报日常工作，你终于回了我四个字：“嗯嗯，好的”你开始愿意敷衍我了，我太感动了受宠若惊。我愿意天天给你发消息。就算你天天骂我，我也不觉得烦。", "我想你一定很忙，所以你只要看前三个字就好了。", "今天的彩虹桥格外的迷人，可是当你站在彩虹桥下，它便暗淡了许多，原来你才是最迷人的。", "在我保安入职的今天， 队长问我 “你知道你要保护谁吗？”我嘴上说的是业主 心里却是你", "我的嘴真笨 总能把天聊死了！跟你找话题好难 何况我又这么喜欢你 连发个表情包都要挑拣半天呢 我最近开始期待夜晚了 其实我在说 今天我也很喜欢你 也想你了", "天气很暖和，但是风有点大，在小区绿化区搬砖的时候眼睛不小心进了沙子，我委屈、我想你、想让你给我呼呼。", "今天你依旧高冷，给你发了好多信息，都没回。可你越是这样，我越喜欢你。", "我可以再见你一面吗，我可以站远一点，不让你同事发现我。", "早上骑了两个小时的自行车去买了你最爱吃的生煎包，拿到你面前的时候你说了句有病吗？都冷掉了。你一定是心疼我骑了那么久怕我冷的生病吧，今天也是爱你的一天。", "我最近越来越期待夜晚了，因为白天都没什么机会和你说话，只能憋到晚上和你说句晚安", "我打游戏太菜了 偶尔跌跌撞撞摘了几颗星星 总是又掉下来 我守不住上一把摘掉的星星 也守不住你", "今天她没有理我，我反复斟酌，嗯，她一定是不想让我和她聊天，免得打字太累。她真的太体贴，太善解人意了。哭，对她的喜欢又多了一分。", "爱一个人就要被你们说舔狗吗？她跟别人去酒店都是问我要的钱，难道这还不够爱我吗？", "12点队长过来准时交班，出去的车辆按喇叭我也没听到，只因我在监控中看到了穿睡衣出来倒垃圾的你，望你望的入神不由的傻笑了起来，队长过来骂我扣了我一天工资。我委屈，想抱你。你送的泡面真好吃。", "今天麦当劳桶半价，我赶紧买一份想要送给你，想告诉你桶有半价，爱你无价。可是我好笨，爱你说不出来 ，桶也保护不好。我委屈，我想你。", "我爸爸说，如果我再写舔狗日记就打断我的腿 。我想了想，还好不是胳膊，这样我还能继续和你打字聊天。其实就算连胳膊也打断了，我的心里也只会有你的位置。", "宝 今天我给你发了十条消息你回了我一个句号 给我的话做了一个总结 你好细节啊 我更喜欢你了 我的宝", "我再也不要做舔狗了， 好聚好散吧，以后你走你的独木桥，我在下面撑着桥，你过桥的时候一定要小心，不要摔了，不然我会心疼的呜呜呜呜呜", "今天你依旧高冷，给你发了好多信息，都没回。可你越是这样，我越喜欢你。", "今天晚上玩塔科夫，本来以为烂尾楼没人，结果刚到烂尾楼就被三狗抓了，本来想反抗，骑士说了一句老实点别动，我立刻就放弃了抵抗。因为我记得你说过，你喜欢老实人", "你两天没理我了 我发了很多动态都没引起你的注意 我想了很多 可能我是一条鱼在你的海里游 可能我是一颗草 我也愿意被你割 此刻你在干嘛呢 想你", "今天没有巡逻 在小区里看漂亮的女孩子们戴着口罩去上班 向她们打招呼 她们却不理我 可能因为我只是个保安 保安亭没有暖气 值班一夜的我精疲力尽 只有想起你才会让我有一丝温暖 想做你的保安 保你一生平安", "我今天送了你一支口红，你拿到之后很开心，在他的嘴巴上亲了一下，或许他送你口红的时候，你也会在我的嘴巴上亲一下吧。", "今天口腔溃疡不舔了", "昨天，我给你发了一句“早安”，你没有回我，我还能等，我可以等很久，直到你回过头来看我哪怕一眼。", "面试通过了，明天开始送外卖，站长推荐我买雅迪的车，说电池好用配送快，我还是选了爱玛，因为你喜欢周杰伦", "你知道吗？流星雨划过天空的时候，我许了一个你愿望成真的愿望。", "多希望有一天你对我说：“宝，早安！”，而不是：“早，保安！”", "她说塔科夫下雪了就会回来，可是塔科夫已经下雪了、她再也没有回来...."];
    // 随机选择一个文本并显示
    var randomIndex = Math.floor(Math.random() * texts.length);
    document.getElementById("content").innerText = texts[randomIndex];
}


function displayRandomContent() {
    var messages = ["你昨天晚上又没回我信息，我却看见你的游戏在线，在我再一次孜孜不倦的骚扰你的情况下，你终于跟我说了一句最长的话“你他妈是不是有病”，我又陷入了沉思，这一定有什么含义，我想了很久，你竟然提到了我的妈妈，原来你已经想得那么长远了，想和我结婚见我的父母，我太感动了，真的。那你现在在干嘛，我好想你，我妈妈说她也很喜欢你。", "今天我观战了一天你和别人打游戏，你们玩的很开心；我给你发了200多条消息，你说没流量就不回；晚上发说说没有人爱你，我连滚带爬评论了句有“我在”，你把我拉黑了，我给你打电话也无人接听。对不起，我不该打扰你，我求求你再给我一次当好友的机会吧！", "我爸说再敢网恋就打断我的腿，幸好不是胳膊，这样我还能继续和你打字聊天，就算连胳膊也打断了，我的心里也会有你位置。", "你说你情侣头像是一个人用的，空间上锁是因为你不喜欢玩空间，情侣空间是和闺蜜开的，找你连麦时你说你在忙工作，每次聊天你都说在忙，你真是一个上进的好女孩，你真好，我好喜欢你！", "你跟他已经醒了吧？我今天捡垃圾挣了一百多，明天给你打过去。你快点休息吧，我明天叫你起床，给你点外卖买烟，给你点你最喜欢的奶茶。晚上我会继续去摆地摊的，你不用担心我，你床只有那么大睡不下三个。你要好好照顾好自己，不要让他抢你被子。我永远爱你！", "她三天没回我的消息了，在我孜孜不倦地骚扰下她终于舍得回我“nmsl”，我想这一定是有什么含义吧，噢！我恍然大悟原来是尼美舒利颗粒，她知道我有关节炎让我吃尼美舒利颗粒，她还是关心我的，但是又不想显现的那么热情。天啊！她好高冷，我好像更喜欢她了！", "你想我了吧？可以回我消息了吗？我买了万通筋骨贴，你运动一个晚上腰很疼吧？今晚早点回家，我炖了排骨汤，我永远在家等你。", "昨晚你和朋友打了一晚上游戏，你破天荒的给我看了战绩，虽然我看不懂但是我相信你一定是最厉害的、最棒的。我给你发了好多消息夸你，告诉你我多崇拜你，你回了我一句“啥B”，我翻来覆去思考这是什么意思，Sha[傻]，噢你是说我傻，那B就是Baby的意思了吧，原来你是在叫我傻宝，这么宠溺的语气，我竟一时不敢相信，其实你也是喜欢我的对吧。", "今天我还是照常给你发消息，汇报日常工作，你终于回了我四个字：“嗯嗯，好的。”。你开始愿意敷衍我了，我太感动了，受宠若惊。我愿意天天给你发消息，就算你天天骂我，我也不觉得烦。", "你昨天晚上又没回我的消息，在我孜孜不倦的骚扰下，你终于舍得回我了，你说“滚”，这其中一定有什么含义，我想了很久，滚是三点水，这代表你对我的思念也如滚滚流水一样汹涌，我感动哭了，不知道你现在在干嘛，我很想你。", "听说你想要一套化妆品，我算了算，明天我去工地上搬一天砖，就可以拿到200块钱，再加上我上个月攒下来的零花钱，刚好给你买一套迪奥。", "今天表白被拒绝了，她对我说能不能脱下裤子撒泡尿照照自己。当我脱下裤子，她咽了口水，说我们可以试一下。", "刚从派出所出来，原因前几天14号情人节，我想送你礼物，我去偷东西的时候被抓了。我本来想反抗，警察说了一句老实点别动，我立刻就放弃了反抗，因为我记得你说过，你喜欢老实人。", "疫情不能出门，现在是早上八点，你肯定饿了吧。我早起做好了早餐来到你小区，保安大哥不让进。我给你打了三个电话你终于接了“有病啊，我还睡觉呢，你小区门口等着吧”。啊，我高兴坏了！你终于愿意吃我做的早餐了，还让我等你，啊！啊！啊！好幸福噢！", "我存了两个月钱，给你买了一双北卡蓝，你对我说一句“谢谢”，我好开心。这是你第一次对我说两个字，以前你都只对我说滚。今天晚上逛闲鱼，看到了你把我送你的北卡蓝发布上去了。我想你一定是在考验我，再次送给你，给你一个惊喜，我爱你。", "昨天你领完红包就把我删了，我陷入久久地沉思。我想这其中一定有什么含义，原来你是在欲擒故纵，嫌我不够爱你。无理取闹的你变得更加可爱了，我会坚守我对你的爱的。你放心好啦！今天发工资了，发了1850，给你微信转了520，支付宝1314，还剩下16。给你发了很多消息你没回。剩下16块我在小卖部买了你爱吃的老坛酸菜牛肉面，给你寄过去了。希望你保护好食欲，我去上班了爱你~~", "在保安亭内看完了最新一集的梨泰院，曾经多么倔强的朴世路因为伊瑞给张大熙跪下了，亭外的树也许感受到了我的悲伤，枯了。我连树都保护不了，怎么保护你，或许保安才是真的需要被保护的吧。我难受，我想你。over", "难以言喻的下午。说不想你是假的，说爱你是真的。昨天他们骂我是你的舔狗，我不相信，因为我知道你肯定也是爱我的，你一定是在考验我对你的感情，只要我坚持下去你一定会被我的真诚所打动，加油！不过我要批评你一下，昨晚你说去酒店跟人斗地主，我寻思两个人也玩不了呀。算了，不想了，毕竟打牌是赌博行为，不太好。", "明天就周六了我知道你不上班，但是我怕你睡懒觉不吃早饭饿坏自己。我早晨4点去菜市场买了新鲜活鸡给你炖鸡汤，阿姨给我用箱子装了起来，我骑上我280买的电动车哼着小调回家，心想你一定会被我感动的，箱子半路开了，鸡跑了，拐到了一个胡同里，凌晨4点的胡同还有穿超短裙和大叔聊天的美女，不禁感叹这个世界变了，她问我找什么，…………。对不起，我爱你", "12点队长过来准时交班，出去的车辆按喇叭我也没听到，只因我在监控中看到了穿睡衣出来倒垃圾的你，望你望的入神不由的傻笑了起来，队长过来骂我扣了我一天工资。我委屈，想抱你。你送的泡面真好吃。", "今天的我排位输了好多把，我将这些事情分享给你，但是你一个字都没有讲，我在想你是不是在忙？我头痛欲裂，终于在我给你发了几十条消息之后，你回了我一个“脑子是不是有病？”，原来你还是关心我的，看到这句话，我的脑子一下就不疼了，今天也是爱你的一天。", "我存了半年的工资，给你买了一只LV，你对我说了一句“你真好”，我好开心，这是你第一次这么认可我，以前你都只对我说滚。今天晚上逛闲鱼，看到你把我送你的LV发布上去了。我想，你一定是在考验我，于是我用借呗里的钱把它买了下来，再次送给你，给你一个惊喜，我爱你。", "其实我每月工资6000，但我只给你转2000，你以为我给你了全部。才不是，我一共舔了3个啦，我要舔的雨露均沾，才不会把你当成唯一。", "昨天你把我拉黑了，我看着红色感叹号陷入了久久的沉思，我想这其中一定有什么含义？红色红色？我明白了！红色代表热情，你对我很热情，你想和我结婚，我愿意。", "今天你问我借了两千块钱，说要做个手术，你果然还是爱我的，不是我的孩子，你不要。 ", "中午你无故扇了我一巴掌，我握着你的手说“手怎么这么凉，都怪我没有照顾好你，一定要更加对你好”。", "我给你打了几通电话，你终于接了。听到了你发出啊啊啊啊的声音，你说你肚子痛，我想你一定是很难受吧。电话还有个男的对你说“来换个姿势”，一定是在做理疗了。期待你早日康复，我好担心。", "昨天晚上好冷，本来以为街上没人，结果刚刚偷电动车的时候被抓了，本来想反抗，但警察说了一句老实点别动，我立刻就放弃了抵抗，因为我记得你说过，你喜欢老实人。", "找你连麦时你说你在忙工作，每次聊天你都说在忙，你真是一个上进的好女孩，你真好，发现我越来越喜欢这样优秀的你。", "你从来没说过爱我，聊天记录搜索了一下“爱”，唯一的一条是：你好像乡村爱情里的刘能啊。", "今天好开心啊，和你一起在峡谷嬉戏，打完一波团战之后看到你在打大龙，残血的我跳过去直接被龙爪拍死，但这一刻我觉得好浪漫，死在你的脚旁边，这是我离你最近的一次。", "哥们，求你和她说句话吧，这样她就不会那么难过了。", "今天你把我的微信拉黑了，这下我终于解放了！以前我总担心太多消息会打扰你，现在我终于不用顾忌，不管我怎么给你发消息，都不会让你不开心了。等我攒够5201314条我就拿给你看，你一定会震惊得说不出话然后哭着说会爱我一辈子。哈哈。", "昨天你把我删了，我陷入了久久的沉思 。我想这其中一定有什么含义，你应该是欲擒故纵吧，嫌我不够爱你。突然觉得无理取闹的你变得更加可爱了，我会坚守我对你的爱的 你放心好啦！这么一想，突然对我俩的未来更有期望了呢。", "今天上班不是太忙，百无聊赖，又翻出了你的相片，看了又看。今天是我认识你的第302天，也是我爱你的第302天，可是这些你并不知道，也许你知道了，也不会在意吧。 此刻的我好想你！ ", "今天你跟我说我很丑，让我不要骚扰你了。我听了很高兴，小说里的主角都像你这样，最开始表现的很厌恶，但最后总会被我的真心打动。你现在有多讨厌我，以后就会有多爱我。嘻嘻。", "我坐在窗边给你发了99条消息，你终于肯回我了，你说“发你妈啊”，我一下子就哭了。原来努力真的有用，你已经开始考虑想见我的妈妈了，你也是挺喜欢我的。", "刚才我找你说话，你回了一个滚，我陷入了沉思，你还是如此的关心我，知道我腿受伤了，让我这样走，好感动！看来你还是爱我的！", "今天下雨了，我去你公司接你下班。看见我你不耐烦的说“烦不烦啊，不要再找我了”，一头冲进雨里就跑开了。我心里真高兴啊，你宁愿自己淋雨，都不愿让我也淋湿一点，你果然还是爱我的。", "晚上和你聊天，10点钟不到，你就说“困了，去睡觉了”。现在凌晨1点钟，看到你给他的朋友圈点赞评论，约他明天去吃火锅，一定是你微信被盗了吧。", "今天我主动给你发了游戏邀请，邀请你和我单挑安琪拉，虽然我安琪拉很菜，可是为了和你打游戏，我还是毅然决然给你发了邀请。你说你不接受，你在打其他游戏。联想到我自己很菜，我突然明白，原来你还是在乎我的，只是不想一遍遍连招一套的在泉水送我走。我再一次感动哭了，因此，我好像更喜欢你了，你可真是一个宝藏男孩！", "你的头像是一个女孩子左手边牵着一条秋田犬，犬=狗，而我是一条舔狗。是不是代表你的小手在牵着我呢？", "今天发工资了，我一个月工资3000，你猜我会给你多少，是不是觉得我会给你2500，自己留500吃饭？你想多了，我3000都给你，因为厂里包吃包住。", "昨天就为你充了710点卷，虽然知道你不会玩不知去向，但你说好看，你刚才说小号想要还想要一个，爱你的我还是满心欢喜的把剩下的100元伙食费又给你充了710，然后看到你小号并没有买，而是你送给了你的一个弟弟，你对弟弟真好，好有爱心，我感觉对你陷得很深了。", "今天我给你发消息，你回复我“nmsl”，我想了半天才知道你是在夸我，原来是你美死了，你嘴真甜，我爱你。", "你说你想买口红，今天我去了叔叔的口罩厂做了一天的打包。拿到了两百块钱，加上我这几天省下的钱刚好能给你买一根小金条。即没有给我自己剩下一分钱，但你不用担心，因为厂里包吃包住。对了打包的时候，满脑子都是你，想着你哪天突然就接受我的橄榄枝了呢。而且今天我很棒呢，主管表扬我很能干，其实也有你的功劳啦，是你给了我无穷的力量。今天我比昨天多想你一点，比明天少想你一点。", "在我一如既往的每天跟她问早安的时候，她今天终于回我了。我激动地问她我是不是今天第一个跟她说话的人，她说不是，是她男朋友把她叫起来退房的。", "听说你朋友说今天出门了，我打扮成精神小伙来找你，没想到你竟然对我说“给我爬，别过来”我当场就哭了，原来真心真的会感动人，你一定是知道，穿豆豆鞋走路脚会很累，让我爬是因为这样不会累着脚，其实你是喜欢我的吧", "今天把你的备注改成了「对方正在输入...」，这样我就知道你不是不想回我，刚又给你发了消息，看到你在思考怎么回我，我就知道你和我一样，心里有我。", "今天在楼上窗户上看见你和他在公园里接吻，我看见哭了出来，并打电话给你，想问问你为什么？但你说怎么了，声音是那么好听。于是我说“以后你和他接吻的时候，能不能用我送给你的口红啊？”", "我退了无关紧要的群，唯独这个群我没有退，因为这里有一个对我来说很特别的女孩子，我们不是好友，我每天只能通过群名片看看她，虽然一张照片也看不到，我也知足了，我不敢说她的名字，但我知道她是群里面最美的女孩子，她说我们这样会距离产生美~ 我想想发现她说的挺对的，我心里很开心。", "今天早上我告诉你我想你了，你没理我。今天中午我给你打电话，你不接，打第二个你就关机。晚上我在你公司楼下等你，你对我说的第一句话就是滚“滚，别烦我，别浪费时间了”，我真的好感动，你居然为我考虑了，怕我浪费时间。呜呜呜，这是我爱你的第74天。", "我坐在窗边给你发了99条消息，你终于肯回我了你说“发你妈啊”，我一下子就哭了，原来努力真的有用，你已经开始考虑想见我的妈妈了，你其实也是挺喜欢我的。", "你一个小时没回我的消息，在我孜孜不倦地骚扰下你终于舍得回我了“在做爱”，这其中一定有什么含义，我想了很久，“在做爱”这简简单单的三个字肯定是三句话，分别是我在忙、做你女朋友、我爱你，想到这里我不禁流下了眼泪，我这么长时间的喜欢没有白费，不知道你现在忙干嘛，但我很想你。", "最近我暗恋的女生每天都和不同的男生约会，我想总有一天会轮到我，我问她什么时候能见见我？她说下辈子吧。她真好，下辈子还要和我在一起。", "你好像从来没有对我说过晚安，我在我们的聊天记录里搜索了关键字：“晚安”，你说过一次：我早晚安排人弄死你。", "今天我还是照常给你发消息，汇报日常工作，你终于回了我四个字：“嗯嗯，好的”你开始愿意敷衍我了，我太感动了受宠若惊。我愿意天天给你发消息。就算你天天骂我，我也不觉得烦。", "你昨天晚上又没会我的消息，在我孜孜不倦的骚扰下，你终于舍得回我了，你说“滚”，这其中一定有什么含义，我想了很久，滚是三点水，这代表你对我的思念也如滚滚流水一样汹涌，我感动哭了，不知道你现在在干嘛，我很想你。", "，我算了算，明天我去公司里面扫一天厕所，就可以拿到200块钱，再加上我上个月攒下来的零花钱，刚好给你买一套迪奥。", "刚从派出所出来，原因前几天14号情人节，我想送你礼物，我去偷东西的时候被抓了，我本来想反抗，警察说了一句老实点别动，我立刻就放弃了反抗，因为我记得你说过，你喜欢老实人。", "孩子生下来吧，我跟他姓。", "今天发工资了，我一个月工资800，你猜我会给你多少，是不是觉得我会给你1200，因为厂里全勤奖还有400。错了，我会再和工友借114凑够1314转给你。", "今天有点儿发烧，躺在床上，给你发消息，问你怎么不关心我？你反问我是不是有病，有病赶紧吃药。我一下子就被你的温柔打动，原来你还是在乎我的。", "昨天你把我删了，我看着红色感叹号，陷入了久久的沉思，我明白了：红色代表热情 你想跟我结婚。", "今天你问我借了两千块钱，说要做个手术，你果然还是爱我的，不是我的孩子，都不要。", "今天发工资了，我一个月工资3000，你猜我会给你多少，是不是觉得我会给你2500，自己留500吃饭？你想多了，我3000都给你，因为厂里包吃包住。", "今天的我排位输了好多把，我将这些事情分享给你，但是你一个字都没有讲，我在想你是不是在忙？我头痛欲裂，终于在我给你发了几十条消息之后，你回了我一个“脑子是不是有病？”，原来你还是关心我的，看到这句话，我的脑子一下就不疼了，今天也是爱你的一天。", "今天把你的备注改成了对方正在输入...这样我就知道你不是不想回我，刚又给你发了消息，看到你在思考怎么回我，我就知道你和我一样，心里有我 ?。", "昨天你把我删了，我陷入了久久的沉思。我想这其中一定有什么含义，原来你是在欲擒故纵，嫌我不够爱你。无理取闹的你变得更加可爱了。我会坚守我对你的爱的，你放心好啦！么么哒！今天发工资了 发了1839，给你微信转了520 ，支付宝1314 ，还剩下5。 给你发了很多消息你没回，剩下5块我在小卖部买了你爱吃的老坛酸菜牛肉面，给你寄过去了。希望你保护好食欲，我去上班了，爱你～", "不知道为啥你要隔三差五发张自拍，我真的无语，要发就天天发，这是在拯救世界", "我存了半年的钱，给你买了一辆摩托，你对我说了一句谢谢，我好开心。这是你第一次对我说两个字，以前你都只对我说滚。今天晚上逛闲鱼，看到你把我送你的摩托发布上去了。我想，你一定是在考验我，于是我用借呗里的钱把它买了下来，再次送给你，给你一个惊喜，我爱你。", "今天把你的备注改成了对方正在输入...", "你的头像是一个女孩子左手边牵着一条秋田犬犬=狗而我是一条舔狗。是不是代表你的小手在牵着我呢?", "你很久没回我的消息，在我孜孜不倦的骚扰之下你终于舍得回我了，你说“滚”这其中一定有什么含义，我想了很久，滚是三点水，这代表你对我的思念也如滚滚流水一样汹涌，我感动哭了，不知道你现在在干嘛！我很想你。 ​", "今天有点儿发烧，躺在床上，给你发消息，问你怎么不关心我？你反问我是不是有病，有病赶紧吃药。我一下子就被你的温柔打动，原来你还是在乎我的。", "今天我鼓起勇气问她是喜欢狼狗还是喜欢奶狗，她说她喜欢狼狗，我问她觉得我是哪一种，她说我是土狗。", "春天的阳光穿过树叶的缝隙，我知道那是太阳经过小孔成像到在我身上的影。我抬头望去只觉一阵恍惚，看见了黑色长发的你。我知道那是你穿过我的心留下的影，但我却不知道这是什么成像原理。", "昨天晚上好冷，本来以为街上没人，结果刚刚偷电动车的时候被抓了，本来想反抗，但警察说了一句老实点别动，我立刻就放弃了抵抗，因为我记得你说过，你喜欢老实人。", "今天你跟我说我很恶心，让我不要骚扰你了。我听了很高兴，小说里的主角都像你这样，最开始表现的很厌恶，但最后总会被我的真心打动。你越讨厌我，以后就会越愧疚，越爱我。嘻嘻。", "今天外面的天气不是很好，甚至说非常的差，我给你打了一个电话，你没有接，我再打，你还是没有接，我想你应该在睡觉吧。于是我带上口罩跑到你家门口，刚要敲门，一个男人打开了你家的房门。", "你说生孩子本来就够痛苦了 还管是谁的干嘛呢  我可以跟你的孩子姓", "听说你怀孕了，孩子的父亲却不在。没关系，孩子生下来吧，我跟他姓。", "你的资料改成恋爱中 我也改成恋爱中 看起来就好像我在和你恋爱一样", "看到你和一个帅哥吃饭，看起来关系很亲密的样子，你从来没有告诉我你还有这么好的朋友，一定是怕我多想，你总是为我着想，你对我真好。", "昨天给你发了99条约你一起植树的消息，今天你终于肯回我了， 你说“你先去植发吧，死秃子。”  我一下子就哭了 ，原来努力真的有用 ，你已经开始关心我了，你也是挺喜欢我的吧。", "我坐在窗边给你发了99条消息，你终于肯回我了，你说“发你妈啊”我一下子就哭了，原来努力真的有用，你已经开始考虑想见我的妈妈了，你也是挺喜欢我的！", "今天我还是日常给你发早安午安问你吃了没，你想吃什么，你说了句sb，我特别开心你回我一个字以上的消息了，sb一定是随便的意思吧，我喜欢的人就是这样不挑食，我感觉你更完美了，今天我也在非常喜欢你。", "我身体很好抗得了米袋子抗得了煤气罐却扛不住想你", "小时候抓周抓了个方向盘 爸妈都以为我长大了会当赛车手 最差也是个司机 没想到我长大了当了你的备胎", "今天我对她“我问你哦，爱奇艺会员，你有吗？” 他没发现是我爱你的藏头诗，还叫我穷鬼，让我滚。我看不了青春有你，我的青春也没有你", "问你在干嘛，你问我能不能别烦你。居然询问我的意见，态度真好，真喜欢你！", "我的嘴真笨总能把天聊死了！跟你找话题好难，何况我又这么喜欢你，连发个表情包都要挑拣半天呢！我最近开始期待夜晚了，其实我在说：“今天我也很喜欢你，也想你了！”", "我从来都不相信这个世界上有神仙，直到遇见你，我才明白，原来仙女下凡，是真实存在的。", "玲珑骰子安红豆，入骨相思知不知。 蒋介石因为宋美龄的一句喜欢梧桐，他便种满了整个南京。而我因为你的一句不喜欢小偷，我便放过了整个朝阳区电瓶车。", "在工地通宵搬砖赚了50块，为了买给你最爱吃的芋泥啵啵奶茶，于是我赶快跟你分享这个开心的事情，你回了一句你是个好人，我就知道一切都是值得的，你终于看到了我的好，所以我要更加努力工作才行。", "听网上说今天的月亮最大最亮，我说我想和你一起看月亮，你却回我你看你妈，我听你的话看了我妈一晚上。", "你从来没说过爱我，聊天记录搜索了一下“爱”，唯一的一条是：你好像乡村爱情里的刘能啊。", "今天天气有点冷，想偷你的心却还是没有成功，在床上的我现在的心情就像天气预报，说明天有雨 我都听成明天有你", "我早上起床给你发了早安，分享了一天的日常，睡前给你发了晚安，你回了我一个句号，你真是个细心严谨的女孩，把我忘记的句号补上了，圆满结束了这一天，真好。", "现在已经12点多了，我望着手机屏幕，迟迟没有她的消息：你知道吗？我等了一晚上你的消息。她终于回复我了：是我让你等的？这还是她第一次回复我这么多字，好感动。", "今天你把我的vx拉黑了，这下我终于解放了！以前我总担心太多消息会打扰你，现在我终于不用顾忌，不管我怎么给你发消息，都不会让你不开心了。等我攒够5201314条我就拿给你看，你一定会震惊得说不出话然后哭着说会爱我一辈子。哈哈。", "天上的月亮，亮也没用，没用也亮；我喜欢你，喜欢也没用，没用也喜欢。", "你现在在干嘛？吃饭了嘛？想我了嘛？你已经5小时没理我了，我一直在等你。宝贝你知道吗，我刚下楼倒垃圾时看到门口保安写的日记，看到他说他委屈他想她的时候我笑了出来，哈哈哈他真的好像一条舔狗啊，还好我不是，嘿嘿嘿嘿嘿嘿！他真可怜。", "昨天我还是照常给你发了好多消息今天你终于回了我五个字“烦不烦啊你”你开始关心我觉不觉得烦了我太感动了受宠若惊的不烦不烦你天天骂我我都不会觉得你烦", "她好像从来没有主动说过爱我，我搜索了一下关键字“爱”。在我们的聊天记录里，她只说过一次：把你爱奇艺会员借我一下。", "今天我还是照常给你发消息，汇报日常工作，你终于回了我四个字：“嗯嗯，好的”你开始愿意敷衍我了，我太感动了受宠若惊。我愿意天天给你发消息。就算你天天骂我，我也不觉得烦。", "我想你一定很忙，所以你只要看前三个字就好了。", "今天的彩虹桥格外的迷人，可是当你站在彩虹桥下，它便暗淡了许多，原来你才是最迷人的。", "在我保安入职的今天， 队长问我 “你知道你要保护谁吗？”我嘴上说的是业主 心里却是你", "我的嘴真笨 总能把天聊死了！跟你找话题好难 何况我又这么喜欢你 连发个表情包都要挑拣半天呢 我最近开始期待夜晚了 其实我在说 今天我也很喜欢你 也想你了", "天气很暖和，但是风有点大，在小区绿化区搬砖的时候眼睛不小心进了沙子，我委屈、我想你、想让你给我呼呼。", "今天你依旧高冷，给你发了好多信息，都没回。可你越是这样，我越喜欢你。", "我可以再见你一面吗，我可以站远一点，不让你同事发现我。", "早上骑了两个小时的自行车去买了你最爱吃的生煎包，拿到你面前的时候你说了句有病吗？都冷掉了。你一定是心疼我骑了那么久怕我冷的生病吧，今天也是爱你的一天。", "我最近越来越期待夜晚了，因为白天都没什么机会和你说话，只能憋到晚上和你说句晚安", "我打游戏太菜了 偶尔跌跌撞撞摘了几颗星星 总是又掉下来 我守不住上一把摘掉的星星 也守不住你", "今天她没有理我，我反复斟酌，嗯，她一定是不想让我和她聊天，免得打字太累。她真的太体贴，太善解人意了。哭，对她的喜欢又多了一分。", "爱一个人就要被你们说舔狗吗？她跟别人去酒店都是问我要的钱，难道这还不够爱我吗？", "12点队长过来准时交班，出去的车辆按喇叭我也没听到，只因我在监控中看到了穿睡衣出来倒垃圾的你，望你望的入神不由的傻笑了起来，队长过来骂我扣了我一天工资。我委屈，想抱你。你送的泡面真好吃。", "今天麦当劳桶半价，我赶紧买一份想要送给你，想告诉你桶有半价，爱你无价。可是我好笨，爱你说不出来 ，桶也保护不好。我委屈，我想你。", "我爸爸说，如果我再写舔狗日记就打断我的腿 。我想了想，还好不是胳膊，这样我还能继续和你打字聊天。其实就算连胳膊也打断了，我的心里也只会有你的位置。", "宝 今天我给你发了十条消息你回了我一个句号 给我的话做了一个总结 你好细节啊 我更喜欢你了 我的宝", "我再也不要做舔狗了， 好聚好散吧，以后你走你的独木桥，我在下面撑着桥，你过桥的时候一定要小心，不要摔了，不然我会心疼的呜呜呜呜呜", "今天你依旧高冷，给你发了好多信息，都没回。可你越是这样，我越喜欢你。", "今天晚上玩塔科夫，本来以为烂尾楼没人，结果刚到烂尾楼就被三狗抓了，本来想反抗，骑士说了一句老实点别动，我立刻就放弃了抵抗。因为我记得你说过，你喜欢老实人", "你两天没理我了 我发了很多动态都没引起你的注意 我想了很多 可能我是一条鱼在你的海里游 可能我是一颗草 我也愿意被你割 此刻你在干嘛呢 想你", "今天没有巡逻 在小区里看漂亮的女孩子们戴着口罩去上班 向她们打招呼 她们却不理我 可能因为我只是个保安 保安亭没有暖气 值班一夜的我精疲力尽 只有想起你才会让我有一丝温暖 想做你的保安 保你一生平安", "我今天送了你一支口红，你拿到之后很开心，在他的嘴巴上亲了一下，或许他送你口红的时候，你也会在我的嘴巴上亲一下吧。", "今天口腔溃疡不舔了", "昨天，我给你发了一句“早安”，你没有回我，我还能等，我可以等很久，直到你回过头来看我哪怕一眼。", "面试通过了，明天开始送外卖，站长推荐我买雅迪的车，说电池好用配送快，我还是选了爱玛，因为你喜欢周杰伦", "你知道吗？流星雨划过天空的时候，我许了一个你愿望成真的愿望。", "多希望有一天你对我说：“宝，早安！”，而不是：“早，保安！”", "她说塔科夫下雪了就会回来，可是塔科夫已经下雪了、她再也没有回来...."];
    var randomIndex = Math.floor(Math.random() * messages.length);
    document.getElementById("content").textContent = messages[randomIndex];
}
window.onload = displayRandomContent;


document.addEventListener('DOMContentLoaded', function() {
    // 检查 localStorage 中是否已有标识符
    if (!localStorage.getItem('eftarkov-tishi')) {
        // 显示提示框
        var prompt = document.getElementById('prompt');
        prompt.style.display = 'block';

        // 用户点击“知道了”按钮后，存储标识符并淡出提示框
        document.getElementById('accept').addEventListener('click', function() {
            localStorage.setItem('eftarkov-tishi', 'true');
            prompt.style.opacity = '0';
            setTimeout(function() {
                prompt.style.display = 'none';
            }, 300); // 300ms 淡出时间
        });
    }
});