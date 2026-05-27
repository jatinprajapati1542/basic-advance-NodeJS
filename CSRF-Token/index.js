import express from "express"
import cookieParser from "cookie-parser"
import csrf from "csurf"

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set("view engine","ejs")
app.use(cookieParser())

const csrfProtection = csrf({cookie:true})

app.get('/',csrfProtection,(req,res)=>{
    res.render('form',{csrfToken : req.csrfToken()})
})

app.post('/submit',csrfProtection,(req,res)=>{
    res.send(req.body)
})

app.listen(5000,()=>{
    console.log('Server running on port 5000');
})