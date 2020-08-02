import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Alert, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import firebase from '../constants/firebase';

export default class InitScreen extends Component {
  constructor() {
    super();
    this.state = { 
      isLoading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.navigation.replace('AppStackScreen', { screen: 'MUMyMind'});
        }
        else {
          this.props.navigation.replace('Login');
        }
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontFamily: 'Kanit-Medium', fontSize: 48, color: 'green'}}>MUMyMind</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})