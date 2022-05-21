const express = require("express")
var cors = require('cors')
const cookieParser = require('cookie-parser');
const { errorHandle } = require("./middleware");

const user = require("./routers/user")
const cart = require('./routers/cart');
const Product = require('./routers/product');

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/user', user);
app.use('/cart', cart);
app.use('/product', Product);
app.use(errorHandle);


app.listen(PORT, () => {
    console.log("Server is listening on :", PORT)
})
