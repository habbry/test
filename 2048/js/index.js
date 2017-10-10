//  //返回角度  
// function GetSlideAngle(dx, dy) {  
//     return Math.atan2(dy, dx) * 180 / Math.PI;  
// }  

// //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动  
// function GetSlideDirection(startX, startY, endX, endY) {  
//     var dy = startY - endY;  
//     var dx = endX - startX;  
//     varresult = 0;  

//     //如果滑动距离太短  
//     if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {  
//         returnresult;  
//     }  

//     var angle = GetSlideAngle(dx, dy);  
//     if(angle >= -45 && angle < 45) {  
//         result = 4;  
//     }else if (angle >= 45 && angle < 135) {  
//         result = 1;  
//     }else if (angle >= -135 && angle < -45) {  
//         result = 2;  
//     }  
//     else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {  
//         result = 3;  
//     }  

//     return result;  
// }  

//滑动处理  
var startX, startY;  
document.addEventListener('touchstart',function (ev) {  
    startX = ev.touches[0].pageX;  
    startY = ev.touches[0].pageY;    
}, false);  
document.addEventListener('touchend',function (ev) {  
    var endX, endY;  
    endX = ev.changedTouches[0].pageX;  
    endY = ev.changedTouches[0].pageY;  
    var direction = GetSlideDirection(startX, startY, endX, endY);  
    switch(direction) {  
        case 0:  
             //没滑动 
            break;  
        case 1:  
            if(canMoveUp(checkerboard)){
               // 如果可以向上移动

               MoveUp();
               // 向上移动

               setTimeout(function(){
                   wheGameOver(checkerboard)
               },300);
               // 判断游戏是否结束

               setTimeout(function(){
                   randomNum();
               },200);
               // 随机产生一个数字
            } 
            break;  
        case 2:  
            if(canMoveDown(checkerboard)){
               // 如果可以向下移动

               MoveDown();
               // 向下移动

               setTimeout(function(){
                   wheGameOver(checkerboard)
               },300);
               // 判断游戏是否结束

               setTimeout(function(){
                   randomNum();
               },200);
               // 随机产生一个数字
            }  
            break;  
        case 3:  
            if(canMoveLeft(checkerboard)){
               // 如果可以向左移动

               MoveLeft();
               // 向左移动

               setTimeout(function(){
                   wheGameOver(checkerboard)
               },300);
               // 判断游戏是否结束,这里设置延时是因为要等到随机产生数字后再进行判断，如果不加
               // 延时，则最后一次的判断因为canMoveLeft(checkerboard)为false就不会再执行了

               setTimeout(function(){
                   randomNum();
               },200);
               // 随机产生一个数字
            }   
            break;  
        case 4:  
            if(canMoveRight(checkerboard)){
               // 如果可以向右移动

               MoveRight();
               // 向右移动

               setTimeout(function(){
                   wheGameOver(checkerboard)
               },300);
               // 判断游戏是否结束

               setTimeout(function(){
                   randomNum();
               },200);
               // 随机产生一个数字
            }  
            break;  
        default:             
    }  
}, false);  

// 次要的逻辑文件

// 获取位置
function getPos(num){
   return 20 + num*120;
}

// 设置分数
function updateScore(num){
   $('#score').text(num);
}

