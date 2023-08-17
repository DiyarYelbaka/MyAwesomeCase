import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = 'http://116.203.196.162:3000'; 


// GET isteği için fonksiyon
export const get = async (url, params = {}) => {
    try {
        const token = await AsyncStorage.getItem('userToken'); 
        const headers = {
        Authorization: `Bearer ${token}`, 
        };

        const response = await axios.get(`${BASE_URL}${url}`, {
        params,
        headers, 
        });

        return response.data;
    } catch (error) {
        throw error;
    }
  };

// POST isteği için fonksiyon
export const post = async (url, data = {}) => {
  try {
    const token = await AsyncStorage.getItem('userToken'); 
    const headers = {
      Authorization: `Bearer ${token}`, 
    };

    const response = await axios.post(`${BASE_URL}${url}`, data, {
      headers, 
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token =  await AsyncStorage.getItem('userToken'); 
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers, 
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateUser = async (userId, updatedData) => {
  try {
    const token =  await AsyncStorage.getItem('userToken');  
    const headers = {
      Authorization: `Bearer ${token}`, 
    };

    const response = await axios.put(`${BASE_URL}/users`, updatedData, {
      headers, 
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};