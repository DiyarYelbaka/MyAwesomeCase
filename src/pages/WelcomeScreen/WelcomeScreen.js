import { View, Text,Image,StatusBar,ScrollView,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import BgImage from '../../assets/image/bg_image.png'
import CustomButton from '../../components/CustomButton'
import Colors from '../../styles/Colors'


const WelcomeScreen = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor:Colors.white}} >
     <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}/>
     <Image source={BgImage} style={styles.image} />
      <View style={styles.container} >
       <Text style={styles.title} >Korem Ipsum Dolor {'\n'} Sit Amet Consectetur</Text>
       <Text style={styles.description} >Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus</Text>
       <View style={styles.buttonBody} >
       <CustomButton 
        type={'PRIMARY'}
        title={'Login'}
        onPress={()=>navigation.navigate('signInScreen')}
         />
       <CustomButton 
        type={'SECONDARY'}  
        title={'Sign Up'} 
        onPress={()=>navigation.navigate('signUpScreen')}
       />
       </View>
      </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        top:-Dimensions.get('screen').height/4,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        padding:5,
    },
    image:{
        width:'100%'
    },
    title:{ 
        color:'#000000',
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold',
        marginTop:20
    },
    description:{
        color:'#7F879E',
        fontSize:14,
        textAlign:'center',
        marginHorizontal:50,
        marginVertical:25
    },
    buttonBody:{
        marginHorizontal:20
    }

})

export default WelcomeScreen