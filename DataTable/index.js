import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import Users from "./models/Users.js"

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/users_demo').
    then(() => { console.log("database connected!") }).
    catch((error) => console.log(error))

app.get('/api/users', async (req, res) => {
    const users = await Users.find();
    res.json({ data: users })
})

app.listen(5000, () => {
    console.log("server listen on port 5000")
})