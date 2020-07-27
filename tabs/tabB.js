import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { demoTreatment } from '../constants/demoTreatment';
import { MockupData } from '../constants/MockupData';

export function tabB() {

  const navigation = useNavigation();

  return (
    <View style={
      {flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20}}>
      <Text style={styles.title}>โปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
      <TouchableHighlight onPress={() => navigation.navigate('MockupScreen', { data : MockupData })}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white'}}>MockupScreen</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('TreatmentScreen', { data : demoTreatment })}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white'}}>demoTreatment</Text>
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
    paddingRight: 10
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