$(function () {
  for (i = 0; i < 5; i++) {
    $(".rating-box").append("<span class='rating-star full-star'></span>");
  }
  $('.carousel_flex_box-items_left').eq(0).addClass('active');
  $('.carousel_flex_box-items_mid').eq(0).addClass('active');
  $('.carousel_flex_box-items_right').eq(0).addClass('active');
  var total_left = $('.carousel_flex_box-items_left').length;
  var current = 0;
  $('#moveRight').on('click', function () {
    var next = current;
    current = current + 1;
    setSlide(next, current);
  });
  $('#moveLeft').on('click', function () {
    var prev = current;
    current = current - 1;
    setSlide(prev, current);
  });
  function setSlide(prev, next) {
    var slide = current;
    if (next > total_left - 1) {
      slide = 0;
      current = 0;
    }
    if (next < 0) {
      slide = total_left - 1;
      current = total_left - 1;
    }
    $('.carousel_flex_box-items_left').eq(prev).removeClass('active');
    $('.carousel_flex_box-items_left').eq(slide).addClass('active');
    $('.carousel_flex_box-items_mid').eq(prev).removeClass('active');
    $('.carousel_flex_box-items_mid').eq(slide).addClass('active');
    $('.carousel_flex_box-items_right').eq(prev).removeClass('active');
    $('.carousel_flex_box-items_right').eq(slide).addClass('active');
    setTimeout(function () {

    }, 800);
  }
});