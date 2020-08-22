const fs = require('fs');
const ejs = require("ejs");
const express = require('express');
const ProductService = require("./ProductService.js");
const pathRoot = '/';
const pathProduct = "/product";
const pathApi = "/api/product";
const publicDirName = "public";
const templateNotFound = "/notFound.ejs";
const mainHtml = "public/spa.html";
const statusOk = 200;
const statusNotFound = 404;
const statusError = 500;
const textNotFound = "Введенная вами страница на сайте не обнаружена";
const typeHtml = "text/html; charset=utf-8";
const typeJson = "application/json; charset=utf-8";
ProductService.init();

const app = express();
const staticMiddleware = express.static(publicDirName);

app.listen(process.env.PORT || 8080, () => console.log("Server started"));

app.get(pathRoot, serveSPA);
app.get(`${pathProduct}/:key_and_slug`, serveSPA);
app.get(pathApi, serveProducts);
app.get(`${pathApi}/:id`, serveOneProduct);
app.get('/panel', serveSPA);
app.get('/panel/product', serveSPA);
app.get('/panel/product/:id', serveSPA);
app.use(staticMiddleware);
app.use(serveNotFound);

function serveNotFound(req, res) {
    res.setHeader("Content-Type",typeHtml);
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
        ProductService.getProduct(req.query)
            .then(product => {
                getProduct(res, product);
            })
            .catch((err) => setStatusError(res, err));
    } else {
        ProductService.getProducts()
            .then(products => getData(res, products))
            .catch(err => setStatusError(res, err));
    }
}

function serveOneProduct(req, res) {
    res.setHeader("Content-Type", typeJson);
    if (req.params.id) {
        ProductService.findById(req.params.id)
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
