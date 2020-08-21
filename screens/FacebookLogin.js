import React, { Component } from 'react'
import { StyleSheet, Text, View ,Button, Alert } from 'react-native'
import { Facebook } from 'expo'

export default class FacebookLogin extends Component {
  logIn = async () => {
    // console.log('press button!')
    try {
      // console.log('already try...')
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('227074884990375', { permissions: ['public_profile']});
      // console.log('type', await type)
      // console.log('token', await token)
      if (await type === 'success') {
        // console.log('already success...')
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // console.log('already error...')
        Alert.alert('Something is wrong !');
      }
    } catch ({ message }) {
      // console.log('already warn error...')
      Alert.alert(`Facebook Login Error: ${message}`);
    }
    // console.log('finish!')
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login With Facebook"
          onPress={this.logIn}
        />
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
});