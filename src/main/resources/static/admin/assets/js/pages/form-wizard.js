
$(document).ready(function() {
    var $validator = $("#wizardForm").validate({
        rules: {  
        	exampleInputAgree: {
                required: true
            },
        	identityFace: {
                required: true
            },
        	identityBack: {
                required: true
            },
        	 
            exampleInputName: {
                required: true
            },
            exampleInputName2: {
                required: true
		    },
		    email: {
                required: true,
                email: true
		    },
		    
		    telephone: {
                required: true
		    },
		    code: {
                required: true,
		    },
		    cardPassword1: {
                required: true
		    },
		    cardPassword2: {
                required: true,
                equalTo: '#cardPassword1'
		    },
		    userPassword1: {
                required: true
		    },
		    userPassword2: {
                required: true,
                equalTo: '#userPassword1'
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
            
            if(index==2){
            	
            	var video = document.getElementById("video");
                var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d");
            var w;
            if (navigator.webkitGetUserMedia) {
                navigator.webkitGetUserMedia({ video: true }, function (stream) {
                    
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                    w = new WebSocket(url);
                    w.onopen = function () {
                        sendImg();
                    }
                    w.onmessage = function (e) {
                        sendImg();
                    }

                }, function () {
                    console.log("video error");
                });


                var host = '127.0.0.1';
                
                var url = 'ws://' + host + ':' + port + '/';
                alert(url);
                function sendImg() {
                    context.drawImage(video, 0, 0, 320, 320);
                    var imgData = canvas.toDataURL();
                    w.send(imgData);
                }
            }
            $(".next").hide();
            timerCheck = window.setInterval(updateCheck,5000);
            }
            if(index==3){
            	$(".next").hide();
            }
            if(index==4){
            	$(".next").hide();
            	updateUserMessage();
            }
        },
        'onNext': function(tab, navigation, index) {
            var $valid = $("#wizardForm").valid();
            if(!$valid) {
                $validator.focusInvalid();
                return false;
            }
        }, 
        'onTabClick': function(tab, navigation, index) {
            var $valid = $("#wizardForm").valid();
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

