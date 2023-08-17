import React, { createContext, useState,useEffect } from "react";
import { get, post } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false)
  const [onToken, setOnToken] = useState(false)

  const register = async (fullName,email,password) => {
    setLoading(true)
    const postData = { 
      user_fullname:fullName,
      user_email:email,
      user_password:password
    };
    try {
      const getResponse = await post('/users',postData);
      console.log('GET Response:', getResponse);
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
      setLoading(false)
   }
  
  }

  const login = async (email,password) => {
    setLoading(true)
    const postData = { 
      email,
      password
     };
    try {
      const getResponse = await post('/login',postData);
      console.log('GET Token:', getResponse.response.token);
      const token = getResponse.response.token;
      await AsyncStorage.setItem('userToken', token);
      setOnToken(true)
      setLoading(false)
     // const token2 = await AsyncStorage.getItem('userToken');
     // console.log("Burda",token2)
    } catch (error) {
      console.error('Error:', error);
      console.error('Error:', error.response.data.errorCode.msg);
      setLoading(false)
   }
  }

  const logOut = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {
        text: 'Yes',
        onPress: async() =>{
          try {
            await AsyncStorage.removeItem('userToken');
            setOnToken(false)
            console.log('Token removed successfully.');
          } catch (error) {
            console.error('Error removing token:', error);
          }
        } ,
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);

  }

  const loginCheck = async () => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setOnToken(true)
        //console.log(userInfo)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loginCheck();
    
  }, [])
  

  

  return <AuthContext.Provider
    value={{
    login,
    register,
    logOut,
    loading,
    onToken
    }}>{children}</AuthContext.Provider>
}

