import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native'
import React,{useState} from 'react'
import Colors from '../../styles/Colors'
import CutsomHeader from '../../components/CutsomHeader'
import HandIcon from '../../assets/svg/hand_icon.svg'
import { TextInput } from 'react-native-paper';

const SignUpScreen = () => {
  const [text, onChangeText] = useState('');
  return (
    <ScrollView style={{ backgroundColor: Colors.bg_color }} >
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      <CutsomHeader />
      <View style={styles.container}  >
  
        <View style={{ flexDirection: 'row',marginTop:80 }} >
          <Text style={styles.textHi}>Hello There</Text>
          <HandIcon width={25} height={20} />
        </View>
        <Text style={styles.title}>Create an account</Text>
        <TextInput
         label="Email"
         value={text}
         onChangeText={onChangeText}
         underlineColor='transparent'
         underlineStyle={{backgroundColor:'transparent'}}
         backgroundColor={Colors.white}
         contentStyle={{borderRadius:20,height:61}}   
         style={{ backgroundColor: 'transparent' }}
         textColor={'#272A48'}
         activeUnderlineColor={'#282828'}
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
  }
})

export default SignUpScreen