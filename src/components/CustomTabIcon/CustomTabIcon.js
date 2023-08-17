import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import ProfileIcon from '../../assets/svg/profile_icon.svg'
import LogOutIcon from '../../assets/svg/logout_icon.svg'
import Colors from '../../styles/Colors'
import PlusIcon from '../../assets/svg/plus_icon'
import { AuthContext } from '../../context/AuthContext'



const CustomTabIcon = ({ source, focused }) => {

    const {logOut} = useContext(AuthContext)

    function handleLogOut(){
        return logOut
    }

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width:50}}>
                
                {source=='1' && 
                <ProfileIcon width={54} height={54}
                    style={{ color: focused ? Colors.defaultGreenColor : 'white' }}
                />}
                {source=='2' && 
     
                <View style={{alignItems:'center'}}>
                <LogOutIcon width={24} height={24}
                    style={{ color: focused ?  Colors.defaultGreenColor : 'white' }}
                />
                <Text style={styles.text} >logout</Text>
                 </View>
                
                }
                {source=='3' && 
                <View style={styles.plus}>
                <PlusIcon width={36} height={36} />
                </View>
                }
                 
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color:Colors.red,
        fontSize:13
    },
    plus:{
        top:-30,
        backgroundColor:Colors.white,
        width:70,
        height:70,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        elevation:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
    }
})



export default CustomTabIcon