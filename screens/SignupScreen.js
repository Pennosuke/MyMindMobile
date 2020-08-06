import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Picker, Dimensions, ScrollView } from 'react-native';
import firebase from '../constants/firebase';
import 'firebase/firestore';

const windowHeight = Dimensions.get('window').height;

const db = firebase.firestore();

export default class SignupScreen extends Component {
  
  constructor() {
    super();
    this.state = { 

      userName: '',
      realName: '',
      phoneNumber: '',
      email: '',
      password: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      /*school: '',
      sex: '',
      age: '',
      education: '',
      GPA: '',
      religion: '',
      address: '',
      revenueSource: '',
      revenueValue: '',
      revenueFreq: '',
      isRevenueEnough: '',
      revenueSatisfaction: '',
      parentsMaritalStatus: '',
      dadEducation: '',
      momEducation: '',*/
      isLoading: false,
    }
  }

  dayChoices() {
    const allDays = [];
    let dayIndex = 0;
    for(let i = 1; i <= 31; i++) {
      const dayString = String(i);
      allDays.push(
        <Picker.Item label={dayString} value={dayString} key={dayIndex}/>
      )
      dayIndex++;
    }
    return allDays
  }

  monthChoices() {
    const allMonthNames = [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม'
    ];
    const allMonths = [];
    let monthIndex = 0;
    for (const month of allMonthNames) {
      allMonths.push(
        <Picker.Item label={month} value={month} key={monthIndex} />
      )
      monthIndex++;
    }
    return allMonths
  }

  yearChoices() {
    const allYears = [];
    let yearIndex = 0;
    for(let i = 2563; i >= 2500; i--) {
      const yearString = String(i)
      allYears.push(
        <Picker.Item label={yearString} value={yearString} key={yearIndex} />
      )
      yearIndex++;
    }
    return allYears
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    this.setState({isLoading: true})
    const usersRef = db.collection('userData');
    usersRef.where('userName', '==', this.state.userName).get().then(snapshot => {
      if (snapshot.empty) {
        return firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
      } else {
        console.log('username already taken!');
        Alert.alert('username already taken!');
        throw new Error('username already taken');
      } 
    })
    .then(createdUser => {
      console.log(createdUser);
      createdUser.user.updateProfile({
        displayName: this.state.userName,
      })
      //Create the user doc in the users collection
      db.collection('userData').doc(createdUser.user.uid).set({
        userName: this.state.userName,
        realName: this.state.realName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        birthDay: this.state.birthDay,
        birthMonth: this.state.birthMonth,
        birthYear: this.state.birthYear,
        school: this.state.school
      });
      console.log('User registered successfully!');
      this.setState({
        isLoading: false,
        userName: '',
        realName: '',
        phoneNumber: '',
        email: '', 
        password: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        school: '',
      });
      this.props.navigation.replace('AppStackScreen', { screen: 'MUMyMind'})
    })
    .catch(error => {
      console.log(error.message);
      Alert.alert(error.message);
    });
    this.setState({isLoading: false})
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
      <View  style={{flex:1}}>
        <ScrollView style={{flex:1}}>
        <View style={{width:'100%', height:windowHeight }}>
          <Text>วันเกิด</Text>
            <Picker
              selectedValue={this.state.birthDay}
              style={{height: 40, width: '90%'}}
              onValueChange={(val, index) => this.updateInputVal(val, 'sex')}
            >
              <Picker.Item label={yearString} value={yearString} key={yearIndex} />
          </Picker>
          <View style={styles.container}>  
            <TextInput
              style={styles.inputStyle}
              placeholder="ชื่อจริง นามสกุล"
              value={this.state.realName}
              onChangeText={(val) => this.updateInputVal(val, 'realName')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="หมายเลขโทรศัพท์มือถือ"
              value={this.state.phoneNumber}
              onChangeText={(val) => this.updateInputVal(val, 'phoneNumber')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="อีเมล"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
            <View style={{flex: 1, flexDirection: 'row', maxHeight: 80}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text>วันเกิด</Text>
                <Picker
                  selectedValue={this.state.birthDay}
                  style={{height: 40, width: '90%'}}
                  onValueChange={(val, index) => this.updateInputVal(val, 'birthDay')}
                >
                  {this.dayChoices()}
                </Picker>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text>เดือนเกิด</Text>
                <Picker
                  selectedValue={this.state.birthMonth}
                  style={{height: 40, width: '90%'}}
                  onValueChange={(val, index) => this.updateInputVal(val, 'birthMonth')}
                >
                  {this.monthChoices()}
                </Picker>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text>ปีเกิด(พ.ศ.)</Text>
                <Picker
                  selectedValue={this.state.birthYear}
                  style={{height: 40, width: '90%'}}
                  onValueChange={(val, index) => this.updateInputVal(val, 'birthYear')}
                >
                  {this.yearChoices()}
                </Picker>
              </View>
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="ชื่อโรงเรียน"
              value={this.state.school}
              onChangeText={(val) => this.updateInputVal(val, 'school')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="ชื่อผู้ใช้"
              value={this.state.userName}
              onChangeText={(val) => this.updateInputVal(val, 'userName')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="รหัสผ่านใหม่"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              maxLength={15}
              secureTextEntry={true}
            />
            
            <Button
              color="#3740FE"
              title="สมัครสมาชิก"
              onPress={() => this.registerUser()}
            />

            <Text 
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Login')}>
              เป็นสมาชิกอยู่แล้ว? กดที่นี่เพื่อเข้าสู่ระบบ
            </Text>                          
          </View>
        </View>
        </ScrollView>
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
    marginTop: 25,
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
  }
});