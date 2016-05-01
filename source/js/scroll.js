/*global $*/
'use strict';

$(function() {
  const headerThreashold = 162;
  let content = document.querySelector('#content');
  let header = document.querySelector('#header');

  function measureContent() {
    let { top: contentTop } = content.getBoundingClientRect();
    if (contentTop < headerThreashold) {
      header.classList.add('siteheader--small');
    } else {
      header.classList.remove('siteheader--small');
    }
  }

  $(window).on('scroll', measureContent);
  measureContent();
});
