var MyMar,speed;

$(function (){
	WinLoadRun("");

	if (webTypeName == "home"){
		try{
			newGoPage(0);
		}catch (e){}

		// 首页签到按钮变换
		$("#qiandaoBtn").on("mouseenter", function() { 
			$id("qiandaoBtn").src = "inc_img/qiandaoBtn2.png";
		}).on("mouseleave", function(){
			$id("qiandaoBtn").src = "inc_img/qiandaoBtn.png";
		});

		try {
			//横向滚动
			speed=30;
			if ($id('caseMarX').offsetWidth<$id('caseMarX1').offsetWidth){
				$id('caseMarX2').innerHTML=$id('caseMarX1').innerHTML;
				$id('caseMarX3').innerHTML=$id('caseMarX1').innerHTML;
			}
			MyMar=setInterval(Marquee,speed)
			$id('caseMarX').onmouseover=function() { clearInterval(MyMar); }
			$id('caseMarX').onmouseout=function() { MyMar=setInterval(Marquee,speed); }
		}catch (e) {}

		try {
			$('.newMessItem').on('mouseover', function (){
				$(this).addClass('fontU');
				$(this).on("mouseenter", function (){
				}).on("mouseleave", function (){
					$(this).removeClass('fontU');
				});
			});
		}catch (e) {}
	}

});

function Marquee(){
	try {
		if($id('caseMarX2').offsetWidth-$id('caseMarX').scrollLeft<=0){
			$id('caseMarX').scrollLeft-=$id('caseMarX1').offsetWidth;
		}else{
			$id('caseMarX').scrollLeft+=1.8;
		}
	}catch (e) { clearInterval(MyMar); }
}

function ReplaceAll(string, search, replace) {
	return string.split(search).join(replace);
}

function ReplaceUrlChar(string, mode) {
	// encodeURI() !、#、$、&、'、(、)、*、,、-、.、/、:、;、=、?、@、_、~
	// encodeURIComponent() !、'、(、)、*、-、.、_、~
	string = ReplaceAll(string, '!', '%21');
	string = ReplaceAll(string, "'", '%27');
	string = ReplaceAll(string, '(', '%28');
	string = ReplaceAll(string, ')', '%29');
	string = ReplaceAll(string, '*', '%2A');
	string = ReplaceAll(string, '-', '%2D');
	string = ReplaceAll(string, '.', '%2E');
	string = ReplaceAll(string, '_', '%5F');
	string = ReplaceAll(string, '~', '%7E');
	string = ReplaceAll(string, '<', '%3C');
	string = ReplaceAll(string, '>', '%3E');
	if (mode == '' || mode == 'all' || mode == 'encodeURI' || mode == 'eu'){
		string = ReplaceAll(string, '#', '%23');
		string = ReplaceAll(string, '$', '%24');
		string = ReplaceAll(string, '&', '%26');
		string = ReplaceAll(string, ',', '%2C');
		string = ReplaceAll(string, '/', '%2F');
		string = ReplaceAll(string, ':', '%3A');
		string = ReplaceAll(string, ';', '%3B');
		string = ReplaceAll(string, '=', '%3D');
		string = ReplaceAll(string, '?', '%3F');
		string = ReplaceAll(string, '@', '%40');
	}
	if (mode == '' || mode == 'all'){
		string = ReplaceAll(string, ' ', '%20');
		// string = ReplaceAll(string, '%', '%25');
		string = ReplaceAll(string, '[', '%5B');
		string = ReplaceAll(string, ']', '%5D');
		string = ReplaceAll(string, '"', '%22');
		string = ReplaceAll(string, '+', '%2B');
		string = ReplaceAll(string, '\\', '%5C');
		string = ReplaceAll(string, '^', '%5E');
		string = ReplaceAll(string, '`', '%60');
		string = ReplaceAll(string, '{', '%7B');
		string = ReplaceAll(string, '|', '%7C');
		string = ReplaceAll(string, '}', '%7D');
	}
	return string;
}

// 最新消息翻页
var newTabPage = 1;
function newGoPage(mode){
	var tabCount = $('#newListArea').children('ul').length;
	if (mode == 1){
		newTabPage --;
		if (newTabPage < 1){ newTabPage = 1; }
	}else if (mode == 0){
		$("#currPage").html(newTabPage +"/"+ tabCount);
		return;
	}else{
		newTabPage ++;
		if (newTabPage > tabCount){ newTabPage = tabCount; }
	}
	$("#newListArea > ul").css("display","none");
	$("#newListArea > ul:eq("+ (newTabPage-1) +")").css("display","");
	$("#currPage").html(newTabPage +"/"+ tabCount);
	
}

// 手机版模式页头搜索表单检测
function CheckRefForm1(){
	refContStr = $id("refContent1").value;
	if (refContStr == '' || refContStr == refContentDef){
		alert("请输入要搜索的关键字");
		//$id("refContent2").value='';$id("refContent2").focus();
		return false;
	}
	refContEncodeStr=(refContStr);
	if (typeof(SYS_searchUrlMode)=="undefined"){
		try { console.log("[SYS_searchUrlMode]未定义"); }catch(e){}
		SYS_searchUrlMode = 0;
	}
	if (SYS_searchUrlMode==1 && $id("refMode1").value=="theme"){
		document.location.href=jsPathPart +"search/"+ ReplaceUrlChar(refContStr, 'all');
	}else{
		document.location.href=jsPathPart +"news/?list_refer-"+ $id("refMode1").value +"-"+ ReplaceUrlChar(refContEncodeStr, 'euc') +".html";
	}
	return false;
}


// 手机版模式页头搜索表单检测
function CheckRefForm2(){
	refContStr = $id("refContent2").value;
	if (refContStr == '' || refContStr == refContentDef){
		alert("请输入要搜索的关键字");
		//$id("refContent2").value='';$id("refContent2").focus();
		return false;
	}
	refContEncodeStr=(refContStr);
	if (typeof(SYS_searchUrlMode)=="undefined"){
		try { console.log("[SYS_searchUrlMode]未定义"); }catch(e){}
		SYS_searchUrlMode = 0;
	}
	if (SYS_searchUrlMode==1 && $id("refMode2").value=="theme"){
		document.location.href=jsPathPart +"search/"+ ReplaceUrlChar(refContStr, 'all');
	}else{
		document.location.href=jsPathPart +"news/?list_refer-"+ $id("refMode2").value +"-"+ ReplaceUrlChar(refContEncodeStr, 'euc') +".html";
	}
	return false;
}