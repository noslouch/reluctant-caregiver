(function() {
  var mainImage = document.querySelector('#mainImage');
  var url = processURL(window.CAREGIVER && window.CAREGIVER.ytUrl);
  if (!mainImage || !url) {
    return;
  }
  var imageWrapper = mainImage.parentElement;

  function embedVideo(e) {
    var currentHeight = imageWrapper.clientHeight;
    var iframe = generateIframe(currentHeight, url);
    imageWrapper.removeChild(mainImage);
    imageWrapper.appendChild(iframe);
    imageWrapper.classList.add('is-video');
  }

  function generateIframe(height, url) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.setAttribute('height', height);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('webkitallowfullscreen', true);
    iframe.setAttribute('mozallowfullscreen', true);
    iframe.setAttribute('allowfullscreen', true);
    return iframe;
  }

  function processURL(fullUrl) {
    if (!fullUrl) {
      return false;
    }
    var parts = fullUrl.split('=');
    return `https:\/\/www.youtube.com\/embed\/${parts[1]}`;
  }

  imageWrapper.addEventListener('click', embedVideo, false);
})();
