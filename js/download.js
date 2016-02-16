(function () {

  // Get the latest releases using the Github api
  function getReleasesList() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.github.com/repos/gitpie/GitPie/releases/latest', true);

    xhr.onload = function () {
      if (this.status == 200) {
        var releaseInfo = JSON.parse(this.responseText),
          buttons = document.querySelectorAll('.space-lines a'),
          i = 0;

        for (i; i < buttons.length; i++) {
          buttons[i].href = getDownloadURL(buttons[i].getAttribute('data-keywords').split(','), releaseInfo);
        }
      }
    };

    xhr.send();
  }

  function getDownloadURL(args, latestReleaseInfo) {
    var regex = new RegExp( '(' + (args.join('|')) + ')', 'g'),
      URL,
      i = 0;

    for (i = 0; i < latestReleaseInfo.assets.length; i++) {
      var matchArray = latestReleaseInfo.assets[i].name.match(regex);

      if (matchArray && matchArray.length == args.length) {
        URL = latestReleaseInfo.assets[i].browser_download_url;
        break;
      }
    }

    return URL;
  }

  getReleasesList();
})();
