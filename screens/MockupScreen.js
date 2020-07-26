import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View, Image } from 'react-native';
import { TreatmentSurvey } from '../components/TreatmentSurvey';
import { COLORS } from '../constants/validColors';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const SELECTED = '#22459E';

const defaultSurvey = [
  {
    questionType: 'Info',
    questionText: 'This is a defaultSurvey'
  }
]

export default class MockupScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { currentStep: 0, answersSoFar: [] };
  }

  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }
    this.props.navigation.navigate('CompletedSurvey', { surveyAnswers: answersAsObj});
  }

  onAnswerSubmitted(answer) {
    this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
  }

  renderNavButtons() {

  }

  renderInfo(content) {
    const { questionText, hasImage, imageUri } = content;
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{questionText}</Text>
          {hasImage ? (
            <Image source={imageUri} style={styles.charecterSize}/>
          ) : (
            <></>
          )}
        </View>
        {renderNavButtons()}
      </View>
    );
  }
  getStepContent(survey,stepIndex) {
    const questionType = survey[stepIndex].questionType;
    if (questionType === 'Info') {
      renderInfo(survey[stepIndex]);
    } else {
      return <Text>Unknown stepIndex</Text>;
    }
  }

  render() {
    const survey = this.props.route.params?.data ?? defaultSurvey;
    return (
      <View style={styles.background}>
        <View style={styles.surveyContainer}>
          {getStepContent(survey,currentStep)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: '70%',
    maxWidth: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1, 
  },
  surveyContainer: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    alignContent: 'center',
    padding: 5,
    flexGrow: 0,
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
  selectionGroupContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'flex-end',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE
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
  charecterSize: {
    width: 60,
    height: 184
  },
  navButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});