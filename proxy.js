const express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();

const PORT = process.env.PORT;
const TARGET_URL = process.env.TARGET_URL.trim();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Accept, Authorization, Content-Type, X-Requested-With, Access-Control-Request-Headers, Access-Control-Request-Method");
    res.header("Access-Control-Expose-Headers", "Swarm-Tag");
    res.header("Access-Control-Max-Age", "3600");

    if (req.method === 'OPTIONS') {
        res.send();
    } else {
        request({ url: TARGET_URL + req.url, method: req.method, json: req.body },
            function (error, response, body) {
                if (error) {
                    console.error('error: ' + response.statusCode)
                }
            }).pipe(res);
    }
});

app.set('port', PORT);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});