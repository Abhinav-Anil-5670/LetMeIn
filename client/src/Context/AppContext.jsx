import { createContext, useState } from "react";
import axios from 'axios'

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setuserData] = useState(false)

    const getUserData = async () =>{
        try{
            const {data} = await axios.get(`${backendURL}/api/user/data`)
            data.success ? setuserData(data.userData) : toast.error(data.message)
        }
        catch(err){
            toast.error(data.message)
        }
    }

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