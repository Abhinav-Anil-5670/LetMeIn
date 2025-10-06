import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDb from "./config/mongodb.js"


const app = express()
const PORT = process.env.PORT || 4000
connectDb()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials : true}))

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(PORT,()=>{
    console.log("Server running on ", PORT)
})