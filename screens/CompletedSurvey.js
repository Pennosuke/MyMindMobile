import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const defaultAnswers = { 
  DASS_1_stress : 0,
  DASS_2_anxiety : 0,
  DASS_3_depression : 0,
  DASS_4_anxiety : 0,
  DASS_5_depression : 0,
  DASS_6_stress : 0,
  DASS_7_anxiety : 0,
  DASS_8_stress : 0,
  DASS_9_anxiety : 0,
  DASS_10_depression : 0,
  DASS_11_stress : 0,
  DASS_12_stress : 0,
  DASS_13_depression : 0,
  DASS_14_stress : 0,
  DASS_15_anxiety : 0,
  DASS_16_depression : 0,
  DASS_17_depression : 0,
  DASS_18_stress : 0,
  DASS_19_anxiety : 0,
  DASS_20_anxiety : 0,
  DASS_21_depression : 0,
};
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
        </ScrollView>
      )
    } else if (score <= 6) {
      return(
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องเป็นผู้ที่เริ่มมีอารมณ์ซึมเศร้าเล็กน้อย</Text>
          <Text style={styles.questionText}>ซึ่งคนทั่วไปก็สามารถมีอารมณ์เช่นนี้ได้ อย่างไรก็ตามหากต้องการหายจากอารมณ์เศร้านี้ ให้น้องเรียนรู้วิธีการจากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจกันนะคะ</Text>
        </ScrollView>
      )
    } else if (score <= 10) {
      return(
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องเป็นผู้มีที่มีสภาวะอารมณ์ซึมเศร้าปานกลาง</Text>
          <Text style={styles.questionText}>ไม่ต้องตกใจไปนะคะ เราสามารถช่วยให้สภาวะอารมณ์ของน้องกลับคืนสู่ภาวะปกติได้ เชิญน้องมาเรียนรู้จากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ เพื่อการมีสุขภาพจิตที่ดีกันนะคะ</Text>
        </ScrollView>
      )
    } else if (score <= 13) {
      return(
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องมีสภาวะอารมณ์ซึมเศร้าค่อนข้างมาก</Text>
          <Text style={styles.questionText}>ชึ่งสามารถเกิดขึ้นได้และสามารถกลับสู่สภาวะอารมณ์ปกติได้ อย่าเพิ่งต้องตกใจไปค่ะ น้องสามารถกลับคืนสู่การมีสุขภาพจิตที่ดีขึ้นได้โดยเร็วจากการทำ 2 อย่างดังนี้นะคะ</Text>
          <Text style={styles.questionText}>1) เข้าไปเรียนรู้จากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>2) ปรึกษาผู้เชี่ยวชาญในการให้การช่วยเหลือ ซึ่งพี่จะมีชื่อและเบอร์โทรให้แก่น้องในลำดับถัดไปค่ะหรือ ถ้าน้องต้องการให้ผู้เชี่ยวชาญของเราโทรหาน้อง เพื่อพูดคุยให้การช่วยเหลือให้น้องมีสุขภาพจิตที่ดีขึ้นโดยเร็ว พี่จะรีบติดต่อน้องโดยเร็วนะคะ</Text>
        </ScrollView>
      )
    } else {
      return(
        <ScrollView>
          <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
          <Text style={styles.questionText}>น้องมีสภาวะอารมณ์ซึมเศร้าในระดับสูงมาก</Text>
          <Text style={styles.questionText}>น้องกำลังต้องการการช่วยเหลือใช่ไหมคะ พี่สามารถช่วยเหลือน้องได้ค่ะ พี่มีผู้เชี่ยวชาญในการให้การช่วยเหลือพูดคุยให้การปรึกษากับน้องๆ มีข้อมูลแหล่งช่วยเหลือต่างๆ</Text>
          <Text style={styles.questionText}>ขอให้น้องติดต่อขอความช่วยเหลือได้เลยนะคะ หรือถ้าน้องต้องการให้ผู้เชี่ยวชาญของเราโทรหาน้อง เพื่อพูดคุยให้การปรึกษาให้น้องมีสุขภาพจิตดีขึ้นโดยเร็ว พี่ก็จะยินดีมากค่ะ และภายหลังจากที่น้องได้รับการช่วยเหลือแล้ว ขอเชิญชวนให้น้องเข้าไปเรียนรู้จากโปรแกรมการส่งเสริมสุขภาวะทางจิตใจ เพื่อให้น้องกลับคืนสู่การมีสุขภาพจิตที่ดีโดยเร็วนะคะ</Text>
        </ScrollView>
      )
    }
  }

  render() {
    const answers = this.props.route.params?.surveyAnswers ?? defaultAnswers;
    const depression = answers.DASS_3_depression + answers.DASS_5_depression + answers.DASS_10_depression + answers.DASS_16_depression + answers.DASS_17_depression + answers.DASS_21_depression;
    const anxiety = answers.DASS_2_anxiety + answers.DASS_4_anxiety + answers.DASS_7_anxiety + answers.DASS_9_anxiety + answers.DASS_15_anxiety + answers.DASS_19_anxiety + answers.DASS_20_anxiety;
    const stress = answers.DASS_1_stress + answers.DASS_6_stress + answers.DASS_8_stress + answers.DASS_11_stress + answers.DASS_12_stress + answers.DASS_14_stress + answers.DASS_18_stress;
    // const totalDASS = depression + anxiety + stress;
    const Q_1 = answers.Q_1?? 0;
    const Q_2 = answers.Q_2?? 0;
    const Q_3 = answers.Q_3?? 0;
    const Q_4 = answers.Q_4?? 0;
    const Q_5 = answers.Q_5?? 0;
    const Q_6 = answers.Q_6?? 0;
    const Q_7 = answers.Q_7?? 0;
    const Q_8 = answers.Q_8?? 0;
    const Q_9 = answers.Q_9?? 0;
    const Q = Q_1 + Q_2 + Q_3 + Q_4 + Q_5 + Q_6 + Q_7 + Q_8 + Q_9;

    return (
      <View style={styles.background}>
        <View style={styles.container}>
          {this.mentalResult(depression)}
          <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
            <Button
              title={'กลับสู่หน้าหลัก'}
              onPress={() => this.props.navigation.navigate('MUMyMind')}
              color='#22459E'
            />
          </View>
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
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20
  },
});