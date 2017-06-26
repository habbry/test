//封装
function byId(id){
	return typeof(id) === "string" ?document.getElementById(id):id;
}

// console.log(byId("main"));

//全局变量
var index = 0,
	timer = null
	pics = byId("banner").getElementsByTagName('div'),
	dots = byId("dots").getElementsByTagName('span'),
	prev = byId("prev"),
	next = byId("next"),
	len = pics.length,
	subMenu = byId("sub-menu"),
	menu = byId("menu-content"),
	innerBox = subMenu.getElementsByClassName('inner-box'),
	menuItems = menu.getElementsByClassName('menu-item');


function slideImg(){
	var main = byId("main");
	//滑过清除定时器，离开继续
	main.onmouseover = function(){
		if(timer) clearInterval(timer);
	}
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++; 
			if(index >= len){
				index = 0
			}
			//切换图片
			changeImg();	
		},3000);
	}
	//自动触发
	main.onmouseout();

	//遍历所有点击，且绑定点击时间，点击圆点切换图像
	
	for(var d=0;d<len;d++){
		//给所有span添加一个id属性，值为d，作为span的索引
		dots[d].id = d;

		dots[d].onclick = function(){
			//改变index为当前span的索引
			index = this.id;

			//调用changeImg
			changeImg();
		}
	}

	//下一张
	next.onclick = function(){
		index++;
		if(index >= len) index=0;
		changeImg();
	}

	//上一张
	prev.onclick = function(){
		index--;
		if(index < 0) index=len-1;
		// console.log(index);
		changeImg();
	}
}

//导航菜单
//遍历主菜单，且绑定事件
	for(var m=0;m<menuItems.length;m++){
		menuItems[m].setAttribute("data-index",m);
		
		menuItems[m].onmouseover = function(){
			//给每个menu-item定义data-index属性，作为索引
			subMenu.className = "sub-menu";
			var idx = this.getAttribute("data-index");
			//遍历所有子菜单，将所有子菜单隐藏
			for(var j=0;j<innerBox.length;j++){
				innerBox[j].style.display = "none";
				menuItems[j].style.background = "none";
			}
			menuItems[idx].style.background = "rgba(0,0,0,0.1)";
			innerBox[idx].style.display = "block";
		}
		menu.onmouseout = function(){
			subMenu.className = "sub-menu hide";
		}
		subMenu.onmouseover = function(){
			this.className = "sub-menu";
		}
		subMenu.onmouseout = function(){
			this.className = "sub-menu hide";
		}
	}

	

//切换图片
function changeImg(){
	//遍历banner下的所有div，将其隐藏
	for(var i=0;i<len;i++){
		pics[i].style.display = 'none';
		dots[i].className = "";
	}
	//根据index索引找到当前的div，将其显示出来
	pics[index].style.display = 'block';
	dots[index].className = "active";
}

slideImg();


$(document).ready(function() {

	//登录链接事件
	$('#loginLink').click(function(){
		//显示弹出层遮罩
		$('#layer-mask').show();
		//显示弹出层窗体
		$('#layer-pop').show();
		
		//弹出层关闭按钮绑定事件
		$('#layer-close').click(function(event) {
			//弹出层关闭
			$('#layer-mask').hide()
			$('#layer-pop').hide()
		});

	})
});




