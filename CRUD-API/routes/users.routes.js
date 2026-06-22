import express from "express";
import Users from "../models/Users.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { json } from "node:stream/consumers";

dotenv.config()
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] })
        if (existingUser) return res.status(400).json({ message: "user already exist" })

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await Users.create({ username, email, password: hashPassword })
        res.json(user)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await Users.findOne({ username })
        if (!user) return res.status(404).json({ message: "user not Found" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(403).json({ message: "invalid Password" })

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.json({token})
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

router.post('/logout', async (req, res) => {
    res.json({ message: "user logout" })
})

export default router