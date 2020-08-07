const MongoClient = require('mongodb').MongoClient;
let shopDatabase;
let productCollection;
let products = [];

module.exports = {
    init() {
        MongoClient.connect('mongodb://localhost:27017')
            .then(function (clientInstance) {
                shopDatabase = clientInstance.db("shop");
                productCollection = shopDatabase.collection("product");
            })
    },

    getProducts() {
        const cursor = productCollection.find();
        const promise = cursor.toArray();
        return promise;
    },

    getProductByKey(key) {
        const promise = productCollection.findOne({"key": key});
        return promise;
    }
}
