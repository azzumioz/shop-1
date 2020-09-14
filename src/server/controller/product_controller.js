const {
    typeJson, statusOk, statusNotFound, statusError, DBService
} = require('../constant');

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

function getProduct(res, product) {
    if (product) {
        getData(res, product);
    } else {
        setStatusNotFound(res);
    }
}

function updateProduct(req, res) {
    DBService.updateProduct(req.params.id, req.body)
        .then(result => res.json(result));
}

function saveProduct(req, res) {
    DBService.saveProduct(req.body)
        .then(result => res.json(result));
}

function deleteProduct(req, res) {
    DBService.deleteProduct(req.params.id)
        .then(result => res.json(result));
}

function setStatusNotFound(res) {
    res.statusCode = statusNotFound;
    res.end();
}

function setStatusError(res, err) {
    res.statusCode = statusError;
    res.end(err);
}

function getData(res, product) {
    setTimeout(() => {
        res.write(JSON.stringify(product));
        res.statusCode = statusOk;
        res.end();
    }, 1000);
}

module.exports = {
    serveProducts,
    serveOneProduct,
    saveProduct,
    updateProduct,
    deleteProduct
};
