import { View, Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../../styles/Colors'

const CustomButton = ({onPress, title, type,loading}) => {
  return (
    <TouchableOpacity
    disabled={loading}
    style={[styles.button, styles[`button_${type}`]]}
    onPress={onPress}
  >
    {
      loading ? 
      <View style={{flexDirection:'row'}} >
      <ActivityIndicator color={'white'} style={{marginRight:10}} /> 
      <Text style={styles.buttonTitle} >{'loading...'}</Text>
      </View>
      :
      <Text style={styles.buttonTitle} >{title}</Text>

    }
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