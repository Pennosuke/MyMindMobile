import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen'
import CompletedSurvey from './screens/CompletedSurvey'
import TreatmentScreen from './screens/TreatmentScreen'
import ContactScreen from './screens/ContactScreen'

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import InitScreen from './screens/InitScreen'

import spwbScreen from './screens/spwbScreen'
import awarenessScreen from './screens/awarenessScreen'
import dassScreen from './screens/dassScreen'
import q8Screen from './screens/q8Screen'

import * as Font from 'expo-font';

const AppStack = createStackNavigator();
class AppStackScreen extends Component {
  render() {
    return(
      <AppStack.Navigator>
        <AppStack.Screen
          name="MUMyMind"
          component={HomeScreen}
          options={{
            headerLeft: null,
            headerStyle: {backgroundColor: '#3CFB72'},
            headerTintColor: '#fff',
            headerTitleStyle: { alignSelf: 'center', fontFamily: 'Kanit-Regular' }
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
              title: 'ข้อมูลติดต่อผู้เชี่ยวชาญ',
              headerTitleStyle: { alignSelf: 'center', fontFamily: 'Kanit-Regular' }
            }
          }
        />
        <AppStack.Screen
          name="TreatmentScreen"
          component={TreatmentScreen}
          options={({ route }) => ({
            title: route.params.name,
            headerTitleStyle: { fontFamily: 'Kanit-Regular' }
          })}
        />
      </AppStack.Navigator>
    )
  }
}

const Stack = createStackNavigator();
export class App extends Component {
  state = {
    fontsLoaded: false,
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
              options={{ title: 'Signup' }}
            />       
            <Stack.Screen 
              name="AppStackScreen" 
              component={AppStackScreen} 
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
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