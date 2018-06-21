var oUl = document.getElementsByTagName('ul')[0];
var oLeftBtn = document.getElementsByClassName('leftBtn')[0];
var oRightBtn = document.getElementsByClassName('rightBtn')[0];
var timer = null;
var moveDis = oUl.children[0].offsetWidth;
var num = oUl.children.length - 1;
var index = 0;
var oSpanArray = document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span');
var flag = true;

for (var i = 0;i < oSpanArray.length;i++) {
    (function (_index) {
        oSpanArray[_index].onclick = function () {
            flag = false;
            clearTimeout(timer);
            index = _index;
            startMove(oUl,{left: -(_index * moveDis)},function () {
                changeIndex(index);
                flag = true;
                timer = setTimeout(function () {
                    autoMove('->');
                },1500)
            });
        }
    })(i)
}

//按向左移动的按钮
oLeftBtn.onclick = function () {
    autoMove('<-');
}

// 按向右移动的按钮
oRightBtn.onclick = function () {
    autoMove('->');
}

function autoMove(direction) {
    if (flag) {
        flag = false;
        clearTimeout(timer);
        if (direction === '->') {
            index++;
            startMove(oUl,{left:oUl.offsetLeft - moveDis},function () {
                if (oUl.offsetLeft === -moveDis * num) {
                    oUl.style.left = '0px';
                    index = 0;
                }
                flag = true;
                changeIndex(index);
                timer = setTimeout(function () {
                    autoMove('->');
                },1500)
            });
        }else {
            if (oUl.offsetLeft === 0) {
                oUl.style.left = -moveDis * num +'px';
                index = 4;
            }
            index--;
            startMove(oUl,{left:oUl.offsetLeft + moveDis},function () {
                flag = true;
                changeIndex(index);
                timer = setTimeout(function () {
                    autoMove('->');
                },1500);
            })
        }
    }
}

function changeIndex (index) {
    for (var i = 0;i < oSpanArray.length;i++) {
        oSpanArray[i].className = '';
    }
    oSpanArray[index].className = 'active';
}

timer = setTimeout(function () {
    autoMove('->');
},1500)