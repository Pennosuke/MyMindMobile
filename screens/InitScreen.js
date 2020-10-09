import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Alert, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import firebase from '../constants/firebase';
import 'firebase/firestore';

const db = firebase.firestore();

export default class InitScreen extends Component {
  constructor() {
    super();
    this.state = { 
      isLoading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          global.userData = {};
          global.userArchivement = {};
          global.checkpointTime = '';

          const datasnapshot = await db.collection('userData').where('userName', '==', firebase.auth().currentUser.displayName).get()
          const getUserData = datasnapshot.docs.map(doc => ({
            userName: doc.data().userName,
            realName: doc.data().realName,
            sex: doc.data().sex,
            age: doc.data().age,
            education: doc.data().education,
            GPA: doc.data().GPA,
            religion: doc.data().religion,
            address: doc.data().address,
            phoneNumber: doc.data().phoneNumber,
            email: doc.data().email,
            revenueSource: doc.data().revenueSource,
            revenueValue: doc.data().revenueValue,
            revenueFreq: doc.data().revenueFreq,
            isRevenueEnough: doc.data().isRevenueEnough,
            revenueSatisfaction: doc.data().revenueSatisfaction,
            parentsMaritalStatus: doc.data().parentsMaritalStatus,
            dadEducation: doc.data().dadEducation,
            momEducation: doc.data().momEducation
          }))
          global.userData = getUserData[0];

          const archivesnapshot = await db.collection('userArchivement').doc(firebase.auth().currentUser.displayName).get()
          if(!!archivesnapshot.data()) {
            global.userArchivement = archivesnapshot.data();
            Object.keys(global.userArchivement).forEach((key) => {
              if(key !== 'userName') {
                global.userArchivement[key].firstTimestamp = global.userArchivement[key].firstTimestamp.toDate().toLocaleDateString() + ' ' + global.userArchivement[key].firstTimestamp.toDate().toLocaleTimeString();
                global.userArchivement[key].latestTimestamp = global.userArchivement[key].latestTimestamp.toDate().toLocaleDateString() + ' ' + global.userArchivement[key].latestTimestamp.toDate().toLocaleTimeString();
              }
            })
          }
          const currentTime = firebase.firestore.Timestamp.fromDate(new Date());
          global.checkpointTime = currentTime.toDate().toLocaleDateString() + ' ' + currentTime.toDate().toLocaleTimeString();
          // console.log('init global.userData', global.userData);
          // console.log('init global.userArchivement', global.userArchivement);
          // console.log('init global.checkpointTime', global.checkpointTime);
          this.props.navigation.replace('AppStackScreen', { screen: 'MUMyMind'});
        }
        else {
          this.props.navigation.replace('Login');
        }
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontFamily: 'Kanit-Medium', fontSize: 48, color: '#004280'}}>MUMyMind</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
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
  }
})