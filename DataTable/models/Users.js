import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const Users = mongoose.model('Users', usersSchema)

export default Users