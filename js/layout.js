(function () {
  // Global informations
  var GLOBALS = {
    language: null,
    os: null,
    arch: null
  };

  // Update maxWidth of the app print image
  function updatePrintAppImg() {
    var printAppImg = document.querySelector('.print-app-container img');

    printAppImg.style.maxWidth = (window.outerWidth - 50) + 'px';
  }

  // Bind the globals informations
  function bindGlobalInformations() {
    GLOBALS.language = navigator.language || navigator.userLanguage;

    var platform = navigator.platform,
      ua = navigator.userAgent,
      os;

    if (platform) {

      if (/(Linux)/.test(platform)) {
        os = 'linux';
      } else if (/(Macintosh|MacIntel|MacPPC|Mac68K)/.test(platform)) {
        os = 'mac';
      } else if (/(Windows|Win16|Win32|WinCE|Win64)/.test(platform)) {
        os = 'windows';
      }

    } else {
      console.warn('Browser do not have support to "navigator.platform"');
    }

    GLOBALS.os = os;

    if (ua) {

      if (/(x86_64|x86-64|Win64|64;|amd64|AMD64|WOW64|x64_64)/.test(ua)) {
        GLOBALS.arch = '64bit';
      } else {
        // Assume 32bit case not x64
        GLOBALS.arch = '32bit';
      }

    } else {
      console.warn('Browser do not have support to "navigator.userAgent"');
    }

    console.log(GLOBALS);
  }

  // Window load listener
  window.onload = function () {
    updatePrintAppImg();
    bindGlobalInformations();
  };

  // Window resize listener
  window.onresize = function () {
    updatePrintAppImg();
  };
})();
