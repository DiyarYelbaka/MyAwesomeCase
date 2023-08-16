import React, { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false)

 

  const register = async (email,password,fullName) => {
    console.log("username::"+fullName)
    console.log("Email::"+email)
    console.log("password::"+password)
  }

  const login = async (email,password) => {
    console.log("Email::"+email)
    console.log("password::"+password)
    
  }

  const logOut = async () => {

  }
  

  

  return <AuthContext.Provider
    value={{
    login,
    register,
    logOut,
    }}>{children}</AuthContext.Provider>
}

