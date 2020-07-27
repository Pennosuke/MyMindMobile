import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mentalTest } from '../constants/แบบวัดสุขภาวะทางจิตใจ';
import firebase from '../constants/firebase';
import 'firebase/firestore';

export function tabA() {
  
  const db = firebase.firestore();
  const navigation = useNavigation();
  const getFirestoreData = () => {
    const fbData = [];
    db.collection("result").get().then((snapshot => {
      snapshot.forEach(doc=>{
        console.log()
        fbData.push(doc.data())
      })
    }));
    navigation.navigate('EvaluationResult', { data : fbData })
  }
  

  return (
    <View style={
      {flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20}}>
      <Text style={styles.title}>ผลการประเมิน</Text>
      <TouchableHighlight onPress={getFirestoreData}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white'}}>ดูผลการประเมิน</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('Survey', { data : mentalTest, database : db })}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white'}}>เริ่มทำแบบประเมิน</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
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