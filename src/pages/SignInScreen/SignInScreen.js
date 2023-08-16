import { View, Text, StyleSheet, ScrollView, StatusBar,Dimensions } from 'react-native'
import React,{useContext, useState} from 'react'
import Colors from '../../styles/Colors'
import CutsomHeader from '../../components/CutsomHeader'
import HandIcon from '../../assets/svg/hand_icon.svg'

import { useForm, Controller } from "react-hook-form";
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { AuthContext } from '../../context/AuthContext'

const SignInScreen = ({navigation}) => {
  
  const { handleSubmit, control, formState: { errors }, watch } = useForm();
  const {login} = useContext(AuthContext)
  async function onSignUpPress(data) {
    const { email, password } = data;
     return login(email, password)
  }


  return (
    <ScrollView style={{ backgroundColor: Colors.bg_color }} >
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      <CutsomHeader title={'Login'} onPress={()=> navigation.goBack()} />
      <View style={styles.container}  >
  
        <View style={{ flexDirection: 'row',marginTop:80 }} >
          <Text style={styles.textHi}>Hello There</Text>
          <HandIcon width={25} height={20} />
        </View>
        <Text style={styles.title}>Login first to continue</Text>
        <View style={styles.inputContainer} >
        <CustomInput
          title={'Email Addres'}
          visiblePassword={false}
          control={control}
          name={'email'}
          rules={{
            required: 'Please enter email adress.',
            minLength: {
              value: 5,
              message: 'Invalid adress.'
            },
          }}
          secureTextEntry={false}
        />
        <CustomInput
          title={'Password'}
          visiblePassword={true}
          control={control}
          name={'password'}
          rules={{
            required: 'Please enter username.',
            minLength: {
              value: 3,
              message: 'Invalid username.'
            },
          }}
          secureTextEntry={true}
        />
        </View>
         <CustomButton 
        type={'PRIMARY'}  
        title={'Login'} 
        onPress={handleSubmit(onSignUpPress)}
       />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg_color,
    marginHorizontal: 10
  },
  textHi:{
    fontSize:14,
    color:'#282828'
  },
  title:{
    fontSize:25,
    fontWeight:'700',
    marginTop:10,
    color:'#292D32'
  },
  inputContainer:{
    marginTop:20,
    marginBottom:Dimensions.get('window').width/1.5
  }
})

export default SignInScreen
