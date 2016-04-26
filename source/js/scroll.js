$(function() {
  let content = document.querySelector('#content');
  let header = document.querySelector('#header');

  function measureContent() {
    let { top:contentTop } = content.getBoundingClientRect();
    let { bottom:headerBottom } = header.getBoundingClientRect();
    if (contentTop < headerBottom) {
      header.classList.add('siteheader--small');
    } else {
      header.classList.remove('siteheader--small');
    }
  }

  $(window).on('scroll', measureContent);
  measureContent();
});
