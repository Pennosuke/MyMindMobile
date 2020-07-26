import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import firebase from '../constants/firebase';

export default class tabC extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.props.navigation.replace('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      /*birthDay: firebase.auth().currentUser.birthDay,
      birthMonth: firebase.auth().currentUser.birthMonth,
      birthYear: firebase.auth().currentUser.birthYear,
      school: firebase.auth().currentUser.school,
      userName: firebase.auth().currentUser.userName,*/
      uid: firebase.auth().currentUser.uid
    }
    return (
      <View style={
        {flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20}}
      >
        <Text style={styles.title}>ชื่อ : {this.state.displayName}</Text>
        <Text style={styles.title}>email : {this.state.email}</Text>
        {/* 
        <Text style={styles.title}>วัน/เดือน/ปีเกิด : {this.state.birthDay} {this.state.birthMonth} พ.ศ.{this.state.birthYear}</Text>
        <Text style={styles.title}>โรงเรียน : {this.state.school}</Text>
         */}
        <Text style={styles.title}>uid : {this.state.uid}</Text>

        <Button
          color="#3740FE"
          title="ออกจากระบบ"
          onPress={() => this.signOut()}
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
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  topLeftButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 10
  },
  topRightButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10
  },
  roundedButton: {
    justifyContent:"center",
    alignItems:"center",
    width: 292,
    height: 62,
    borderRadius:30,
    backgroundColor:"#22459E",
    display: "flex",
    padding: 10,
    margin: 10
  },
  hiddenButton: {
    justifyContent:"center",
    alignItems:"center",
    width: 292,
    height: 62,
    borderRadius:30,
    backgroundColor:"white",
    display: "flex",
    padding: 10,
    margin: 10
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'black'
  }
});