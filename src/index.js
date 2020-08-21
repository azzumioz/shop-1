const fs = require('fs');
const ejs = require("ejs");
const express = require('express');
const pathRoot = '/';
const pathProduct = "/product";
const pathApi = "/api/product";
const publicDirName = "public";
const templateNotFound = "/notFound.ejs";
const ProductService = require("./ProductService.js");
const statusOk = 200;
const statusNotFound = 404;
const statusError = 500;
const textNotFound = "Введенная вами страница на сайте не обнаружена";
ProductService.init();

const app = express();
const staticMiddleware = express.static(publicDirName);

app.listen(process.env.PORT || 8080, function() {
    console.log("Server started");
});

app.get(pathRoot, serveSPA);
app.get(pathProduct + '/:key_and_slug', serveSPA);
app.get(pathApi, serveProducts);
app.get(pathApi + '/:id', serveOneProduct);
app.use(staticMiddleware);
app.use(serveNotFound);

function serveNotFound(req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = statusNotFound;
    const content = fs.readFileSync(publicDirName + templateNotFound).toString();
    const template = ejs.compile(content);
    const scope = {textNotFound};
    res.end(template(scope));
}

function serveSPA(req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    try {
        const content = fs.readFileSync('public/spa.html').toString();
        res.statusCode = statusOk;
        res.end(content);
    } catch (err) {
        serveNotFound(res);
    }
}

function serveProducts(req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (req.query.key || req.query.slug) {
        ProductService.getProduct(req.query).then(function (product) {
            if (product) {
                setTimeout(function () {
                    res.write(JSON.stringify(product));
                    res.statusCode = statusOk;
                    res.end();
                }, 1000);
            } else {
                res.statusCode = statusNotFound;
                res.end();
            }
        }).catch(function (err) {
            res.statusCode = statusError;
            res.end();
        });
    } else {
        ProductService.getProducts().then(function (products) {
            setTimeout(function () {
                res.write(JSON.stringify(products));
                res.statusCode = statusOk;
                res.end();
            }, 1000);
        }).catch(function (err) {
            res.statusCode = statusError;
            res.end(err);
        })
    }
}

function serveOneProduct(req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (req.params.id) {
        ProductService.findById(req.params.id).then(function (product) {
            if (product) {
                setTimeout(function () {
                    res.write(JSON.stringify(product));
                    res.statusCode = statusOk;
                    res.end();
                }, 1000);
            } else {
                res.statusCode = statusNotFound;
                res.end();
            }
        }).catch(function (err) {
            res.statusCode = statusError;
            res.end();
        });
    }
}
