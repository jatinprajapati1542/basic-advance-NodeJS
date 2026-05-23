import express from 'express';
const app = express()

import { connectDb } from "./config/database.js"
import ContactRouter from "./Routes/contact.route.js";

const PORT = process.env.PORT;

//databse connection
connectDb()

//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

//routes
app.use("/",ContactRouter)

app.listen(PORT, () => {
    console.log(`server listen on ${PORT}`)
})