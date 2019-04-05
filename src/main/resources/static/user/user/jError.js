// need jquery
$.fn.extend({
    showErrorMsg: function (msg,target) {
        var $this = $(this), id = $this.attr("id");
        if (!id) {
            alert("必须指定ID");
            return false;
        }
        var errId = id + "_errMsg", $err = $("#" + errId);
        if ($err.length === 0) {
          $err = $('<label class="error" id="' + errId + '"></label>');
          if (target == undefined || !target) {
            $this.after($err);
          } else {
            $(target).after($err);
          }
          $this.on('focus', function () {
                $err.text("").hide();
            });
        }
        $err.text(msg).show();
    }
});
