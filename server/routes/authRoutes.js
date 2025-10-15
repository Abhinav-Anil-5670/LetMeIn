import express from 'express'
import { isAuthenticated, login, logout, register, resetOTP, sendResetOTP, sendVerifyOTP, verifyEmail } from '../controller/authController.js'
import userAuth from '../middleware/userAuth.js'
const authRouter = express.Router()


authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.post('/send-verify-otp',userAuth,sendVerifyOTP)
authRouter.post('/verify-account',userAuth,verifyEmail)
authRouter.get('/is-auth',userAuth,isAuthenticated)
authRouter.post('/send-reset-otp',sendResetOTP)
authRouter.post('/reset-password',resetOTP)






export default authRouter