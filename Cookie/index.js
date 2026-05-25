import express from "express"
import cookieParser from "cookie-parser"

const app = express()

//Middleware
// app.use(cookieParser())  
app.use(cookieParser('secretKey')) // signed cookie

app.get('/',(req,res)=>{
    // const username = req.cookies.username;
    const username = req.signedCookies.username; // signed cookie
    if(!username){
        return res.send('<h2><b>Home : </b>cookie not found</h2>')
    }
    res.send(`<h2><b>Home : </b>Welcome ${username}</h2>`)
})

app.get('/set-cookie',(req,res)=>{
    res.cookie('username','Jatin Prajapati',{
        maxAge:90000,
        httpOnly:true,
        // signed:false
        signed:true // signed cookie
    })
    res.send('Cookie has been set')
})

app.get('/get-cookie',(req,res)=>{
    // const username = req.cookies.username
    const username = req.signedCookies.username // signed cookie
    if(!username){
        res.send('<h2>cookie not found</h2>')
    }else{
        res.send(`<h2>cookie is found</h2>
            <p>UserName : <b>${username}</b></p>`)
    }
})

app.get('/delete',(req,res)=>{
    res.clearCookie('username')
    res.send('<h2>Cookie has been Deleted</h2>')
})

app.listen(5000)