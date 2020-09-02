const fs = require('fs');
const ejs = require("ejs");
const express = require('express');
const DBService = require("./DBService.js");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jsonBodyParser = bodyParser("json");
const pathRoot = '/';
const pathProduct = "/product";
const pathApi = "/api/product";
const publicDirName = "public";
const templateNotFound = "/notFound.ejs";
const mainHtml = "public/spa.html";
const statusOk = 200;
const statusNotAuth = 401;
const statusForbidden = 403;
const statusNotFound = 404;
const statusError = 500;
const textNotFound = "Введенная вами страница на сайте не обнаружена";
const typeHtml = "text/html; charset=utf-8";
const typeJson = "application/json; charset=utf-8";
const userEmail = "user@mail.ru";
const SECRET = "secret_value";
const saltRounds = 10;
const payload = {
    email: userEmail
};
const token = jwt.sign(payload, SECRET, {
    expiresIn: "5m"
});
DBService.init();

const app = express();
const staticMiddleware = express.static(publicDirName);

app.listen(process.env.PORT || 8080, () => console.log("Server started"));

app.get(pathRoot, serveSPA);
app.get(`${pathProduct}/:key_and_slug`, serveSPA);
app.get(pathApi, serveProducts);
app.use(cookieParser());
app.use(jsonBodyParser);
app.get(`${pathApi}/:id`, checkToken);
app.get(`${pathApi}/:id`, serveOneProduct);
app.get('/panel', serveSPA);
app.get('/panel/product', serveSPA);
app.get('/panel/product', serveSPA);
app.get('/panel/product/:id', serveSPA);
app.get('/api/login', serveSPA);
app.post('/api/login', getLogin);
app.get('/api/bcrypt', getCryptPassword);
app.get('/api/me', checkToken);
app.get('/api/me', getUserEmail);
app.put("/api/product/:id", checkToken);
app.put("/api/product/:id", function (req, res) {
    DBService.updateProduct(req.params.id, req.body)
        .then(result => res.json(result))
});
app.post("/api/product", checkToken);
app.post("/api/product", function (req, res) {
    DBService.saveProduct(req.body)
        .then(result => res.json(result))
});
app.use(staticMiddleware);
app.use(serveNotFound);

function serveNotFound(req, res) {
    res.setHeader("Content-Type", typeHtml);
    res.statusCode = statusNotFound;
    const content = fs.readFileSync(publicDirName + templateNotFound).toString();
    const template = ejs.compile(content);
    const scope = {textNotFound};
    res.end(template(scope));
}

function serveSPA(req, res) {
    res.setHeader("Content-Type", typeHtml);
    try {
        const content = fs.readFileSync(mainHtml).toString();
        res.statusCode = statusOk;
        res.end(content);
    } catch (err) {
        serveNotFound(res);
    }
}

function serveProducts(req, res) {
    res.setHeader("Content-Type", typeJson);
    if (req.query.key || req.query.slug) {
        DBService.getProduct(req.query)
            .then(product => {
                getProduct(res, product);
            })
            .catch((err) => setStatusError(res, err));
    } else {
        DBService.getProducts()
            .then(products => getData(res, products))
            .catch(err => setStatusError(res, err));
    }
}

function serveOneProduct(req, res) {

    res.setHeader("Content-Type", typeJson);
    if (req.params.id) {
        DBService.findById(req.params.id)
            .then(product => {
                getProduct(res, product);
            })
            .catch(err => setStatusError(res, err));
    }
}

function getData(res, product) {
    setTimeout(() => {
        res.write(JSON.stringify(product));
        res.statusCode = statusOk;
        res.end();
    }, 1000);
}

function getProduct(res, product) {
    if (product) {
        getData(res, product);
    } else {
        setStatusNotFound(res);
    }
}

function setStatusNotFound(res) {
    res.statusCode = statusNotFound;
    res.end();
}

function setStatusError(res, err) {
    res.statusCode = statusError;
    res.end(err);
}

function getUserEmail(req, res) {
    let email = req.user.email;
    if (email) {
        res.setHeader("Content-Type", typeHtml);
        res.statusCode = statusOk;
        res.end('Email: ' + email);
    } else {
        res.statusCode = statusForbidden;
        res.end();
    }
}

function checkToken(req, res, next) {
    try {
        let token = req.cookies['token'];
        const payload = jwt.verify(token, SECRET);
        let email = payload.email;
        DBService.getUserByEmail(email)
            .then(result => {
                if (result) {
                    res.statusCode = statusOk;
                    req.user = {'email': email};
                    next();
                } else {
                    res.statusCode = statusForbidden;
                    res.end('Bad user credential');
                }
            })
            .catch(() => {
                setStatusError(res, 'Error');
            });
    } catch (err) {
        res.statusCode = statusForbidden;
        res.end();
    }
}

function getCryptPassword(req, res) {
    res.setHeader("Content-Type", typeHtml);
    if (req.query.password) {
        let password = req.query.password;
        let hash = bcrypt.hashSync(password, saltRounds);
        res.statusCode = statusOk;
        res.end(hash);
    } else {
        res.statusCode = statusError;
        res.end('Not set password');
    }
}

function getLogin(req, res) {
    res.setHeader("Content-Type", typeJson);
    if (req.body.login && req.body.password) {
        let email = req.body.login;
        let password = req.body.password;
        DBService.getUserByEmail(email)
            .then(result => {
                if (result && bcrypt.compareSync(password, result.password)) {
                    res.cookie('token', token, {path: '/', encode: String});
                    res.end(JSON.stringify({'status': 'logged'}));
                } else {
                    res.statusCode = statusForbidden;
                    res.end(JSON.stringify({'status': 'error'}));
                }
            })
            .catch(() => {
                res.statusCode = statusForbidden;
                res.end(JSON.stringify({'status': 'error'}));
            });
    } else {
        res.statusCode = statusForbidden;
        res.end(JSON.stringify({'status': 'error'}));
    }
}


