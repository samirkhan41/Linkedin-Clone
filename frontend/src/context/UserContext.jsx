import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'

export const userDataContext = createContext()

const UserContext = ({ children }) => {

    let { serverUrl } = useContext(authDataContext)

    const [userData, setUserData] = useState(null)
    const [edit, setEdit] = useState(false)

    const getCurrentUser = async () => {
        try {
            const response = await axios.get(serverUrl + "/api/user/currentuser", {
                withCredentials: true
            })

            setUserData(response.data)
            console.log(response.data)
        }
        catch (error) {

            
            console.log("Message:", error.message);
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    const value = {
        userData, setUserData, getCurrentUser,edit, setEdit
    }

    return (

        <div>
            <userDataContext.Provider value={value}>

                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext
