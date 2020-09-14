const {
    express, DBService, bodyParser, cookieParser, publicDirName
} = require('./server/constant');
const app = express();
const staticMiddleware = express.static(publicDirName);
const rootRoutes = require('./server/route/root_route');
const productRoutes = require('./server/route/product_route');
const authRoutes = require('./server/route/user_route');
const {
    serveNotFound
} = require ('./server/controller/root_controller');

app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(rootRoutes);
app.use(productRoutes);
app.use(authRoutes);
app.use(staticMiddleware);
app.use(serveNotFound);

DBService.init();
app.listen(process.env.PORT || 8080, () => console.log("Server started"));
