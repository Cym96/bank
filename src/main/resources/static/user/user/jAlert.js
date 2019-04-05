// need jquery.popupoverlay plugin
// Alert/Confirm/Prompt

;
(function(root, factory) {
  root.Alert = factory();
}(window, function() {
  var dialogStepUp = 0;
  var Alert = function(content, title, callback, className) {
    title = title || '温馨提示';
    var titleEle = $('<div class="title" />').text(title),
      message = $('<div class="content" />').html(content),
      ok = $('<div class="buttons">').append($('<button class="btn btn-primary" id="popupbox-alert-cancel' + dialogStepUp + '" />').text('确定'));
    if (!callback) callback = null;
    dialogue(message, titleEle, ok, className, callback);
    dialogStepUp++;
  };
  var dialogue = function(content, title, buttons, className, callback) {
    var id = 'popupbox-alert' + dialogStepUp;
    $('<div class="popupBox" id="' + id + '" />').addClass(className).append(title).append(content).append(buttons).appendTo('body');

    $('#' + id).popup({
      closeelement: '#popupbox-alert-cancel' + dialogStepUp,
      onopen: function() {
        $('div[id^="PowerEnterDiv"]').addClass('invisible');
      },
      onclose: function() {
        $('div[id^="PowerEnterDiv"]').removeClass('invisible');
        callback && callback();
      },
      autozindex:true
    }).popup('show');
  };
  return Alert;
}));(function (root, factory) {
  root.Confirm = factory();
}(window, function () {
  var dialogStepUp = 0;
  var Confirm = function (content, title, callback,cancelCallback,className,okText,cancelText) {
      title = title || '温馨提示';
      okText = okText || '确定';
      cancelText = cancelText || '取消';
    var titleEle = $('<div class="title" />').text(title),
      message = $('<div class="content" />').html(content),
      ok = $('<div class="buttons">').append($('<button class="btn btn-primary" id="popupbox-confirm-sure-' + dialogStepUp + '" />').text(okText)).append($('<button class="btn btn-secondary" id="popupbox-confirm-cancel-' + dialogStepUp + '" />').text(cancelText));
    if (!callback) callback = null;
    dialogue(message, titleEle, ok, callback, cancelCallback, className);
    dialogStepUp++;
  };
  var dialogue = function (content, title, buttons, callback, cancelCallback, className) {
      var id = 'popupbox-confirm-' + dialogStepUp;
      className = className || '';
      $('<div class="popupBox '+className+'" id="' + id + '" />').append(title).append(content).append(buttons).appendTo('body');
    $('#' + id).popup({
      onopen: function () {
        $('div[id^="PowerEnterDiv"]').addClass('invisible');
      },
      onclose: function () {
        $('div[id^="PowerEnterDiv"]').removeClass('invisible');
      },
      autozindex: true
    }).popup('show');
    $('#popupbox-confirm-cancel-' + dialogStepUp).click(function () {
        $('#' + id).popup('hide');
        cancelCallback && cancelCallback();
    });
    $('#popupbox-confirm-sure-' + dialogStepUp).click(function () {
      $('#' + id).popup('hide');
      callback && callback();
    });
  };
  return Confirm;
}));
