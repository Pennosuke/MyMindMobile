import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MockupData } from '../constants/MockupData';
import { Program1, Program2 } from '../constants/โปรแกรมฝึกปฏิบัติ';

export function tabB() {

  const navigation = useNavigation();

  return (
    <View style={
      {flex: 1,
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 20,
      paddingHorizontal: 10}}>
      <Text style={styles.title}>โปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('MockupScreen', { data : MockupData })}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>โปรแกรมฝึกปฏิบัติ</Text>
        </View>
      </TouchableOpacity> */}
      <View style={
        {flex: 1,
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        paddingVertical: 20}}
      >
        <TouchableOpacity onPress={() => navigation.navigate('TreatmentScreen', { data : Program1, collection : 'โปรแกรมที่_1_หายใจคลายเครียด' })}>
          <View style={styles.roundedButton}>
            <Text style={{textAlign: 'center', padding: 0, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>โปรแกรมที่ 1 “หายใจคลายเครียด”</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TreatmentScreen', { data : Program2, collection : 'โปรแกรมที่_2_ละเอียดลออดูกาย' })}>
          <View style={styles.roundedButton}>
            <Text style={{textAlign: 'center', padding: 0, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>โปรแกรมที่ 2 “ละเอียดลออดูกาย”</Text>
          </View>
        </TouchableOpacity>
      </View>
      
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