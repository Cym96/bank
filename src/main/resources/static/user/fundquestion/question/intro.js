/*
 * Intro.js for Perbank
 *
 * Edited by Hua Da Ye
*/

(function (root, factory) {
    if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else {
        // Browser globals
        factory(root);
    }
}(this, function (exports) {
    function Intro(obj) {
        this._targetElement = obj;
        this._introElements = [];
        this._currentStep = 0;
        this.__onResize = null;
        this._options = {
            totalStep:0,
            exitOnEsc: true,
            keyboardNavigation: true,
            frameName: '',
            tooltipBasepath: '',
            tooltipPosition: {},
            exitOnOverlayClick: false,
            overlayOpacity: 0.8,
            overlayLayerClose: true,
            overlayLayerClosePosition: ['520px', '520px'],
            introExitCallback:null
        };
    }

    /*
     * Initiate a new introduction
    */
    function _introForElement(targetElm) {
        var introItems = [],self = this;
        var _parentIntroSteps = [], _sonIntroSteps = [], stepNodes = [];
        var totalSteps = self._options.totalStep;
        for (var p = 0; p < totalSteps; p++) {
            _parentIntroSteps = targetElm.querySelectorAll('*[data-step="' + (p+1) + '"]');
            for (var pp = 0, ppLen = _parentIntroSteps.length; pp < ppLen; pp++) {
                stepNodes = stepNodes || [];
                stepNodes.push({
                    element: _parentIntroSteps[pp],
                    id: _parentIntroSteps[pp].id,
                    step: _parentIntroSteps[pp].getAttribute('data-step'),
                    dom:'parent'
                });
            }
            if (self._options.frameName !== '') {
                _sonIntroSteps = document.getElementById(self._options.frameName).contentWindow.document.querySelectorAll('*[data-step="' + (p + 1) + '"]');
                for (var ss = 0, ssLen = _sonIntroSteps.length; ss < ssLen; ss++) {
                    stepNodes = stepNodes || [];
                    stepNodes.push({
                        element: _sonIntroSteps[ss],
                        id: _sonIntroSteps[ss].id,
                        step: _sonIntroSteps[ss].getAttribute('data-step'),
                        dom: 'son'
                    });
                }
            }
            //introItems[p] = [];
            introItems.push(stepNodes);
            stepNodes = [];
        }
        self._introItems = introItems;
        _addOverlayLayer.call(self, targetElm);
        _addOperatorLayer.call(self, targetElm);
        _nextStep.call(self);
        
        self._onResize = function (e) {
            var resizedHelperLayers = document.querySelectorAll('.introjs-helperLayer'),
                resizedReferLayers = document.querySelectorAll('.introjs-tooltipReferenceLayer');
            for (var i = 0, iLen = document.querySelectorAll('.introjs-helperLayer').length; i < iLen; i++) {
                _setHelperLayerPosition.call(self, resizedHelperLayers[i], document.getElementById(resizedHelperLayers[i].getAttribute('data-link')));
                if (($.browser.edge || ($.browser.ie && $.browser.ie > 8)) && resizedHelperLayers[i].getAttribute('data-link') == 'intro1-1') {
                    resizedHelperLayers[i].style.width = ((parseInt(resizedHelperLayers[i].style.width.replace(/px/g, ''), 10) + 6)) + 'px';
                }
                _setHelperLayerPosition.call(self, resizedReferLayers[i], document.getElementById(resizedReferLayers[i].getAttribute('data-link')));
            }
        }
        if (window.addEventListener) {
            //for window resize
            window.addEventListener('resize', self._onResize, true);
        } else if (document.attachEvent) { //IE
            //for window resize
            document.attachEvent('onresize', self._onResize);
        }
        
    }

    /*  
     * step show
    */
    function _showElments(step) {
        var self = this, currentStep = self._currentStep;
        //special solve
        if (step == 3) {
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            var winHeight = window.innerHeight || document.documentElement.clientHeight;
            var bottom = 20 - (scrollHeight - winHeight) + 'px';
            document.querySelector('.introjs-operator').setAttribute('style', 'bottom:' + bottom + ';');
            //document.querySelector('.introjs-operator').style.bottom = 20-(scrollHeight - window.innerHeight) + 'px';
        }
        else {
            document.querySelector('.introjs-operator').setAttribute('style', 'bottom:20px;');
            //document.querySelector('.introjs-operator').style.bottom = '20px';
        }
        //delete all currentStep refers
        var points = document.querySelectorAll('*[data-point]');
        for (var i = 0, iLen = points.length; i < iLen; i++) {
            points[i].className = points[i].className.replace(/point-[0-9]+/g, '').replace(/^\s+|\s+$/g, '');
        }
        var parentCurShowElements = document.querySelectorAll('*[data-step]');
        var sonCurShowElements = document.getElementById(self._options.frameName).contentWindow.document.querySelectorAll('*[data-step]');
        for (var i = 0, iLen = parentCurShowElements.length; i < iLen; i++) {
            parentCurShowElements[i].className = parentCurShowElements[i].className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');
            if (parentCurShowElements[i].id == 'intro1-2' && $.browser.ie && $.browser.ie < 9) parentCurShowElements[i].style.zIndex = '-1';
        }

        for (var i = 0, iLen = sonCurShowElements.length; i < iLen; i++) {
            sonCurShowElements[i].className = sonCurShowElements[i].className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');
            sonCurShowElements[i].onclick = function () {
                _exitIntro.call(self, self._targetElement);
            };
        }
        var parentCurHelperLayers = document.querySelectorAll('*[data-link]');
        var sonCurHelperLayers = document.getElementById(self._options.frameName).contentWindow.document.querySelectorAll('*[data-link]');
        for (var i = 0, iLen = parentCurHelperLayers.length; i < iLen; i++) {
            parentCurHelperLayers[i].parentNode.removeChild(parentCurHelperLayers[i]);
        }
        for (var i = 0, iLen = sonCurHelperLayers.length; i < iLen; i++) {
            sonCurHelperLayers[i].parentNode.removeChild(sonCurHelperLayers[i]);
        }
        //show all step refers
        document.querySelector('[data-point="' + step.toString() + '"]').className += ' point-' + step.toString();
        for (var c = 0, cLen = self._introItems[step - 1].length; c < cLen; c++) {
            var id = self._introItems[step - 1][c].id,
                dom = self._introItems[step - 1][c].dom;
            //element self
            if (dom == 'parent') {
                document.getElementById(id).className += ' introjs-showElement';
                if (typeof (document.getElementById(id).getAttribute('data-position')) !== 'undefined' && document.getElementById(id).getAttribute('data-position') == 'relative') {
                    document.getElementById(id).className += ' introjs-relativePosition';
                }
            }
            else {
                var sonDom = document.getElementById(self._options.frameName).contentWindow.document.getElementById(id);
                sonDom.className += ' introjs-showElement';
                if (typeof (sonDom.getAttribute('data-position')) !== 'undefined' && sonDom.getAttribute('data-position') == 'relative') {
                    sonDom.className += ' introjs-relativePosition';
                }
            }
            //helperLayer
            var helperLayer = document.createElement('div');
            helperLayer.className = 'introjs-helperLayer';
            helperLayer.setAttribute('data-link', id);
            helperLayer.setAttribute('data-helper', step);
            if (dom == 'parent') {
                _setHelperLayerPosition.call(self, helperLayer, document.getElementById(id));
                if (($.browser.edge || ($.browser.ie && $.browser.ie > 8)) && id == 'intro1-1') {
                    helperLayer.style.width = ((parseInt(helperLayer.style.width.replace(/px/g,''),10) + 6)) + 'px';
                }
                self._targetElement.appendChild(helperLayer);
            }
            else {
                _setHelperLayerPosition.call(self, helperLayer, document.getElementById(self._options.frameName).contentWindow.document.getElementById(id));
                if (step == 2 && id == 'intro2-1') {
                    helperLayer.style.top = ((parseInt(helperLayer.style.top.replace(/px/g, ''), 10) - 6)) + 'px';
                    helperLayer.style.left = ((parseInt(helperLayer.style.left.replace(/px/g, ''), 10) + 5)) + 'px';
                }
                if (step == 3) {
                    if (id == 'intro3-1') helperLayer.style.width = ((parseInt(helperLayer.style.width.replace(/px/g, ''), 10) - 30)) + 'px';
                    if (id == 'intro3-2') helperLayer.style.height = ((parseInt(helperLayer.style.height.replace(/px/g, ''), 10) - 18)) + 'px';
                }
                if (step == 4 && id == 'intro4-2') {
                    helperLayer.style.width = ((parseInt(helperLayer.style.width.replace(/px/g, ''), 10) - 16)) + 'px';
                }
                document.getElementById(self._options.frameName).contentWindow.document.body.appendChild(helperLayer);
            }
            //referLayer
            var referLayer = document.createElement('div');
            referLayer.className = 'introjs-tooltipReferenceLayer';
            referLayer.setAttribute('data-link', id);
            referLayer.setAttribute('data-refer', step);
            if (dom == 'parent') {
                _setHelperLayerPosition.call(self, referLayer, document.getElementById(id));
                self._targetElement.appendChild(referLayer);
            }
            else {
                _setHelperLayerPosition.call(self, referLayer, document.getElementById(self._options.frameName).contentWindow.document.getElementById(id));
                document.getElementById(self._options.frameName).contentWindow.document.body.appendChild(referLayer);
            }
            var tooltip = document.createElement('div');
            tooltip.className = 'introjs-tooltip';
            var _id = id.replace(/-/g, '_');
            if (self._options.tooltipPosition[dom + '_' + _id] != null) {
                if (self._options.tooltipPosition[dom + '_' + _id].top) tooltip.style.top = self._options.tooltipPosition[dom + '_' + _id].top;
                if (self._options.tooltipPosition[dom + '_' + _id].right) tooltip.style.right = self._options.tooltipPosition[dom + '_' + _id].right;
                if (self._options.tooltipPosition[dom + '_' + _id].bottom) tooltip.style.bottom = self._options.tooltipPosition[dom + '_' + _id].bottom;
                if (self._options.tooltipPosition[dom + '_' + _id].left) tooltip.style.left = self._options.tooltipPosition[dom + '_' + _id].left;
            }
            referLayer.appendChild(tooltip);
            var tooltipImg = document.createElement('img');
            if ($.browser.ie && $.browser.ie < 9 && id=='intro1-1') {
                tooltipImg.src = self._options.tooltipBasepath + '/intro/' + id.substr(5) + '-ie8.png';
            }
            else {
                tooltipImg.src = self._options.tooltipBasepath + '/intro/' + id.substr(5) + '.png';
            }
            tooltip.appendChild(tooltipImg);
        }
    }

    function _previousStep() {
        var self = this;
        if (typeof self._currentStep === 'undefined') {
            self._currentStep = 0;
        }
        else if (self._currentStep == 1) {
            return;
        }
        else {
            --self._currentStep;
            _gotoStep.call(self, self._currentStep);
        }
        if (self._introItems.length <= self._currentStep) {
            if (typeof (self._introCompleteCallback) === 'function') {
                self._introCompleteCallback.call(self);
            }
            _exitIntro.call(self, self._targetElement);
            return;
        }
    }

    function _nextStep() {
        var self = this;
        if (typeof self._currentStep === 'undefined') {
            self._currentStep = 0;
        }
        else if (self._currentStep == self._options.totalStep) {
            _exitIntro.call(self, self._targetElement);
            return;
        }
        else {
            ++self._currentStep;
            _gotoStep.call(self, self._currentStep);
        }
        //if (self._introItems.length <= self._currentStep) {
        //    if (typeof (self._introCompleteCallback) === 'function') {
        //        self._introCompleteCallback.call(self);
        //    }
        //    _exitIntro.call(self, self._targetElement);
        //    return;
        //}
    }

    function _gotoStep(step) {
        var self = this;
        //special things solve
        if (step == self._options.totalStep+1) {
            _exitIntro.call(self, self._targetElement);
        }
        else {   
            if (step == 1) {
                document.querySelector('.intro-head').style.display = '';
            }
            else if (step == 4) {
                document.querySelector('#nextStep').className = 'next-over';
                document.querySelector('.intro-close').style.marginLeft = self._options.overlayLayerClosePosition[1];
            }
            else {
                document.querySelector('.intro-head').style.display = 'none';
                document.querySelector('#nextStep').className = 'next-step';
                document.querySelector('.intro-close').style.marginLeft = self._options.overlayLayerClosePosition[0];
            }
            _showElments.call(self, step);
        }
    }

    function _exitIntro(targetElement) {
        //remove overlay layers from the page
        var self = this,
            parentOverlayLayer = targetElement.querySelector('.introjs-overlay'),
            sonOverlayLayer = document.getElementById(self._options.frameName).contentWindow.document.querySelector('.introjs-overlay');
        if (sonOverlayLayer) {
            sonOverlayLayer.parentNode.removeChild(sonOverlayLayer);
            targetElement.querySelector('.text-center').className = targetElement.querySelector('.text-center').className.replace(/intro-frame/g, '').replace(/^\s+|\s+$/g, '');         
        }
        if (parentOverlayLayer) {
            parentOverlayLayer.parentNode.removeChild(parentOverlayLayer);     
        }       
        //remove overlay operator from the page
        var operator = targetElement.querySelector('.introjs-operator');
        if (operator) {
            operator.parentNode.removeChild(operator);
        }
        //clear all showElements class
        var parentShowElements = targetElement.querySelectorAll('.introjs-showElement');
        if (parentShowElements && parentShowElements.length > 0) {
            for (var sindex = 0, slen = parentShowElements.length; sindex < slen; sindex++) {
                parentShowElements[sindex].className = parentShowElements[sindex].className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, ''); // This is a manual trim. 
                if (parentShowElements[sindex].id == 'intro1-2' && $.browser.ie && $.browser.ie < 9) parentShowElements[sindex].style.zIndex = '';
            }
        }
        var sonShowElements = document.getElementById(self._options.frameName).contentWindow.document.querySelectorAll('.introjs-showElement');
        if (sonShowElements && sonShowElements.length > 0) {
            for (var sindex = 0, slen = sonShowElements.length; sindex < slen; sindex++) {
                sonShowElements[sindex].className = sonShowElements[sindex].className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, ''); // This is a manual trim. 
            }
        }
        //remove `introjs-fixParent` class from the elements
        
        var sonFixParents = document.getElementById(self._options.frameName).contentWindow.document.querySelectorAll('.introjs-fixParent');
        if (sonFixParents && sonFixParents.length > 0) {
            for (var i = sonFixParents.length - 1; i >= 0; i--) {
                sonFixParents[i].className = sonFixParents[i].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
            }
        }
        //remove all helpers
        var parentHelperLayers = targetElement.querySelectorAll('*[data-link]');
        if (parentHelperLayers && parentHelperLayers.length > 0) {
            for (var hindex = 0, hlen = parentHelperLayers.length; hindex < hlen; hindex++) {
                parentHelperLayers[hindex].parentNode.removeChild(parentHelperLayers[hindex]);
            }
        }
        var sonHelperLayers = document.getElementById(self._options.frameName).contentWindow.document.querySelectorAll('*[data-link]');
        if (sonHelperLayers && sonHelperLayers.length > 0) {
            for (var hindex = 0, hlen = sonHelperLayers.length; hindex < hlen; hindex++) {
                sonHelperLayers[hindex].parentNode.removeChild(sonHelperLayers[hindex]);
            }
        }
        if ($.browser.ie && $.browser.ie < 9) {
            $("html").animate({ scrollTop: "1px" }, 30).animate({ scrollTop: "0px" }, 100);
        }
        //clean listeners
        if (window.removeEventListener) {
            window.removeEventListener('resize', self._onResize, true);
        } else if (document.detachEvent) { //IE
            document.detachEvent('onresize', self._onResize);
        }
        //set the step to zero
        self._currentStep = undefined;
        if (typeof (self._options.introExitCallback) === 'function') {
            self._options.introExitCallback.call(self);
        }
    }


    /*
     * makes a copy of the object
    */
    function _cloneObject(object) {
        if (object == null || typeof (object) != 'object' || typeof (object.nodeType) != 'undefined') {
            return object;
        }
        var temp = {};
        for (var key in object) {
            if (typeof (jQuery) != 'undefined' && object[key] instanceof jQuery) {
                temp[key] = object[key];
            } else {
                temp[key] = _cloneObject(object[key]);
            }
        }
        return temp;
    }

    /*
     * merge two objects
    */
    function _mergeObject(obj1,obj2) {
        var obj3 = {};
        for(var attr in obj1) obj3[attr]=obj1[attr];
        for(var attr in obj2) obj3[attr]=obj2[attr];
        return obj3;
    }

    function _setHelperLayerPosition(helperLayer, targetElement) {
        if (helperLayer) {
            var currentElement = targetElement,
            elementPosition = _getOffset(currentElement),
                widthHeightPadding = 10;
            if (_isFixed(currentElement)){
                if(helperLayer.className.indexOf('introjs-fixedTooltip') == -1) helperLayer.className += ' introjs-fixedTooltip';
            } else {
                helperLayer.className = helperLayer.className.replace(' introjs-fixedTooltip', '');
            }
            //set new position to helper layer
            helperLayer.setAttribute('style', 'width: ' + (elementPosition.width + widthHeightPadding) + 'px; ' +
                                              'height:' + (elementPosition.height + widthHeightPadding) + 'px; ' +
                                              'top:' + (elementPosition.top - 5) + 'px;' +
                                              'left: ' + (elementPosition.left - 5) + 'px;');

        }
    }

    function _getOffset(element) {
        var elementPosition = {};

        //set width
        elementPosition.width = element.offsetWidth;

        //set height
        elementPosition.height = element.offsetHeight;

        //calculate element top and left
        var _x = 0;
        var _y = 0;
        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
            _x += element.offsetLeft;
            _y += element.offsetTop;
            element = element.offsetParent;
        }
        //set top
        elementPosition.top = _y;
        //set left
        elementPosition.left = _x;

        return elementPosition;
    }

    function _isFixed(element) {
        var p = element.parentNode;

        if (!p || p.nodeName === 'HTML') {
            return false;
        }

        if (_getPropValue(element, 'position') == 'fixed') {
            return true;
        }

        return _isFixed(p);
    }

    function _getPropValue(element, propName) {
        var propValue = '';
        if (element.currentStyle) { //IE
            propValue = element.currentStyle[propName];
        } else if (document.defaultView && document.defaultView.getComputedStyle) { //Others
            propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
        }

        //Prevent exception in IE
        if (propValue && propValue.toLowerCase) {
            return propValue.toLowerCase();
        } else {
            return propValue;
        }
    }

    /**
   * Add overlay layer to the page
   */
    function _addOverlayLayer(targetElm) {
        var parentOverlayLayer = document.createElement('div'),
            sonOverlayLayer = document.createElement('div'),
            overlayLayerClose = document.createElement('i'),
            styleText = '',
            sonStyleText = '',
            sonOpacity = 0,
            self = this;
        //set css class name

        parentOverlayLayer.className = 'introjs-overlay';
        //check if the target element is body, we should calculate the size of overlay layer in a better way
        if (!targetElm.tagName || targetElm.tagName.toLowerCase() === 'body') {
            styleText += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
            parentOverlayLayer.setAttribute('style', styleText);
        } else {
            //set overlay layer position
            var elementPosition = _getOffset(targetElm);
            if (elementPosition) {
                styleText += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
                parentOverlayLayer.setAttribute('style', styleText);
            }
        }
        if (self._options.frameName != '') {
            document.querySelector('.text-center').className += ' intro-frame';
            sonOverlayLayer.className = 'introjs-overlay';
            sonOverlayLayer.setAttribute('style', styleText);
            document.getElementById(self._options.frameName).contentWindow.document.body.appendChild(sonOverlayLayer);
        }
        targetElm.appendChild(parentOverlayLayer);
        //close button for intro
        if (self._options.overlayLayerClose === true) {
            overlayLayerClose.className = 'intro-close';
            parentOverlayLayer.appendChild(overlayLayerClose);
            overlayLayerClose.onclick = function () {
                _exitIntro.call(self, targetElm);
            }
        }
        sonOverlayLayer.onclick = parentOverlayLayer.onclick = function () {
            if (self._options.exitOnOverlayClick == true) {
                //check if any callback is defined
                if (self._introExitCallback != undefined) {
                    self._introExitCallback.call(self);
                }
                _exitIntro.call(self, targetElm);
            }
        };
        setTimeout(function () {
            if (self._options.frameName != '') {
                sonStyleText = styleText;
                sonOpacity = self._options.overlayOpacity - 0.2;
                sonStyleText += 'opacity: ' + sonOpacity.toString() + ';';
                sonOverlayLayer.setAttribute('style', sonStyleText);
            }          
            styleText += 'opacity: ' + self._options.overlayOpacity.toString() + ';';
            parentOverlayLayer.setAttribute('style', styleText);
        }, 10);
        return true;
    };

    /**
   * Add intro-operator layer to the page
   */
    function _addOperatorLayer(targetElm) {
        var operatorLayer = document.createElement('div'),
            self = this,
            pointIndex = 0;
        operatorLayer.className = 'introjs-operator';
        targetElm.appendChild(operatorLayer);
        var introHead = document.createElement('p'),
            introHeadImg = document.createElement('img');
        introHead.className = 'intro-head';
        introHeadImg.src = self._options.tooltipBasepath + '/intro/intro-title.png';
        operatorLayer.appendChild(introHead);
        introHead.appendChild(introHeadImg);
        var operatorHead = document.createElement('p'),
            operatorNextStep = document.createElement('i');
        operatorHead.className = 'operator-head';
        operatorLayer.appendChild(operatorHead);
        operatorNextStep.id = 'nextStep';
        operatorNextStep.className = 'next-step';
        operatorHead.appendChild(operatorNextStep);
        var operatorPoint = document.createElement('p'),point = null;
        operatorPoint.className = 'operator-point';
        operatorLayer.appendChild(operatorPoint);
        for (var i = 0, iLen = self._options.totalStep; i < iLen; i++) {
            point = document.createElement('i');
            point.className = 'point';
            point.setAttribute('data-point', (i + 1).toString());
            pointIndex = i+1;
            //point.onclick = function () {
            //    _gotoStep.call(self, parseInt(this.getAttribute(data-point),10));
            //};
            operatorPoint.appendChild(point);
        }
        operatorNextStep.onclick = function () {
            _nextStep.call(self);
        };

    }

    var intro = function (targetElm) {
        if (typeof (targetElm) === 'object') {
            //Ok, create a new instance
            return new Intro(targetElm);

        } else if (typeof (targetElm) === 'string') {
            //select the target element with query selector
            var targetElement = document.querySelector(targetElm);

            if (targetElement) {
                return new Intro(targetElement);
            } else {
                throw new Error('There is no element with given selector.');
            }
        } else {
            return new Intro(document.body);
        }
    };

    intro.fn = Intro.prototype = {
        clone: function () {
            return new Intro(this);
        },
        setOption: function (option, value) {
            this._options[option] = value;
        },
        setOptions: function(options){
            _mergeObject(this._options,options);
        },
        start: function () {
            _introForElement.call(this, this._targetElement);
            return this;
        },
        gotoStep: function (step) {
            _gotoStep.call(this, step);
        },
        nextStep: function () {
            _nextStep.call(this);
        },
        previousStep: function () {
            _previousStep.call(this);
        },
        exit: function () {
            _exitIntro.call(this, this._targetElement);
            return;
        },
        refresh: function () {
            return;
        }
    };

    exports.intro = intro;
    return intro;

}));