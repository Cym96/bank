
(function ($) {
    'use strict';

    var defaults = {
        target: "",//目标dom元素
        element:"div",//默认div
        type: "sum", //分为one,sum,every模式
        format: "",//true或false,true时必须引入accounting.js

        formatMoney: function (value) {
            if (value) {
                var money = parseFloat(value);
                return (this.format === "true") ? accounting.formatMoney(money) : money.toFixed(2);
            } else {
                return '---';
            }
        },

        callback: function (res) {
            var sum, i, len, accounts = res;
            if (this.type === "sum") {
                sum = 0.0;
                if (accounts && accounts.length >0) {
                    for (i = 0, len = accounts.length; i < len; i++) {
                        if (accounts[i]["acctState"] === "正常") {
                            sum += parseFloat(accounts[i]["currUseBalance"]);
                        }
                    }
                    $(this.element + '#' + this.target).html(this.formatMoney(sum));
                }
            } else if (this.type === "one") {
                if (accounts && accounts.length > 0) {
                    var balance = accounts[0]["currUseBalance"];
                    $(this.element + '#' + this.target).html(this.formatMoney(balance));
                }
            } else {
                for (i = 0, len = accounts.length; i < len; i++) {
                    var card = accounts[i]["acctNo"],
                        state = accounts[i]["acctState"],
                        balance = this.formatMoney(accounts[i]["currUseBalance"]);
                    $(this.element + '[data-acct=' + card + '] .acct-status').text(state);
                    $(this.element + '[data-acct=' + card + '] .acct-balance').text(balance);
                    $('div[data-acct=' + card + '] .acct-balance').text(balance);
                }
            }
        }
    };


    $.getBalance = function (options) {
        var settings = $.extend({}, defaults, options);
        var url = "AcctBalanceQryAct.do";
        var parameters = { "multiAcctsString": settings.acct };
        $.post(url, parameters,"json").done(function (res) {
            settings.callback(res);
        });
    };

})(jQuery);
