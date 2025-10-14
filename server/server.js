import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDb from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"


const app = express()
const PORT = process.env.PORT || 4000
connectDb()

const allow = ['http://localhost:5173']

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allow, credentials : true}))

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(PORT,()=>{
    console.log("Server running on ", PORT)
})