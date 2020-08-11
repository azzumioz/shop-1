const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let shopDatabase;
let productCollection;

module.exports = {
    init() {
        MongoClient.connect('mongodb://localhost:27017')
            .then(function (clientInstance) {
                shopDatabase = clientInstance.db("shop");
                productCollection = shopDatabase.collection("product");
            })
    },

    getProducts() {
        return productCollection.find().toArray();
    },

    getProductByKey(key) {
        return productCollection.findOne({"key": key});
    },

    findById(someProductId) {
        let mongoId;
        try {
            mongoId = ObjectID(someProductId);
        } catch (e) {
            return Promise.reject();
        }
        return productCollection.findOne({_id: ObjectID(someProductId)});
    }
};
