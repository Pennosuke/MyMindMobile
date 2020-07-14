import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen'
import Survey from './screens/Survey'
import QSurvey from './screens/QSurvey'
import CompletedSurvey from './screens/CompletedSurvey'
import EvaluationResult from './screens/EvaluationResult'
import * as firebase from 'firebase';
import 'firebase/firestore';

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MUMyMind"
            component={HomeScreen}
            options={{
              headerStyle: {backgroundColor: '#3CFB72'},
              headerTintColor: '#fff',
              headerTitleStyle: { alignSelf: 'center' }
            }}
          />
          <Stack.Screen name="Survey" component={Survey} />
          <Stack.Screen name="QSurvey" component={QSurvey} />
          <Stack.Screen name="CompletedSurvey" component={CompletedSurvey} />
          <Stack.Screen name="EvaluationResult" component={EvaluationResult} />
        </Stack.Navigator>
      </NavigationContainer>
    )
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