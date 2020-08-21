import { Video } from 'expo-av';
import React, { Component } from 'react';
import { Dimensions, Image, Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import { emotions } from '../constants/MockupData';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'
import { DASS } from '../constants/แบบประเมิน';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

export default class awarenessScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: defaultSurvey,
      currentStep: 0,
      answers: [],
      totalPlayTime: 0,
      playTime: 0,
      checkpointVideo: 0,
      selectionHandlers: [],
      textInputHandlers: [],
      videoHandlers: []
    };
  }

  onSurveyFinished() {
    const { answers } = this.state;
    const answersAsObj = {};
    const currentTime = firebase.firestore.Timestamp.fromDate(new Date());
    const initTimestamp = !!this.props.route.params['initTimestamp'] ? this.props.route.params.initTimestamp : currentTime;
    for (const elem of answers) {
      answersAsObj[elem.contentId] = elem.value;
    }
    answersAsObj['timestamp'] = currentTime;
    answersAsObj['userName'] = firebase.auth().currentUser.displayName;
    answersAsObj['initTimestamp'] = initTimestamp;
    // console.log('answersAsObj', answersAsObj);
    db.collection('แบบวัดการมีสติ').add(answersAsObj)
    this.props.navigation.navigate('dassScreen', { data : DASS, initTimestamp: initTimestamp });
  }
  
  renderSpecialButton(buttonText ,onPressEvent) {
    return (
      <View style={{ flexGrow: 1, marginTop: 10, marginBottom: 10 }}>
        <TouchableOpacity onPress={onPressEvent}>
          <View style={styles.nonSelectionButton}>
            <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 16}}>
              {buttonText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderPrevButton(onPressEvent, enabledCondition) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <TouchableOpacity onPress={onPressEvent} disabled={!enabledCondition}>
          <View style={enabledCondition ? styles.navButton : styles.disableNavButton}>
            <Text style={enabledCondition ? {textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 16} : {textAlign: 'center', color: '#a3a3a3', fontFamily: 'Kanit-Regular', fontSize: 16}}>
              ย้อนกลับ
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderNextOrFinishButton(survey, NextEvent, FinishedEvent, enabledCondition) {
    const { currentStep, contents } = this.state;
    if(currentStep < survey.length - 1) {
      return (
        <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity onPress={NextEvent} disabled={!enabledCondition}>
            <View style={enabledCondition ? styles.navButton : styles.disableNavButton}>
              <Text style={enabledCondition ? {textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 16} : {textAlign: 'center', color: '#a3a3a3', fontFamily: 'Kanit-Regular', fontSize: 16}}>
                ถัดไป
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity onPress={FinishedEvent} disabled={!enabledCondition}>
            <View style={enabledCondition ? [styles.navButton,{backgroundColor: SELECTED}] : styles.disableNavButton}>
              <Text style={enabledCondition ? {textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 16} : {textAlign: 'center', color: '#a3a3a3', fontFamily: 'Kanit-Regular', fontSize: 16}}>
                เสร็จสิ้น
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  updateInputVal(val, targetId, currentAnswerIndex, needAnswer) {
    // console.log('val', val);
    // console.log('targetId', targetId);
    // console.log('currentAnswerIndex', currentAnswerIndex);
    const state = this.state;
    const { currentStep } = this.state;
    state.answers[currentAnswerIndex].value[targetId].value = val;
    const reallyNeedAnswer = needAnswer === undefined ? false : needAnswer;
    // console.log('reallyNeedAnswer', reallyNeedAnswer);
    if(reallyNeedAnswer) {
      // console.log('before', state.textInputHandlers[currentStep][targetId]);
      // console.log('!!(val.length)', !!(val.length));
      state.textInputHandlers[currentStep][targetId] = !!(val.length);
      // console.log('after', state.textInputHandlers[currentStep][targetId]);
    }
    this.setState(state);
    // console.log(state);
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
    // console.log('state', state);
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

  sortingQuestionChoices(choices) {
    const allChoices = [];
    let choiceIndex = 0;
    for(const elem of choices) {
      allChoices.push(
        <Picker.Item label={elem} value={elem} key={choiceIndex}/>
      )
      choiceIndex++;
    }
    return allChoices
  }

  _onPlaybackStatusUpdate(playbackStatus, currentAnswerIndex){
    const state = this.state;
    if(playbackStatus.isPlaying) {
      state.videoHandlers[currentAnswerIndex].value.playTime = (playbackStatus.positionMillis - state.videoHandlers[currentAnswerIndex].value.checkpointVideo)
      this.setState(state);
    }
    else {
      if(state.videoHandlers[currentAnswerIndex].value.totalPlayTime === NaN) {
        state.videoHandlers[currentAnswerIndex].value.totalPlayTime = 0;
      }
      state.videoHandlers[currentAnswerIndex].value.totalPlayTime += state.videoHandlers[currentAnswerIndex].value.playTime;
      state.videoHandlers[currentAnswerIndex].value.checkpointVideo = playbackStatus.positionMillis;
      state.videoHandlers[currentAnswerIndex].value.playTime = 0;
      this.setState(state);
    }
    // console.log('state',state);
  };

  renderSelectionButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
      >
        <TouchableOpacity onPress={onPress} key={`button_${index}`}>
          <View style={isSelected ? styles.selectionButton : styles.nonSelectionButton}>
            <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 16}}>
              {data.choiceText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  updateAnswer(answerForCurrentQuestion,currentAnswerIndex) {
    const { answers } = this.state;
    answers[currentAnswerIndex] = answerForCurrentQuestion;
    this.setState({ answers });
  }

  renderSelectionGroup(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, contentId, choices } = survey[stepIndex];
    const currentContentId = contentId;
    if (!state.selectionHandlers[currentStep]) {
      state.selectionHandlers[currentStep] = new SelectionHandler({ maxMultiSelect: 1, allowDeselect: true });
      this.setState(state);
    }
    if (state.answers.find(ans => ans.contentId === currentContentId) === undefined) {
      const defaultValue = null;
      state.answers.push({
        contentId : currentContentId,
        value: defaultValue
      });
      // console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === currentContentId);
    // console.log('this.state', this.state);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          <SelectionGroup
            onPress={state.selectionHandlers[currentStep].selectionHandler}
            items={choices}
            isSelected={state.selectionHandlers[currentStep].isSelected}
            renderContent={this.renderSelectionButton}
            containerStyle={styles.selectionGroupContainer}
            onItemSelected={(item) => { 
              this.updateAnswer({
                contentId: contentId,
                value: item
              },currentAnswerIndex);
            }}
            onItemDeselected={() => {
              this.updateAnswer({
                contentId: contentId,
                value: null
              },currentAnswerIndex);
            }}
          />
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
              state.selectionHandlers[currentStep].selectedOption !== null
            )
          }
        </View>
      </View>
    );
  }

  renderVideo(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentId, contentText, videoUri } = survey[stepIndex];
    const currentContentId = contentId;
    if (state.videoHandlers.find(ans => ans.contentId === currentContentId) === undefined) {
      const defaultValue = {
        totalPlayTime: 0,
        playTime: 0,
        checkpoint: 0
      };
      state.videoHandlers.push({
        contentId : currentContentId,
        value: defaultValue
      });
      // console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.videoHandlers.findIndex(ans => ans.contentId === currentContentId);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          <Video
            source={videoUri}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={{ width: '100%', height: (((windowWidth * 0.9) - 40) * 45 / 80), alignSelf: "center"}}
            onPlaybackStatusUpdate={(playbackStatus) => this._onPlaybackStatusUpdate(playbackStatus,currentAnswerIndex)}
          />
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
              !!(this.state.videoHandlers[currentAnswerIndex].value.totalPlayTime + this.state.videoHandlers[currentAnswerIndex].value.playTime >= 3000)
            )
          }
        </View>
      </View>
    )
  }

  renderSortingQuestion(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, choices } = survey[stepIndex];
    const currentContentId = survey[stepIndex].contentId;
    if (state.answers.find(ans => ans.contentId === currentContentId) === undefined) {
      const defaultValue = [];
      for (let i = 1; i <= choices.length; i++) {
        defaultValue.push({
          order: String(i),
          value: choices[0]
        })
      }
      state.answers.push({
        contentId : currentContentId,
        value: defaultValue
      });
      // console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === currentContentId);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          {
            this.state.answers[currentAnswerIndex].value.map(( question, index ) =>
              <View key={index}>
                <Picker
                  style={styles.dropDownStyle}
                  selectedValue={this.state.answers[currentAnswerIndex].value[index].value}
                  onValueChange={(val) => this.updateInputVal(
                    val,
                    index,
                    currentAnswerIndex
                  )}
                >
                  {this.sortingQuestionChoices(choices)}
                </Picker>
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
      // console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === answerIdRef);
    const emotionsImages = {};
    for(const elem of emotions) {
      emotionsImages[elem.name] = elem.imageUri;
    }
    return (
      <ScrollView>
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
                  <View style={{flex: 2, alignItems: 'center'}}>
                    <Text style={[styles.infoText,{textAlign: 'center', marginBottom: 10, fontSize: 14}]}>เลือกระดับความรู้สึก(1-10)</Text>
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
      </ScrollView>
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
      // console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === currentContentId);
    return (
      <ScrollView>
        <View style={styles.surveyContainer}>
          <View>
            <Text style={styles.infoText}>{contentText}</Text>
            <View style={{flex: 10, flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-between', alignItems: 'center', alignSelf: "center"}}>
              {emotions.map(( emotion, index ) =>
                <View key={index}>
                  <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={(e) => this.handleSelection(emotion.name, currentAnswerIndex, maxEmotions)}>
                    <View style={this.isThisEmotionSelected(emotion.name,currentAnswerIndex) ? styles.selectedemotionButton : styles.emotionButton}>
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
      </ScrollView>
    )
  }

  renderTextInput(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, questions } = survey[stepIndex]
    const currentContentId = survey[stepIndex].contentId;
    /*
    if (!state.textInputHandlers[currentStep]) {
      state.textInputHandlers[currentStep] = {
        questionText: question.questionText,
        value: ''
      };
      this.setState(state);
    }
    */
    if (state.answers.find(ans => ans.contentId === currentContentId) === undefined) {
      const defaultValue = [];
      const defaultHandlers = [];
      for (const question of questions) {
        defaultValue.push(
          {
            questionText: question.questionText,
            value: '',
          }
        );
        defaultHandlers.push(!question.needAnswer);
      }
      state.answers.push({
        contentId : currentContentId,
        value: defaultValue
      });
      state.textInputHandlers[currentStep] = defaultHandlers;
      // console.log('state', state);
      this.setState(state);
    }
    // console.log('this.state', this.state);
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === currentContentId);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          { 
            this.state.answers[currentAnswerIndex].value.map((question,index) => 
              <View key={index}>
                <Text style = {[styles.infoText,{ textAlign: 'center', marginLeft: 0, marginBottom: 5, fontSize: 16 }]}>
                  {question.questionText}
                </Text>
                <TextInput
                  style={questions[index].textBoxSize === 'small' ? styles.smallInputStyle : styles.inputStyle}
                  placeholder={questions[index].placeholderText}
                  multiline={questions[index].textBoxSize === 'large' ? true : false}
                  numberOfLines={questions[index].textBoxSize === 'large' ? 6 : 1}
                  value={this.state.answers[currentAnswerIndex].value[index].value}
                  onChangeText={(val) => this.updateInputVal(
                    val,
                    state.answers[currentAnswerIndex].value.findIndex(elem => elem.questionText === question.questionText),
                    currentAnswerIndex,
                    survey[stepIndex].questions[index].needAnswer
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
              !!(state.textInputHandlers[currentStep].find(elem => elem === false) === undefined)
            )
          }
        </View>
      </View>
    )
  }

  renderQuestionValidate(survey,stepIndex) {
    const { currentStep, answers } = this.state;
    const { contentTextPass, contentTextFail, minScore, answerIdRef, backToVideo, backToFirstQuestion } = survey[stepIndex];
    const options = survey[stepIndex].options === undefined ? undefined : survey[stepIndex].options
    let totalScore = 0;
    let currentAnswerIndex = '0';
    for (const elem of answerIdRef) {
      currentAnswerIndex = answers.findIndex(ans => ans.contentId === elem);
      totalScore += answers[currentAnswerIndex].value.value;
    }
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>
            น้องได้ {totalScore}/{answerIdRef.length} คะแนน
          </Text>
          <Text style={styles.infoText}>{totalScore >= minScore ? contentTextPass : contentTextFail}</Text>
          {options !== undefined ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={totalScore >= minScore ? options.imageUriPass : options.imageUriFail} style={styles.charecterSize}/>
            </View>
          ) : (
            <></>
          )}
        </View>
        {
          totalScore >= minScore ? (
            <View style={styles.navButtonContainerStyle}>
              {
                this.renderPrevButton(
                  () => {this.setState({ currentStep: currentStep - 1});},
                  !!(currentStep !== 0)
                )
              }
              {
                this.renderNextOrFinishButton(
                  survey,
                  () => {this.setState({ currentStep: currentStep + 1});},
                  () => {this.onSurveyFinished();},
                  true
                )
              }
            </View>
          ) : (
            <View style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}>
              {
                this.renderSpecialButton(
                  'กลับไปชม VDO',
                  () => {this.setState({ currentStep: currentStep - backToVideo});}
                )
              }
              {
                this.renderSpecialButton(
                  'ตอบแบบสอบถามใหม่อีกครั้ง',
                  () => {this.setState({ currentStep: currentStep - backToFirstQuestion});},
                )
              }
            </View>
          )
        }
      </View>
    );
  }

  renderInfo(survey,stepIndex) {
    const { currentStep } = this.state;
    const { contentText } = survey[stepIndex];
    const options = survey[stepIndex].options === undefined ? undefined : survey[stepIndex].options
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          {options !== undefined ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={options.imageUri} style={styles.charecterSize}/>
            </View>
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
    } else if (contentType === 'SortingQuestion') {
      return this.renderSortingQuestion(survey,stepIndex);
    } else if (contentType === 'Video') {
      return this.renderVideo(survey,stepIndex);
    } else if (contentType === 'SelectionGroup') {
      return this.renderSelectionGroup(survey,stepIndex);
    } else if (contentType === 'QuestionValidate') {
      return this.renderQuestionValidate(survey,stepIndex);
    } else {
      return <Text>Unknown stepIndex</Text>;
    }
  }

  render() {
    const survey = this.props.route.params?.data ?? defaultSurvey;
    return (
      <View style={styles.background}>
        <ScrollView style={{flex:1 ,width:'100%'}}>
          <View style={{width:'100%', height: '100%' }}>
            <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>
                {this.state.currentStep + 1} / {survey.length}
            </Text>
            <View style={styles.mainSurveyContainer}>
              {this.getStepContent(survey,this.state.currentStep)}
            </View>
          </View>
        </ScrollView>
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
    /*justifyContent: 'center',
    alignItems: 'center',*/
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
    fontSize: 18,
    fontFamily: 'Kanit-Regular'
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
    width: '90%',
    marginBottom: 15,
    paddingVertical: 5,
    alignSelf: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "center",
    fontFamily: "Kanit-Regular",
    fontSize: 16
  },
  smallInputStyle: {
    width: '60%',
    marginBottom: 15,
    paddingVertical: 5,
    alignSelf: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "center",
    fontFamily: "Kanit-Regular",
    fontSize: 16
  },
  dropDownStyle: {
    width: '70%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center"
  },
  emotionButton: {
    backgroundColor: 'transparent',
    width: (windowWidth * 0.2),
    height: (windowWidth * 0.2),
    margin: 5,
    borderRadius: 5
  },
  selectedemotionButton: {
    backgroundColor: '#A4D6D5',
    width: (windowWidth * 0.2),
    height: (windowWidth * 0.2),
    margin: 5,
    borderRadius: 10
  },
  coverImage: {
    flex: 1,
    resizeMode: 'cover',
    width: 'auto',
    justifyContent: 'center'
  },
  selectionButton: {
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
    backgroundColor: SELECTED,
    display: "flex",
    padding: 8,
    margin: 2
  },
  nonSelectionButton: {
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
    backgroundColor: GREEN,
    display: "flex",
    padding: 8,
    margin: 2
  },
  navButton: {
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
    backgroundColor: GREEN,
    display: "flex",
    padding: 8,
    margin: 2
  },
  disableNavButton: {
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
    backgroundColor: '#dfdfdf',
    display: "flex",
    padding: 8,
    margin: 2
  }
});