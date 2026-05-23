import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config()

export const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('database connected'))
}