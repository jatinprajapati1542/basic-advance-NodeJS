import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"

const app = express()


//midleware
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/sessionDB",
        collectionName: "sessionStore" ,
    }),
    cookie:{
        maxAge:1000 * 60 * 60 * 24,
    }
}))

app.get("/", (req, res) => {
      if(req.session.username){
        res.send(`<h1>This is home page </h1><br>
            <p>Session is set</p>`)
      }else{
        res.send(`<h1>This is home page </h1><br>
            <p>Session is not set</p>`)
      }
})

app.get("/set-session", (req, res) => {
    req.session.username = "Jatin Prajapati";
    res.send(`<h1>session is set</h1><br>
        <p>User : ${req.session.username}</p>`)
})

app.get("/get-session", (req, res) => {
    if(req.session.username){
        res.send(`<h2>session user is : ${req.session.username}</h2>`)
    }else{
        res.send('session not found')
    }
})

app.get("/destroy", (req, res) => {
    req.session.destroy(()=>{
        res.send('session is destroy')
    })
})

app.listen(5000, () => {
    console.log("server listen port 5000")
})