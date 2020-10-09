import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../constants/firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false,
      docName: '',
      sendStatus: '',
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin() {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // console.log(res)
        // console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: '',
        })
        this.props.navigation.replace('Init')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  sendResetPasswordEmail() {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(this.state.email).then(() => {
      // console.log('Email sent');
      this.setState({
        email: '',
        sendStatus: 'ส่งอีเมลสำเร็จ\nโปรดตรวจสอบกล่องจดหมายขาเข้าในอีเมลของคุณ'
      });
    }).catch((error) => {
      // console.log('error', error);
      // console.log('error', error.message);
      if(error.message === 'The email address is badly formatted.') {
        this.setState({
          sendStatus: 'โปรดกรอกอีเมลให้ถูกต้อง'
        });
      }
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>
        <Text style={styles.headerContent}>คุณลืมรหัสผ่านใช่หรือไม่?</Text>
        <Text style={styles.content}>    คุณสามารถรีเซ็ตรหัสผ่านได้ด้วยการกรอกอีเมลของคุณลงในช่องด้านล่าง แล้วระบบของเราจะส่งอีเมลสำหรับรีเซ็ตรหัสผ่านไปที่อีเมลของคุณ</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="อีเมล"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <Text style={this.state.sendStatus === 'ส่งอีเมลสำเร็จ\nโปรดตรวจสอบกล่องจดหมายขาเข้าในอีเมลของคุณ' ? [styles.status,{color: '#26ac14'}] : styles.status}>{this.state.sendStatus}</Text>
        <Button
          color="#3740FE"
          title="ส่งอีเมลรีเซ็ตรหัสผ่าน"
          onPress={() => this.sendResetPasswordEmail()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 15,
    marginBottom: 45,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  headerContent: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
  content: {
    textAlign: 'left',
    marginBottom: 40,
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
  },
  status: {
    textAlign: 'left',
    marginBottom: 40,
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
    color: '#d7263f'
  },
});