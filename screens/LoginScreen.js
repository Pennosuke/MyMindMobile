import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../constants/firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false,
      docName: '',
      errorMessage: '',
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin() {
    if(this.state.email === '' || this.state.password === '') {
      this.setState({
        errorMessage: 'โปรดกรอกอีเมลหรือรหัสผ่านให้ครบถ้วน',
        isLoading: false
      })
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
      .catch((error) => {
        // console.log('error', error.message)
        var newErrorMessage = '';
        if(error.message === 'The password is invalid or the user does not have a password.') {
          newErrorMessage = 'รหัสผ่านไม่ถูกต้อง โปรดกรอกใหม่อีกครั้ง';
        } else if(error.message === 'The email address is badly formatted.') {
          newErrorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
        } else {
          newErrorMessage = error.message;
        }
        this.setState({
          errorMessage: newErrorMessage,
          isLoading: false
        })
      })
    }
  }

  getDay(date) {
    const splitDate = date.split('/')
    return parseInt(splitDate[1], 10)
  }
  
  getMonth(date) {
    const splitDate = date.split('/')
    return parseInt(splitDate[0], 10)
  }
  
  getYear(date) {
    const splitDate = date.split('/')
    const moreSplitDate = splitDate[2].split(' ')
    return parseInt(moreSplitDate[0], 10)
  }

  //บทนำแบบประเมิน
  //แบบวัดสุขภาวะทางจิตใจ
  //แบบวัดการมีสติ
  //แบบสอบถามวัดภาวะสุขภาพจิต
  //โปรแกรมที่_1_หายใจคลายเครียด
  //ทบทวนโปรแกรมที่_1_หายใจคลายเครียด
  //โปรแกรมที่_2_ละเอียดลออดูกาย
  //ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย
  //ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์
  //ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์

  Dbug() {
    const colName = "ทบทวนโปรแกรมที่_4_ปรับความคิดพิชิตเศร้า";
    const legitData = {};
    
    /*preset the data*/
    db.collection(colName)
    //.where("userName", "==", oldId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        //console.log('doc.id =>', doc.id)
        const DocName = doc.id.split(' ')
        const DataUsername = doc.data().userName
        const DataTimestamp = doc.data().timestamp
        //console.log('DataUsername =>', DataUsername)
        //console.log('DataTimestamp =>', DataTimestamp)
        const FormatTimestamp = DataTimestamp.toDate().toLocaleDateString()
        if(!!legitData[DataUsername]) {
          const FormatLatest = legitData[DataUsername].latestTimestamp.toDate().toLocaleDateString();
          //console.log('FormatTimestamp =>', FormatTimestamp)
          //console.log('FormatLatest =>', FormatLatest)
          //console.log('this.getDay(FormatTimestamp) =>', this.getDay('10/17/2020'))
          //console.log('this.getDay(FormatLatest) =>', this.getDay(FormatLatest))
          if (this.getDay(FormatTimestamp) > this.getDay(FormatLatest)) {
            legitData[DataUsername].latestTimestamp = DataTimestamp
            legitData[DataUsername].totalDays++
            legitData[DataUsername].value++
          } else {
            legitData[DataUsername].value++
          }
        } else {
          legitData[DataUsername] = {
            latestTimestamp: DataTimestamp,
            totalDays: 1,
            value: 1,
          }
        }
        /*
        var NewDocName = newId + ' ' + DocName[2] + ' ' + DocName[3];
        var NewDocData = doc.data();
        NewDocData['userName'] = newId;
        console.log(doc.id, " => ", NewDocName);
        db.collection(colName).doc(newId).set(NewDocData);
        */
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    console.log('legitData', legitData);

    /*rewrite the data*/
    const targetCol = 'userArchivement';
    db.collection(targetCol)
    //.where("userName", "==", oldId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        const newData = doc.data()
        const currentName = doc.data().userName
        if(!!legitData[currentName]) {
          console.log(doc.id, 'yes')
          newData[colName] = {
            firstTimestamp: doc.data()[colName].firstTimestamp,
            latestTimestamp: legitData[currentName].latestTimestamp,
            totalDays: legitData[currentName].totalDays,
            value: legitData[currentName].value
          }
          console.log('targetCol =', targetCol, ': doc.id =', doc.id)
          db.collection(targetCol).doc(doc.id).set(newData)
          console.log('rewrite!')
        } else {
          console.log(doc.id, 'no')
        }
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
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
        {/* <Button
          color="#3740FE"
          title="Dbug"
          onPress={() => this.Dbug()}
        /> */}
        <TextInput
          style={styles.inputStyle}
          placeholder="อีเมล"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="รหัสผ่าน"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Text style={styles.errorStatus}>
          {this.state.errorMessage}
        </Text>
        <Button
          color="#3740FE"
          title="เข้าสู่ระบบ"
          onPress={() => this.userLogin()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('ResetPassword')}>
          คุณลืมรหัสผ่านใช่หรือไม่?
        </Text>
        <Button
          color="#31d140"
          title="สมัครสมาชิกใหม่"
          onPress={() => this.props.navigation.navigate('Signup')}
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
    marginTop: 30,
    marginBottom: 60,
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
  errorStatus: {
    textAlign: 'left',
    marginBottom: 15,
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
    color: '#d7263f'
  }
});