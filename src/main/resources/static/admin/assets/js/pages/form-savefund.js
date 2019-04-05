$(document).ready(function() {
    var $validator = $("#savefundForm").validate({
        rules: {
        	fundName: {
                required: true
            },
            fundNum: {
                required: true
		    },
		    fundProductstate: {
                required: true
		    },
		    fundInveststate: {
                required: true
		    },
		    fundManager: {
                required: true
		    },
		    fundMinbuymoney: {
                required: true
		    },
		    fundBuyratio: {
                required: true
		    },
		    fundMinsalemoney: {
                required: true
		    },
		    fundSaleratio: {
                required: true
		    },
		    fundSalebegintime: {
                required: true
		    },
		    fundWorkbegintime: {
                required: true
		    },
		    fundNpv: {
                required: true
		    },
		    fundCheckstate: {
                required: true
		    },
		    fundText: {
                required: true
		    },
		    exampleInputPassword2: {
                required: true,
                equalTo: '#exampleInputPassword1'
		    },
		    exampleInputProductName: {
                required: true
		    },
		    exampleInputProductId: {
                required: true
		    },
		    exampleInputQuantity: {
                required: true
            },
		    exampleInputCard: {
                required: true,
                number: true
		    },
		    exampleInputSecurity: {
                required: true,
                number: true
		    },
		    exampleInputHolder: {
                required: true
            },
		    exampleInputExpiration: {
                required: true,
                date: true
            },
		    exampleInputCsv: {
                required: true,
                number: true
            }
        }
    });
 
    $('#rootwizard').bootstrapWizard({
        'tabClass': 'nav nav-tabs',
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            var $percent = ($current/$total) * 100;
            $('#rootwizard').find('.progress-bar').css({width:$percent+'%'});
        },
        'onNext': function(tab, navigation, index) {
            var $valid = $("#savefundForm").valid();
            if(!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },
        'onTabClick': function(tab, navigation, index) {
            var $valid = $("#savefundForm").valid();
            if(!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },
    });
    
    $('.date-picker').datepicker({
        orientation: "top auto",
        autoclose: true
    });
});