function Demo(data){
	this.data = data;
	this.box = null;
	this.categorys = null;
	this.loadWord = null;
	this.dd = null;
	this.iframe = null;
}
Demo.prototype = {
	//html结构
	init:function(id){
		this.box = document.getElementsByClassName(id+'Con')[0];
		this.categorys = document.createElement("div");
		this.categorys.className = "dorpdown";
		this.categorys.id = "categorys";
		this.categorys.innerHTML = "<div class='dt'><a href='javascript:;'>作品列表<i class='ci-right'><s>◇</s></i></a></div>";
		this.dd = document.createElement("div");
		this.dd.className = "dd";
		this.dd.style.display = "none";
		var ddInner = '';
		for(var i=0 ; i<this.data.length ; i++){
			var items = this.data[i];
			if(i == 0){
				ddInner += "<div class='dd-inner'><div class='item'><h3>" + items.text + "</h3><i>></i></div>";
			}else{
				ddInner += "<div class='item'><h3>" + items.text + "</h3><i>></i></div>";
			}
			if(i == this.data.length-1){
				ddInner += "</div>";
			}
		}
		this.dd.innerHTML += ddInner;
		this.iframe = document.createElement("div");
		this.iframe.className = "dorpdown-layer";
		this.iframe.style.display = "none";
		this.iframe.innerHTML = "<iframe style='width:999px;height:520px;display:none'></iframe><div class='loadWord'>正在加载...</div>";
		this.dd.appendChild(this.iframe);
		this.categorys.appendChild(this.dd);
		this.box.appendChild(this.categorys);

		var nav2item = document.createElement("div");
		nav2item.className = "nav2item";
		nav2item.innerHTML = '<ul><li><a href="#">首页</a></li><li><a href="#">服装城</a></li><li><a href="#">超市</a></li><li><a href="#">全球购</a></li><li><a href="#">拍卖</a></li><li><a href="#">数码</a></li><li><a href="#">金融</a></li></ul>';
		this.box.appendChild(nav2item);
		this.loadWord = document.getElementsByClassName("loadWord")[0];
	},
	//鼠标事件
	mouseAction:function(data){
		var that = this;
		var data = data;
		var items = this.box.getElementsByClassName("item");
		var duang = function(arr){
			document.getElementsByClassName("loadWord")[0].style.display = "block";
			that.iframe.firstChild.style.display = "none";
			for(var j=0 ; j<items.length ; j++){
				arr[j].classList.remove("hover");
			}
		}
		//进入列表
		this.categorys.onmouseover = function(event){
			this.classList.add("hover");
			that.dd.style.display = "block";
			document.body.style.overflow = "hidden";
		};
		//移出列表
		this.categorys.onmouseout = function(event){
			if(isMouseLeaveOrEnter(event,this)){
				this.classList.remove("hover");
				that.dd.style.display = "none";
				that.iframe.style.display = "none";
				that.iframe.firstChild.src = "";
				duang(items);
				document.body.style.overflow = "visible";
			}
		};
		
		for(var i=0 ; i<items.length ; i++){
			items[i].index = i;
			items[i].onmouseover = function(event){
				var they = this;
				if(!isMouseLeaveOrEnter(event, this)){
					return false;
				}
				for(var j=0 ; j<items.length ; j++){
					items[j].classList.remove("hover");
				}
				this.classList.add("hover");
				that.iframe.style.display = "block";
				setTimeout(function(){
					if (they.classList.contains("hover")) {
						that.iframe.firstChild.src = data[they.index].url;
						document.getElementsByClassName("loadWord")[0].style.display = "block";
						that.iframe.firstChild.style.display = "none";
					}
				},200);
			};
			items[i].onmouseout = function(event){
				//移到子节点不触发
				if(!isMouseLeaveOrEnter(event, this)){
					return false;
				}
				setTimeout(function(){
					var obj = event.relatedTarget || event.toElement;
					if (obj == that.iframe.firstChild) {
						that.iframe.style.display = "block";
					}
				},300);
			};
		}
		//离开展示框体
		this.iframe.firstChild.onmouseout = function(event){
			setTimeout(function(){
				if (isMouseLeaveOrEnter(event,that.dd)) {
					that.iframe.style.display = "none";
					that.iframe.firstChild.src = "";
					duang(items);
					document.body.style.overflow = "visible";
				}
			},500);
		};
	},
	iframeLoad:function(){
		var that = this;
		this.iframe.firstChild.onload = function(){
			if (this.src != "http://adriantao.github.io/") {
				this.style.display = "block";
				that.loadWord.style.display = "none";
			}
		};
	}
}
addLoadEvent(function(){
	var demo = new Demo([
		{url:"http://adriantao.github.io/demo/drag/01/index.html",text:"可拖动并改变大小的窗体"},
		{url:"http://adriantao.github.io/demo/2048/index.html",text:"2048"},
		{url:"http://adriantao.github.io/demo/snake/index.html",text:"贪吃蛇"},
		{url:"http://adriantao.github.io/demo/Tetris/index.html",text:"俄罗斯方块"},
		{url:"http://adriantao.github.io/demo/calculator/index.html", text:"web计算器"},
		{url:"http://adriantao.github.io/demo/drag/02/index.html", text:"滑动验证"},
		{url:"http://adriantao.github.io/demo/slide/01/index5.html", text:"仿淘宝首页图片轮换"},
		{url:"http://adriantao.github.io/demo/slide/02/index.html", text:"多个图片轮换"},
		{url:"http://adriantao.github.io/demo/slide/03/index.html", text:"仿亚马逊首页图片轮换"},
		{url:"http://adriantao.github.io/demo/mobile/index.html",text:"移动端效果展示"},
		{url:"http://adriantao.github.io/demo/other/page/index2.html",text:"页码效果"},
		{url:"http://adriantao.github.io/demo/other/1/index.html", text:"简易评分"}
	]);
	demo.init("nav2");
	demo.mouseAction(demo.data);
	demo.iframeLoad();
});