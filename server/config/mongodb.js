import mongoose from "mongoose";

async function connectDb(){
    mongoose.connection.on('connected',()=>console.log("DB Connected"))
    mongoose.connect(process.env.MONGODB_URL)
    }

export default connectDb