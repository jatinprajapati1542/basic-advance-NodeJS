import express from "express";
import fs from "fs";
const app = express()

//write file

// fs.writeFile('./public/output.txt', 'this is text message', (error) => {
//     if (error) {
//         console.log(error)
//     }
//     console.log("file created successFully")
// })

//read file

app.get('/read-file', (req, res) => {
    fs.readFile('./public/output2.txt', (error, data) => {
        if (error) {
            return res.status(500).send("file not found")
        }
        res.setHeader("Content-Type", "text/plain")
        res.send(data)
    })
})


//append file

// fs.appendFile('./public/output.txt','\nthis is seccond message',(error)=>{
//     if(error){
//         console.log(error)
//     }
//     console.log("data appended")
// })


//delete file

// fs.unlink('./public/output.txt', (error) => {
//     if (error) {
//         console.log(error)
//     }
//     console.log("file deleted")
// })


//read folder

// fs.readdir('./public', (error, files) => {
//     if (error) {
//         console.log(error)
//         return;
//     }
//     files.forEach(file => {
//         console.log(file)
//     })
// })

//rename file

// fs.rename('./public/output.txt', './public/output2.txt', (error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("rename file")
//     }
// })


//Stream Data

app.get('/stream', (req, res) => {
    const fileStream = fs.createReadStream('./public/output2.txt')
    fileStream.on('open', () => {
        fileStream.pipe(res)
    })
    fileStream.on('error', () => {
        console.log("file not found or error in reading file")
    })
})


//make directory

// fs.mkdir('./public/myfolder', (error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("directory created")
//     }
// })

//rename folder
// fs.rename('./public/myfolder', './public/renameFolder', (error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("folder rename successfully")
//     }
// })


//delete directory

// fs.rmdir('./public/renameFolder',(error)=>{
//     if(error){
//         console.log(error)
//     }else{
//         console.log("folder deleted successfully")
//     }
// })


//read PDF

app.get('/read-pdf', (req, res) => {
    fs.readFile('./public/data.pdf', (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.setHeader("Content-Type", "application/pdf")
        res.send(data)
    })
})

//read JSon

app.get('/read-json', (req, res) => {
    fs.readFile('./public/data.json', (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.setHeader("Content-Type", "application/json")
        res.send(data)
    })
})

//write json data

app.get('/write-json', (req, res) => {
    const data = { name: 'jatin prajapati', email: "jatin@getMaxListeners.com", age: 19 }
    fs.writeFile('./public/data.json', JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.send("json file writen successfully")
    })
})


//append json data
app.get('/append-json', (req, res) => {
    const filePath = './public/data.json'
    const newData = { name: 'jatin prajapati', email: "jatin@getMaxListeners.com", age: 19 }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        let jsonData;
        jsonData = JSON.parse(data)

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData]
        }

        jsonData.push(newData)

        fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
            if (err) {
                return res.status(500).send(err)
            }
        })

        res.send("success")
    })
})

//read Image
app.get('/read-image', (req, res) => {
    fs.readFile('./public/image.jpg', (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.setHeader("Content-Type", "image/jpeg")
        res.send(data)
    })
})

//get file info
// fs.stat('./public/image.jpg', (err, stats) => {
//     if (err) {
//         console.error(err)
//     }
//     console.log(Math.round(stats.size / 1024), "Kb")
//     console.log("file : ",stats.isFile() )
//     console.log("folder : ",stats.isDirectory() )
// })

// check if file exist or not
fs.access('./public/image2.jpg', (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log("file Exist")
    }
})

app.listen(5000)

// [{"name":"Salman Khan","email":"salman@email.com","age":25},{"name":"Yahu Baba","email":"yb@email.com","age":23}]