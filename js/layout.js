(function () {
  // Update maxWidth of the app print image
  function updatePrintAppImg() {
    var printAppImg = document.querySelector('.print-app-container img');

    printAppImg.style.maxWidth = (window.outerWidth - 50) + 'px';
  }

  // Window load listener
  window.onload = function () {
    updatePrintAppImg();
  };

  // Window resize listener
  window.onresize = function () {
    updatePrintAppImg();
  };
})();
