const {Router} = require('express');
const router = Router();

const {
    pathProduct,
    pathApi
} = require('../constant');

const {
    serveSPA
} = require ('../controller/root_controller');

const {
    checkToken,
} = require('../controller/user_controller');

const {
    serveProducts,
    serveOneProduct,
    saveProduct,
    updateProduct,
    deleteProduct
} = require ('../controller/product_controller');

router.get(`${pathProduct}/:key_and_slug`, serveSPA);
router.get(pathApi, serveProducts);
router.get(`${pathApi}/:id`, checkToken);
router.get(`${pathApi}/:id`, serveOneProduct);
router.get('/panel', serveSPA);
router.get('/panel/product', serveSPA);
router.get('/panel/product', serveSPA);
router.get('/panel/product/:id', serveSPA);
router.get('/panel/login', serveSPA);
router.put("/api/product/:id", checkToken);
router.put("/api/product/:id", updateProduct);
router.post("/api/product", checkToken);
router.post("/api/product", saveProduct);
router.delete("/api/product/:id", deleteProduct);

module.exports = router;
