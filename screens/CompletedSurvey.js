import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const defaultAnswers = { 
  SPWB_1_autonomy : { value : 0 },
  SPWB_2_environmentalMastery : { value : 0 },
  SPWB_3_personalGrowth : { value : 0 },
  SPWB_4_positiveRelationsWithOthers : { value : 0 },
  SPWB_5_purposeInLife : { value : 0 },
  SPWB_6_selfAcceptance : { value : 0 },
  SPWB_7_autonomy : { value : 0 },
  SPWB_8_environmentalMastery : { value : 0 },
  SPWB_9_personalGrowth : { value : 0 },
  SPWB_10_positiveRelationsWithOthers : { value : 0 },
  SPWB_11_purposeInLife : { value : 0 },
  SPWB_12_selfAcceptance : { value : 0 },
  SPWB_13_autonomy : { value : 0 },
  SPWB_14_environmentalMastery : { value : 0 },
  SPWB_15_personalGrowth : { value : 0 },
  SPWB_16_positiveRelationsWithOthers : { value : 0 },
  SPWB_17_purposeInLife : { value : 0 },
  SPWB_18_selfAcceptance : { value : 0 },
  DASS_1_stress : { value : 0 },
  DASS_2_anxiety : { value : 0 },
  DASS_3_depression : { value : 0 },
  DASS_4_anxiety : { value : 0 },
  DASS_5_depression : { value : 0 },
  DASS_6_stress : { value : 0 },
  DASS_7_anxiety : { value : 0 },
  DASS_8_stress : { value : 0 },
  DASS_9_anxiety : { value : 0 },
  DASS_10_depression : { value : 0 },
  DASS_11_stress : { value : 0 },
  DASS_12_stress : { value : 0 },
  DASS_13_depression : { value : 0 },
  DASS_14_stress : { value : 0 },
  DASS_15_anxiety : { value : 0 },
  DASS_16_depression : { value : 0 },
  DASS_17_depression : { value : 0 },
  DASS_18_stress : { value : 0 },
  DASS_19_anxiety : { value : 0 },
  DASS_20_anxiety : { value : 0 },
  DASS_21_depression : { value : 0 },
  Q_Specialquestion : { value : 0 }
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

  render() {
    const answers = this.props.route.params?.surveyAnswers ?? defaultAnswers;
    const autonomy = answers.SPWB_1_autonomy.value + answers.SPWB_7_autonomy.value + answers.SPWB_13_autonomy.value;
    const environmentalMastery = answers.SPWB_2_environmentalMastery.value + answers.SPWB_8_environmentalMastery.value + answers.SPWB_14_environmentalMastery.value;
    const personalGrowth = answers.SPWB_3_personalGrowth.value + answers.SPWB_9_personalGrowth.value + answers.SPWB_15_personalGrowth.value;
    const positiveRelationsWithOthers = answers.SPWB_4_positiveRelationsWithOthers.value + answers.SPWB_10_positiveRelationsWithOthers.value + answers.SPWB_16_positiveRelationsWithOthers.value;
    const purposeInLife = answers.SPWB_5_purposeInLife.value + answers.SPWB_11_purposeInLife.value + answers.SPWB_17_purposeInLife.value;
    const selfAcceptance = answers.SPWB_6_selfAcceptance.value + answers.SPWB_12_selfAcceptance.value + answers.SPWB_18_selfAcceptance.value;
    const totalSPWB = autonomy + environmentalMastery + personalGrowth + positiveRelationsWithOthers + purposeInLife + selfAcceptance;
    const depression = answers.DASS_3_depression.value + answers.DASS_5_depression.value + answers.DASS_10_depression.value + answers.DASS_16_depression.value + answers.DASS_17_depression.value + answers.DASS_21_depression.value;
    const anxiety = answers.DASS_2_anxiety.value + answers.DASS_4_anxiety.value + answers.DASS_7_anxiety.value + answers.DASS_9_anxiety.value + answers.DASS_15_anxiety.value + answers.DASS_19_anxiety.value + answers.DASS_20_anxiety.value;
    const stress = answers.DASS_1_stress.value + answers.DASS_6_stress.value + answers.DASS_8_stress.value + answers.DASS_11_stress.value + answers.DASS_12_stress.value + answers.DASS_14_stress.value + answers.DASS_18_stress.value;
    const totalDASS = depression + anxiety + stress;
    const Q = answers.Q_Specialquestion?.value ?? 0;

    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.questionText}>ผลการประเมินสุขภาวะทางจิตใจ</Text>
            <Text style={styles.questionText}>{"\n"}คะแนนจากแบบวัดสุขภาวะทางจิตใจ : {totalSPWB}</Text>
            <Text style={styles.questionText}>ความเป็นตัวของตัวเอง (Autonomy) : {autonomy}</Text>
            <Text style={styles.questionText}>การเรียนรู้ด้านสิ่งแวดล้อม (Environmental mastery) : {environmentalMastery}</Text>
            <Text style={styles.questionText}>การเติบโตส่วนบุคคล (Personal growth) : {personalGrowth}</Text>
            <Text style={styles.questionText}>การมีสัมพันธภาพทางบวกกับผู้อื่น (Positive relations with others) : {positiveRelationsWithOthers}</Text>
            <Text style={styles.questionText}>จุดมุ่งหมายชีวิต (Purpose in life) : {purposeInLife}</Text>
            <Text style={styles.questionText}>การยอมรับตนเอง (Self-acceptance) : {selfAcceptance}</Text>
            <Text style={styles.questionText}>{"\n"}คะแนนจากแบบวัดDASS : {totalDASS}</Text>
            <Text style={styles.questionText}>ความซึมเศร้า (Depression) : {depression}</Text>
            <Text style={styles.questionText}>ความวิตกกังวล(Anxiety) : {anxiety}</Text>
            <Text style={styles.questionText}>ความเครียด(Stress) : {stress}</Text>
            <Text style={styles.questionText}>Q Score : {Q}</Text>
            <Text>Raw JSON: {JSON.stringify(this.props.route.params?.surveyAnswers ?? {})}</Text>
          </ScrollView>
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