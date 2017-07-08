// 获取元素
var getElm = function(selector) {
    return document.querySelector(selector);
}

var getAllElm = function(selector) {
    return document.querySelectorAll(selector);
}

//获取元素样式
var getCls = function(element) {
    return element.getAttribute('class');
}

//设置元素样式
var setCls = function(element, cls) {
    return element.setAttribute('class', cls);
}

//为元素添加样式
var addCls = function(element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        setCls(element, baseCls + ' ' + cls)
    }
}

//为元素删除样式
var delCls = function(element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) != -1) {
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
    }
}

//初始化样式init
var screenAnimateElements = {
    '.screen-1': ['.screen-1__heading', '.screen-1__phone', '.screen-1__shadow', ],
    '.screen-2': ['.screen-2__heading', '.screen-2__phone', '.screen-2__subheading', '.screen-2__point_i_1', '.screen-2__point_i_2', '.screen-2__point_i_3', ],
    '.screen-3': ['.screen-3__heading', '.screen-3__phone', '.screen-3__subheading', '.screen-3__features', ],
    '.screen-4': ['.screen-4__heading', '.screen-4__subheading', '.screen-4__type__item_i_1', '.screen-4__type__item_i_2', '.screen-4__type__item_i_3', '.screen-4__type__item_i_4', ],
    '.screen-5': ['.screen-5__heading', '.screen-5__subheading', '.screen-5__bg',

    ]

};
//设置屏内元素为初始状态
var setScreenAnimateInit = function(screenCls) {
    var screen = document.querySelector(screenCls); //获取当前屏的元素
    var animatElements = screenAnimateElements[screenCls]; //需要设置动画的元素
    for (var i = 0; i < animatElements.length; i++) {
        var element = document.querySelector(animatElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls + ' ' + animatElements[i].substr(1) + '_animate_init');
    }
}

//设置播放屏内的元素动画
var playScreenAnimateDone = function(screenCls) {
    var screen = document.querySelector(screenCls); //获取当前屏的元素
    var animatElements = screenAnimateElements[screenCls]; //需要设置动画的元素
    for (var i = 0; i < animatElements.length; i++) {
        var element = document.querySelector(animatElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
    }
}

window.onload = function() {
    for (k in screenAnimateElements) {
        if (k === '.screen-1') {
            continue;
        }
        setScreenAnimateInit(k);
    }
}

// 滚动到第几屏幕，就播放到哪里

var navItems = getAllElm('.header__nav-item');
var outLineItems = getAllElm('.outline__item');

var switchNavItemsActive = function(index) {
    for (var i = 0; i < navItems.length; i++) {
        delCls(navItems[i], 'header__nav-item_status_active');
    }
    addCls(navItems[index], 'header__nav-item_status_active');
    for (var i = 0; i < outLineItems.length; i++) {
        delCls(outLineItems[i], 'outline__item_status_active');
    }
    addCls(outLineItems[index], 'outline__item_status_active');
}
switchNavItemsActive(0);
window.onscroll = function() {

    var top = document.body.scrollTop;

    if (top > 80) {
        addCls(getElm('.header'), 'header_status_back');
        addCls(getElm('.outline'), 'outline_status_in');
    } else {
        delCls(getElm('.header'), 'header_status_back');
        delCls(getElm('.outline'), 'outline_status_in');

        switchNavItemsActive(0);
    }

    if (top > 1) {
        playScreenAnimateDone('.screen-1');
        getElm('header');
        getElm('.header__nav-tip').style.left = 0 + 'px';

    }
    if (top > 800 * 1 - 130) {
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
        // console.log(this);
        getElm('.header__nav-tip').style.left = 70 + 'px';
    }
    if (top > 800 * 2 - 130) {
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2);
        getElm('.header__nav-tip').style.left = 140 + 'px';

    }
    if (top > 800 * 3 - 130) {
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3);
        getElm('.header__nav-tip').style.left = 210 + 'px';

    }
    if (top > 800 * 4 - 130) {
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4);
        getElm('.header__nav-tip').style.left = 280 + 'px';

    }
}

// 导航条、大纲双向定位
var setNavJump = function(i, lib) {
    var item = lib[i];
    item.onclick = function() {
        document.body.scrollTop = i * 800
    }
}

for (var i = 0; i < navItems.length; i++) {
    setNavJump(i, navItems);
}
for (var i = 0; i < outLineItems.length; i++) {
    setNavJump(i, outLineItems);
}

// 滑动门特效
var navTip = getElm('.header__nav-tip');
var setTip = function(index, lib) {
    lib[index].onmouseover = function() {
        //console.log(index,lib);
        navTip.style.left = (index * 70) + 'px';
    }

    var activeIndex = 0;
    lib[index].onmouseout = function() {
        for (var i = 0; i < lib.length; i++) {
            if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                activeIndex = i;
                break;
            }
        }
        navTip.style.left = (activeIndex * 70) + 'px';
    }
}
for (var i = 0; i < navItems.length; i++) {
    setTip(i, navItems);
}

setTimeout(function() {
    playScreenAnimateDone('.screen-1')
},
200)