import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Program1 } from '../constants/โปรแกรมฝึกปฏิบัติ';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const defaultAnswers = 0;

export default class CompletedSurvey extends Component {
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

  mentalResult(score) {
    if (score <= 4) {
      return (
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องเป็นผู้ที่มีสุขภาพจิตดีนะคะ</Text>
          <Text style={styles.questionText}>อย่างไรก็ตาม ในอนาคตอาจจะมีเหตุการณ์เข้ามาในชีวิตที่ทำให้น้องเครียดได้ดังนั้น เพื่อป้องกันปัญหาที่อาจจะเกิดขึ้นได้ในอนาคต ขอให้น้องๆมาเรียนรู้วิธีการและฝึกฝนเพื่อ พัฒนาความเข้มแข็งทางจิตใจจากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจใน App นี้นะคะ</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.replace('TreatmentScreen', { data : Program1, collection : 'โปรแกรมที่_1_หายใจคลายเครียด', name: 'โปรแกรมที่ 1 หายใจคลายเครียด' })}
            >
              <View style={styles.roundedButton}>
                <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>เริ่มทำโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    } else if (score <= 6) {
      return(
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องเป็นผู้ที่เริ่มมีอารมณ์ซึมเศร้าเล็กน้อย</Text>
          <Text style={styles.questionText}>ซึ่งคนทั่วไปก็สามารถมีอารมณ์เช่นนี้ได้ อย่างไรก็ตามหากต้องการหายจากอารมณ์เศร้านี้ ให้น้องเรียนรู้วิธีการจากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจกันนะคะ</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.replace('TreatmentScreen', { data : Program1, collection : 'โปรแกรมที่_1_หายใจคลายเครียด', name: 'โปรแกรมที่ 1 หายใจคลายเครียด' })}
            >
              <View style={styles.roundedButton}>
                <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>เริ่มทำโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    } else if (score <= 10) {
      return(
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องเป็นผู้มีที่มีสภาวะอารมณ์ซึมเศร้าปานกลาง</Text>
          <Text style={styles.questionText}>ไม่ต้องตกใจไปนะคะ เราสามารถช่วยให้สภาวะอารมณ์ของน้องกลับคืนสู่ภาวะปกติได้ เชิญน้องมาเรียนรู้จากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ เพื่อการมีสุขภาพจิตที่ดีกันนะคะ</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.replace('TreatmentScreen', { data : Program1, collection : 'โปรแกรมที่_1_หายใจคลายเครียด', name: 'โปรแกรมที่ 1 หายใจคลายเครียด' })}
            >
              <View style={styles.roundedButton}>
                <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>เริ่มทำโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    } else if (score <= 13) {
      return(
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องมีสภาวะอารมณ์ซึมเศร้าค่อนข้างมาก</Text>
          <Text style={styles.questionText}>ชึ่งสามารถเกิดขึ้นได้และสามารถกลับสู่สภาวะอารมณ์ปกติได้ อย่าเพิ่งต้องตกใจไปค่ะ น้องสามารถกลับคืนสู่การมีสุขภาพจิตที่ดีขึ้นได้โดยเร็วจากการทำ 2 อย่างดังนี้นะคะ</Text>
          <Text style={styles.questionText}>1) เข้าไปเรียนรู้จากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>2) ปรึกษาผู้เชี่ยวชาญในการให้การช่วยเหลือ ซึ่งพี่จะมีชื่อและเบอร์โทรให้ในปุ่ม"ดูข้อมูลติดต่อผู้เชี่ยวชาญ" เพื่อให้น้องสามารถนำไปติดต่อพูดคุยรับการช่วยเหลือให้น้องมีสุขภาพจิตที่ดีขึ้นโดยเร็วค่ะ</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactScreen')}>
              <View style={styles.roundedButton}>
                <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>ดูข้อมูลติดต่อผู้เชี่ยวชาญ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.props.navigation.replace('TreatmentScreen', { data : Program1, collection : 'โปรแกรมที่_1_หายใจคลายเครียด', name: 'โปรแกรมที่ 1 หายใจคลายเครียด' })}
            >
              <View style={styles.roundedButton}>
                <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>เริ่มทำโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    } else {
      return(
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องมีสภาวะอารมณ์ซึมเศร้าในระดับสูงมาก</Text>
          <Text style={styles.questionText}>น้องกำลังต้องการการช่วยเหลือใช่ไหมคะ พี่สามารถช่วยเหลือน้องได้ค่ะ พี่มีมีข้อมูลแหล่งช่วยเหลือต่างๆ</Text>
          <Text style={styles.questionText}>ขอให้น้องติดต่อขอความช่วยเหลือได้เลยนะคะ และภายหลังจากที่น้องได้รับการช่วยเหลือแล้ว ขอเชิญชวนให้น้องเข้าไปเรียนรู้จากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ เพื่อให้น้องกลับคืนสู่การมีสุขภาพจิตที่ดีโดยเร็วนะคะ</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactScreen')}>
              <View style={styles.roundedButton}>
                <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>ดูข้อมูลติดต่อผู้เชี่ยวชาญ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.props.navigation.replace('TreatmentScreen', { data : Program1, collection : 'โปรแกรมที่_1_หายใจคลายเครียด', name: 'โปรแกรมที่ 1 หายใจคลายเครียด' })}
            >
              <View style={styles.roundedButton}>
                <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>เริ่มทำโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    }
  }

  render() {
    const depression = this.props.route.params?.score ?? defaultAnswers;
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          {this.mentalResult(depression)}
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
    padding: 20,
  },
  questionText: {
    marginBottom: 20,
    fontFamily: 'Kanit-Regular',
    fontSize: 14
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