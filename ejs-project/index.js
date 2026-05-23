import express from 'express';
const app = express();

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/about', (req, res) => {
    let users = [
        { "name": "jatin prajapati", "age": "20", "city": "ahmedabad" },
        { "name": "jatin prajapati", "age": "20", "city": "banashkantha" },
        { "name": "jatin prajapati", "age": "20", "city": "surat" },
        { "name": "jatin prajapati", "age": "20", "city": "vadodra" },
    ];
    res.render("profile", {
        'title': 'About Page',
        'message': 'welcome in our home page',
        "items": users
    })
})

app.get('/form', (req, res) => {
    res.render('form',{"message":null})
})

app.post('/submit', (req, res) => {
    const {name} = req.body;

    const message = `hello, ${name} you submitted form. `
    res.render('form',{"message":message})
})

app.listen(5000, () => {
    console.log("server successfully host on port : 5000");
})