/*global $*/
'use strict';

$(function() {
  var $grid = $('#grid');
  if ($grid.length) {
    $grid.mixItUp({
      selectors: {
        target: '.grid-item'
      }
    });
  }
});
