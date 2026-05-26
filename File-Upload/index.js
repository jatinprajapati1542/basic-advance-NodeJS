import express from "express"
import multer from "multer"
import path from "path"

const app = express()

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs")


// variables
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        let filename = Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.fieldname == 'userfile') {
        if (file.mimetype == "image/png") {
            cb(null, true)
        } else {
            cb(new Error('Only image file is allow'), false)
        }
    }else if(file.fieldname == 'userdocuments'){
        if (file.mimetype == "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error('Only pdf file are allowed in document '), false)
        }
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
})


//routes

app.get('/', (req, res) => {
    res.render('form')
})

//fir single file upload
// app.post('/submit', upload.single('userfile'), (req, res) => {
//     res.send(req.files)
// })

// for multiple file upload
// app.post('/submit', upload.array('userfile', 3), (req, res) => {
//     res.send(req.files)
// })

//for multiple field file uploads
app.post('/submit', upload.fields([
    { name: 'userfile', maxCount: 1 },
    { name: 'userdocuments', maxCount: 3 }
]), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file Uploaded ')
    }
    res.send(req.files)
})

// for error showing
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(400).send(`Multer error : File was very large .file size must be <= 5 MB`)
        }
        return res.status(400).send(`Multer error : ${error.message} : ${error.code}`)
    } else if (error) {
        return res.status(500).send(`somthing went wrong : ${error.message}`)
    }
})

app.listen(5000)