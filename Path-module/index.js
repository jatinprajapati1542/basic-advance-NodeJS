import express from "express"
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
const filepath = "c:/users/desktop/jatin/programe/javaScript/advance-javascript/index.pdf"

console.log("baseName : ", path.basename(filepath))
console.log("DirName : ", path.dirname(filepath))
console.log("extName : ", path.extname(filepath))

const parsed = path.parse(filepath)
console.log(parsed)

console.log(path.join(__dirname, "public", "image", "image.jpg"))
console.log(path.resolve("public", "image", "image.jpg"))

app.listen(5000)