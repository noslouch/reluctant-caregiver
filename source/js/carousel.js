/* global $ */
'use strict';
$(function() {
  $('.slider').slick({
    dots: true,
    slide: 'article.thumbnail',
    slidesToShow: 3,
    speed: 150,
    nextArrow: '<button class="btn btn--next" type="button"><i class="fa fa-3x fa-long-arrow-right" aria-hidden="true"></i></button>',
    prevArrow: '<button class="btn btn--prev" type="button"><i class="fa fa-3x fa-long-arrow-left" aria-hidden="true"></i></button>'
  });
});
