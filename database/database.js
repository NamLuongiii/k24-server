const mongoose = require("mongoose")

main()
    .then(() => {
        console.log("Database connect success")
    })
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect(
        "mongodb+srv://user1:user123@cluster0.npyt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
}

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: {
            type: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        required: true,
                    },
                    quantity: Number,
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
)

const Cart = mongoose.model("Cart", cartSchema)

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
        sub_images: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
)
productSchema.index({ name: "text" })

const Product = mongoose.model("product", productSchema)

module.exports = {
    User,
    Cart,
    Product,
}
