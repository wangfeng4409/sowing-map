function getStyle (obj , attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj,null)[attr];
    }else {
        return obj.currentStyle[attr];
    }
}

function startMove (obj, targetObj, cb) {
    clearInterval(obj.timer);
    var iSpeed, iCur;
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in targetObj) {
            if (attr != 'opacity') {
                iCur = parseInt(getStyle(obj, attr));
            }else {
                iCur = parseFloat(getStyle(obj, attr)) * 100;
            }
            iSpeed = (targetObj[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (attr == 'opacity') {
                obj.style.opacity = (iCur + iSpeed) / 100;
            }else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
            if (targetObj[attr] !== iCur) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            (typeof cb) === 'function' && cb.apply(obj);
        }
    },30);
}