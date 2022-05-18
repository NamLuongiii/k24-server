const express = require("express")
const { hash, verify } = require("./util/bscript")
const { User } = require("./database")
const { sign, decoded } = require("./util/jwt")
const router = express.Router()

router.get("/", async (req, res) => {
    try {

        // verify cookies
        const token = req.cookies.token;
        const payload = await decoded(token);

        const user = await User.findOne({_id: payload._id})

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
        })
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post("/login", async (req, res) => {
    try {
        // validate user + password
        const { phone, password } = req.body
        const user = await User.findOne({ phone })
        console.log(user);
        if (!user) throw Error("Not exsit phone")
        if (!(await verify(password, user.password)))
            throw Error("Wrong password")

        // If validated: set token to cockie
        const token = await sign({ _id: user._id })
        // res.cookie("token", token)

        res.status(200).json({ message: "Login success", token })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
})

router.post("/logout", (req, res) => {
    res.status(200).json({ name: "nam" })
})

module.exports = router
