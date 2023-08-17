import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CutsomHeader from '../../components/CutsomHeader'
import { useForm } from "react-hook-form";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Colors from '../../styles/Colors';
import CustomModal from '../../components/CustomModal';

const CreateUserScreen = ({ navigation, route }) => {
    const { handleSubmit, control, formState: { errors }, watch } = useForm();
    const { isEdit } = route.params || false
    console.log(isEdit)

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
                        required: 'Please enter phone email.',
                        minLength: {
                            value: 1,
                            message: 'Invalid email.'
                        },
                    }}
                />
            
                {
                   isEdit ?
                        <> 
                            <View style={{ height: 20 }} />
                            <CustomButton type={'TERTIARY'} title={'Edit'}  />
                            <CustomButton type={'PRIMARY'} title={'Delete User'} />
                        </>
                        :
                        <>
                            <View style={{ height: 120 }} />
                            <CustomButton type={'TERTIARY'} title={'Add'} />
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