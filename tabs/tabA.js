import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../constants/firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'
import { prologue ,SPWB, DASS, Q8 } from '../constants/แบบประเมิน';

export default class tabA extends Component {

  getFirestoreData = () => {
    const fbData = [];
    db.collection("result").get().then((snapshot => {
      snapshot.forEach(doc=>{
        console.log()
        fbData.push(doc.data())
      })
    }));
    this.props.navigation.navigate('EvaluationResult', { data : fbData })
  }

  render() {
    return (
      <View style={
        {flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10}}>
        <Text style={styles.title}>แบบประเมินภาวะสุขภาพจิต</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('prologueScreen', { data : prologue })}>
          <View style={styles.roundedButton}>
            <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>เริ่มทำแบบประเมิน</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('dassScreen', { data : DASS })}>
          <View style={styles.roundedButton}>
            <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>DASS-warp</Text>
          </View>
        </TouchableOpacity> */}
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
    paddingRight: 10,
    fontFamily: 'Kanit-Medium',
    fontSize: 20
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
    width: '100%',
    height: 62,
    borderRadius:30,
    backgroundColor:"#22459E",
    display: "flex",
    padding: 10,
    margin: 10,
    alignSelf: "center"
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