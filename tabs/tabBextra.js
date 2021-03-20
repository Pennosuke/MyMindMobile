import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MockupData } from '../constants/MockupData';

export default class tabB extends Component {

  constructor() {
    super();
    this.state = { 
    }
  }

  getDay = (date) => {
    const splitDate = date.split('/')
    return parseInt(splitDate[1], 10)
  }
  
  getMonth = (date) => {
    const splitDate = date.split('/')
    return parseInt(splitDate[0], 10)
  }
  
  getYear = (date) => {
    const splitDate = date.split('/')
    const moreSplitDate = splitDate[2].split(' ')
    return parseInt(moreSplitDate[0], 10)
  }

  getHour = (date) => {
    const splitDate = date.split(' ')
    var Time = ''
    var TimeZone = ''
    var splitTime = []
    if(splitDate.length === 2) {
      Time = splitDate[1]
      splitTime = Time.split(':')
      return parseInt(splitTime[0], 10)
    } else if(splitDate.length === 3) {
      Time = splitDate[1]
      TimeZone = splitDate[2]
      splitTime = Time.split(':')
      return TimeZone === 'PM' ? (splitTime[0] === '12' ? 12 : parseInt(splitTime[0], 10) + 12) : (splitTime[0] === '12' ? 0 : parseInt(splitTime[0], 10))
    }
  }

  getMinute = (date) => {
    const splitDate = date.split(' ')
    const Time = splitDate[1]
    const TimeZone = splitDate[2]
    const splitTime = Time.split(':')
    return parseInt(splitTime[1], 10)
  }

  getSecond = (date) => {
    const splitDate = date.split(' ')
    const Time = splitDate[1]
    const TimeZone = splitDate[2]
    const splitTime = Time.split(':')
    return parseInt(splitTime[2], 10)
  }

  getTotalSecond = (date) => {
    return this.getSecond(date) + (this.getMinute(date) * 60) + (this.getHour(date) * 3600)
  }

  renderHomeworkValue(collection, minimum) {
    if(!global.userArchivement[collection]) {
      return ' (0/' + minimum + ' วัน)';
    } else if(global.userArchivement[collection].totalDays < minimum) {
      return ' (' + global.userArchivement[collection].totalDays + '/' + minimum + ' วัน)';
    } else {
      return ''
    }
  }

  renderWaitingText(collection, name, minimumDay) {
    if(!global.userArchivement[collection]) {
      return(
        <Text style={[styles.buttonFont, styles.waitingFont]}>
          โปรดทำ"{name}"ให้ครบ {minimumDay} วัน (0/{minimumDay} วัน)
        </Text>
      )
    } else if(global.userArchivement[collection]['totalDays'] < minimumDay) {
      return(
        <Text style={[styles.buttonFont, styles.waitingFont]}>
          โปรดทำ"{name}"ให้ครบ {minimumDay} วัน ({global.userArchivement[collection]['totalDays']}/{minimumDay} วัน)
        </Text>
      )
    }
  }

  isAvailible(collection, minimum) {
    if(!global.userArchivement[collection]) {
      return false;
    } else if (global.userArchivement[collection]['totalDays'] < minimum) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <ScrollView>
        <View 
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 10
          }}
        >
          <Text style={styles.title}>โปรแกรมเสริม</Text>
          <View style={
            {flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20}}
          >
            { !!(global.extraProgram.length) ? (
              global.extraProgram.map((elem, index) => 
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('TreatmentScreen', {
                    data : elem.contents,
                    collection : elem.programName,
                    name: elem.programName,
                    isExtra: true,
                  })}
                >
                  <View style={[styles.roundedButton, {backgroundColor: "#d59c2a"}]}>
                    <Text style={styles.buttonFont}>
                      {elem.programName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            ) : (
              <Text style={[styles.buttonFont, styles.waitingFont]}>
                ยังไม่มีโปรแกรมเสริม ณ ขณะนี้
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
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
    paddingRight: 10,
    fontFamily: 'Kanit-Medium',
    fontSize: Dimensions.get('window').width >= 375 ? 18 : 14
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
    width: (Dimensions.get('window').width * 0.8),
    height: 62,
    borderRadius:30,
    backgroundColor:"#22459E",
    display: "flex",
    padding: 10,
    margin: 10,
    alignSelf: "center"
  },
  disableButton: {
    backgroundColor:"#dfdfdf"
  },
  finishedButton: {
    backgroundColor:"#2cc156"
  },
  buttonFont: {
    textAlign: 'center',
    padding: 0,
    color: 'white',
    fontFamily: 'Kanit-Regular',
    fontSize: Dimensions.get('window').width >= 375 ? 16 : 14
  },
  disablebuttonFont: {
    color: '#a3a3a3'
  },
  waitingFont: {
    fontFamily: 'Kanit-Regular',
    color: '#535353',
    fontSize: Dimensions.get('window').width >= 375 ? 12 : 10
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