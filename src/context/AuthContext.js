import React, { createContext, useState,useEffect } from "react";
import { post } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'
import { showMessage} from "react-native-flash-message";
import Colors from "../styles/Colors";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [onToken, setOnToken] = useState(false)
  const [splashLoading, setSplashLoading] = useState(false)

  const register = async (fullName,email,password,navigation) => {
    try {
      setLoading(true)
      const postData = { 
        user_fullname:fullName,
        user_email:email,
        user_password:password
      };
      const getResponse = await post('/users',postData);
      setLoading(false)
      showMessage({
        message: "Congratulations",
        description: "you have successfully registered",
        type: "success",
      });
      navigation.navigate('signInScreen')
    } catch (error) {
      setLoading(false)
      showMessage({
        message: "Ops",
        description: "You entered incorrect information, please try again.",
        type: "danger",
        backgroundColor: Colors.red
      });
   }
  
  }

  const login = async (email,password) => {
    try {
      setLoading(true)
      const postData = { 
        email,
        password
       };
      const getResponse = await post('/login',postData);;
      const token = getResponse.response.token;
      await AsyncStorage.setItem('userToken', token);
      setOnToken(true)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      showMessage({
        message: "Ops",
        description: "You entered incorrect information, please try again.",
        type: "danger",
        backgroundColor: Colors.red
      });
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
          } catch (error) {
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
    setSplashLoading(true)
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setOnToken(true)
      }
      setTimeout(()=>{
        setSplashLoading(false)
      },1000)
    } catch (error) {
      setTimeout(()=>{
        setSplashLoading(false)
      },1000)
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
    onToken,
    splashLoading
    }}>{children}</AuthContext.Provider>
}

