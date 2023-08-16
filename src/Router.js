import { View, Text } from 'react-native'
import React from 'react'
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator
     screenOptions={{
        headerShown:false,
     }}
     >
      <Stack.Screen name="bottomBar" component={MyTabs} />
     <Stack.Screen name="welcomeScreen" component={WelcomeScreen} />
     <Stack.Screen name="signInScreen"  component={SignInScreen} />
     <Stack.Screen name="signUpScreen" component={SignUpScreen} />

     <Stack.Screen name="createUserScreen" component={CreateUserScreen} />
     </Stack.Navigator>
    </NavigationContainer>
  )
}

function MyTabs({navigation}) {
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
        <Tab.Screen name="usersScreen" component={UsersScreen} 
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
        <Tab.Screen name="Settings2" component={SignUpScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon title='Ana Sayfa' focused={focused} source={2} />
          ),
        }}
         />
      </Tab.Navigator>
    );
  }
  


export default Router