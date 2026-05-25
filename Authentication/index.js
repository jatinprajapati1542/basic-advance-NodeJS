import express from "express"
import mongoose from "mongoose"
import session from "express-session"
import bcrypt from "bcryptjs"
import users from "./models/user.js"

const app = express()

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs")
app.use(session({
    secret: "secreteKey",
    resave: false,
    saveUninitialized: false
}))
//customMiddleware
const checklogin = (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/login')
    }
}


//databse connection
mongoose.connect("mongodb://127.0.0.1:27017/users")
    .then(() => { console.log('mongo connected!') })


//routes
app.get('/home',checklogin, (req, res) => {
    res.send(`<h2>This is Home Page</h2>
        <p>Hello, ${req.session.user}</p>
        <a href='/profile'>Profile</a><br>
        <a href='/logout'>Logout</a>`)
})

app.get('/profile',checklogin, (req, res) => {
    res.send(`<h2>Username is : ${req.session.user}</h2><br>
        <a href='/logout'>Logout</a>`)
})

app.get('/login', (req, res) => {
    if(req.session.user){
        res.redirect('/home')
    }else{
        res.render('login', { error: null })
    }
})

app.get('/', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, userpassword } = req.body
    const hashPassword = await bcrypt.hash(userpassword, 10);

    await users.create({ username, userpassword: hashPassword })
    res.redirect('/login')
})

app.post('/login', async (req, res) => {
    const { username, userpassword } = req.body

    const user = await users.findOne({ username })
    if (!user) return res.render('login', { error: "user Not Found" })

    const isMatch = await bcrypt.compare(userpassword, user.userpassword)
    if (!isMatch) return res.render('login', { error: "invlid Password" })

    req.session.user = username
    res.redirect('/home')
})

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
})

app.listen(5000, () => {
    console.log('server listen on port 5000')
})