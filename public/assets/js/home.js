/* function refreshCaptcha(){
    var img = document.images['captcha_image'];
    img.src = "captcha.php";
} */

var resizeId;
var marqueeInitialized = 0;

$('.carousel_09').hiSlide({
    isAuto: false
});

$('.news_updates-slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.prev-btn'),
    nextArrow: $('.next-btn'),
    responsive: [
        {
            breakpoint: 1183,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 751,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
    ]
});

jQuery(document).ready(function () {

    var $videoPopup = $(".video-popup");

    if ($videoPopup.length > 0) {
        $videoPopup.magnificPopup({
            type: "iframe",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    }


    jQuery("#SubscribeBtn2").click(function () {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(jQuery("#SubscribeBtn2Text").val())) {

            var form = $(this);
            var url = 'saveSubscription.php';
            var subscribeEmail = jQuery("#SubscribeBtn2Text").val();
            $.ajax({
                type: "POST",
                url: url,
                data: { email: subscribeEmail }, // serializes the form's elements.
                success: function (response) {
                    if (response == 1) {
                        // jQuery("#SubscribeBtn2Msg").html("<span style='color:green;'>Your OTP verified successfully. We are redirecting you shortly to our next stage.</span>"); 
                        jQuery("#SubscribeBtn2Msg").after("Thanks for Subscription! Verify your email address.");
                        jQuery("#SubscribeBtn2Text").val("");
                        setTimeout(function () {
                            $("#SubscribeBtn2Msg").html("");
                        }, 5000);
                        // show response from the php script.
                        /* setTimeout(function() {
                            $("#SuccessMessageSent").html("");
                            window.location.href = "members/login.php?mb="+phoneNumber;
                        }, 5000);*/
                    } else {
                        setTimeout(function () {
                            $("#SubscribeBtn2Msg").html("");
                        }, 5000);
                        /* jQuery("#OtpSuccessMessageSent").html(response);							
                        setTimeout(function() {
                             $("#SubscribeBtn2Msg").html("");
                         }, 5000);*/
                    }
                }
            });


        } else {
            //alert("INVALID EMAIL");
            jQuery("#SubscribeBtn2Msg").after("You have entered an invalid email address!");
        }
    })

    jQuery("#SubscribeBtn2Popup").click(function () {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(jQuery("#SubscribeBtn2PopupText").val())) {

            var form = $(this);
            var url = 'saveSubscription.php';
            var subscribeEmail = jQuery("#SubscribeBtn2PopupText").val();
            $.ajax({
                type: "POST",
                url: url,
                data: { email: subscribeEmail }, // serializes the form's elements.
                success: function (response) {
                    if (response == 1) {
                        jQuery("#SubscribeBtn2PopupMsg").after("Thanks for Subscription! Verify your email address.");
                        jQuery("#SubscribeBtn2PopupText").val("");
                        setTimeout(function () {
                            $("#SubscribeBtn2PopupMsg").html("");
                        }, 5000);
                    } else {
                        setTimeout(function () {
                            $("#SubscribeBtn2PopupMsg").html("");
                        }, 5000);
                    }
                }
            });


        } else {
            //alert("INVALID EMAIL");
            jQuery("#SubscribeBtn2Msg").after("You have entered an invalid email address!");
        }
    })

    jQuery("#notificationSection").hide();
    $("#FormWebsiteContacts").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'send_support_mail.php',
            data: $("#FormWebsiteContacts").serialize(),
            type: 'post',
            success: function (response) {
                if (response == 1) {
                    jQuery("#notificationSection").show();
                    setTimeout(function () {
                        //jQuery("#notificationSection").hide();
                    }, 3000);
                }
            }
        });
    });

    jQuery("#SubscribeBtn2Popup").click(function(){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(jQuery("#SubscribeBtn2PopupText").val()))
          {
            
            var form = $(this);
            var url = 'saveSubscription.php';
            var subscribeEmail = jQuery("#SubscribeBtn2PopupText").val();
            $.ajax({
               type: "POST",
               url: url,
               data: {email:subscribeEmail}, // serializes the form's elements.
               success: function(response)
               {
                   if(response == 1){
                    jQuery("#SubscribeBtn2PopupMsg").after("Thanks for Subscription! Verify your email address.");
                    jQuery("#SubscribeBtn2PopupText").val("");
                   setTimeout(function(){
                        $("#SubscribeBtn2PopupMsg").html("");
                    }, 5000);
                   }else{
                   setTimeout(function(){
                        $("#SubscribeBtn2PopupMsg").html("");
                    }, 5000);
                   } 
               }
             });	
            
            
          }else{ 
            //alert("INVALID EMAIL");
              jQuery("#SubscribeBtn2Msg").after("You have entered an invalid email address!");
          }
    })

    $("#feature_image_popup").wgModal({
        triggerElement: '#open_feature_image_popup',
        // onAfterOpen: function(e) {
        //   $('html, body').css({
        //     overflow: 'hidden',
        //     height: '100%'
        //   });
        // },
        // onAfterClose: function (e) {
        //   $('html, body').css({
        //     overflow: 'auto',
        //     height: 'auto'
        //   });
        // },
    });


    /*
    jQuery("#SignupDiv").show();
    jQuery("#OTPDiv").hide();
    // this is the id of the form
    $("#contactForm").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $(this);
        var url = 'send_message.php';			
        $.ajax({
               type: "POST",
               url: url,
               data: form.serialize(), // serializes the form's elements.
               success: function(response)
               {
                   if(response == 1){
                   jQuery("#SuccessMessageSent").html("<span style='color:green;'>Your request sent successfully. We will contact you shortly</span>"); // show response from the php script.
                   //form.reset();
                   jQuery('#contactForm input').val("");
                   jQuery('#contactForm textarea').val("");
                   jQuery('#contactForm input[type="submit"]').val("SEND");
                    //jQuery("#SignupDiv").hide();
                    //jQuery("#OTPDiv").show();
	
                   }else{
                        if(response == 2){
                            jQuery("#SuccessMessageSent").html("<span style='color:green;'>Your already have an account with us. So we redirecting you to login page</span>"); // show response from the php script.
                            window.location.href = "members/login.php?mb="+phoneNumber;
                       }else{
                            jQuery("#SuccessMessageSent").html(response);
                       }
                   }
                                                	
                       setTimeout(function() {
                            $("#SuccessMessageSent").html("");
                        }, 5000);
               }
             });			
    });
	
    $("#otpForm").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $(this);
        var url = 'saveOtp.php';		
        var phoneOtp = jQuery("#PhoneOtp").val();
        var phoneNumber = jQuery("#contactPhoneNumber").val();
        $.ajax({
               type: "POST",
               url: url,
               data: {otp:phoneOtp,mobile:phoneNumber}, // serializes the form's elements.
               success: function(response)
               {
                   if(response == 1){
                   jQuery("#OtpSuccessMessageSent").html("<span style='color:green;'>Your OTP verified successfully. We are redirecting you shortly to our next stage.</span>"); // show response from the php script.
                    setTimeout(function() {
                        $("#SuccessMessageSent").html("");
                        window.location.href = "members/login.php?mb="+phoneNumber;
                    }, 5000);
                   }else{
                        jQuery("#OtpSuccessMessageSent").html(response);							
                       setTimeout(function() {
                            $("#SuccessMessageSent").html("");
                        }, 5000);
                   }
               }
             });			
    });
    
    */
})