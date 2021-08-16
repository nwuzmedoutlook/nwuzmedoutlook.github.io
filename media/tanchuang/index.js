var baseurl='';
var onoff1 = true;//这是导航状态
var tanonoff = true;//弹幕的状态
var onoff = true;//语音状态
var viewOnoff = true;//全景状态
$(".pothook").click(function(){
	showNav();//显示或隐藏导航
})
var arrdata = [
	{"headimg":"img/tanmuhead.jpg","message":"66666","vote":3,"id":11,"state":1},
	{"headimg":"img/tanmuhead.jpg","message":"不错666","vote":21,"id":12,"state":0},
	{"headimg":"img/tanmuhead.jpg","message":"很好666很好很好很好","vote":2,"id":13,"state":1}
]

var locaScreen = [120,160,200,240,280];//弹幕位置
//初始化
var init = {
	"navdown":"img/navdown2.gif",
	"navup":"img/navup2.gif",
	"timer":500,
}
function showNav(){//导航栏
	$(".navContent").slideToggle(500);
	 if (onoff1) {
        $(".pothook").animate({ top: 0 }, 500)
        $(".pothook")[0].style.background = "url("+baseurl+"img/navdown2.gif) no-repeat";
        $(".pothook")[0].style.backgroundSize = "100% 80%";

    } else {
        $(".pothook").animate({ top: "70px" }, 500)
        $(".pothook")[0].style.background = "url("+baseurl+"img/navup2.gif) no-repeat";
        $(".pothook")[0].style.backgroundSize = "100% 80%";
    }
	onoff1 = !onoff1;
}

//var arrdata = [];

var num = -1;
var timer;
var timer1;
initScreen();//初始屏幕
function initScreen(){//初始化屏幕
	timer = setInterval(function(){
	    num ++;
	    if(num>arrdata.length-1){
	    	num = 0
	    }
//	  var div = document.createElement("div");
//	  div.className = "tanmu";
//	  div.innerHTML = '<span class="headImg"><img src="'+arrdata[num].headimg+'" /></span>'+arrdata[num].message;
//	  div.innerHTML += '<div class="praiseBox"><span class="t-praise"></span><span class="t-numer">'+arrdata[num].vote+'</span></div>';	
//	  div.innerHTML += '</span>';
	  $("#wrap").append(createScreenPraise(arrdata[num].headimg,arrdata[num].message,arrdata[num].vote,arrdata[num].state,arrdata[num].id));
		
	},6000);				
}	
//生成弹幕，给弹幕添加praise
function createScreenPraise(heading,message,vote,state,id){
	var div = document.createElement("div");
	var divContent = document.createElement("div");
	var divPraise = document.createElement("div");
	var color = "";
	var praise = '';
	if(state){//点过的状态1有颜色
		color = " t-color";
		praise = " t-praise1"
	}	
	divPraise.onclick = function(){
		vote++;
		alert(id);
	}	
	//消息和头像部分
	divContent.className = "tanmuContent";
	divContent.innerHTML = '<span class="headImg"><img src="'+heading+'" /></span>'+message;
	//点赞的部分
	divPraise.className ="praiseBox";
	divPraise.innerHTML += '<span class="t-praise '+praise+'"></span><span class="t-numer '+color+'">'+vote+'</span>';	
	divContent.appendChild(divPraise);
	//放入到最后tanmu元素里
	div.className = "tanmu";
	div.appendChild(divContent);
	createScreen(div)//执行生成弹幕的动画
	return div;
}


$(function(){//点击发送弹幕
	$(".s_sub").click(function(){
		clearInterval(timer);
		clearTimeout(timer1);
	    var text =$(".s_txt").val();
	    text = text.trim();
	    if(!text.length){
	   		//alert("请输入想发表的话");//这里是如果发送内容为空；可以加以提示
	   		$(".send").hide();
	   		return;
	    }
	    
	    
	    var img ="img/tanmuhead.jpg";
	    arrdata.push({"headimg":img,"message":text,"vote":0,"state":0});//把数据保存起来
	    
	    
	    
	    $("#wrap").append(createScreenPraise(img,text,0,0));
//	    var div = document.createElement("div");
//	    div.className = "tanmu";
//	    div.innerHTML = '<span class="headImg"><img src="'+img+'" /></span>'+text+'<span class="t-praise"></span></span>'; 			     
//	    $("#wrap").append(div);
//	   	createScreen(div);//执行生成弹幕的动画
	    $(".s_txt")[0].value = "";
	    $(".send").hide();
	    timer1 = setTimeout(function(){
	   		initScreen();//初始化屏幕
	    },2000)
	})
});

//给创建的弹幕增加事件
function clickPraise(elem){
	$(elem).click(function(){
		alert(123)
	})
}

