const express = require("express")
const { hash, verify } = require("../util/bscript")
const { User, Cart } = require("../database/database")
const { sign } = require("../util/jwt")
const { validateToken } = require("../middleware")
const router = express.Router()

router.get("/", validateToken, async (req, res, next) => {
    try {
        const { _id } = req.tokenPayload
        // TODO: POPULATE FOR NESTED PRODUCT
        const cart = await Cart.findOne({ user: _id }).populate('user').populate('products')
        if (!cart) next(Error("Not exsit cart"))
        res.status(200).json(cart)
    } catch (error) {
        res.status(500)
        next(error)
    }
})

router.put("/", validateToken, async (req, res) => {
    try {
        const { _id } = req.tokenPayload
        const input = { ...req.body, user: _id }
        const cart = await Cart.updateOne({ user: _id }, input)
        res.status(200).json({ cart })
    } catch (error) {
        res.status(500)
        next(error)
    }
})

module.exports = router
