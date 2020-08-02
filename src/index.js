const http = require('http');
const URL = require("url");
const server = http.createServer(handler);
server.listen(process.env.PORT || 8080);
var counter = 0;

function handler(req, res) {
    const parsedURL = URL.parse(req.url);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    switch (parsedURL.pathname) {
        case '/favicon.ico':
            res.statusCode = 204;
            res.end();
            break;
        case '/':
            serveIndex (req, res);
            break;
        case '/counter':
            serveCounter(req, res);
            break;
        case '/reset':
            serveReset(req, res);
            break;
        default:
            serveNotFound(req, res);
    }
}

function serveIndex (req, res) {
    counter++;
    res.write('Main page');
    res.write('<p><a href="counter">Счетчик</a></p>');
    res.write('<p><a href="reset">Сброс</a></p>');
    res.end();
}

function serveCounter (req, res) {
    res.write(`Номер запроса: ${counter}`);
    res.end();
}

function serveReset (req, res) {
    counter = 0;
    res.write('Счетчик сброшен');
    res.end();
}

function serveNotFound (req, res) {
    res.write('Not found');
    res.end();
}
