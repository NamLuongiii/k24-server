const { Product } = require("./database")

require("./database")

async function prod() {
    try {
        for (let index = 1; index < 200; index++) {
            const product = {
                name: "product " + index,
                price: 100000,
            }
    
            await Product.create(product);
        }
        console.log('done');
    } catch (error) {
        console.log(error);
    }
}

prod();