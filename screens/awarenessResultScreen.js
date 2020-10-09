import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const defaultAnswers = 0;

export default class awarenessResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Usersdata: [],
      isLoaded: false
    };
  }

  compare_timestamp(a, b){
    // console.log('a', a)
    // console.log('b', b)
    if(a.timestamp.seconds < b.timestamp.seconds){
      return 1;
    }else if(a.timestamp.seconds > b.timestamp.seconds){
      return -1;
    }else{
      return 0;
    }
  }

  async componentDidMount() {
    const datasnapshot = await db.collection('แบบวัดการมีสติ').where('userName', '==', global.userData.userName).get();
    if (datasnapshot.docs.length > 0) {
      const getUserData = datasnapshot.docs.map(doc => ({
        userName: doc.data().userName,
        timestamp: doc.data().timestamp,
        score: doc.data()['1'].value +
          doc.data()['2'].value +
          doc.data()['3'].value +
          doc.data()['4'].value +
          doc.data()['5'].value +
          doc.data()['6'].value +
          doc.data()['7'].value +
          doc.data()['8'].value +
          doc.data()['9'].value +
          doc.data()['10'].value +
          doc.data()['11'].value +
          doc.data()['12'].value +
          doc.data()['13'].value +
          doc.data()['14'].value +
          doc.data()['15'].value
      }));
      getUserData.sort(this.compare_timestamp)
      this.setState({Usersdata : getUserData})
    }
    this.setState({isLoaded : true})
  }

  renderDate(timestamp) {
    const Datestamp = timestamp.toDate().toLocaleDateString()
    const splitDatestamp = Datestamp.split('/')
    const Month = splitDatestamp[0]
    const Day = splitDatestamp[1]
    const Year = splitDatestamp[2]
    const newTimestamp = timestamp.toDate().toLocaleTimeString()
    const splitTimestamp = newTimestamp.split(' ')
    const Time = splitTimestamp[0]
    const splitTime = Time.split(':')
    var Hour = splitTime[0]
    const Minute = splitTime[1]
    const Second = splitTime[2]
    var TimeZone = ''
    if(splitTimestamp.length === 2) {
      TimeZone = splitTimestamp[1]
      if(TimeZone === 'AM' && Hour === '12') {
        Hour = '0'
      } else if(TimeZone === 'PM' && Hour !== '12') {
        Hour = String(parseInt(Hour, 10) + 12)
      }
    }
    return 'วันที่ ' + Day + '/' + Month + '/' + Year + ' เวลา ' + Hour + ':' + Minute + ':' + Second + ' น.'
  }

  render() {
    // console.log('UsersData', this.state.Usersdata);
    return (
      <View style={styles.background}>
        <ScrollView style={{flex:1 ,width:'100%'}}>
          <View style={{width:'100%', height: '100%' , paddingTop: 30}}>
            {
              !!this.state.Usersdata.length ? (
                this.state.Usersdata.map(( userdata, index ) =>
                  <View style={styles.mainSurveyContainer} key={index}>
                    <View style={styles.surveyContainer}>
                      <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <Text style={styles.titleText}>{this.renderDate(userdata.timestamp)}</Text>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                          <Text style={styles.infoText}>คะแนนการมีสติ</Text>
                          <Text style={styles.infoText}>{userdata.score}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              ) : this.state.isLoaded ? (
                <View style={styles.mainSurveyContainer}>
                  <View style={styles.surveyContainer}>
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                      <Text style={styles.titleText}>ยังไม่มีผลการประเมิน</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.mainSurveyContainer}>
                  <View style={styles.surveyContainer}>
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                      <Text style={styles.titleText}>กำลังโหลดข้อมูล โปรดรอสักครู่...</Text>
                    </View>
                  </View>
                </View>
              )
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainSurveyContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    alignContent: 'center',
    padding: 5,
    marginBottom: 30,
    flexGrow: 0,
  },
  surveyContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    alignContent: 'center',
    padding: 5,
    flexGrow: 0,
  },
  titleText: {
    marginBottom: 20,
    fontSize: Dimensions.get('window').width >= 375 ? 18 : 16,
    fontFamily: 'Kanit-Regular',
    textAlign: 'center'
  },
  infoText: {
    marginBottom: 20,
    fontSize: Dimensions.get('window').width >= 375 ? 16 : 14,
    fontFamily: 'Kanit-Regular'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE,
  },
  container: {
    minWidth: '70%',
    maxWidth: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '80%',
    padding: 20,
  },
  questionText: {
    marginBottom: 20,
    fontFamily: 'Kanit-Regular',
    fontSize: 14
  },
  roundedButton: {
    justifyContent:"center",
    alignItems:"center",
    width: '100%',
    height: 62,
    borderRadius:30,
    backgroundColor:"#22459E",
    display: "flex",
    padding: 10,
    margin: 10,
    alignSelf: "center"
  },
});