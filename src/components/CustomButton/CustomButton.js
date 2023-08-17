import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../styles/Colors'

const CustomButton = ({onPress, title, type,disabled}) => {
  return (
    <TouchableOpacity
    disabled={disabled}
    style={[styles.button, styles[`button_${type}`]]}
    onPress={onPress}
  >
      <Text style={styles.buttonTitle} >{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
   button:{
     height:52,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:30,
     marginVertical:5,
    flex:1
   },
    button_PRIMARY:{
    backgroundColor:Colors.red,
    },
    button_SECONDARY:{
    backgroundColor:Colors.blue,
    },
    button_TERTIARY:{
      backgroundColor:Colors.green,
      },
    button_QUANTERNARY:{
      backgroundColor:'#000000'
    },
   buttonTitle:{
    color:Colors.white,
    fontSize:18, 
    fontWeight:'bold'
    }
})

export default CustomButton