import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CutsomHeader from '../../components/CutsomHeader'
import { useForm } from "react-hook-form";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Colors from '../../styles/Colors';
import CustomModal from '../../components/CustomModal';
import { deleteUser, post, updateUser } from '../../services/api';

const CreateUserScreen = ({ navigation, route }) => {
    const { isEdit } = route.params || false
    const { userInfo } = route.params || {}

    
    const { handleSubmit, control, formState: { errors }, watch } = useForm({
        defaultValues:{
            fullName:userInfo?.user_fullname,
            email:userInfo?.user_email,
            phoneNumber:userInfo?.user_phone
        }
    });
   

   async function handleAdd(data){
    const { fullName,email, password,phoneNumber } = data;
    console.log(fullName,email,password)
    const postData = { 
        user_fullname:fullName,
        user_email:email,
        user_password:password,
        user_phone:phoneNumber
      };
      try {
        const getResponse = await post('/users/new',postData);
        console.log('GET Response:', getResponse);
      } catch (error) {
        console.error('Error:', error);
        
      //  console.error('Error:', error.response.data.errorCode);
     }
    }
    console.log(userInfo.user_id)
    
   async function handleUpdate(data){
        const { fullName,phoneNumber,email } = data;
        console.log(fullName,email,phoneNumber)
        const postData = { 
            user_id:userInfo.user_id,
            user_fullname:fullName,
            user_email:email,
            user_phone:phoneNumber,
            user_password:userInfo.user_password
          };
          try {
            const getResponse = await updateUser(userInfo.user_id,postData);
            console.log('GET Response:', getResponse);
          } catch (error) {
            console.error('Error:', error);
            
          //  console.error('Error:', error.response.data.errorCode);
         }
    }

    async function handleDelete(){
          try {
            const getResponse = await deleteUser(userInfo.user_id);
            console.log('GET Response:', getResponse);
          } catch (error) {
            console.error('Error:', error.response.data);
            
          //  console.error('Error:', error.response.data.errorCode);
         }
    }

    return (
        <ScrollView>
            <CutsomHeader title={ isEdit ? 'Edit User' : 'Create User'} onPress={() => navigation.goBack()} />

            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/image/profile_image.png')}
                    style={styles.image}
                />

            </View>
            <View style={styles.inputContainer}  >
                <CustomInput
                    title={'Full Name'}
                    visiblePassword={false}
                    control={control}
                    name={'fullName'}
                    rules={{
                        required: 'Please enter username.',
                        minLength: {
                            value: 1,
                            message: 'Invalid username.'
                        },
                    }}
                    secureTextEntry={false}
                />
                <CustomInput
                    title={'Phone Number'}
                    control={control}
                    name={'phoneNumber'}
                    rules={{
                        required: 'Please enter phone number.',
                        minLength: {
                            value: 1,
                            message: 'Invalid number.'
                        },
                    }}
                />
                <CustomInput
                    title={'E-Mail'}
                    control={control}
                    name={'email'}
                    rules={{
                        required: 'Please enter email.',
                        minLength: {
                            value: 1,
                            message: 'Invalid email.'
                        },
                    }}
                />
            { !isEdit &&  <CustomInput 
                    title={'Password'}
                    control={control}
                    name={'password'}
                    rules={{
                        required: 'Please enter password.',
                        minLength: {
                            value: 6,
                            message: 'Please enter a minimum of 6 characters.'
                        },
                    }}
                />}
            
                {
                   isEdit ?
                        <> 
                            <View style={{ height: 20 }} />
                            <CustomButton type={'TERTIARY'} title={'Edit'} onPress={handleSubmit(handleUpdate)} />
                            <CustomButton type={'PRIMARY'} title={'Delete User'}  onPress={handleDelete} />
                        </> 
                        :
                        <>
                            <View style={{ height: 120 }} />
                            <CustomButton type={'TERTIARY'} title={'Add'} onPress={handleSubmit(handleAdd)} />
                            <View style={{ height: 120 }} />
                        </>
                }

            </View>

                <CustomModal/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    imageContainer: {
        width: 95,
        height: 95,
        backgroundColor: 'white', // Beyaz arka plan ekleyerek çerçeve etkisi elde edilir
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 2, // Çerçeve kalınlığı
        borderColor: 'white', // Çerçeve rengi
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    inputContainer: {
        marginHorizontal: 10,
        marginTop:20
    },
    statusText: {
        fontSize: 13,
        position: 'absolute',
        top: 5,
        left: 15
    }
})

export default CreateUserScreen