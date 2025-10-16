import React, { useState,useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useRef ,} from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from "../Context/AppContext";



const ResetPassword = () => {

  axios.defaults.withCredentials = true 

  const [email, setemail] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const inputRefs = useRef([])

  const [isEmailSent, setisEmailSent] = useState('')
  const [otp, setotp] = useState(0)
  const [isOtpSubmitted, setisOtpSubmitted] = useState(false)

  const {
        backendURL,
        IsLoggedIn,
        setIsLoggedIn,
        userData,
        setuserData,
        getUserData,
      } = useContext(AppContext);
  
  

  const handleInput = (e,index)=>{
    if(e.target.value.length > 0 && index<inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e,index) =>{
    if(e.key === "Backspace" && e.target.value === "" && index>0){
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')

    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitEmail = async (e)=>{
    e.preventDefault()

    try{
      console.log(email)
      const {data} = await axios.post(`${backendURL}/api/auth/send-reset-otp`,{email})

      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setisEmailSent(true)


    }
    catch(err){
      toast.error(err.message)
    }
  }

  const onSubmitOTP = async (e)=>{
    e.preventDefault()

    try{
        const otpArray = inputRefs.current.map(e=>e.value)
        const otp = otpArray.join('')
        

     
        setotp(otp);

        setisOtpSubmitted(true)


    }
    catch(err){
      toast.error(err.message)
    }
  }

  const onSubmitNewPassword = async (e)=>{
    e.preventDefault()

    try{
      

      const {data} = await axios.post(`${backendURL}/api/auth/reset-password`, {email,otp,newPassword})

      data.success ? toast.success(data.message) : toast.error(data.message)

      data.success && navigate('/')

    }
    catch(err){
      toast.error(err.message)
    }
  }

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
     {!isEmailSent &&
      <form onSubmit={onSubmitEmail} action="" className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the registered Email Address</p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <img src={assets.mail_icon} alt="" className="w-3 h-3" />
            <input required onChange={(e)=>setemail(e.target.value)} value={email} className="bg-transparent outline-none text-white" type="email" placeholder="Email ID" />


        </div>

        <button className="w-full py-2.5 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white rounded-full mt-3">Submit</button>
      </form>
      }
      {/* OTP Form */}

      {!isOtpSubmitted && isEmailSent && 
      <form onSubmit={onSubmitOTP}  className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit Code sent to your email</p>
        <div onPaste={handlePaste} className='flex justify-between mb-8 '>
            {Array(6).fill(0).map((_,index)=>{
              return <input onKeyDown={(e)=>handleKeyDown(e,index)} onInput={(e)=> handleInput(e,index)} ref={e => inputRefs.current[index] = e } type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md ' />
            })}
        </div>
        <button className='w-full py-2.5 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white rounded-full'>Submit</button>
      </form>
    
          }

       {isOtpSubmitted && isEmailSent &&    
       <form onSubmit={onSubmitNewPassword} action="" className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the new Password</p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <img src={assets.lock_icon} alt="" className="w-3 h-3" />
            <input required onChange={(e)=>setnewPassword(e.target.value)} value={newPassword} className="bg-transparent outline-none text-white" type="password" placeholder="Password" />


        </div>

        <button className="w-full py-2.5 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white rounded-full mt-3">Submit</button>
      </form>
}

      

    </div>
  );
};

export default ResetPassword;
