'use strict';
(function() {
  var mainImage = document.querySelector('#mainImage');
  if (!mainImage) {
    return;
  }

  function processURL(fullUrl) {
    if (!fullUrl) {
      return false;
    }
    var parts = fullUrl.split('=');
    return `https:\/\/www.youtube.com\/embed\/${parts[1]}`;
  }

  function generateIframe(height, src) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);
    iframe.setAttribute('height', height);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('webkitallowfullscreen', true);
    iframe.setAttribute('mozallowfullscreen', true);
    iframe.setAttribute('allowfullscreen', true);
    return iframe;
  }

  var url = processURL(window.CAREGIVER && window.CAREGIVER.ytUrl);
  var imageWrapper = mainImage.parentElement;

  function embedVideo() {
    var currentHeight = imageWrapper.clientHeight;
    var iframe = generateIframe(currentHeight, url);
    imageWrapper.removeChild(mainImage);
    imageWrapper.appendChild(iframe);
    imageWrapper.classList.add('is-video');
  }

  imageWrapper.addEventListener('click', embedVideo, false);
})();
