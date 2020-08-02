const http = require('http');
const URL = require("url");
const fs = require('fs');
const path = require("path");
const ejs = require("ejs");
const staticDirName = "static";
const customFileName = "/index.html";
const ejsFileName = "/index.ejs";
const templateProduct = "/product.ejs";
const ProductService = require("./ProductService.js");
const statusOk = 200;
const statusNotFound = 204;
const statusError = 500;
const server = http.createServer(handler);
ProductService.init();
const products = ProductService.getProducts();
console.log(products);
const scope = {products: products};
server.listen(process.env.PORT || 8080);

function handler(req, res) {
    const parsedURL = URL.parse(req.url);
    switch (parsedURL.pathname) {
        case '/':
            serveStatic (req, res, customFileName);
            break;
        default:
            if (parsedURL.pathname.startsWith('/' + staticDirName)) {
                serveStatic (req, res);
            }
            if (parsedURL.pathname.startsWith('/product/')) {
                serveProduct (req, res);
            } else {
                res.statusCode = statusNotFound;
                res.end();
            }
    }
}

function serveStatic (req, res, customFileName) {
    const filename = customFileName || path.basename(req.url);
    const extension = path.extname(filename);
    if (filename !== customFileName) {
        var content = fs.readFileSync(staticDirName + '/' + filename);
    }
    res.statusCode = statusOk;
    switch(extension) {
        case '.html':
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            if (filename === customFileName) {
                content = serveIndex(res);
            }
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
        default:
            res.statusCode = statusNotFound;
            res.end();
    }
    res.end(content);
}

function serveIndex (res) {
    try {
        const content = fs.readFileSync(staticDirName + ejsFileName).toString();
        const template = ejs.compile(content);
        return template(scope);
    } catch(err) {
        console.log( err );
        res.statusCode = statusError;
    }
    res.end();
}

function serveProduct (req, res) {
    const url = URL.parse(req.url).pathname;
    const slugParts = url.replace("/product/", "").split("-");
    const key = slugParts[0];
    try {
        const product = ProductService.getProductByKey(Number(key));
        // console.log(product);
        const content = fs.readFileSync(staticDirName + templateProduct).toString();
        const template = ejs.compile(content);

        const scope2 = {product};
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(template(scope2));
    } catch (err) {
        res.statusCode = statusError;
        res.end();
    }

}
