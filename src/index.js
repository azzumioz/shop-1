const {
    fs, ejs, express, DBService, bodyParser, cookieParser, pathProduct, pathApi,
    publicDirName, templateNotFound, statusOk, statusNotFound, statusError, textNotFound, typeHtml, typeJson
} = require('./server/constant');
const {
    checkToken,
} = require('./server/controller/user_controller');
const {
    serveSPA
} = require('./server/controller/root_controller');

DBService.init();
const app = express();
const staticMiddleware = express.static(publicDirName);

const rootRoutes = require('./server/route/root_route');
app.use(rootRoutes);

app.get(`${pathProduct}/:key_and_slug`, serveSPA);
app.get(pathApi, serveProducts);
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.get(`${pathApi}/:id`, checkToken);
app.get(`${pathApi}/:id`, serveOneProduct);
app.get('/panel', serveSPA);
app.get('/panel/product', serveSPA);
app.get('/panel/product', serveSPA);
app.get('/panel/product/:id', serveSPA);

const authRoutes = require('./server/route/user_route');
app.use(authRoutes);

app.get('/panel/login', serveSPA);
app.put("/api/product/:id", checkToken);
app.put("/api/product/:id", updateProduct);
app.post("/api/product", checkToken);
app.post("/api/product", saveProduct);
app.delete("/api/product/:id", deleteProduct);
app.use(staticMiddleware);
app.use(serveNotFound);
app.listen(process.env.PORT || 8080, () => console.log("Server started"));

function serveNotFound(req, res) {
    res.setHeader("Content-Type", typeHtml);
    res.statusCode = statusNotFound;
    const content = fs.readFileSync(publicDirName + templateNotFound).toString();
    const template = ejs.compile(content);
    const scope = {textNotFound};
    res.end(template(scope));
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
