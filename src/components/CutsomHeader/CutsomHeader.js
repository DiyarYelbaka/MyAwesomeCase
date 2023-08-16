import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import BackIcon from '../../assets/svg/back_icon.svg'

const CutsomHeader = ({onPress,title}) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={onPress} >
      <BackIcon width={44} height={44} style={styles.icon}  />
      </TouchableOpacity>
      <Text style={styles.title} >{title}</Text>
      <View style={styles.cloneButtn} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'transparent',
    flexDirection:'row',
    marginTop:50,
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:10
  },
  icon:{
    // position:'absolute',
    // left:20
  },
  title:{
    fontWeight:'bold',
    fontSize:16,
    color:'#2A2A2E'
  },
  cloneButtn:{
    backgroundColor:'transparent',
    height:44,
    width:44
  }
})


export default CutsomHeader