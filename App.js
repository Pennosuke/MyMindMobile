import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { DeviceMotion } from 'expo-sensors';

import { HomeScreen } from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import ResetPassword from './screens/ResetPassword'
import InitScreen from './screens/InitScreen'

import prologueScreen from './screens/prologueScreen'
import spwbScreen from './screens/spwbScreen'
import awarenessScreen from './screens/awarenessScreen'
import dassScreen from './screens/dassScreen'
import q8Screen from './screens/q8Screen'
import CompletedSurvey from './screens/CompletedSurvey'
import ContactScreen from './screens/ContactScreen'

import spwbResultScreen from './screens/spwbResultScreen'
import awarenessResultScreen from './screens/awarenessResultScreen'
import dassResultScreen from './screens/dassResultScreen'

import TreatmentScreen from './screens/TreatmentScreen'
import MockUpScreen from './screens/MockupScreen'

import GameScreen from './screens/GameScreen'

import * as Font from 'expo-font';
import { DangerZone } from 'expo';

const AppStack = createStackNavigator();
class AppStackScreen extends Component {
  render() {
    return(
      <AppStack.Navigator>
        <AppStack.Screen
          name="MyMind"
          component={HomeScreen}
          options={{
            headerLeft: null,
            headerStyle: {backgroundColor: '#31d140'},
            headerTintColor: '#fff',
            headerTitleStyle: { alignSelf: 'center', fontFamily: 'Kanit-Regular' }
          }}
        />
        <AppStack.Screen 
          name="prologueScreen"
          component={prologueScreen}
          options={{
            title: 'เข้าสู่แบบประเมินสุขภาวะทางจิตใจ',
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          }}
        />
        <AppStack.Screen 
          name="spwbScreen"
          component={spwbScreen}
          options={{
            title: 'แบบวัดสุขภาวะทางจิตใจ',
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          }}
        />
        <AppStack.Screen
          name="awarenessScreen"
          component={awarenessScreen}
          options={{
            title: 'แบบวัดการมีสติ',
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          }}
        />
        <AppStack.Screen
          name="dassScreen"
          component={dassScreen}
          options={{
            title: 'แบบสอบถามวัดภาวะสุขภาพจิต',
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          }}
        />
        <AppStack.Screen
          name="q8Screen"
          component={q8Screen}
          options={{
            title: ''
          }}
        />
        <AppStack.Screen
          name="CompletedSurvey"
          component={CompletedSurvey}
          options={
            {
              title: 'ผลการประเมิน',
              headerLeft: null,
              headerTitleStyle: { alignSelf: 'center', fontFamily: 'Kanit-Regular' }
            }
          }
        />
        <AppStack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={
            {
              title: 'ข้อมูลติดต่อแหล่งช่วยเหลือ',
              headerTitleStyle: { alignSelf: 'center', fontFamily: 'Kanit-Regular' }
            }
          }
        />
        <AppStack.Screen 
          name="spwbResultScreen"
          component={spwbResultScreen}
          options={{
            title: 'ผลแบบวัดสุขภาวะทางจิตใจ',
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          }}
        />
        <AppStack.Screen 
          name="awarenessResultScreen"
          component={awarenessResultScreen}
          options={{
            title: 'ผลแบบวัดการมีสติ',
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          }}
        />
        <AppStack.Screen 
          name="dassResultScreen"
          component={dassResultScreen}
          options={{
            title: 'ผลแบบสอบถามวัดภาวะสุขภาพจิต',
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          }}
        />
        <AppStack.Screen
          name="TreatmentScreen"
          component={TreatmentScreen}
          options={({ route }) => ({
            title: route.params.name,
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          })}
        />
        <AppStack.Screen
          name="MockUpScreen"
          component={MockUpScreen}
          options={
            {
              title: 'MockUpScreen',
              headerTitleStyle: { alignSelf: 'center', fontFamily: 'Kanit-Regular' }
            }
          }
        />
        <AppStack.Screen
          name="GameScreen"
          component={GameScreen}
          options={
            {
              title: 'เกมส์',
              headerTitleStyle: { alignSelf: 'center', fontFamily: 'Kanit-Regular' }
            }
          }
        />
      </AppStack.Navigator>
    )
  }
}

const Stack = createStackNavigator();
export class App extends Component {
  state = {
    fontsLoaded: false,
    rotate: 0
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Kanit-Bold': require('./assets/fonts/Kanit-Bold.ttf'),
      'Kanit-ExtraLight': require('./assets/fonts/Kanit-ExtraLight.ttf'),
      'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf'),
      'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
      'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    const { fontsLoaded } = this.state;
    if( fontsLoaded ) {
      return (
        <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Init"
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#3740FE',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Init" 
              component={InitScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={
                {title: 'Login'},
                {headerLeft: null} 
              }
            />
            <Stack.Screen 
              name="Signup" 
              component={SignupScreen} 
              options={{ title: 'สมัครสมาชิก' }}
            />
            <Stack.Screen 
              name="ResetPassword" 
              component={ResetPassword} 
              options={{ title: 'รีเซ็ตรหัสผ่าน' }}
            />
            <Stack.Screen 
              name="AppStackScreen" 
              component={AppStackScreen} 
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaView>
      )
    } else {
      return ( <LoadingScreen /> );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;