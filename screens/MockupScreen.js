import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View, Image, TouchableOpacity, Picker } from 'react-native';
import { emotions } from '../constants/MockupData';


const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';
const SELECTED = '#22459E';

const defaultSurvey = [
  {
    contentId: '1',
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

  updateInputVal(val, targetId, currentAnswerIndex) {
    const state = this.state;
    state.answers[currentAnswerIndex].value[targetId].value = val;
    this.setState(state);
    console.log(state);
  }

  handleSelection(emotionName, currentAnswerIndex, maxEmotions) {
    const state = this.state;
    const emotionIndex = state.answers[currentAnswerIndex].value.findIndex(elem => elem.emotion === emotionName);
    if(emotionIndex !== -1) {
      state.answers[currentAnswerIndex].value.splice(emotionIndex, 1);
      this.setState(state);
    }
    else if(state.answers[currentAnswerIndex].value.length < maxEmotions) {
      state.answers[currentAnswerIndex].value.push({
        emotion: emotionName,
        value: '1'
      });
      this.setState(state);
    }
    console.log('state', state);
  }

  isThisEmotionSelected(emotionName, currentAnswerIndex) {
    const state = this.state;
    return !!(state.answers[currentAnswerIndex].value.find(elem => elem.emotion === emotionName) !== undefined)
  }

  emotionRatingChoices() {
    const ratings = [];
    let ratingIndex = 0;
    for(let i = 1; i <= 10; i++) {
      const ratingString = String(i);
      ratings.push(
        <Picker.Item label={ratingString} value={ratingString} key={ratingIndex}/>
      )
      ratingIndex++;
    }
    return ratings
  }

  renderEmotionRating(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, answerIdRef } = survey[stepIndex]
    if (state.answers.find(ans => ans.contentId === answerIdRef) === undefined) {
      const defaultValue = [];
      state.answers.push({
        contentId : currentContentId,
        value: defaultValue
      });
      console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === answerIdRef);
    const emotionsImages = {};
    for(const elem of emotions) {
      emotionsImages[elem.name] = elem.imageUri;
    }
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          {
            this.state.answers[currentAnswerIndex].value.map(( ansEmotion, index ) =>
              <View style={{flex: 1, flexDirection: 'row', paddingTop: 20}} key={index}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={styles.emotionButton}>
                    <Image source={emotionsImages[ansEmotion.emotion]} style={styles.coverImage}/>
                  </View>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{textAlign: 'center', padding: 20}}>เลือกระดับความรู้สึก(1-10)</Text>
                  <Picker
                    style = {{ height: 40, width: 100, paddingHorizontal: 10 }}
                    selectedValue={this.state.answers[currentAnswerIndex].value[index].value}
                    onValueChange={(val, index) => this.updateInputVal(
                      val,
                      state.answers[currentAnswerIndex].value.findIndex(elem => elem.emotion === ansEmotion.emotion),
                      currentAnswerIndex
                    )}
                  >
                    {this.emotionRatingChoices()}
                  </Picker>
                </View>
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

  renderEmotionButtons(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, minEmotions, maxEmotions } = survey[stepIndex]
    const currentContentId = survey[stepIndex].contentId;
    if (state.answers.find(ans => ans.contentId === currentContentId) === undefined) {
      const defaultValue = [];
      state.answers.push({
        contentId : currentContentId,
        value: defaultValue
      });
      console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === currentContentId);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          <View style={{flex: 4, flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-between', alignItems: 'center', alignSelf: "center", maxWidth: 335}}>
            {emotions.map(( emotion, index ) =>
              <View key={index}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={(e) => this.handleSelection(emotion.name, currentAnswerIndex, maxEmotions)}>
                  <View style={this.isThisEmotionSelected(emotion.name,currentAnswerIndex) ? styles.selectedButton : styles.emotionButton}>
                    <Image source={emotion.imageUri} style={styles.coverImage}/>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
              !!(state.answers[currentAnswerIndex].value.length >= minEmotions)
            )
          }
        </View>
      </View>
    )
  }

  renderTextInput(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, questions } = survey[stepIndex]
    const currentContentId = survey[stepIndex].contentId;
    if (state.answers.find(ans => ans.contentId === currentContentId) === undefined) {
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
        contentId : currentContentId,
        value: defaultValue
      });
      console.log('state', state);
      this.setState(state);
    }
    console.log('this.state', this.state);
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === currentContentId);
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
                  onChangeText={(val) => this.updateInputVal(
                    val,
                    state.answers[currentAnswerIndex].value.findIndex(elem => elem.questionText === question.questionText),
                    currentAnswerIndex
                  )}
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
    } else if (contentType === 'EmotionButtons') {
      return this.renderEmotionButtons(survey,stepIndex);
    } else if (contentType === 'EmotionRating') {
      return this.renderEmotionRating(survey,stepIndex);
    } else {
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
  emotionButton: {
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10
  },
  selectedButton: {
    backgroundColor: '#A4D6D5',
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10
  },
  coverImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});