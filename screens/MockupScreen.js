import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View, Image } from 'react-native';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const SELECTED = '#22459E';

const defaultSurvey = [
  {
    contentID: '1',
    contentType: 'Info',
    contentText: 'This is default content',
    hasImage: false,
    imageUri: undefined
  }
]

export default class MockupScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: defaultSurvey,
      currentStep: 0,
      answers: []
    };
  }

  onSurveyFinished() {
    this.props.navigation.navigate('MUMyMind');
  }

  /*onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }
    this.props.navigation.navigate('CompletedSurvey', { surveyAnswers: answersAsObj});
  }

  onAnswerSubmitted(answer) {
    this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
  }*/

  renderPrevButton(onPressEvent, enabledCondition) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          color={GREEN}
          onPress={onPressEvent}
          disabled={!enabledCondition}
          backgroundColor={GREEN}
          title={'ย้อนกลับ'}
        />
      </View>
    );
  }

  renderNextOrFinishButton(survey,NextEvent, FinishedEvent, enabledCondition) {
    const { currentStep, contents } = this.state;
    if(currentStep < survey.length - 1) {
      return (
        <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
          <Button
            color={GREEN}
            onPress={NextEvent}
            disabled={!enabledCondition}
            backgroundColor={GREEN}
            title={'ถัดไป'}
          />
        </View>
      );
    }
    else {
      return (
        <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
          <Button
            title={'เสร็จสิ้น'}
            onPress={FinishedEvent}
            disabled={!enabledCondition}
            color={GREEN}
          />
        </View>
      );
    }
  }

  updateInputVal = (val, prop, currentAnswerIndex) => {
    const state = this.state;
    const questionID = state.answers[currentAnswerIndex].value.findIndex(question => question.questionText === prop);
    state.answers[currentAnswerIndex].value[questionID].value = val;
    this.setState(state);
    console.log(state);
  }

  renderTextInput(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, questions } = survey[stepIndex]
    const currentContentId = survey[stepIndex].contentID;
    console.log('survey[stepIndex]', survey[stepIndex])
    if (state.answers.find(ans => ans.contentID === currentContentId) === undefined) {
      const defaultValue = [];
      for (const question of questions) {
        defaultValue.push(
          {
            questionText: question.questionText,
            value: ''
          }
        );
      }
      state.answers.push({
        contentID : currentContentId,
        value: defaultValue
      });
      console.log('state', state);
      this.setState(state);
    }
    console.log('this.state', this.state);
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentID === currentContentId);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          { 
            this.state.answers[currentAnswerIndex].value.map((question,index) => 
              <View key={index}>
                <Text style = {{ textAlign: 'center', paddingBottom: 5 }}>{question.questionText}</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder={questions[index].placeholderText}
                  multiline={questions[index].textBoxSize === 'large' ? true : false}
                  numberOfLines={questions[index].textBoxSize === 'large' ? 6 : 1}
                  value={this.state.answers[currentAnswerIndex].value[index].value}
                  onChangeText={(val) => this.updateInputVal(val, question.questionText, currentAnswerIndex)}
                />
              </View>
            )
          }
        </View>
        <View style={styles.navButtonContainerStyle}>
          {
            this.renderPrevButton(
              () => {
                this.setState({ currentStep: currentStep - 1});
              },
              !!(currentStep !== 0)
            )
          }
          {
            this.renderNextOrFinishButton(
              survey,
              () => {
                this.setState({ currentStep: currentStep + 1});
              },
              () => {
                this.onSurveyFinished();
              },
              true
            )
          }
        </View>
      </View>
    )
  }

  renderInfo(survey,stepIndex) {
    const { currentStep } = this.state;
    const { contentText, hasImage, imageUri } = survey[stepIndex];
    console.log('survey[stepIndex]', survey[stepIndex])
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          {hasImage ? (
            <Image source={imageUri} style={styles.charecterSize}/>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.navButtonContainerStyle}>
          {
            this.renderPrevButton(
              () => {
                this.setState({ currentStep: currentStep - 1});
              },
              !!(currentStep !== 0)
            )
          }
          {
            this.renderNextOrFinishButton(
              survey,
              () => {
                this.setState({ currentStep: currentStep + 1});
              },
              () => {
                this.onSurveyFinished();
              },
              true
            )
          }
        </View>
      </View>
    );
  }
  getStepContent(survey,stepIndex) {
    const contentType = survey[stepIndex].contentType;
    if (contentType === 'Info') {
      return this.renderInfo(survey,stepIndex);
    } else if (contentType === 'TextInput') {
      return this.renderTextInput(survey,stepIndex);
    }
    else {
      return <Text>Unknown stepIndex</Text>;
    }
  }

  render() {
    const survey = this.props.route.params?.data ?? defaultSurvey;
    return (
      <View style={styles.background}>
        <View style={styles.surveyContainer}>
          {this.getStepContent(survey,this.state.currentStep)}
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
  },
  inputStyle: {
    width: 300,
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderWidth: 1
  },
});