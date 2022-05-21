const express = require("express")
const { Product } = require("../database/database")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        // Priority: Search => Paginate

        let { page, limit, search, updatedAt } = req.query
        if (!page) page = 0
        if (!limit) limit = 10
        if (!updatedAt) updatedAt = -1
        if (
            page < 0 ||
            typeof Number(page) !== "number" ||
            limit < 0 ||
            typeof Number(limit) !== "number"
        )
            return next(new Error("Not valid input"))

        const total_item = await Product.count({ $text: { $search: search } })
        const products = await Product.find({ $text: { $search: search } })
            .sort([["updatedAt", updatedAt]])
            .skip(page * limit)
            .limit(limit)

        res.status(200).json({
            page,
            limit,
            total_item,
            items: products,
        })
    } catch (error) {
        res.status(500)
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return next(new Error("Not exsit product"))
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        next(error)
    }
})

router.post("/", async (req, res) => {
    // TODO: only admin can do this
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        next(error)
    }
})

module.exports = router
