import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './pages/SignInScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './pages/SignUpScreen';

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
     <Stack.Screen name="welcomeScreen" component={WelcomeScreen} />
     <Stack.Screen name="signInScreen"  component={SignInScreen} />
     <Stack.Screen name="signUpScreen" component={SignUpScreen} />
      <Stack.Screen name="bottomBar" component={MyTabs} />
     </Stack.Navigator>
    </NavigationContainer>
  )
}

function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={SignInScreen} />
        <Tab.Screen name="Settings" component={WelcomeScreen} />
        <Tab.Screen name="Settings2" component={WelcomeScreen} />
      </Tab.Navigator>
    );
  }

export default Router