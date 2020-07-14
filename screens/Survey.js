import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from '../constants/validColors';
import * as firebase from 'firebase';
import 'firebase/firestore';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const SELECTED = '#22459E';

const defaultSurvey = [
  {
    questionType: 'Info',
    questionText: 'This is a defaultSurvey'
  }
]

export default class Survey extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: '#3CFB72',
      },
      headerTintColor: '#fff',
      headerTitle: 'Sample Survey',
      headerTitleStyle: {
        flex: 1,
        alignSelf: 'center'
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = { backgroundColor: BLUE, answersSoFar: '' };
  }

  onSurveyFinished(answers) {
    /** 
     * By using the spread operator, array entries with no values, such as info questions, are removed.
     * This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     * to the rest of your code, can be done.
     * 
     * Answers are returned in an array, of the form 
     * [
     * {questionId: string, value: any},
     * {questionId: string, value: any},
     * ...
     * ]
     * Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     * to you.
     * 
     * As an example
     * { 
     *   questionId: "favoritePet", 
     *   value: { 
     *     optionText: "Dogs",
     *     value: "dog"
     *   }
     * }
     * This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a 
     * separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
     */

    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    const firebaseanswersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
      firebaseanswersAsObj[elem.questionId] = elem.questionId.value;
    }

    const depression = answersAsObj.DASS_3_depression.value + answersAsObj.DASS_5_depression.value + answersAsObj.DASS_10_depression.value + answersAsObj.DASS_16_depression.value + answersAsObj.DASS_17_depression.value + answersAsObj.DASS_21_depression.value;
    const anxiety = answersAsObj.DASS_2_anxiety.value + answersAsObj.DASS_4_anxiety.value + answersAsObj.DASS_7_anxiety.value + answersAsObj.DASS_9_anxiety.value + answersAsObj.DASS_15_anxiety.value + answersAsObj.DASS_19_anxiety.value + answersAsObj.DASS_20_anxiety.value;
    const stress = answersAsObj.DASS_1_stress.value + answersAsObj.DASS_6_stress.value + answersAsObj.DASS_8_stress.value + answersAsObj.DASS_11_stress.value + answersAsObj.DASS_12_stress.value + answersAsObj.DASS_14_stress.value + answersAsObj.DASS_18_stress.value;
    const totalDASS = depression + anxiety + stress;

    const db = this.props.route.params.database;

    if(totalDASS >= 32) {
      this.props.navigation.navigate('QSurvey', { surveyAnswers: answersAsObj, database : db });
    } else {
      /*db.collection("result").add(firebaseanswersAsObj)*/
      /*var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());*/
      db.collection("result").add({
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        SPWB_1_autonomy : answersAsObj.SPWB_1_autonomy.value,
        SPWB_2_environmentalMastery : answersAsObj.SPWB_2_environmentalMastery.value,
        SPWB_3_personalGrowth : answersAsObj.SPWB_3_personalGrowth.value,
        SPWB_4_positiveRelationsWithOthers : answersAsObj.SPWB_4_positiveRelationsWithOthers.value,
        SPWB_5_purposeInLife : answersAsObj.SPWB_5_purposeInLife.value,
        SPWB_6_selfAcceptance : answersAsObj.SPWB_6_selfAcceptance.value,
        SPWB_7_autonomy : answersAsObj.SPWB_7_autonomy.value,
        SPWB_8_environmentalMastery : answersAsObj.SPWB_8_environmentalMastery.value,
        SPWB_9_personalGrowth : answersAsObj.SPWB_9_personalGrowth.value,
        SPWB_10_positiveRelationsWithOthers : answersAsObj.SPWB_10_positiveRelationsWithOthers.value,
        SPWB_11_purposeInLife : answersAsObj.SPWB_11_purposeInLife.value,
        SPWB_12_selfAcceptance : answersAsObj.SPWB_12_selfAcceptance.value,
        SPWB_13_autonomy : answersAsObj.SPWB_13_autonomy.value,
        SPWB_14_environmentalMastery : answersAsObj.SPWB_14_environmentalMastery.value,
        SPWB_15_personalGrowth : answersAsObj.SPWB_15_personalGrowth.value,
        SPWB_16_positiveRelationsWithOthers : answersAsObj.SPWB_16_positiveRelationsWithOthers.value,
        SPWB_17_purposeInLife : answersAsObj.SPWB_17_purposeInLife.value,
        SPWB_18_selfAcceptance : answersAsObj.SPWB_18_selfAcceptance.value,
        DASS_1_stress : answersAsObj.DASS_1_stress.value,
        DASS_2_anxiety : answersAsObj.DASS_2_anxiety.value,
        DASS_3_depression : answersAsObj.DASS_3_depression.value,
        DASS_4_anxiety : answersAsObj.DASS_4_anxiety.value,
        DASS_5_depression : answersAsObj.DASS_5_depression.value,
        DASS_6_stress : answersAsObj.DASS_6_stress.value,
        DASS_7_anxiety : answersAsObj.DASS_7_anxiety.value,
        DASS_8_stress : answersAsObj.DASS_8_stress.value,
        DASS_9_anxiety : answersAsObj.DASS_9_anxiety.value,
        DASS_10_depression : answersAsObj.DASS_10_depression.value,
        DASS_11_stress : answersAsObj.DASS_11_stress.value,
        DASS_12_stress : answersAsObj.DASS_12_stress.value,
        DASS_13_depression : answersAsObj.DASS_13_depression.value,
        DASS_14_stress : answersAsObj.DASS_14_stress.value,
        DASS_15_anxiety : answersAsObj.DASS_15_anxiety.value,
        DASS_16_depression : answersAsObj.DASS_16_depression.value,
        DASS_17_depression : answersAsObj.DASS_17_depression.value,
        DASS_18_stress : answersAsObj.DASS_18_stress.value,
        DASS_19_anxiety : answersAsObj.DASS_19_anxiety.value,
        DASS_20_anxiety : answersAsObj.DASS_20_anxiety.value,
        DASS_21_depression : answersAsObj.DASS_21_depression.value,
        Q_Specialquestion : 0
      })
      this.props.navigation.navigate('CompletedSurvey', { surveyAnswers: answersAsObj});
    }
  }

  /**
   * After each answer is submitted this function is called. Here you can take additional steps in response to the 
   * user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
   * is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
    switch (answer.questionId) {
      case 'favoriteColor': {
        if (COLORS.includes(answer.value.toLowerCase())) {
          this.setState({ backgroundColor: answer.value.toLowerCase() });
        }
        break;
      }
      default:
        break;
    }
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'ย้อนกลับ'}
        />
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'ถัดไป'}
        />
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          title={'เสร็จสิ้น'}
          onPress={onPress}
          disabled={!enabled}
          color={GREEN}
        />
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
      >
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? SELECTED : GREEN}
          style={isSelected ? { fontWeight: 'bold' } : {}} 
          key={`button_${index}`}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text numLines={1} style={styles.questionText}>{questionText}</Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType='done'
        />
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (<TextInput 
      style={styles.numericInput}
      onChangeText={text => { onChange(text); }}
      underlineColorAndroid={'white'}
      placeholderTextColor={'rgba(184,184,184,1)'}
      value={String(value)}
      placeholder={placeholder}
      keyboardType={'numeric'}
      onBlur={onBlur}
      maxLength={3}
    />);
  }

  renderInfoText(infoText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    const survey = this.props.route.params?.data ?? defaultSurvey;
    return (
      <View style={[styles.background, { backgroundColor: this.state.backgroundColor }]}>
        <View style={styles.container}>
          <SimpleSurvey
            ref={(s) => { this.surveyRef = s; }}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
          />
          
        </View>
        
        <ScrollView style={styles.answersContainer}>
          <Text style={{textAlign:'center'}}>JSON output</Text>
          <Text>{this.state.answersSoFar}</Text>
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: '70%',
    maxWidth: '90%',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1, 
  },
  answersContainer: {
    width: '90%',
    maxHeight: '20%',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    width: 'auto',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignContent: 'center',
    padding: 5,
    flexGrow: 0,
  },
  selectionGroupContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'flex-end',
  },
  background: {
    flex: 1,
    minHeight: 800,
    maxHeight: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10
  },
});