import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setuserData] = useState(false)

    const getAuthStatus = async()=>{
        try{
            const {data} = await axios.get(`${backendURL}/api/auth/is-auth`)

            if (data.success){
                setIsLoggedIn(true)
                getUserData()
            }
        }
        catch(err){
            toast.error(err.message)
        }
    }

    const getUserData = async () =>{
        try{
            const {data} = await axios.get(`${backendURL}/api/user/data`)
            data.success ? setuserData(data.userData) : toast.error(data.message)
        }
        catch(err){
            toast.error(data.message)
        }
    }

    useEffect(()=>{
        getAuthStatus()
    },[])

    const value = {
        backendURL,
        IsLoggedIn,
        setIsLoggedIn,
        userData,
        setuserData,
        getUserData

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}