// 获取相应数字的背景颜色
function getBackgroundColor(number){

    switch (number) {
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}

   // 设置相应数字的文字颜色
function getColor(number){
    if (number <= 4) {
        return "#776e65"
    }
    return "white";
}

// 判断中间的数字格是否为0(行)
function noMiddleNumRow(row,col1,col2,checkerboard){
   for(var i=col1+1;i<col2;i++){
       if(checkerboard[row][i] != 0){
           return false;
       }
   }
   return true;
}

// 判断中间的数字格是否为0（列）
function noMiddleNumCol(col,row1,row2,checkerboard){
   for(var i=row1+1;i<row2;i++){
       if(checkerboard[i][col] != 0){
           return false;
       }
   }
   return true;
}


// 判断是否可以向左移动
function canMoveLeft(checkerboard){
   for(var i=0;i<4;i++){
       for(var j=1;j<4;j++){
           if(checkerboard[i][j] != 0){
               // 如果这个数字格它左边的数字格为空或者左边的数字格和它相等，则可以向左移动
               if(checkerboard[i][j-1] == 0 || checkerboard[i][j] == checkerboard[i][j-1]){
                   return true;
               }
           }
       }
   }
   return false;
}

// 判断是否可以向上移动
function canMoveUp(checkerboard){
       for(var i=1;i<4;i++){
           for(var j=0;j<4;j++){
               if(checkerboard[i][j] != 0){
                   // 如果这个数字格它上边的数字格为空或者上边的数字格和它相等，则可以向上移动
                   if(checkerboard[i-1][j] == 0 || checkerboard[i-1][j] == checkerboard[i][j]){
                       return true;
               }
           }
       }
   }
   return false;
}

// 判断是否可以向右移动
function canMoveRight(checkerboard){
   for(var i=0;i<4;i++){
       for(var j=2;j>=0;j--){
           if(checkerboard[i][j] != 0){
               if(checkerboard[i][j+1] == 0 || checkerboard[i][j] == checkerboard[i][j+1]){
                   return true;
               }
           }
       }
   }
   return false;
}

// 判断是否可以向下移动
function canMoveDown(checkerboard){
   for(var i=2;i>=0;i--){
       for(var j=0;j<4;j++){
           if(checkerboard[i][j] != 0){
               if(checkerboard[i+1][j] == 0 || checkerboard[i+1][j] == checkerboard[i][j]){
                   return true;
               }
           }
       }
   }
   return false;
}


// 向左移动
function MoveLeft(){
   for(var i=0;i<4;i++){
       for(var j=1;j<4;j++){
           if(checkerboard[i][j] != 0){
               for(var k=0;k<j;k++){
                   if(checkerboard[i][k] == 0 && noMiddleNumRow(i,k,j,checkerboard)){
                       moveAnimation(i,j,i,k);
                       checkerboard[i][k] = checkerboard[i][j];
                       checkerboard[i][j] = 0;
                   }else if(checkerboard[i][k] == checkerboard[i][j] && noMiddleNumRow(i,k,j,checkerboard) && !hasConflicted[i][k]){
                       moveAnimation(i,j,i,k);
                       checkerboard[i][k] += checkerboard[i][j];
                       checkerboard[i][j] = 0;

                       // 更新分数
                       score += checkerboard[i][k];
                       updateScore(score);

                       hasConflicted[i][k] = true;
                   }
               }
           }
       }
   }
   // 设置刷新的时间是为了让运动的动画走完在进行更新数字格，否则数字格运动的动画将会被打断
   setTimeout(function(){
       numFormat();
   },200);
}

// 向上移动
function MoveUp(){
   for(var i=1;i<4;i++){
       for(var j=0;j<4;j++){
           if(checkerboard[i][j] != 0){
               for(var k=0;k<i;k++){
                   if(checkerboard[k][j] == 0 && noMiddleNumCol(j,k,i,checkerboard)){
                       moveAnimation(i,j,k,j);
                       checkerboard[k][j] = checkerboard[i][j];
                       checkerboard[i][j] = 0;
                   }else if(checkerboard[k][j] == checkerboard[i][j] && noMiddleNumCol(j,k,i,checkerboard) && !hasConflicted[k][j]){
                       moveAnimation(i,j,k,j);
                       checkerboard[k][j] += checkerboard[i][j];
                       checkerboard[i][j] = 0;

                       // 更新分数
                       score += checkerboard[k][j];
                       updateScore(score);

                       hasConflicted[k][j] = true;
                   }
               }
           }
       }
   }
   setTimeout(function(){
       numFormat();
   },200);
}

// 向右移动
function MoveRight(){
   for(var i=0;i<4;i++){
       for(var j=2;j>=0;j--){
           if(checkerboard[i][j] != 0){
               for(var k=3;k>j;k--){
                   if(checkerboard[i][k] == 0 && noMiddleNumRow(i,j,k,checkerboard)){
                       moveAnimation(i,j,i,k);
                       checkerboard[i][k] = checkerboard[i][j];
                       checkerboard[i][j] = 0;
                   }else if(checkerboard[i][k] == checkerboard[i][j] && noMiddleNumRow(i,j,k,checkerboard) && !hasConflicted[i][k]){
                       moveAnimation(i,j,i,k);
                       checkerboard[i][k] += checkerboard[i][j];
                       checkerboard[i][j] = 0;

                       // 更新分数
                       score += checkerboard[i][k];
                       updateScore(score);

                       hasConflicted[i][k] = true;
                   }
               }
           }
       }
   }
   setTimeout(function(){
       numFormat();
   },200);
}

// 向下移动
function MoveDown(){
   for(var i=2;i>=0;i--){
       for(var j=0;j<4;j++){
           if(checkerboard[i][j] != 0){
               for(var k=3;k>i;k--){
                   if(checkerboard[k][j] == 0 && noMiddleNumCol(j,i,k,checkerboard)){
                       moveAnimation(i,j,k,j);
                       checkerboard[k][j] = checkerboard[i][j];
                       checkerboard[i][j] =0;
                   }else if(checkerboard[k][j] == checkerboard[i][j] && noMiddleNumCol(j,i,k,checkerboard) && !hasConflicted[k][j]){
                       moveAnimation(i,j,k,j);
                       checkerboard[k][j] += checkerboard[i][j];
                       checkerboard[i][j] =0;

                       // 更新分数
                       score += checkerboard[k][j];
                       updateScore(score);

                       hasConflicted[k][j] = true;
                   }
               }
           }
       }
   }
   setTimeout(function(){
       numFormat();
   },200);
}

// 动画逻辑文件

// 随机产生数字的动画
function randomNumAnimate(randomX,randomY,randomValue){
   var randomnum = $('#number-'+ randomX +'-'+ randomY);
   randomnum.css({
       backgroundColor:getBackgroundColor(randomValue),
       color:getColor(randomValue),
   })
            .text(randomValue)
            .animate({
               width:'100px',
               height:'100px',
               top:getPos(randomX),
               left:getPos(randomY)
            },50);
}

// 数字格移动的动画
function moveAnimation(fromx,fromy,tox,toy){
   var moveNum = $('#number-'+ fromx +'-'+ fromy);
   moveNum.animate({
       top:getPos(tox),
       left:getPos(toy)
   },200);
}

// 主要的逻辑文件

$(function(){
    newgame();
})

// 虚拟棋盘格
var checkerboard = [];
// 防止一个数字块在一次按键操作中被累加两次
var hasConflicted = [];
// 分数
var score = 0;
// 记录游戏是否结束
var gamerOver = false;
// 记录用户的操作是否有效
var operation = true;

function newgame(){
   // 初始化棋盘格
   initialize();

   // 分数清零
   score = 0;
   updateScore(0);

   // 记录游戏是否结束
   gamerOver = false;

   // 随机的在两个位置上显示两个数字
   randomNum();
   randomNum();

   // 用户可以操作
   operation = true;
}

// 初始化棋盘格
function initialize(){
   for(var i=0;i<4;i++){
       // 一维数组
       checkerboard[i] = [];
       hasConflicted[i] = [];
       for(var j=0;j<4;j++){
           // 二维数组，虚拟棋盘格初始化
           checkerboard[i][j] = 0;
           hasConflicted[i][j] = false;

           // 设置棋盘格的位置
           var everyCell = $('#cell-'+ i +'-'+ j);
           everyCell.css({top:getPos(i),left:getPos(j)});
       }
   }
   // 初始化数字格
   numFormat();
}

// 数字格
function numFormat(){
   // 清除之前的数字格
   $('.number').remove();
   for(var i=0;i<4;i++){
       for(var j=0;j<4;j++){
           $('#container').append('<div class="number" id="number-'+ i +'-'+ j +'"></div>')


           // 设置数字格的位置
           var everyNumber = $('#number-'+ i +'-'+ j);
           if(checkerboard[i][j] == 0){
               everyNumber.css({
                   width:'0px',
                   height:'opx',
                   top:getPos(i) + 50,
                   left:getPos(j) + 50
               })
           }else{
               everyNumber.css({
                   width:'100px',
                   height:'100px',
                   top:getPos(i),
                   left:getPos(j),
                   backgroundColor:getBackgroundColor(checkerboard[i][j]),
                   color:getColor(checkerboard[i][j])
               });
               everyNumber.text(checkerboard[i][j]);
           }
           hasConflicted[i][j] = false;
       }
   }
}

// 随机的在一个位置上产生一个数字
function randomNum(){
   // 随机产生一个坐标值
   var randomX = Math.floor(Math.random() * 4);
   var randomY = Math.floor(Math.random() * 4);

   // 随机产生一个数字（2或4）
   var randomValue = Math.random() > 0.5 ? 2 : 4;

   // 在数字格不为0的地方生成一个随机数字
   while(true){
       if(checkerboard[randomX][randomY] == 0){
           break;
       }else{
           if(gamerOver){
               break;
           }
           randomX = Math.floor(Math.random() * 4);
           randomY = Math.floor(Math.random() * 4);
       }
   }

   // 将随机产生的数字显示在随机的位置上
   checkerboard[randomX][randomY] = randomValue;

   // 动画
   randomNumAnimate(randomX,randomY,randomValue);
}

// 获取键盘事件，检测不同的按键进行不同的操作
$(document).keydown(function(event){
   switch(event.keyCode){
       case 37://左
           if( operation && canMoveLeft(checkerboard)){
               // 如果可以向左移动

               operation = false;

               MoveLeft();
               // 向左移动

               setTimeout(function(){
                   wheGameOver(checkerboard)
               },300);
               // 判断游戏是否结束,这里设置延时是因为要等到随机产生数字后再进行判断，如果不加
               // 延时，则最后一次的判断因为canMoveLeft(checkerboard)为false就不会再执行了

               setTimeout(function(){
                   randomNum();
               },200);
               // 随机产生一个数字

               setTimeout(function(){
                   operation = true;
               },260);


           }
           break;
       case 38://上
           if( operation && canMoveUp(checkerboard)){
               // 如果可以向上移动

               operation = false;

               MoveUp();
               // 向上移动

               setTimeout(function(){
                   wheGameOver(checkerboard)
               },300);
               // 判断游戏是否结束

               setTimeout(function(){
                   randomNum();
               },200);
               // 随机产生一个数字

               setTimeout(function(){
                   operation = true;
               },260);
           }
           break;
       case 39://右
           if( operation && canMoveRight(checkerboard)){
               // 如果可以向右移动

               operation = false;

               MoveRight();
               // 向右移动

               setTimeout(function(){
                   wheGameOver(checkerboard)
               },300);
               // 判断游戏是否结束

               setTimeout(function(){
                   randomNum();
               },200);
               // 随机产生一个数字

               setTimeout(function(){
                   operation = true;
               },260);
           }
           break;
       case 40://下
           if( operation && canMoveDown(checkerboard)){
               // 如果可以向下移动

               operation = false;

               MoveDown();
               // 向下移动

               setTimeout(function(){
                   wheGameOver(checkerboard)
               },300);
               // 判断游戏是否结束

               setTimeout(function(){
                   randomNum();
               },200);
               // 随机产生一个数字

               setTimeout(function(){
                   operation = true;
               },260);
           }
           break;
       default:
           break;
   }
});

// 判断游戏是否结束
function wheGameOver(checkerboard){
   if(!canMoveLeft(checkerboard) && !canMoveUp(checkerboard) && !canMoveRight(checkerboard) && !canMoveDown(checkerboard) ){
       showGameOver();
       gamerOver = true;
   }
}

// 显示游戏结束
function showGameOver(){
   $('#container').append("<div id='gameover'><p>最终得分</p><span>"+ score +"</span><a href='javascript:resert();'>重新开始游戏</a></div> ")
}

// 重新开始游戏
function resert(){
   $('#gameover').remove();
   newgame();
}