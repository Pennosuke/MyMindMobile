import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, TouchableHighlight, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import firebase from '../constants/firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'
import { prologue ,SPWB, DASS, Q8 } from '../constants/แบบประเมิน';

export default class tabA extends Component {

  doQuestionare = () => {
    const initTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
    this.props.navigation.navigate('prologueScreen', { data : prologue, initTimestamp: initTimestamp })
  }

  render() {
    return (
      <ScrollView>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10
        }}>
          <Text style={styles.title}>แบบประเมิน</Text>
          <TouchableOpacity onPress={this.doQuestionare}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonFont}>เริ่มทำแบบประเมิน</Text>
            </View>
          </TouchableOpacity>
          {
            !!global.userArchivement['แบบประเมิน'] ? (
              <View>
                <Text style={styles.title}>ผลการประเมิน</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('spwbResultScreen')}>
                  <View style={[styles.roundedButton,styles.finishedButton]}>
                    <Text style={styles.buttonFont}>ดูผลแบบวัดสุขภาวะทางจิตใจ</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('awarenessResultScreen')}>
                <View style={[styles.roundedButton,styles.finishedButton]}>
                    <Text style={styles.buttonFont}>ดูผลแบบวัดการมีสติ</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('dassResultScreen')}>
                <View style={[styles.roundedButton,styles.finishedButton]}>
                    <Text style={styles.buttonFont}>ดูผลแบบสอบถามวัดภาวะสุขภาพจิต</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )
          }
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