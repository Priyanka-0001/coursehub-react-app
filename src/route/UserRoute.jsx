// UserRoute.jsx

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Auth } from "../context/AuthContext"

const UserRoute = ({ children }) => {

    let { user } = useContext(Auth)

    if (!user || user.role !== 'user') {
        return <Navigate to="/" replace />
    }

    return children
}

export default UserRoute