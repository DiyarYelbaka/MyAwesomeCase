import { View,StyleSheet } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <View style={styles.container} >
     <LottieView 
      source={require("../../assets/lottie/animation.json")} 
      autoPlay
      style={{width:'100%',height:100,}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Loading