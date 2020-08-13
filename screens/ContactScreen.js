import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Program1 } from '../constants/โปรแกรมฝึกปฏิบัติ';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const defaultAnswers = 0;

export default class ContactScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: GREEN,
        height: 40,
        elevation: 5,
      },
      headerTintColor: '#fff',
      headerTitle: 'Survey Results',
      headerTitleStyle: {
        flex: 1,
      }
    };
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView>
            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image source={require(`../assets/อาจารย์ผู้ช่วยเหลือ/อาจารย์ติ๊ก.jpg`)} style={{minWidth: 93, minHeight: 114}}/>
              </View>
              <View style={{flex: 2, paddingLeft: 20}}>
                <Text style={styles.questionText}>ชื่อ: รศ.ดร.นพพร ว่องสิริมาศ (อาจารย์ติ๊ก)</Text>
                <Text style={styles.questionText}>โทรศัพท์: 02-44153-33</Text>
                <Text style={styles.questionText}>โทรศัพท์มือถือ: 099-351-4734</Text>
                <Text style={styles.questionText}>E-mail: nopporn.von@mahidol.edu</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image source={require(`../assets/อาจารย์ผู้ช่วยเหลือ/อาจารย์แดง.jpg`)} style={{minWidth: 93, minHeight: 114}}/>
              </View>
              <View style={{flex: 2, paddingLeft: 20}}>
                <Text style={styles.questionText}>ชื่อ: ผศ.ดร.พวงเพชร เกษรสมุทร (อาจารย์แดง)</Text>
                <Text style={styles.questionText}>โทรศัพท์: 02-44153-33</Text>
                <Text style={styles.questionText}>โทรศัพท์มือถือ: 09-826502-44</Text>
                <Text style={styles.questionText}>E-mail: paungpet.kas@mahidol.edu</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image source={require(`../assets/อาจารย์ผู้ช่วยเหลือ/อาจารย์แป๋ว.jpg`)} style={{minWidth: 93, minHeight: 114}}/>
              </View>
              <View style={{flex: 2, paddingLeft: 20}}>
                <Text style={styles.questionText}>ชื่อ: ผศ.ดร.วารีรัตน์ ถาน้อย (อาจารย์แป๋ว)</Text>
                <Text style={styles.questionText}>โทรศัพท์: 02-44153-33</Text>
                <Text style={styles.questionText}>โทรศัพท์มือถือ: 095-475-9176</Text>
                <Text style={styles.questionText}>E-mail: wareerat.tha@mahidol.edu</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  questionText: {
    marginBottom: 10,
    fontFamily: 'Kanit-Regular',
    fontSize: 12
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