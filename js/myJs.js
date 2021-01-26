//menu
$(document).ready(function(){
	$(".menu_down").hover(function(){$(this).children("dl").show(200);},function(){$(this).children("dl").hide();});
	$(".menu ul li:last").css({background:"none",borderRight:"none"})
	$(".menu ul li").hover(function(){$(this).find("span a").addClass("menu_hover")},function(){$(this).find("span a").removeClass("menu_hover")})
})

//banner_01
$(function() {
	var sWidth = $(".banner_01").width(); //获取焦点图的宽度（显示面积）
	var len = $(".banner_01 ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
	$(".banner_01").append(btn);
	$(".banner_01 .btnBg").css("opacity",0.3);
 
	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$(".banner_01 .btn span").css("opacity",0.4).mouseenter(function() {
		index = $(".banner_01 .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");
 
	//上一页、下一页按钮透明度处理
	$(".banner_01 .preNext").css("opacity",0.05).hover(function() {
		$(this).stop(true,false).animate({"opacity":"0.3"},300);
	},function() {
		$(this).stop(true,false).animate({"opacity":"0.05"},300);
	});
 
	//上一页按钮
	$(".banner_01 .pre").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});
 
	//下一页按钮
	$(".banner_01 .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});
 
	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$(".banner_01 ul").css("width",sWidth * (len));
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$(".banner_01").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},4000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$(".banner_01 ul").stop(true,false).animate({"left":nowLeft},500); //通过animate()调整ul元素滚动到计算出的position
		//$(".banner_02 .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$(".banner_01 .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
	}
});

//scroll_left
$(document).ready(function(){
	$(".scroll_scale").hover(function(){$(this).css("background","#e4e4e4")},function(){$(this).css("background","#fff")}
	)
})

//Add------------------------------------------------------------------------------------------------
//product_show
$(document).ready(function(){
	$(".product_show ul li").hover(
		function(){$(this).addClass("hover2")},function(){$(this).removeClass("hover2")}
	)
})



