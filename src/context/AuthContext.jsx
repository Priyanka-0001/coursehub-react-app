import React from 'react'
import { createContext, useState } from "react";

export let Auth = createContext()
const AuthContext = ({ children }) => {
  let [user, setUser] = useState(() => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  })
  let login = (loginDetails) => {
    setUser(loginDetails)
    localStorage.setItem('user', JSON.stringify(loginDetails))
  }
  console.log(user);

  let logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }


  return (
    <Auth.Provider value={{ login, user, logout }}>{children}</Auth.Provider>
  )
}

export default AuthContext

