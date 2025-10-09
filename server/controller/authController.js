import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js'
export const register = async (req,res)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        return res.json({
            success : false,
            message : "Missing Details"
        })
    }
    
    try{

        const existingUser = await userModel.findOne({
            email
        })

        if(existingUser){
            return res.json({
                success : false,
                message : "User Already Exists"
            })
        }

        const hashedPassword = await bycrypt.hash(password,10)

        const user = await userModel.create({name, email,password : hashedPassword})

        const token = jwt.sign({
            id : user._id
        },process.env.JWT_SECRET,{
            expiresIn : '7d'
        })

        res.cookie("token",token ,{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 *24 *60*60*1000 //7days 
        })

        //sending Welcome Email
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : "Welcome to .....",
            text : `Welcome ${name} `

        }

        await transporter.sendMail(mailOptions)

        return res.json({success : true})
    
    }
    catch(err){
        res.json({
            success : false,
            message : err.message
        })
    }
}

export const login = async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.json({
            success : false,
            message : "Email and password are required"
        })
    }
    try{
        const user = await userModel.findOne({
            email
        })

        if(!user){
            return res.json({
                success : false,
                message : "User does not exist"
            })
        }

        const isMatch = await bycrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({
                success : false,
                message : "Invalid Password"
            })
        }

        const token = jwt.sign({
            id : user._id
        },process.env.JWT_SECRET,{
            expiresIn : '7d'
        })

        res.cookie("token",token ,{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 *24 *60*60*1000 //7days 
        })

        return res.json({
            success : true,
            message : "User logged In"
        })
    }
    catch(err){
        return res.json({
            success : false,
            message : err.message
        })
    }
}

export const logout = async (req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({
            success : true,
            message : "Logged Out"
        })
    }
    catch(err){
        return res.json({
            success : false,
            message : err.message
        })
    }
}

//send verification OTP to user email
export const sendVerifyOTP = async (req,res)=>{
    try{

        const {userId} = req.body
        const user = await userModel.findById(userId)

        if(user.isAccountVerified){
            return res.json({
                success : false,
                message : "Account already verified"
            })
        }

        const otp =  String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp

        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        const emailOption = {
            from : process.env.SENDER_EMAIL,
            to : user.email,
            subject : "Account Verification OTP",
            text : `User OTP is ${otp}` 
        }

        await transporter.sendMail(emailOption)

        res.json({
            success : true,
            message : "Verification OTP Sent"
        })
    }
    catch(err){
        res.json({
            success : false,
            message : err.message
        })
    }
}