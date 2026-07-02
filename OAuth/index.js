import express from "express"
import dotenv from "dotenv"
import passport from "passport"
import session from "express-session"
import "./auth/google.js"

const app = express()

// middleware
app.use(session({
    secret: 'mysecreat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
    res.send('<a href="/auth/google">login with google</a>')
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
);


function auth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}
app.get('/profile',auth, (req, res) => {
    console.log(req.user)
    res.send(`<h1>welcome ${req.user.displayName}</h1>
        <img src="${req.user.photos[0].value}" />
    <a  href = "/logout" > logout</a> `)
})
app.get('/logout', (req, res) => {
    req.logOut(() => {
        res.redirect('/')
    })
})


app.listen(5000)