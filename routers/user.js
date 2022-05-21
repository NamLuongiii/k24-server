const express = require("express")
const { hash, verify } = require("../util/bscript")
const { User, Cart } = require("../database/database")
const { sign } = require("../util/jwt")
const { validateToken } = require("../middleware")
const router = express.Router()

router.get("/", validateToken, async (req, res) => {
    try {
        const { _id } = req.tokenPayload
        const user = await User.findOne({ _id })
        if (!user) throw Error("Not exsit id")
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const user = await User.create({
            ...req.body,
            password: await hash(req.body.password),
        });
        await Cart.create({user: user._id});
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.put("/", validateToken, async (req, res) => {
    try {
        const { _id } = req.tokenPayload;
        const user = await User.updateOne({ _id }, req.body);
        res.status(200).json({ user })
    } catch (error) {
        res.status(500);
        next(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        // validate user + password
        const { phone, password } = req.body
        const user = await User.findOne({ phone })
        console.log(user)
        if (!user) throw Error("Not exsit phone")
        if (!(await verify(password, user.password)))
            throw Error("Wrong password")

        // If validated: set token to cockie
        const token = await sign({ _id: user._id })
        // res.cookie("token", token)

        res.status(200).json({ message: "Login success", token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
})

module.exports = router
