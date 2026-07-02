import express from "express"
import nodemailer from "nodemailer"
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const info = await transporter.sendMail({
            from: '"jatin prajapati" <jatinprajapati1542@gmail.com>',
            to: to,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: 'data.pdf',
                    path: path.join(__dirname, "files", 'data.pdf')
                }
            ]
        })
        res.json({
            message: "email sent success",
            info
        })
    } catch (err) {
        res.status(500).json({
            message: "failed to sent email sent",
            err
        })
    }
})

app.get('/', (req, res) => {
    res.render('mail')
})

app.listen(5000)