//生成弹幕
var olN = 0;
function createScreen(elem){
	var _top=0;
	var _left=$(window).width();
	var _height=$(window).height();
	
	var lN= Math.floor(5*Math.random());
	
	if(olN ==lN){
		lN++;
		if(lN>locaScreen.length-1){
			lN = 0;
		}	
	}
	olN = lN;
	_top=locaScreen[lN];
//	console.log(locaScreen.length,_top)
	//初始弹幕的位置
	$(elem).css({left:_left,top:_top,color:"#333"});
	//执行动画时间
	var time=30000;
	//执行动画
	$(elem).animate({left:"-"+_left+"px"},time,function(){
		var docum = document.getElementById("wrap");
		docum.removeChild(this);
	});
	
}
//随机获取颜色值 ；这一个没有加可以在80行“初始弹幕的位置”color：getReandomColor();这样就会生效
function getReandomColor(){
	return '#'+(function(h){
	return new Array(7-h.length).join("0")+h
	})((Math.random()*0x1000000<<0).toString(16))
}

//导航栏部分的点击事件执行函数
var onoffTxt =  false;//文字滚动按钮加状态

var wid = $(".bzContent")[0].offsetWidth; 
var bzc = document.getElementsByClassName('bzContent')[0];

var aud = $('.audio')[0];//语音标签
var initScOnff = true;
//var times = aud.duration;//这里获取到的是秒，定时器转换毫秒；但是iso获取不audio的时间长度，可以用后台传过来
var times = 106*1000;//这里是

//新添加的弹幕，去掉
$(".tanClose")[0].addEventListener('click',adPlay, false);
function adPlay(ev){ 
	ev.stopPropagation();
    aud.play();
    aud.pause();
    document.body.removeChild($(".initScreen")[0]);
	    setTimeout(function(){
		animationTxt(bzc,times);
	},3000)
};

function animationTxt(elem,time){
	aud.play();	
	$(elem).css({left:0});
	$(elem).animate({left:"-"+wid+"px"},time,"linear",function(){
		setTimeout(function(){
			animationTxt(elem,time);
		},6000);
			
	})	
}


$(".c-wenzi")[0].onclick = function () {//文字开关
	if(onoffTxt){//判断文字是否显示
		$(".bz")[0].style.display="block";
		$(".navContent .navIco-wenzi")[0].style.background = "url("+baseurl+"img/icowz.png) no-repeat";
		$(".navContent .navIco-wenzi")[0].style.backgroundSize = "100% 100%";
	}else{
		$(".bz")[0].style.display="none";
		$(".navContent .navIco-wenzi")[0].style.background = "url("+baseurl+"img/icowzof.png) no-repeat";
		$(".navContent .navIco-wenzi")[0].style.backgroundSize = "100% 100%";
	}
	onoffTxt =!onoffTxt;
}

$(".c-yuyin")[0].onclick = function(){//语音开关
	
	if(onoff){
		
		aud.muted = false;
		$(".navContent .navIco-yuyin")[0].style.background = "url("+baseurl+"img/ico1g.png) no-repeat";
		$(".navContent .navIco-yuyin")[0].style.backgroundSize = "100% 100%";
	}else{
//		if(initScOnff){
//			aud.play();	
//		}
		aud.muted = true;
		$(".navContent .navIco-yuyin")[0].style.background = "url("+baseurl+"img/ico1k.png) no-repeat";
		$(".navContent .navIco-yuyin")[0].style.backgroundSize = "100% 100%";
	}
	onoff = !onoff;
}

$(".c-tanmu")[0].onclick = function(){//弹幕开关
	if(tanonoff){
		clearInterval(timer);
		$(".navIco-tanmu")[0].style.background = "url("+baseurl+"img/icotanmuoff.png) no-repeat";
		$(".navIco-tanmu")[0].style.backgroundSize = "100% 100%";
		for(var i = 0;i<$(".tanmu").length;i++){
			$(".tanmu")[i].style.display= "none";
		}		
	}else{
		$(".navIco-tanmu")[0].style.background = "url("+baseurl+"img/icotanmu.png) no-repeat";
		$(".navIco-tanmu")[0].style.backgroundSize = "100% 100%";
		for(var i = 0;i<$(".tanmu").length;i++){
			$(".tanmu")[i].style.display= "block";
		}
		initScreen();
	}
	tanonoff = !tanonoff;
	
}
$(".c-fatan")[0].onclick = function(){//发弹幕
	$(".send").show();
}



$(".c-src")[0].onclick = function(){//全景

	if(viewOnoff){
		$(".c-src span")[0].innerHTML = "地面游览";
		$(".navIco-src")[0].style.background = "url("+baseurl+"img/icodim.png) no-repeat";
		$(".navIco-src")[0].style.backgroundSize = "100% 100%";
		
		$(".model-wrap iframe")[0].src = "3d/index.html";		
	}else{
		$(".c-src span")[0].innerHTML = "空中俯瞰";
		$(".navIco-src")[0].style.background = "url("+baseurl+"img/icofukan.png) no-repeat";
		$(".navIco-src")[0].style.backgroundSize = "100% 100%";
		
		$(".model-wrap iframe")[0].src = "3d/index.html";				
	}
	viewOnoff = !viewOnoff;
}

