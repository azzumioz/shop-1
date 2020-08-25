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

    getProduct(where) {
        if (where.key) {
            where.key = Number(where.key);
        }
        return productCollection.findOne(where);
    },

    findById(someProductId) {
        let mongoId;
        try {
            mongoId = ObjectID(someProductId);
        } catch (e) {
            return Promise.reject();
        }
        return productCollection.findOne({_id: ObjectID(someProductId)});
    },

    updateProduct(id, patch) {
        return new Promise(function (resolve, reject) {
            delete patch._id;
            productCollection.update(
                {_id: ObjectID(id)},
                {
                    $set: patch
                }
            )
                .then(resolve(productCollection.findOne({_id: ObjectID(id)})))
                .catch(() => reject('error'));
        })
    },

    saveProduct(product) {
        if (product.key) {
            product.key = Number(product.key);
        }
        return productCollection.insertOne(product)
            .then(result => result.ops[0])
            .catch(() => 'error');
    }

};
