import { createContext, useState } from "react";


export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setuserData] = useState(false)


    const value = {
        backendURL,
        IsLoggedIn,
        setIsLoggedIn,
        userData,
        setuserData 

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}