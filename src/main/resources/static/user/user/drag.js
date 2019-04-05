// JavaScript Document

/*
 * dragDiv
 * param - oDiv: 被拖拽的对象
 * param - oDrag1 : 可以拖拽的区域 
 * */
function dragMove(oDiv, oDrag1) {
    var disX = 0;
    var disY = 0;
    if (!oDrag1) return;
    oDrag1.onmousedown = function (ev) {
        var marginLeft = parseInt(getStyle(oDiv, "marginLeft"));
        var marginTop = parseInt(getStyle(oDiv, "marginTop"));

        var maxHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)

        var oEvent = ev || event;
        var disX = oEvent.clientX - oDiv.offsetLeft + marginLeft;
        var disY = oEvent.clientY - oDiv.offsetTop + marginTop;

        function fnMove(ev) {
            var oEvent = ev || event;

            var l = oEvent.clientX - disX;
            var t = oEvent.clientY - disY;

            if (l + marginLeft < 0) {
                l = -marginLeft;
            }
            else if (l > document.documentElement.clientWidth - oDiv.offsetWidth - marginLeft) {
                l = document.documentElement.clientWidth - oDiv.offsetWidth - marginLeft;
            }

            if (t + marginTop < 0) {
                t = -marginTop;
            }
            else if (t > maxHeight - oDiv.offsetHeight - marginTop) {
                t = maxHeight - oDiv.offsetHeight - marginTop;
            }

            oDiv.style.left = l + 'px';
            oDiv.style.top = t + 'px';

        }

        function fnUp() {

            this.onmousemove = null;
            this.onmouseup = null;

            if (oDrag1.releaseCapture) {
                oDrag1.releaseCapture();
            }
        }

        if (oDrag1.setCapture) {
            oDrag1.onmousemove = fnMove;
            oDrag1.onmouseup = fnUp;

            oDrag1.setCapture();
        }
        else {
            document.onmousemove = fnMove;
            document.onmouseup = fnUp;
        }

        return false;
    };
}

function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name];
    }
}

//addEventBind
function addEvent(obj, sEv, fn) {
    if (obj.attachEvent) {
        obj.attachEvent('on' + sEv, fn);
    }
    else {
        obj.addEventListener(sEv, fn, false);
    }
}