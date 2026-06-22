import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const ConnectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("databse connnected") })
    .catch((err) => { console.log(err) })
}