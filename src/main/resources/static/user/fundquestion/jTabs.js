
+function($,window) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function(element) {
    this.element = $(element);
  };

  Tab.prototype.show = function() {
    var $this = this.element;
    var $ul = $this.closest('ul');
    var selector = $this.attr('href');
    var $target = $(selector);
    var $previous;
    var $previousTarget;
    if (!$this.hasClass('active')) {
      $previous = $ul.find('a.active');
      $previousTarget = $($previous.attr('href'));
      //previous
      $previous.length > 0 && $previous.removeClass('active');
      $previousTarget.length > 0 && $previousTarget.removeClass('active');

      //target
      $this.addClass('active');
      $target.addClass('active');
    }
    if ($this.attr('data-function')) {
     if (window[$this.attr('data-function')])
      window[$this.attr('data-function')]();
    } else if ($this.attr('data-method') == 'remote') {//ajax method
      var tolink = $this.attr('data-link');
      if (/.+\.(do|html)/.test(tolink)) {
        var text = $this.text();
        $this.text("加载中...");
        $target.load(tolink, function () {
          $this.text(text);
        });
      }
    } else if ($this.attr('data-method') == 'skip') { // transfer method
      selector = selector || $this.attr('data-link');
      if (/.+\.do(\?.*)?/.test(selector)) {
        $this.text("加载中...");
        window.location.href = selector;
      }
    } else if ($this.attr('data-method') == 'frame') {//iframe method
      var link = $this.attr('data-link');
      if (/.+\.(do|html)/.test(link)) {
        $target.find('iframe').load(iframeLoaded).attr('src', link);
      }
    }
  };
  var setFrameHeight = function (iframe,scroll) {
    if (iframe === undefined ) {
      iframe = $('iframe[name="contentFrame"]').get(0);
    }
    var frmWindow = iframe.contentWindow;
    var scrollHeight = 0;
    var screenHeight = window.screen.height - 400;
    if (frmWindow.document.body) {
      scrollHeight = Math.min(frmWindow.document.body.scrollHeight, frmWindow.document.documentElement.scrollHeight);
    }
    var realHeight = screenHeight > scrollHeight ? screenHeight : scrollHeight;
    $(iframe).height(realHeight);
    if (parent && parent.changeFrameHeight) {
      parent.changeFrameHeight("0");
    }
  };
  window.changeFrameHeight = setFrameHeight;
  var iframeLoaded = function() {
    var that = this, frmWindow = that.contentWindow;
    // 解决高度改变后滚动条位置变动，记录初始位
    $(frmWindow.document).click(function (e) {
      $(that).height() > 0 && setFrameHeight(that, "0");
    });
    $(frmWindow.document).bind('contextmenu', function (event) {
      frmWindow.event.returnValue = false;
    });
    setFrameHeight(that);
  };

  // TAB PLUGIN
  // =====================

  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('bs.tab');
      if (!data) $this.data('bs.tab', (data = new Tab(this)));
      if (typeof option == 'string') data[option]();
    });
  }


  var old = $.fn.tab;

  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab;

  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function() {
    $.fn.tab = old;
    return this;
  };


  // TAB DATA-API
  // ============
  var clickHandler = function(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  };

  $(document).on('click', '[data-toggle="tab"]', clickHandler);


}(jQuery,window);
