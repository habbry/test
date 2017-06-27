// //模拟数据
// var data = [{
// 	"src":"1.jpg",
// 	"title":"第一怪 竹筒当烟袋"
// },{
// 	"src":"2.jpg",
// 	"title":"第二怪 草帽当锅盖"
// },{
// 	"src":"3.jpg",
// 	"title":"第三怪 这边下雨那边晒"
// },{
// 	"src":"4.jpg",
// 	"title":"第四怪 四季服装同穿戴"
// },{
// 	"src":"5.jpg",
// 	"title":"第五怪 火车没有汽车快"
// },{
// 	"src":"6.jpg",
// 	"title":"第六怪 火车不通国内通国外"
// },{
// 	"src":"7.jpg",
// 	"title":"第七怪 老奶爬山比猴快"
// },{
// 	"src":"8.jpg",
// 	"title":"第八怪 鞋子后面多一块"
// },{
// 	"src":"9.jpg",
// 	"title":"第九怪 脚趾四季露在外"
// },{
// 	"src":"10.jpg",
// 	"title":"第十怪 鸡蛋拴着卖"
// },{
// 	"src":"11.jpg",
// 	"title":"第十一怪 粑粑叫饵块"
// },{
// 	"src":"12.jpg",
// 	"title":"第十二怪 花生蚕豆数堆卖"
// },{
// 	"src":"13.jpg",
// 	"title":"第十三怪 三个蚊子一盘菜"
// },{
// 	"src":"14.jpg",
// 	"title":"第十四怪 四个竹鼠一麻袋"
// },{
// 	"src":"15.jpg",
// 	"title":"第十五怪 树上松毛扭着买"
// },{
// 	"src":"16.jpg",
// 	"title":"第十六怪 姑娘叫老太"
// },{
// 	"src":"17.jpg",
// 	"title":"第十七怪 和尚可以谈恋爱"
// },{
// 	"src":"18.jpg",
// 	"title":"第十八怪 背着娃娃再恋爱"
// }]

function waterfall(wrap,boxes){
	//获取屏幕可以显示的列数
	var boxWidth = boxes[0].offsetWidth + 20;
	var windowWidth = document.documentElement.clientWidth;
	var colsNumber = Math.floor(windowWidth/boxWidth);

	// 设置容器的宽度
	wrap.style.width = boxWidth * colsNumber +'px';


	// 定义一个数组并存储每列的高度
	var everyHeight = new Array();
	for (var i = 0; i < boxes.length; i++) {
		if(i < colsNumber){
			everyHeight[i] = boxes[i].offsetHeight + 20;
		} else {
			var minHeight = Math.min.apply(null,everyHeight);
			var minIndex = getIndex(minHeight,everyHeight);
			var leftValue = boxes[minIndex].offsetLeft - 10;
			boxes[i].style.position = "absolute";
			boxes[i].style.top = minHeight + 'px';
			boxes[i].style.left = leftValue + 'px';
			everyHeight[minIndex] += boxes[i].offsetHeight + 20;
		}
	}
};

//获取最小列的索引
function getIndex(minHeight,everyHeight){
	for (index in everyHeight){
		if(everyHeight[index] == minHeight){
			return index;
		}
	}
}

window.onload = function(){
	var wrap = document.getElementById('wrap');
	var boxes = wrap.getElementsByTagName('div');
	waterfall(wrap,boxes);
};