import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from '../res/validColors';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const SELECTED = '#22459E';

const defaultPostAnswers = { 
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

const survey = [
  {
    questionType: 'Info',
    questionText: 'Oh no! You are too depressed, let\'s do more quiz'
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      'Are you really want to kill yourself? ;_;',
    questionId: 'Q_Specialquestion',
    options: [
      {
        optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
        value: 6
      },
      {
        optionText: 'ไม่เห็นด้วยมาก',
        value: 5
      },
      {
        optionText: 'ไม่เห็นด้วยบางครั้ง',
        value: 4
      },
      {
        optionText: 'เห็นด้วยบางครั้ง',
        value: 3
      },
      {
        optionText: 'เห็นด้วยมาก',
        value: 2
      },
      {
        optionText: 'เห็นด้วยอย่างยิ่ง',
        value: 1
      }
    ]
  },
]

export default class QSurvey extends Component {
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
    const infoQuestionsRemoved = [...answers];

    const postanswers = this.props.route.params?.surveyAnswers ?? defaultPostAnswers;
    for (const elem of infoQuestionsRemoved) { postanswers[elem.questionId] = elem.value; }
    this.props.navigation.navigate('CompletedSurvey', { surveyAnswers: postanswers });
  }

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