import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import {useNavigate} from 'react-router-dom'
import { AppContext } from "../Context/AppContext";
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()

  const {backendURL,setIsLoggedIn} = useContext(AppContext)

  const [state, setState] = useState("Sign Up");
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const onSubmitHandler = async(e)=>{
    try{
      e.preventDefault()

      //send cookies with the credentials
      axios.defaults.withCredentials = true
      
      if(state === "Sign Up"){
        const {data} =  await axios.post(backendURL + '/api/auth/register',{name,email,password})

        if(data.success){
          setIsLoggedIn(true)
          navigate('/')
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} =  await axios.post(backendURL + 'api/auth/login',{email,password})

        if(data.success){
          setIsLoggedIn(true)
          navigate('/')
        }
        else{
          toast.error(data.message)
        }

      }
    }
    catch (err) {
  console.error(err);
  toast.error(err.response?.data?.message || "Something went wrong");
}

  }



  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={()=>navigate('/')}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create Your Account" : "Login Now"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={e=>setname(e.target.value)}
                value={name}
                type="text"
                name=""
                id=""
                placeholder="Full Name"
                required
                className="outline-none bg-transparent"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
            onChange={e=>setemail(e.target.value)}
            value={email}
              type="email"
              name=""
              id=""
              placeholder="Email ID"
              required
              className="outline-none bg-transparent"
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
            onChange={e=>setpassword(e.target.value)}
            value={password}
              type="password"
              name=""
              id=""
              placeholder="Password"
              required
              className="outline-none bg-transparent"
            />
          </div>
          <p onClick={()=>navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot Password</p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state == "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4 ">
            Already Have an account? {` `}
            <span onClick={()=>setState("Login")} className="text-blue-400 cursor-pointer underline">
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4 ">
            Don't have an account? {` `}
            <span onClick={()=>setState("Sign Up")} className="text-blue-400 cursor-pointer underline">
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
