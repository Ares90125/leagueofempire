$(function() {
  $('.banner_slider_07').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay:false,
    autoplaySpeed:2000,
    responsive: [
      
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.banner_slider_07').show();
  // $(".banner_slider_07").hover(function () {
  //   $('.slick-prev, .slick-next').css("display", "initial");
  // }, function () {
  //   // change to any color that was previously used.
  //   $('.slick-prev, .slick-next').css("display", "none");
  // });

  $('.responsive_11').slick({
    dots: false,
    infinite: true,
    speed: 300,
    autoplaySpeed:2000,
    autoplay:false,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: '<div class="arrow_divr_11"><button type="button" class="arrow_btn_11" aria-busy="false" style="width: 32px; height: 32px;"><span class="svg_right_11" style="font-size: 16px;"><svg viewBox="0 0 18 18" role="img" aria-label="Next" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg></span></button></div>',
    prevArrow: '<div class="arrow_divl_11"><button type="button" class="arrow_btn_11" aria-busy="false" style="width: 32px; height: 32px;"><span class="svg_left_11" style="font-size: 16px;"><svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false" style="height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg></span></button></div>',
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 677,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.responsive_11').show();

  $('.responsive_10').slick({
    initialSlide: 1,
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 0.5,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true,
    focusOnSelect: true,
    accessibility: false,
    mobileFirst: true,
    slickPlay: false,
  });

  for (i = 0; i < 5; i++) {
    $(".rating-box").append("<span class='rating-star full-star'></span>");
  }
});