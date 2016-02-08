(function () {
  // Global informations
  var GLOBALS = {
    language: null,
    os: null,
    arch: null,
    latestReleaseInfo: null
  };

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
  }

  // Get the latest commit using the Github api
  function getLatestRelease() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.github.com/repos/gitpie/GitPie/releases/latest', true);

    xhr.onload = function () {
      if (this.status == 200) {
        GLOBALS.latestReleaseInfo = JSON.parse(this.responseText);

        addDownloadButtons();
      }
    };

    xhr.send();
  }

  // Add the download buttons
  function addDownloadButtons() {
    var buttonsContainer = document.querySelector('.buttons-container');

    switch (GLOBALS.os) {
      case 'linux':
        var btnDeb = document.createElement('a'),
          btnRpm = document.createElement('a');

        btnDeb.innerHTML = 'GitPie.deb';
        btnDeb.className = 'button';
        btnDeb.href = (GLOBALS.arch == '64bit' ? getDownloadURL([ 'amd64', 'deb' ]) : getDownloadURL([ 'i386', 'deb' ]));

        btnRpm.innerHTML = 'GitPie.rpm';
        btnRpm.href = (GLOBALS.arch == '64bit' ? getDownloadURL([ 'x86_64', 'rpm' ]) : getDownloadURL([ 'i386', 'rpm' ]));
        btnRpm.className = 'button';

        buttonsContainer.appendChild(btnDeb);
        buttonsContainer.appendChild(btnRpm);
        break;
      case 'windows':
        var btnWin = document.createElement('a');

        btnWin.innerHTML = 'GitPie.exe';
        btnWin.className = 'button';
        btnWin.href = (GLOBALS.arch == '64bit' ? getDownloadURL([ 'Setup.exe' ]) : getDownloadURL([ 'Setupx86.exe' ]));
        buttonsContainer.appendChild(btnWin);
        break;
      case 'mac':
        var btnMac = document.createElement('a');

        btnMac.innerHTML = 'GitPie for Mac';
        btnMac.href = getDownloadURL([ 'darwin-x64']);
        btnMac.className = 'button';
        buttonsContainer.appendChild(btnMac);
        break;
      default:
        var h3 = document.createElement('h3');

        h3.innerHTML = 'GitPie is not yet available for your platform, but stay tuned for future releases! <a href="#">See downloads to other platforms</a>';
        buttonsContainer.appendChild(h3);
    }
  }

  function getDownloadURL(args) {
    var URL,
      regex,
      i = 0;

    regex = new RegExp( '(' + (args.join('|')) + ')', 'g');

    for (i = 0; i < GLOBALS.latestReleaseInfo.assets.length; i++) {
      var matchArray = GLOBALS.latestReleaseInfo.assets[i].name.match(regex);

      if (matchArray && matchArray.length == args.length) {
        URL = GLOBALS.latestReleaseInfo.assets[i].browser_download_url;

        break;
      }
    }

    return URL;
  }

  // Window load listener
  window.onload = function () {
    bindGlobalInformations();
    getLatestRelease();
  };
})();
