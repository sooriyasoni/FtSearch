const express = require("express")
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');


const app = express()

app.use(express.json({ extended: false }), express.static(__dirname + '/public'), function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/service-worker.js", (req, res) => {
    res.writeHead(201, {
        'Content-Type': 'application/javascript'
    });
    res.sendFile(path.resolve(__filename, "service-worker.js"));
});

app.get('*', function (req, res) {
    // render automatically looks in the views folder
    var index = path.join(__dirname, 'public', 'index.html');
    res.sendFile(index);
});

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
    console.log('here', options.body)
    request(options, (err, response) => {
        if (err) {
            res.status(400).send({
                error: true,
                message: "Bad Request!"
            })
        }
        var body = JSON.parse(response.body)
        console.log('my response ', body);
        res.status(200).send({
            error: false,
            message: 'successfully fetched',
            data: body
        })
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server connected on port ${PORT}`)
})