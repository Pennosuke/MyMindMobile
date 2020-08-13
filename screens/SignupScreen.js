import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Picker, Dimensions, ScrollView } from 'react-native';
import firebase, { db } from '../constants/firebase';
import 'firebase/firestore';

const windowHeight = Dimensions.get('window').height;

export default class SignupScreen extends Component {
  
  constructor() {
    super();
    this.state = { 
      realName: '',
      sex: 'ชาย',
      age: '',
      education: 'ระดับประถมศึกษาปีที่ 1',
      GPA: '',
      religion: 'พุทธ',
      address: 'อาศัยอยู่กับบิดามารดา',
      phoneNumber: '',
      email: '',
      revenueSource: 'จากบิดามารดาหรือผู้ปกครอง',
      revenueValue: '',
      revenueFreq: 'บาท/วัน',
      isRevenueEnough: 'เพียงพอ',
      revenueSatisfaction: 'พอใจมากที่สุด',
      parentsMaritalStatus: 'บิดา-มารดา อยู่ด้วยกัน',
      dadEducation: 'ต่ำกว่าประถมศึกษา',
      momEducation: 'ต่ำกว่าประถมศึกษา',
      userName: '',
      password: '',
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
    const { realName, age, GPA, revenueValue, phoneNumber, email, userName, password } = this.state;
    if(realName === '') {
      console.log('โปรดกรอกชื่อจริง นามสกุล');
      Alert.alert('โปรดกรอกชื่อจริง นามสกุล');
    } else if (age === '') {
      console.log('โปรดกรอกอายุ');
      Alert.alert('โปรดกรอกอายุ');
    } else if (GPA === '') {
      console.log('โปรดกรอกผลการเรียน');
      Alert.alert('โปรดกรอกผลการเรียน');
    } else if (revenueValue === '') {
      console.log('โปรดกรอกจำนานรายรับ');
      Alert.alert('โปรดกรอกจำนานรายรับ');
    } else if (phoneNumber === '') {
      console.log('โปรดกรอกหมายเลขโทรศัพท์มือถือ');
      Alert.alert('โปรดกรอกหมายเลขโทรศัพท์มือถือ');
    } else if (email === '') {
      console.log('โปรดกรอกอีเมล');
      Alert.alert('โปรดกรอกอีเมล');
    } else if (userName === '') {
      console.log('โปรดกรอกชื่อผู้ใช้');
      Alert.alert('โปรดกรอกชื่อผู้ใช้');
    } else if (password === '') {
      console.log('โปรดกรอกรหัสผ่าน');
      Alert.alert('โปรดกรอกรหัสผ่าน');
    } else {
      setTimeout(() =>{
        usersRef.where('userName', '==', this.state.userName).get().then(snapshot => {
          if (snapshot.empty) {
            return firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
          } else {
            console.log('username already taken!');
            Alert.alert('ชื่อผู้ใช้ซ้ำกับผู้ใช้อื่นที่มีอยู่ในระบบแล้ว! กรุณาตั้งชื่อผู้ใช้ใหม่');
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
            sex: this.state.sex,
            age: this.state.age,
            education: this.state.education,
            GPA: this.state.GPA,
            religion: this.state.religion,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            revenueSource: this.state.revenueSource,
            revenueValue: this.state.revenueValue,
            revenueFreq: this.state.revenueFreq,
            isRevenueEnough: this.state.isRevenueEnough,
            revenueSatisfaction: this.state.revenueSatisfaction,
            parentsMaritalStatus: this.state.parentsMaritalStatus,
            dadEducation: this.state.dadEducation,
            momEducation: this.state.momEducation
          });
          const currentTime = firebase.firestore.Timestamp.fromDate(new Date());
          /*db.collection('userArchivement').doc(this.state.userName).set({
            แบบประเมิน: {
              latestTimestamp: currentTime,
              firstTimestamp: currentTime,
              value: 0
            }
          })*/
          console.log('User registered successfully!');
          this.setState({
            realName: '',
            sex: '',
            age: '',
            education: '',
            GPA: '',
            religion: '',
            address: '',
            phoneNumber: '',
            email: '',
            revenueSource: '',
            revenueValue: '',
            revenueFreq: '',
            isRevenueEnough: '',
            revenueSatisfaction: '',
            parentsMaritalStatus: '',
            dadEducation: '',
            momEducation: '',
            userName: '',
            password: ''
          });
          this.props.navigation.replace('Init');
        })
        .catch(error => {
          console.log(error.message);
          Alert.alert(error.message);
        });
      }, 1000);
      this.setState({isLoading: false});
    }
    this.setState({isLoading: false});
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
        <View style={{width:'100%', minHeight:windowHeight }}>
          <View style={styles.container}>
            <Text style={styles.content}>ชื่อจริง นามสกุล</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="ชื่อจริง นามสกุล"
              value={this.state.realName}
              onChangeText={(val) => this.updateInputVal(val, 'realName')}
            />
            <Text style={styles.content}>เพศ</Text>
            <Picker
              selectedValue={this.state.sex}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'sex')}
            >
              <Picker.Item label='ชาย' value='ชาย'/>
              <Picker.Item label='หญิง' value='หญิง'/>
            </Picker>
            <Text style={styles.content}>อายุ</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="อายุ"
              value={this.state.age}
              onChangeText={(val) => this.updateInputVal(val, 'age')}
            />
            <Text style={styles.content}>ระดับการศึกษา</Text>
            <Picker
              selectedValue={this.state.education}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'education')}
            >
              <Picker.Item label='ระดับประถมศึกษาปีที่ 1' value='ระดับประถมศึกษาปีที่ 1'/>
              <Picker.Item label='ระดับประถมศึกษาปีที่ 2' value='ระดับประถมศึกษาปีที่ 2'/>
              <Picker.Item label='ระดับประถมศึกษาปีที่ 3' value='ระดับประถมศึกษาปีที่ 3'/>
              <Picker.Item label='ระดับประถมศึกษาปีที่ 4' value='ระดับประถมศึกษาปีที่ 4'/>
              <Picker.Item label='ระดับประถมศึกษาปีที่ 5' value='ระดับประถมศึกษาปีที่ 5'/>
              <Picker.Item label='ระดับประถมศึกษาปีที่ 6' value='ระดับประถมศึกษาปีที่ 6'/>
              <Picker.Item label='ระดับมัธยมศึกษาปีที่ 1' value='ระดับมัธยมศึกษาปีที่ 1'/>
              <Picker.Item label='ระดับมัธยมศึกษาปีที่ 2' value='ระดับมัธยมศึกษาปีที่ 2'/>
              <Picker.Item label='ระดับมัธยมศึกษาปีที่ 3' value='ระดับมัธยมศึกษาปีที่ 3'/>
              <Picker.Item label='ระดับมัธยมศึกษาปีที่ 4' value='ระดับมัธยมศึกษาปีที่ 4'/>
              <Picker.Item label='ระดับมัธยมศึกษาปีที่ 5' value='ระดับมัธยมศึกษาปีที่ 5'/>
              <Picker.Item label='ระดับมัธยมศึกษาปีที่ 6' value='ระดับมัธยมศึกษาปีที่ 6'/>
              <Picker.Item label='ระดับอุดมศึกษา' value='ระดับอุดมศึกษา'/>
            </Picker>
            <Text style={styles.content}>ผลการเรียนที่ผ่านมา (GPA)</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="ผลการเรียนที่ผ่านมา (GPA)"
              value={this.state.GPA}
              onChangeText={(val) => this.updateInputVal(val, 'GPA')}
            />
            <Text style={styles.content}>ศาสนา</Text>
            <Picker
              selectedValue={this.state.religion}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'religion')}
            >
              <Picker.Item label='พุทธ' value='พุทธ'/>
              <Picker.Item label='คริสต์' value='คริสต์'/>
              <Picker.Item label='อิสลาม' value='อิสลาม'/>
              <Picker.Item label='พราหมณ์-ฮินดู' value='พราหมณ์-ฮินดู'/>
              <Picker.Item label='อื่นๆ' value='อื่นๆ'/>
            </Picker>
            <Text style={styles.content}>ที่อยู่ปัจจุบัน</Text>
            <Picker
              selectedValue={this.state.address}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'address')}
            >
              <Picker.Item label='อาศัยอยู่กับบิดามารดา' value='อาศัยอยู่กับบิดามารดา'/>
              <Picker.Item label='อาศัยอยู่กับญาติ' value='อาศัยอยู่กับญาติ'/>
              <Picker.Item label='อาศัยอยู่หอพัก' value='อาศัยอยู่หอพัก'/>
              <Picker.Item label='อาศัยอยู่กับเพื่อน' value='อาศัยอยู่กับเพื่อน'/>
              <Picker.Item label='อื่นๆ' value='อื่นๆ'/>
            </Picker>
            <Text style={styles.content}>ท่านได้รับเงินค่าใช้จ่ายจากแหล่งใด</Text>
            <Picker
              selectedValue={this.state.revenueSource}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'revenueSource')}
            >
              <Picker.Item label='จากบิดามารดาหรือผู้ปกครอง' value='จากบิดามารดาหรือผู้ปกครอง'/>
              <Picker.Item label='จากการทำงานได้เอง' value='จากการทำงานได้เอง'/>
              <Picker.Item label='อื่นๆ' value='อื่นๆ'/>
            </Picker>
            <Text style={styles.content}>ท่านได้รับเงินค่าใช้จ่ายเท่าไหร่</Text>
            <View style={{flex: 1, flexDirection: 'row', maxHeight: 80}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TextInput
                  style={[styles.inputStyle,{height: 40, width: '90%', padding: 0}]}
                  placeholder="จำนวนเงิน"
                  value={this.state.revenueValue}
                  onChangeText={(val) => this.updateInputVal(val, 'revenueValue')}
                />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Picker
                  selectedValue={this.state.revenueFreq}
                  style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
                  onValueChange={(val, index) => this.updateInputVal(val, 'revenueFreq')}
                >
                  <Picker.Item label='บาท/วัน' value='บาท/วัน'/>
                  <Picker.Item label='บาท/สัปดาห์' value='บาท/สัปดาห์'/>
                  <Picker.Item label='บาท/เดือน' value='บาท/เดือน'/>
                </Picker>
              </View>
            </View>
            <Text style={styles.content}>เงินที่ได้รับจากบิดามารดาหรือผู้ปกครองเพียงพอกับค่าใช้จ่ายหรือไม่</Text>
            <Picker
              selectedValue={this.state.isRevenueEnough}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'isRevenueEnough')}
            >
              <Picker.Item label='เพียงพอ' value='เพียงพอ'/>
              <Picker.Item label='ไม่เพียงพอ' value='ไม่เพียงพอ'/>
            </Picker>
            <Text style={styles.content}>ความพึงพอใจของรายได้ที่ได้รับ</Text>
            <Picker
              selectedValue={this.state.revenueSatisfaction}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'revenueSatisfaction')}
            >
              <Picker.Item label='พอใจมากที่สุด' value='พอใจมากที่สุด'/>
              <Picker.Item label='พอใจมาก' value='พอใจมาก'/>
              <Picker.Item label='พอใจปานกลาง' value='พอใจปานกลาง'/>
              <Picker.Item label='พอใจน้อย' value='พอใจน้อย'/>
              <Picker.Item label='ไม่พอใจ' value='ไม่พอใจ'/>
            </Picker>
            <Text style={styles.content}>สถานภาพสมรสของบิดามารดา</Text>
            <Picker
              selectedValue={this.state.parentsMaritalStatus}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'parentsMaritalStatus')}
            >
              <Picker.Item label='บิดา-มารดา อยู่ด้วยกัน' value='บิดา-มารดา อยู่ด้วยกัน'/>
              <Picker.Item label='บิดา-มารดา ถึงแก่กรรม' value='บิดา-มารดา ถึงแก่กรรม'/>
              <Picker.Item label='บิดาถึงแก่กรรม' value='บิดาถึงแก่กรรม'/>
              <Picker.Item label='มารดาถึงแก่กรรม' value='มารดาถึงแก่กรรม'/>
              <Picker.Item label='บิดา-มารดาแยกกันอยู่' value='บิดา-มารดาแยกกันอยู่'/>
              <Picker.Item label='บิดา-มารดาหย่าร้าง' value='บิดา-มารดาหย่าร้าง'/>
            </Picker>
            <Text style={styles.content}>ระดับการศึกษาของบิดา</Text>
            <Picker
              selectedValue={this.state.dadEducation}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'dadEducation')}
            >
              <Picker.Item label='ต่ำกว่าประถมศึกษา' value='ต่ำกว่าประถมศึกษา'/>
              <Picker.Item label='ประถมศึกษา' value='ประถมศึกษา'/>
              <Picker.Item label='มัธยมศึกษาตอนต้น' value='มัธยมศึกษาตอนต้น'/>
              <Picker.Item label='มัธยมศึกษาตอนปลาย/ปวช' value='มัธยมศึกษาตอนปลาย/ปวช'/>
              <Picker.Item label='อนุปริญญา/ปวส' value='อนุปริญญา/ปวส'/>
              <Picker.Item label='ปริญญาตรี' value='ปริญญาตรี'/>
              <Picker.Item label='สูงกว่าปริญญาตรี' value='สูงกว่าปริญญาตรี'/>
            </Picker>
            <Text style={styles.content}>ระดับการศึกษาของมารดา</Text>
            <Picker
              selectedValue={this.state.momEducation}
              style={{height: 40, width: '90%', marginBottom: 15, alignSelf: "center"}}
              onValueChange={(val, index) => this.updateInputVal(val, 'momEducation')}
            >
              <Picker.Item label='ต่ำกว่าประถมศึกษา' value='ต่ำกว่าประถมศึกษา'/>
              <Picker.Item label='ประถมศึกษา' value='ประถมศึกษา'/>
              <Picker.Item label='มัธยมศึกษาตอนต้น' value='มัธยมศึกษาตอนต้น'/>
              <Picker.Item label='มัธยมศึกษาตอนปลาย/ปวช' value='มัธยมศึกษาตอนปลาย/ปวช'/>
              <Picker.Item label='อนุปริญญา/ปวส' value='อนุปริญญา/ปวส'/>
              <Picker.Item label='ปริญญาตรี' value='ปริญญาตรี'/>
              <Picker.Item label='สูงกว่าปริญญาตรี' value='สูงกว่าปริญญาตรี'/>
            </Picker>
            <Text style={styles.content}>หมายเลขโทรศัพท์มือถือ</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="หมายเลขโทรศัพท์มือถือ"
              value={this.state.phoneNumber}
              onChangeText={(val) => this.updateInputVal(val, 'phoneNumber')}
            />
            <Text style={styles.content}>อีเมล</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="อีเมล"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
            <Text style={styles.content}>ตั้งชื่อผู้ใช้ (username)</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="ตั้งชื่อผู้ใช้ (username)"
              value={this.state.userName}
              onChangeText={(val) => this.updateInputVal(val, 'userName')}
            />
            <Text style={styles.content}>รหัสผ่านใหม่</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="รหัสผ่านใหม่"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              maxLength={15}
              secureTextEntry={true}
            />

            {/* <View style={{flex: 1, flexDirection: 'row', maxHeight: 80}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.content}>วันเกิด</Text>
                <Picker
                  selectedValue={this.state.birthDay}
                  style={{height: 40, width: '90%'}}
                  onValueChange={(val, index) => this.updateInputVal(val, 'birthDay')}
                >
                  {this.dayChoices()}
                </Picker>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.content}>เดือนเกิด</Text>
                <Picker
                  selectedValue={this.state.birthMonth}
                  style={{height: 40, width: '90%'}}
                  onValueChange={(val, index) => this.updateInputVal(val, 'birthMonth')}
                >
                  {this.monthChoices()}
                </Picker>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.content}>ปีเกิด(พ.ศ.)</Text>
                <Picker
                  selectedValue={this.state.birthYear}
                  style={{height: 40, width: '90%'}}
                  onValueChange={(val, index) => this.updateInputVal(val, 'birthYear')}
                >
                  {this.yearChoices()}
                </Picker>
              </View>
            </View> */}

            
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
  },
  content: {
    textAlign: 'left',
    marginVertical: 8,
    paddingRight: 10,
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
});