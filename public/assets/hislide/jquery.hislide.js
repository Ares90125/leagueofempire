(function ($) {

    var slide = function (ele, options) {
        var $ele = $(ele);
        var setting = {
            speed: 1000,
            interval: 10000,

        };

        $.extend(true, setting, options);

        // var states = ["class_0","class_1","class_2","class_3","class_4","class_5","class_6" ];
        var states = ["class_0","class_1","class_2" ];
        
        var $lis = $ele.find('[class^="class_"]');
        var timer = null;

        // for (i = 0; i < 5; i++) {
        //     $(".price_rating_9").append("<span class='rating-star full-star'></span>");
        // }

        $ele.find('#hi_next').on('click', function () {
            next();
        });
        $ele.find('#hi_prev').on('click', function () {
            states.push(states.shift());
            move();
        });

        $ele.on('mouseenter', function () {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function () {
            autoPlay();
        });

        var scrolled = false,
            scrollTimeout;
        // $ele.on("wheel", function (e) {
        //     e.preventDefault();
        //     if (!scrolled) {
        //         if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        //             // Scroll up
        //             next();
        //         } else {
        //             // Scroll down
        //             states.push(states.shift());
        //             move();
        //         };
        //     };
        //     clearTimeout(scrollTimeout);
        //     scrollTimeout = setTimeout(function () {
        //         scrolled = false;
        //     }, 500);
        // });

        move();
        autoPlay();

        function move() {
            $lis.each(function (index, element) {
                var state = states[index];
                $(element).attr( "class", state ).animate(state, setting.speed);
            });
        }


        function next() {
            states.unshift(states.pop());
            move();

        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }

    $.fn.hiSlide = function (options) {
        $(this).each(function (index, ele) {
            slide(ele, options);
        });
        return this;
    }
})(jQuery);