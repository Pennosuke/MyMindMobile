import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Alert, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';


export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
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