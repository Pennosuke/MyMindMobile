import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MockupData } from '../constants/MockupData';
import {
  Program1,
  Homework1,
  Program2,
  Homework2,
  Program3,
  Homework3,
  Program4,
  Homework4,
} from '../constants/โปรแกรมฝึกปฏิบัติ';

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

  renderProgram1Button() {
      return(
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TreatmentScreen', { data : Program1, collection : 'โปรแกรมที่_1_หายใจคลายเครียด', name: 'โปรแกรมที่ 1 หายใจคลายเครียด' })}
          disabled={!this.isAvailible('แบบประเมิน', 1)}
        >
          <View style={!this.isAvailible('แบบประเมิน', 1) ? [styles.roundedButton, styles.disableButton] : this.isAvailible('โปรแกรมที่_1_หายใจคลายเครียด', 1) ? [styles.roundedButton, styles.finishedButton] : styles.roundedButton}>
            <Text style={!this.isAvailible('แบบประเมิน', 1) ? [styles.buttonFont, styles.disablebuttonFont] : styles.buttonFont}>โปรแกรมที่ 1 “หายใจคลายเครียด”</Text>
            {!this.isAvailible('แบบประเมิน', 1) ? this.renderWaitingText('แบบประเมิน', 'แบบประเมิน', 1) : <></>}
          </View>
        </TouchableOpacity>
      )
  }

  renderHomework1Button() {
    if(!!global.userArchivement['โปรแกรมที่_1_หายใจคลายเครียด']) {
      return(
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TreatmentScreen', { data : Homework1, collection : 'ทบทวนโปรแกรมที่_1_หายใจคลายเครียด', name: 'ทบทวนโปรแกรมที่ 1 หายใจคลายเครียด' })}
        >
          <View style={this.isAvailible('ทบทวนโปรแกรมที่_1_หายใจคลายเครียด', 3) ? [styles.roundedButton, styles.finishedButton] : styles.roundedButton}>
            <Text style={styles.buttonFont}>
              ทบทวนโปรแกรมที่ 1{this.renderHomeworkValue('ทบทวนโปรแกรมที่_1_หายใจคลายเครียด', 3)}
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <></>
      )
    }
  }

  renderProgram2Button() {
    if(!!global.userArchivement['โปรแกรมที่_1_หายใจคลายเครียด']) {
      return(
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TreatmentScreen', { data : Program2, collection : 'โปรแกรมที่_2_ละเอียดลออดูกาย', name: 'โปรแกรมที่ 2 ละเอียดลออดูกาย' })}
          disabled={!this.isAvailible('ทบทวนโปรแกรมที่_1_หายใจคลายเครียด', 3)}
        >
          <View style={!this.isAvailible('ทบทวนโปรแกรมที่_1_หายใจคลายเครียด', 3) ? [styles.roundedButton, styles.disableButton] : this.isAvailible('โปรแกรมที่_2_ละเอียดลออดูกาย', 1) ? [styles.roundedButton, styles.finishedButton] : styles.roundedButton}>
            <Text style={!this.isAvailible('ทบทวนโปรแกรมที่_1_หายใจคลายเครียด', 3) ? [styles.buttonFont, styles.disablebuttonFont] : styles.buttonFont}>
              โปรแกรมที่ 2 “ละเอียดลออดูกาย”
            </Text>
            {!this.isAvailible('ทบทวนโปรแกรมที่_1_หายใจคลายเครียด', 3) ? this.renderWaitingText('ทบทวนโปรแกรมที่_1_หายใจคลายเครียด', 'ทบทวนโปรแกรมที่ 1', 3) : <></>}
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <></>
      )
    }
  }

  renderHomework2Button() {
    if(!!global.userArchivement['โปรแกรมที่_2_ละเอียดลออดูกาย']) {
      return(
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TreatmentScreen', { data : Homework2, collection : 'ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย', name: 'ทบทวนโปรแกรมที่ 2 ละเอียดลออดูกาย' })}
        >
          <View style={this.isAvailible('ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย', 3) ? [styles.roundedButton, styles.finishedButton] : styles.roundedButton}>
            <Text style={styles.buttonFont}>
              ทบทวนโปรแกรมที่ 2{this.renderHomeworkValue('ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย', 3)}
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <></>
      )
    }
  }

  renderProgram3Button() {
    if(!!global.userArchivement['โปรแกรมที่_2_ละเอียดลออดูกาย']) {
      return(
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TreatmentScreen', { data : Program3, collection : 'โปรแกรมที่_3_ตระหนักรู้ในอารมณ์', name: 'โปรแกรมที่ 3 ตระหนักรู้ในอารมณ์' })}
          disabled={!this.isAvailible('ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย', 3)}
        >
          <View style={!this.isAvailible('ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย', 3) ? [styles.roundedButton, styles.disableButton] : this.isAvailible('โปรแกรมที่_3_ตระหนักรู้ในอารมณ์', 1) ? [styles.roundedButton, styles.finishedButton] : styles.roundedButton}>
            <Text style={!this.isAvailible('ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย', 3) ? [styles.buttonFont, styles.disablebuttonFont] : styles.buttonFont}>
              โปรแกรมที่ 3 “ตระหนักรู้ในอารมณ์”
            </Text>
            {!this.isAvailible('ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย', 3) ? this.renderWaitingText('ทบทวนโปรแกรมที่_2_ละเอียดลออดูกาย', 'ทบทวนโปรแกรมที่ 2', 3) : <></>}
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <></>
      )
    }
  }

  renderHomework3Button() {
    if(!!global.userArchivement['โปรแกรมที่_3_ตระหนักรู้ในอารมณ์']) {
      return(
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TreatmentScreen', { data : Homework3, collection : 'ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์', name: 'ทบทวนโปรแกรมที่ 3 ตระหนักรู้ในอารมณ์' })}
        >
          <View style={this.isAvailible('ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์', 3) ? [styles.roundedButton, styles.finishedButton] : styles.roundedButton}>
            <Text style={styles.buttonFont}>
              ทบทวนโปรแกรมที่ 3{this.renderHomeworkValue('ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์', 3)}
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <></>
      )
    }
  }

  renderProgram4Button() {
    if(!!global.userArchivement['โปรแกรมที่_3_ตระหนักรู้ในอารมณ์']) {
      return(
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TreatmentScreen', { data : Program4, collection : 'โปรแกรมที่_4_ปรับความคิดพิชิตเศร้า', name: 'โปรแกรมที่ 4 ปรับความคิด.....พิชิตเศร้า' })}
          disabled={!this.isAvailible('ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์', 3)}
        >
          <View style={!this.isAvailible('ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์', 3) ? [styles.roundedButton, styles.disableButton] : this.isAvailible('โปรแกรมที่_4_ปรับความคิดพิชิตเศร้า', 1) ? [styles.roundedButton, styles.finishedButton] : styles.roundedButton}>
            <Text style={!this.isAvailible('ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์', 3) ? [styles.buttonFont, styles.disablebuttonFont] : styles.buttonFont}>
              โปรแกรมที่ 4 “ปรับความคิด.....พิชิตเศร้า”
            </Text>
            {!this.isAvailible('ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์', 3) ? this.renderWaitingText('ทบทวนโปรแกรมที่_3_ตระหนักรู้ในอารมณ์', 'ทบทวนโปรแกรมที่ 3', 3) : <></>}
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <></>
      )
    }
  }

  renderHomework4Button() {
    if(!!global.userArchivement['โปรแกรมที่_4_ปรับความคิดพิชิตเศร้า']) {
      return(
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TreatmentScreen', { data : Homework4, collection : 'ทบทวนโปรแกรมที่_4_ปรับความคิดพิชิตเศร้า', name: 'ทบทวนโปรแกรมที่ 4 ปรับความคิด.....พิชิตเศร้า' })}
        >
          <View style={this.isAvailible('ทบทวนโปรแกรมที่_4_ปรับความคิดพิชิตเศร้า', 3) ? [styles.roundedButton, styles.finishedButton] : styles.roundedButton}>
            <Text style={styles.buttonFont}>
              ทบทวนโปรแกรมที่ 4{this.renderHomeworkValue('ทบทวนโปรแกรมที่_4_ปรับความคิดพิชิตเศร้า', 3)}
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <></>
      )
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
          <Text style={styles.title}>โปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
          <View style={
            {flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20}}
          >
            {this.renderProgram1Button()}
            {this.renderHomework1Button()}
            {this.renderProgram2Button()}
            {this.renderHomework2Button()}
            {this.renderProgram3Button()}
            {this.renderHomework3Button()}
            {this.renderProgram4Button()}
            {this.renderHomework4Button()}
          </View>
          {/* <Text style={styles.title}>โปรแกรมเสริม</Text>
          <View style={
            {flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20}}
          >
            <TouchableOpacity>
              <View style={[styles.roundedButton, {backgroundColor: "#d59c2a"}]}>
                <Text style={styles.buttonFont}>
                  โปรแกรมพิเศษที่ 1
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}
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