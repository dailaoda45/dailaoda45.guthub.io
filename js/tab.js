var timoutid;
$(document).ready(function(){
	//找到所有的标签
	/*
	$("li").mouseover(function(){
		//将原来显示的内容区域进行隐藏
		$("div.contentin").hide();
		//当前标签所对应的内容区域显示出来
		});
	*/
	$("#tabfirst li").each(function(index){
		//每一个包装li的jquery对象都会执行function中的代码
		//index是当前执行这个function代码的li对应在所有li组成的数组中的索引值
		//有了index的值之后，就可以找到当前标签对应的内容区域
		$(this).mouseover(function(){	
			var liNode = $(this);
			timoutid = setTimeout(function(){
				//将原来显示的内容区域进行隐藏
				$("div.contentin").removeClass("contentin");
				//对有tabin的class定义的li清除tabin的class
				$("#tabfirst li.tabin").removeClass("tabin");
				//当前标签所对应的内容区域显示出来
				//$("div").eq(index).addClass("contentin");
				$("div.contentfirst:eq(" + index + ")").addClass("contentin");
				liNode.addClass("tabin");	
			},300);			
		}).mouseout(function(){
			clearTimeout(timoutid);	
		});
	});
});
