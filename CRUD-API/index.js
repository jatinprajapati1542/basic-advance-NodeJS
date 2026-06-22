import express from 'express'
import Studentroutes from './routes/students.routes.js'
import Userroutes from './routes/users.routes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { ConnectDB } from './Config/db.js'
import isauth from './Middleware/auth.js'
import rateLimit from 'express-rate-limit'
import helmet from "helmet"
const app = express()

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: "to many request from thia IP , please try again later"
})
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors());

//db connection
ConnectDB()


//middleware rateLimit and helmet
// app.use(helmet())
app.use(limiter)

//user routes
app.use('/api/users', Userroutes)


//authentication
app.use(isauth)

//student routes
app.use('/api/students', Studentroutes)



app.listen(process.env.PORT, () => {
  console.log(`server listen on ${process.env.PORT}`)
})