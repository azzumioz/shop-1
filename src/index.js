const http = require('http');
const URL = require("url");
const fs = require('fs');
const path = require("path");
const ejs = require("ejs");
const pathRoot = '/';
const pathProduct = "/product/";
// const staticDirName = "static";
const staticDirName = "public";
const templateIndex = "/index.ejs";
const templateProduct = "/product.ejs";
const templateNotFound = "/notFound.ejs";
const ProductService = require("./ProductService.js");
const statusOk = 200;
const statusRedirect = 301;
const statusNotFound = 404;
const statusError = 500;
const server = http.createServer(handler);
ProductService.init();
server.listen(process.env.PORT || 8080);

function handler(req, res) {
    const parsedURL = URL.parse(req.url);
    const pathName = parsedURL.pathname;
    if (pathName == pathRoot) {
        serveSPA(res);
    } else
    if (pathName.startsWith(pathRoot + staticDirName)) {
        serveStatic (req, res);
    } else
    if (pathName.startsWith(pathProduct)) {
        serveProduct (req, res);
    } else {
        res.statusCode = statusNotFound;
        serveNotFound(res);
        //res.end();
    }
}

function serveStatic (req, res) {
    const filename = path.basename(req.url);
    const extension = path.extname(filename);
    var content = fs.createReadStream(staticDirName + pathRoot + filename);
    res.statusCode = statusOk;
    switch(extension) {
        case '.html':
            serveSPA(res);
            break;
        case '.css':
            res.setHeader("Content-Type", "text/css");
            break;
        case '.png':
            res.setHeader("Content-Type", "image/png");
            break;
        case '.jpg':
            res.setHeader("Content-Type", "image/jpg");
            break;
        case '.js':
            res.setHeader("Content-Type", "application/javascript");
            break;
        default:
            res.statusCode = statusNotFound;
            statusNotFound(res);
    }
    content.pipe(res);
}

function serveIndex (res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    ProductService.getProducts().then(function(products) {
        try {
            const content = fs.readFileSync(staticDirName + templateIndex).toString();
            const template = ejs.compile(content);
            const scope = {products: products};
            res.end(template(scope));
        } catch (err) {
            res.statusCode = statusError;
            res.end();
        }
    });
}

function serveProduct (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const url = URL.parse(req.url).pathname;
    const slugPart = url.replace("/product/", "");
    const slugParts = url.replace(pathProduct, "").split("-");
    const key = slugParts[0];
    const slug = slugPart.slice(key.length + 1);
    ProductService.getProductByKey(Number(key)).then(function(product) {
        try {
            if (!product) {
                serveNotFound(res, "Введенный вами товар не найден");
            }
            if (product.slug !== slug) {
                res.statusCode = statusRedirect;
                res.setHeader("Location", `/product/${key}-${product.slug}`);
            }
            const content = fs.readFileSync(staticDirName + templateProduct).toString();
            const template = ejs.compile(content);
            const scope = {product};
            res.end(template(scope));
        } catch (err) {
            res.statusCode = statusError;
            res.end();
        }
    });
}

function serveNotFound (res, customText) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const content = fs.readFileSync(staticDirName + templateNotFound).toString();
    const template = ejs.compile(content);
    var textNotFound = customText ? customText : "Введенная вами страница на сайте не обнаружена";
    const scope = {textNotFound};
    res.end(template(scope));
}

function serveSPA(res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    try {
        const content = fs.readFileSync('public/spa.html').toString();
        res.statusCode = statusOk;
        res.end(content);
    } catch (err) {
        res.statusCode = statusError;
        res.end();
    }
}
