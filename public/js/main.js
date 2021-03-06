//global variables
var service = '/search'
var host = window.location.origin
var searchService = host + service

//make sure service worked are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function (e) {
        navigator.serviceWorker
            .register('/sw_cachedPage.js')
            .then(function (reg) { console.log('Service Worker Registered'); })
            .catch(function (err) { console.log("service worker :Error", err); });
    });
}
//for search on enter key
function onLoad() {
    document.getElementById('prev').style.display = 'none';
    document.getElementById('next').style.display = 'none';
    document.getElementById('curr').style.display = 'none';
}

//search functionality to be fetched on button click 

function onSearch(buttonId) {
    //reading search input
    document.title = document.getElementById('query').value;
    var pageNo = document.getElementById(buttonId).value;
    pageNo = parseInt(pageNo);
    //news content request input
    var aspects = ['title', 'summary'];
    var resultContext = {
        offset: pageNo,
        aspects: aspects,
        maxResults: 10
    };
    //preparing search content fetching with http
    var http = new XMLHttpRequest();
    var params = {
        queryString: document.getElementById('query').value,
        resultContext: resultContext
    }

    http.open('POST', searchService, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(params)) // Make sure to stringify
    http.onload = function () {
        // on search reading search response and populating search result with headlines summary and pagination
        var myJson = JSON.parse(this.responseText);
        if (this.responseText.error != true) {
            var res = myJson.data;
            var txt = '';
            txt = '<div class="search-results o-teaser-collection" ><div class="search-results__heading"><div class="search-results__heading-title"> <h2 class="o-teaser-collection__heading o-teaser-collection__heading--half-width"> Viewing Search Results for <strong>"' + document.getElementById('query').value + '"</strong> </h2> </div> </div>';
            if ((res.results[0].results != undefined) &&
                (res.results[0].results.length >= 0)) {
                for (var i in res.results[0].results) {
                    var title = res.results[0].results[i].title;
                    var apiUrl = res.results[0].results[i].apiUrl;
                    var summary = res.results[0].results[i].summary.excerpt;
                    txt += '<ul class="search-results__list" > <li class="search-results__list-item" > <div class="search-item"> <div class="search-item__teaser"> <div class="o-teaser o-teaser--article o-teaser--small  o-teaser--has-image js-teaser" > <div class="o-teaser__content"><div class="o-teaser__heading"> <a href=' + apiUrl + '  class="js-teaser-heading-link">' + title.title + '</a> </div> <p class="o-teaser__standfirst"> <a href=' + apiUrl + ' class="js-teaser-standfirst-link"><span>' + summary + '</span> </a> </p> </div> </div> </div> </div> </li> </ul>';
                }
                txt += '</div>';
                document.getElementById('search-content').innerHTML = txt;
                document.getElementById('pagination').style.display = 'block';
                document.getElementById('prev').style.display = 'block';
                document.getElementById('curr').style.display = 'block';
                document.getElementById('next').style.display = 'block';
                var currPage = pageNo + 1;
                document.getElementById('prev').value = pageNo - 1;
                document.getElementById('next').value = pageNo + 1;
                document.getElementById('curr').innerHTML = "Page " + currPage;
                if (pageNo == 0) {
                    document.getElementById('prev').style.display = 'none';
                }
            } else {
                txt = '<div class="search-results o-teaser-collection" ><div class="search-results__heading"><div class="search-results__heading-title"> <h2 class="o-teaser-collection__heading o-teaser-collection__heading--half-width"> No result found for <strong>"' + document.getElementById('query').value + '"</strong> </h2> </div> </div>'
                document.getElementById('search-content').innerHTML = txt;
                document.getElementById('prev').style.display = 'none';
                document.getElementById('next').style.display = 'none';
                document.getElementById('curr').style.display = 'none';
                document.getElementById('pagination').style.display = 'none';
            }
        }
    }
}


