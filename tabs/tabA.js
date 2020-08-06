import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../constants/firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'
import { SPWB, Q8 } from '../constants/แบบประเมิน';

export function tabA() {
  
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
      paddingVertical: 20,
      paddingHorizontal: 10}}>
      <Text style={styles.title}>ผลการประเมิน</Text>
      {/* <TouchableOpacity onPress={getFirestoreData}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>ดูผลการประเมิน</Text>
        </View>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => navigation.navigate('Survey', { data : mentalTest, database : db })}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>เริ่มทำแบบประเมิน</Text>
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate('spwbScreen', { data : SPWB })}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>เริ่มทำแบบประเมิน</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('q8Screen', { data : Q8, score : 11 })}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>testQ</Text>
        </View>
      </TouchableOpacity> */}
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