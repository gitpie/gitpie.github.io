(function () {

  // Get the releases list using the Github api
  function getReleasesList() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.github.com/repos/gitpie/GitPie/releases', true);

    xhr.onload = function () {
      if (this.status == 200) {
        var releaseList = JSON.parse(this.responseText);
        var releasesContainer = document.querySelector('.block-container');

        for (var i = 0; i < releaseList.length; i++) {
          var releaseDiv = document.createElement('div'),
            innerHTML;

          releaseDiv.className = 'release';

          innerHTML = [
            '<div class="block">',
              '<h2>',
                releaseList[i].tag_name,
                '<span class="date">(', new Date(releaseList[i].created_at).toLocaleString(),')</span>',
              '</h2>',
              '<p class="title">',
                releaseList[i].name,
              '</p>',
              '<p class="body">',
                releaseList[i].body,
              '</p>',
              '<p>',
                '<h3>Assets</h3>',
                '<ul>',
          ];

          for (var j = 0; j < releaseList[i].assets.length; j++) {

            innerHTML.push(
              [
                '<li>',
                  '<a href="', releaseList[i].assets[j].browser_download_url,'">', releaseList[i].assets[j].name,'</a>',
                '</li>'
              ].join('')
            );
          }

          innerHTML.push('</ul></p></div>');

          releaseDiv.innerHTML = innerHTML.join('');

          releasesContainer.appendChild(releaseDiv);
        }
      }
    };

    xhr.send();
  }

  getReleasesList();
})();
