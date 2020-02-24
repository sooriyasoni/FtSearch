'use strict';

//make sure service worked are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', (e) => {
        navigator.serviceWorker.getRegistrations().then(function (registrations) { for (let registration of registrations) { registration.unregister() } })
        navigator.serviceWorker
            .register('/sw_cachedPage.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log(`service worker :Error:${err}`))
    })
}

// const url = 'https://ftsearch-v1.herokuapp.com/search';
const url = 'http://localhost:5000/search'

function onLoad() {
    document.getElementById('prev').style.display = 'none';
    document.getElementById('next').style.display = 'none';
    document.getElementById('curr').style.display = 'none';
}

async function onClickPage(pageId) {
    document.title = document.getElementById('query').value
    var aspects = ['title', 'summary'];
    var pageNo = document.getElementById(pageId).value;
    pageNo = parseInt(pageNo);
    var resultContext = {
        offset: pageNo,
        aspects: aspects,
        maxResults: 10
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            queryString: document.getElementById('query').value,
            resultContext: resultContext
        })
    })
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            console.log(myJson);
            if (myJson.error == false) {
                var res = myJson.data;
                var txt = '';
                txt = '<div class="search-results o-teaser-collection" ><div class="search-results__heading"><div class="search-results__heading-title"> <h2 class="o-teaser-collection__heading o-teaser-collection__heading--half-width"> Viewing Search Results for <strong>"' + document.getElementById('query').value + '"</strong> </h2> </div> </div>';

                for (let i in res.results[0].results) {
                    var title = res.results[0].results[i].title;
                    var apiUrl = res.results[0].results[i].apiUrl;
                    var summary = res.results[0].results[i].summary.excerpt;
                    txt += '<ul class="search-results__list" > <li class="search-results__list-item" > <div class="search-item"> <div class="search-item__teaser"> <div class="o-teaser o-teaser--article o-teaser--small o-teaser--has-image js-teaser" > <div class="o-teaser__content"><div class="o-teaser__heading"> <a href=' + apiUrl + '  class="js-teaser-heading-link">' + title.title + '</a> </div> <p class="o-teaser__standfirst"> <a href=' + apiUrl + ' class="js-teaser-standfirst-link"><span>' + summary + '</span> </a> </p> </div> </div> </div> </div> </li> </ul>';
                }
                txt += '</div>';;
                document.getElementById('search-content').innerHTML = txt;
                document.getElementById('pagination').style.display = 'block';
                document.getElementById('prev').style.display = 'block';
                document.getElementById('curr').style.display = 'block';
                document.getElementById('next').style.display = 'block';
                console.log(pageId);
                console.log('pageNo', pageNo);
                var currPage = pageNo + 1;
                document.getElementById('prev').value = pageNo - 1;
                document.getElementById('next').value = pageNo + 1;
                document.getElementById('curr').innerHTML = "Page " + currPage;
                if (pageNo == 0) {
                    document.getElementById('prev').style.display = 'none';
                }
            }
        })
        .catch(err => {
            console.log(err);
            document.getElementById('demo').innerHTML = err;
        });
}