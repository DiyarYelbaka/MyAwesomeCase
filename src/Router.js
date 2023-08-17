import React,{useEffect,useContext} from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './pages/SignInScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './pages/SignUpScreen';
import UsersScreen from './pages/UsersScreen';
import Colors from './styles/Colors';
import CustomTabIcon from './components/CustomTabIcon';
import CreateUserScreen from './pages/CreateUserScreen';
import { AuthContext } from './context/AuthContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {

  const {onToken} = useContext(AuthContext)

  console.log("Burada",onToken)

  return (
    <NavigationContainer>
     <Stack.Navigator
     screenOptions={{
        headerShown:false,
     }}
     >
      {
        onToken ?
        <Stack.Screen name="bottomBar" component={MyTabs} />
        :
        <>
        <Stack.Screen name="welcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="signInScreen"  component={SignInScreen} />
        <Stack.Screen name="signUpScreen" component={SignUpScreen} />
        </>
      }
     </Stack.Navigator>
    </NavigationContainer>
  )
}

function MyTabs() {
  const {logOut} = useContext(AuthContext)
  function handleLogout() {
    return logOut()
  }
  
    return (
      <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 8,
          backgroundColor: Colors.bg_color,
          height: 65,
          borderTopWidth: 0
        },
     }}
      >
        <Tab.Screen name="userStack" component={UserStack} 
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon title='Ana Sayfa' focused={focused} source={1} />
          ),
        }}
         />
      
        <Tab.Screen name="createUserScreen" component={CreateUserScreen} 
      options={{
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon title='Ana Saysdfa'  focused={focused} source={3} />
        ),
      }}
        />
        <Tab.Screen name="logOut" component={CreateUserScreen}
         listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Sayfanın açılmasını engelle
            handleLogout(); // Çıkış yapma fonksiyonunu çağır
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon title='Ana Sayfa' focused={focused} source={2} />
          ),
        }}
         />
      </Tab.Navigator>
    );
  }

  
const UserStack = () => {
  return (
     <Stack.Navigator
     screenOptions={{
        headerShown:false,
     }}
     >
     <Stack.Screen name="usersScreen" component={UsersScreen} />
     <Stack.Screen name="editUserScreen" component={CreateUserScreen} />
     </Stack.Navigator>
  )
}
  


export default Router