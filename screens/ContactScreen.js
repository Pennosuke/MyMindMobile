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
        <ScrollView style={{flex:1 ,width:'100%'}}>
          <View style={{width:'100%', height: '100%' , paddingTop: 30}}>

            <View style={styles.mainSurveyContainer}>
              <View style={styles.surveyContainer}>
                <View style={{ margin: 10 }}>
                  <Text style={[styles.questionText, {fontSize: 14, textAlign: 'center', fontWeight: 'bold'}]}>ข้อมูลติดต่อผู้เชี่ยวชาญ</Text>
                  <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                    <View style={{flex: 1, alignItems: 'center', paddingBottom: 15}}>
                      <Image source={require(`../assets/อาจารย์ผู้ช่วยเหลือ/อาจารย์ติ๊ก.jpg`)} style={{width: 140, height: 171}}/>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.questionText}>ชื่อ: รศ.ดร.นพพร ว่องสิริมาศ (อาจารย์ติ๊ก)</Text>
                      <Text style={styles.questionText}>โทรศัพท์: 02-44153-33</Text>
                      <Text style={styles.questionText}>โทรศัพท์มือถือ: 099-351-4734</Text>
                      <Text style={styles.questionText}>E-mail: nopporn.von@mahidol.edu</Text>
                    </View>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                    <View style={{flex: 1, alignItems: 'center', paddingBottom: 15}}>
                      <Image source={require(`../assets/อาจารย์ผู้ช่วยเหลือ/อาจารย์แดง.jpg`)} style={{width: 140, height: 171}}/>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.questionText}>ชื่อ: ผศ.ดร.พวงเพชร เกษรสมุทร (อาจารย์แดง)</Text>
                      <Text style={styles.questionText}>โทรศัพท์: 02-44153-33</Text>
                      <Text style={styles.questionText}>โทรศัพท์มือถือ: 09-826502-44</Text>
                      <Text style={styles.questionText}>E-mail: paungpet.kas@mahidol.edu</Text>
                    </View>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                    <View style={{flex: 1, alignItems: 'center', paddingBottom: 15}}>
                      <Image source={require(`../assets/อาจารย์ผู้ช่วยเหลือ/อาจารย์แป๋ว.jpg`)} style={{width: 140, height: 171}}/>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.questionText}>ชื่อ: ผศ.ดร.วารีรัตน์ ถาน้อย (อาจารย์แป๋ว)</Text>
                      <Text style={styles.questionText}>โทรศัพท์: 02-44153-33</Text>
                      <Text style={styles.questionText}>โทรศัพท์มือถือ: 095-475-9176</Text>
                      <Text style={styles.questionText}>E-mail: wareerat.tha@mahidol.edu</Text>
                    </View>
                  </View>
                  <Text style={[styles.questionText, {fontSize: 14, textAlign: 'center', fontWeight: 'bold', paddingBottom: 30}]}>ข้อมูลติดต่อแหล่งช่วยเหลืออื่นๆ</Text>
                  <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                    <Text style={styles.questionText}>หน่วยให้การปรึกษา ภาควิชาสุขภาพจิตและการพยาบาลจิตเวชศาสตร์ คณะพยาบาลศาสตร์ มหาวิทยาลัยมหิดล</Text>
                    <Text style={styles.questionText}>ด้วยใจจากใจ โทร 098-265-0244</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                    <Text style={styles.questionText}>ศูนย์ให้คำปรึกษา มหาวิทยาลัยมหิดล</Text>
                    <Text style={styles.questionText}>โทร 02-849-4538</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                    <Text style={styles.questionText}>สมาคมสะมาริตันส์แห่งประเทศไทย</Text>
                    <Text style={styles.questionText}>ฟังคุณด้วยใจ โทร 02-718-6793, เวลา 12.00 - 22.00 น.</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                    <Text style={styles.questionText}>หน่วยสวัสดิการนักศึกษา ห้อง 499 อาคารผู้ป่วยนอก ชั้น 4 โรงพยาบาลศิริราช</Text>
                    <Text style={styles.questionText}>โทร 02-419-7390</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                    <Text style={styles.questionText}>สายด่วนสุขภาพจิต กรมสุขภาพจิต กระทรวงสาธารณสุข</Text>
                    <Text style={styles.questionText}>โทร 1323</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
  mainSurveyContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    alignContent: 'center',
    padding: 5,
    marginBottom: 30,
    flexGrow: 0,
  },
  surveyContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    alignContent: 'center',
    padding: 5,
    flexGrow: 0,
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
  content: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto'
    
  }
});