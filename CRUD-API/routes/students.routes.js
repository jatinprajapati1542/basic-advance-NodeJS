import express from "express"
import mongoose from "mongoose"
import Students from "../models/student.model.js"
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()

//variables
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const newname = Date.now() + path.extname(file.originalname)
        cb(null, newname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error("only image files will allowed"), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || ""
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const skip = (page - 1) * limit

        const query = {
            $or: [
                { first_name: { $regex: search, $options: "i" } },
                { last_name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        }

        const total = await Students.countDocuments(query)

        const students = await Students.find(query).skip(skip).limit(limit)

        if (!students) return res.status(404).json({ massage: "records not found" })
        res.json({
            total,
            page,
            limit,
            totalPage : Math.ceil(total/limit),
            students
        })
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const student = await Students.findById(req.params.id)
        if (!student) return res.status(404).json({ massage: "student not found" })
        res.json(student)
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})

router.post('/', upload.single('profile_pic'), async (req, res) => {
    try {
        const Student = new Students(req.body)
        if (req.file) {
            Student.profile_pic = req.file.filename
        }
        const newstudent = await Student.save()
        res.status(201).json(newstudent)
    } catch (error) {
        res.status(500).json({ massage: error.message })
    }
})

router.put('/:id', upload.single('profile_pic'), async (req, res) => {
    try {


        const existingstudent = await Students.findById(req.params.id)
        if (!existingstudent) {
            if (req.file.filename) {
                const picpath = path.join("./uploads", req.file.filename)
                fs.unlink(picpath, (err) => {
                    if (err) console.log({ message: err })
                })
            }
            return res.status(404).json({ massage: "student not found" })
        }

        if (req.file) {
            if (existingstudent.profile_pic) {
                const picpath = path.join("./uploads", existingstudent.profile_pic)
                fs.unlink(picpath, (err) => {
                    if (err) console.log({ message: err })
                })
            }
            req.body.profile_pic = req.file.filename
        }
        const updatedstudent = await Students.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" })

        res.json(updatedstudent)
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const student = await Students.findByIdAndDelete(req.params.id)
        if (!student) return res.status(404).json({ message: "student not found" })

        if (student.profile_pic) {
            const picpath = path.join("./uploads", student.profile_pic)
            fs.unlink(picpath, (err) => {
                if (err) console.log({ message: err })
            })
        }

        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router