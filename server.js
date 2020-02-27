//importing package in global variables 
var express = require("express")
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');


var app = express()

app.use(express.json({ extended: false }), express.static(__dirname + '/public'), function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//using service worker to make site offline working
app.get("/service-worker.js", (req, res) => {
    var sw = path.resolve(__dirname, "/public/", "sw_cachedPage.js")
    console.log(sw)
    res.writeHead(201, {
        'Content-Type': 'application/javascript'
    });
    res.sendFile(sw);
});

app.get('*', function (req, res, next) {
    // render automatically looks in the views folder
    var index = path.join(__dirname, 'public', 'index.html');
    res.sendFile(index);
    next()
});

//POST REQUEST FOR SEARCH USING REQUEST MODULE TO FETCH FROM FT
app.post('/search', (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'http://api.ft.com/content/search/v1?X-Api-Key=59cbaf20e3e06d3565778e7b03eb6dc775ea49839705431ad00fe179&content=',
        'headers': {
            'X-Api-Key': '59cbaf20e3e06d3565778e7b03eb6dc775ea49839705431ad00fe179',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    };
    request(options, (err, response) => {
        if (err) {
            res.status(400).send({
                error: true,
                message: "Failed to fetch due to bad request!!"
            })
        }
        var body = JSON.parse(response.body)
        res.status(200).send({
            error: false,
            message: 'successfully fetched',
            data: body
        })
    })
})

var PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server connected on port ${PORT}`)
})