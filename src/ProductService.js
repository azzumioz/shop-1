let products = [];
module.exports = {
    init() {
        products.push({
                title: "Товар 1",
                img: "tovar1.jpg",
                description: "Краткое описание первого товара",
                price: 1000,
                slug: "ventilator-ustanovka",
                key: 1
            },
            {
                title: "Товар 2",
                img: "tovar2.jpg",
                description: "Краткое описание второго товара",
                price: 2000,
                slug: "ventilator-ustanovka",
                key: 2
            },
            {
                title: "Товар 3",
                img: "tovar2.jpg",
                description: "Краткое описание третьего товара",
                price: 3000,
                slug: "ventilator-ustanovka",
                key: 3
            }
        );
    },

    getProducts() {
        return products;
    },

    getProductByKey(key) {
        return products.find(product => product.key === key);
    }
}
