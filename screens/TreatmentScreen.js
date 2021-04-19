import { Video } from 'expo-av';
import React, { Component } from 'react';
import { Dimensions, Image, Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, ActivityIndicator } from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import { emotions } from '../constants/MockupData';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'
import * as ScreenOrientation from 'expo-screen-orientation';
import { DeviceMotion } from 'expo-sensors';

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

export default class TreatmentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: defaultSurvey,
      currentStep: 0,
      answers: [],
      totalPlayTime: 0,
      playTime: 0,
      checkpointVideo: 0,
      selectionHandlers: {},
      textInputHandlers: {},
      videoHandlers: [],
      currentChoiceAfterGame: {},
      expectedAnswerAfterGame: null,
      gameHandlers: false,
      rotate: 0
    };
  }

  getDay(date) {
    const splitDate = date.split('/')
    return parseInt(splitDate[1], 10)
  }
  
  getMonth(date) {
    const splitDate = date.split('/')
    return parseInt(splitDate[0], 10)
  }
  
  getYear(date) {
    const splitDate = date.split('/')
    const moreSplitDate = splitDate[2].split(' ')
    return parseInt(moreSplitDate[0], 10)
  }

  getProgramValue(programName) {
    var programProp = programName.split('_')
    if (programProp.length === 1) {
      return 1
    } else {
      var value = 0
      if (programProp[0] === 'ทบทวนโปรแกรมที่') {
        value = value + 1
      }
      var programNo = parseInt(programProp[1])
      value = value + (programNo * 10)
      return value
    }
  }

  async saveOverviewData(programName, programTotalDays, programValue, programTimestamp) {
    if(!!programName && !!programTotalDays && !!programValue && !!programTimestamp) {
      // console.log('init saveOverviewData!!!')
      const overviewSnapshot = await db.collection('overviewData').doc(global.userData.userName).get()
      var newOverviewData = overviewSnapshot.data()
      var oldProgramName = newOverviewData['programName']
      // console.log('programName', programName)
      // console.log('oldProgramName', oldProgramName)
      // console.log('this.getProgramValue(programName)', this.getProgramValue(programName))
      // console.log('this.getProgramValue(oldProgramName)', this.getProgramValue(oldProgramName))
      if(this.getProgramValue(programName) >= this.getProgramValue(oldProgramName)) {
        newOverviewData['programName'] = programName
        newOverviewData['programTotalDays'] = programTotalDays
        newOverviewData['programValue'] = programValue
        newOverviewData['programTimestamp'] = programTimestamp
        // console.log('newOverviewData', newOverviewData)
        db.collection('overviewData').doc(global.userData.userName).set(newOverviewData)
      }
    }
  }

  async saveArchivementData(currentTime,document) {
    const archivesnapshot = await db.collection('userArchivement').doc(global.userData.userName).get()
    var programValue = 1
    var programTotalDays = 1
    if(!!archivesnapshot.data() && !!archivesnapshot.data()[document]) {
      const currentDate = currentTime.toDate().toLocaleDateString();
      // console.log('global.userArchivement[document]', global.userArchivement[document])
      if(this.getYear(currentDate) > this.getYear(global.userArchivement[document]['latestTimestamp']) || this.getMonth(currentDate) > this.getMonth(global.userArchivement[document]['latestTimestamp']) || this.getDay(currentDate) > this.getDay(global.userArchivement[document]['latestTimestamp'])) {
        programValue = archivesnapshot.data()[document].value + 1
        programTotalDays = archivesnapshot.data()[document].totalDays + 1
        db.collection('userArchivement').doc(global.userData.userName).set({
          [document] : {
            latestTimestamp: currentTime,
            value: archivesnapshot.data()[document].value + 1,
            totalDays: archivesnapshot.data()[document].totalDays + 1
          }
        }, { merge: true }).then(
          this.saveOverviewData(document, programTotalDays, programValue, currentTime)
        )
      } else {
        programValue = archivesnapshot.data()[document].value + 1
        programTotalDays = archivesnapshot.data()[document].totalDays
        db.collection('userArchivement').doc(global.userData.userName).set({
          [document] : {
            latestTimestamp: currentTime,
            value: archivesnapshot.data()[document].value + 1,
          }
        }, { merge: true }).then(
          this.saveOverviewData(document, programTotalDays, programValue, currentTime)
        )
      }
    } else {
      db.collection('userArchivement').doc(global.userData.userName).set({
        [document] : {
          latestTimestamp: currentTime,
          firstTimestamp: currentTime,
          value: 1,
          totalDays: 1
        }
      }, { merge: true }).then(
        db.collection('userArchivement').doc(global.userData.userName).set({
          ['userName'] : global.userData.userName
        }, { merge: true })
      ).then(
        this.saveOverviewData(document, programTotalDays, programValue, currentTime)
      )
    }
  }

  async saveExtraArchivementData(currentTime,document) {
    const archivesnapshot = await db.collection('extraArchivement').doc(global.userData.userName).get()
    if(!!archivesnapshot.data() && !!archivesnapshot.data()[document]) {
      const oldData = archivesnapshot.data()
      const currentDate = currentTime.toDate().toLocaleDateString();
      const oldDate = oldData[document]['latestTimestamp'].toDate().toLocaleDateString();
      if(this.getYear(currentDate) > this.getYear(oldDate) || this.getMonth(currentDate) > this.getMonth(oldDate) || this.getDay(currentDate) > this.getDay(oldDate)) {
        // console.log('case 1')
        db.collection('extraArchivement').doc(global.userData.userName).set({
          [document] : {
            latestTimestamp: currentTime,
            value: oldData[document].value + 1,
            totalDays: oldData[document].totalDays + 1
          }
        }, { merge: true })
      } else {
        // console.log('case 2')
        db.collection('extraArchivement').doc(global.userData.userName).set({
          [document] : {
            latestTimestamp: currentTime,
            value: oldData[document].value + 1,
          }
        }, { merge: true })
      }
    } else {
      // console.log('case 3')
      db.collection('extraArchivement').doc(global.userData.userName).set({
        [document] : {
          latestTimestamp: currentTime,
          firstTimestamp: currentTime,
          value: 1,
          totalDays: 1
        },
      }, { merge: true }).then(
        db.collection('extraArchivement').doc(global.userData.userName).set({
          ['userName'] : global.userData.userName
        }, { merge: true })
      )
    }
  }

  onSurveyFinished() {
    const { answers } = this.state;
    const answersAsObj = {};
    for (const elem of answers) {
      answersAsObj[elem.contentId] = elem.value;
    }
    const currentTime = firebase.firestore.Timestamp.fromDate(new Date());
    answersAsObj['timestamp'] = currentTime;
    answersAsObj['userName'] = firebase.auth().currentUser.displayName;
    const DocTime = currentTime.toDate().toLocaleTimeString();
    const DocDate = currentTime.toDate().toLocaleDateString().split('/');
    const newDocName = global.userData.userName + ' ' + DocDate[1] + '-' + DocDate[0] + '-' + DocDate[2] + ' ' + DocTime;
    // console.log('answersAsObj', answersAsObj);
    if(!!(this.props.route.params.isExtra)) {
      db.collection('extraProgram').doc('answerData').collection(this.props.route.params.collection).doc(newDocName).set(answersAsObj)
      this.saveExtraArchivementData(currentTime,this.props.route.params.collection);
    } else {
      db.collection(this.props.route.params.collection).doc(newDocName).set(answersAsObj)
      this.saveArchivementData(currentTime,this.props.route.params.collection);
    }
    this.props.navigation.navigate('Init');
  }
  
  renderSpecialButton(buttonText ,onPressEvent) {
    return (
      <View style={{ flexGrow: 1, marginTop: 10, marginBottom: 10 }}>
        <TouchableOpacity onPress={onPressEvent}>
          <View style={styles.nonSelectionButton}>
            <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>
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
            <Text style={enabledCondition ? {textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14} : {textAlign: 'center', color: '#a3a3a3', fontFamily: 'Kanit-Regular', fontSize: 14}}>
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
              <Text style={enabledCondition ? {textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14} : {textAlign: 'center', color: '#a3a3a3', fontFamily: 'Kanit-Regular', fontSize: 14}}>
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
              <Text style={enabledCondition ? {textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14} : {textAlign: 'center', color: '#a3a3a3', fontFamily: 'Kanit-Regular', fontSize: 14}}>
                เสร็จสิ้น
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  updateTextInputVal(val, targetId, currentAnswerIndex, needAnswer) {
    // console.log('val', val);
    // console.log('targetId', targetId);
    // console.log('currentAnswerIndex', currentAnswerIndex);
    // console.log('needAnswer', needAnswer);
    const state = this.state;
    const { currentStep } = this.state;
    state.answers[currentAnswerIndex].value[targetId].value = val;
    if(needAnswer) {
      // console.log('before', state.textInputHandlers[currentStep][targetId]);
      // console.log('!!(val.length)', !!(val.length));
      state.textInputHandlers[currentStep][targetId] = !!(val.length);
      // console.log('after', state.textInputHandlers[currentStep][targetId]);
    }
    this.setState(state);
    // console.log(state);
  }

  updateOtherTextInputVal(val, targetId, currentAnswerIndex) {
    // console.log('val', val);
    // console.log('targetId', targetId);
    // console.log('currentAnswerIndex', currentAnswerIndex);
    const state = this.state;
    state.answers[currentAnswerIndex].value[targetId].otherValue = val;
    this.setState(state);
    // console.log(state);
  }

  updateEmotionRatingVal(val, targetId, currentAnswerIndex) {
    // console.log('val', val);
    // console.log('targetId', targetId);
    // console.log('currentAnswerIndex', currentAnswerIndex);
    const state = this.state;
    state.answers[currentAnswerIndex].value[targetId].value = val;
    this.setState(state);
    // console.log(state);
  }

  updatePickerInputVal(val, targetId, currentAnswerIndex) {
    // console.log('val', val);
    // console.log('targetId', targetId);
    // console.log('currentAnswerIndex', currentAnswerIndex);
    if(val !== '0') {
      const state = this.state;
      state.answers[currentAnswerIndex].value[targetId].value = val;
      this.setState(state);
      // console.log(state);
    }
  }

  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  updateSortingInputVal(val, targetId, currentAnswerIndex, expectedAnswer, score) {
    // console.log('val', val);
    // console.log('targetId', targetId);
    // console.log('currentAnswerIndex', currentAnswerIndex);
    if(val !== '0') {
      const state = this.state;
      state.answers[currentAnswerIndex].value.answers[targetId] = val;
      this.setState(state);
      // console.log('state.answers[currentAnswerIndex].value.answers', state.answers[currentAnswerIndex].value.answers);
      // console.log('expectedAnswer', expectedAnswer);
      // console.log('this.arraysEqual(state.answers[currentAnswerIndex].value.answers,expectedAnswer)', this.arraysEqual(state.answers[currentAnswerIndex].value.answers,expectedAnswer));
      if(this.arraysEqual(state.answers[currentAnswerIndex].value.answers,expectedAnswer)) {
        state.answers[currentAnswerIndex].value.value = score;
        this.setState(state);
      } else {
        state.answers[currentAnswerIndex].value.value = 0;
      }
      // console.log(state);
    }
  }

  handleEmotionSelection(emotionName, currentAnswerIndex, maxEmotions) {
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

  pickerChoices(choices) {
    const allChoices = [];
    allChoices.push(
      <Picker.Item label='โปรดเลือกคำตอบ...' value="0" key={0}/>
    )
    let choiceIndex = 1;
    for(const elem of choices) {
      allChoices.push(
        <Picker.Item label={elem} value={elem} key={choiceIndex}/>
      )
      choiceIndex++;
    }
    return allChoices
  }

  renderSelectionButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
      >
        <TouchableOpacity onPress={onPress} key={`button_${index}`}>
          <View style={isSelected ? styles.selectionButton : styles.nonSelectionButton}>
            <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>
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
    const defaultValue = null;
    if (!state.selectionHandlers[currentContentId]) {
      state.selectionHandlers[currentContentId] = new SelectionHandler({ maxMultiSelect: 1, allowDeselect: true });
      this.setState(state);
    }
    if (state.answers.find(ans => ans.contentId === currentContentId) === undefined) {
      state.answers.push({
        contentId : currentContentId,
        value: defaultValue
      });
      // console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === currentContentId);
    if(state.answers[currentAnswerIndex].value === undefined) {
      this.updateAnswer({
        contentId: currentContentId,
        value: defaultValue
      },currentAnswerIndex);
    }
    // console.log('this.state', this.state);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          <SelectionGroup
            onPress={state.selectionHandlers[currentContentId].selectionHandler}
            items={choices}
            isSelected={state.selectionHandlers[currentContentId].isSelected}
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
              state.selectionHandlers[currentContentId].selectedOption !== null
            )
          }
        </View>
      </View>
    );
  }

  async changeScreenOrientationLandscapeLeft () {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  async changeScreenOrientationLandscapeRight () {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }

  async changeScreenOrientationPotrait () {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  calculateRotation = ({rotation: {beta, gamma}}) => {
    let absGamma = Math.abs(gamma)
    let absBeta = Math.abs(beta)
    let rotate = 0
    if (absGamma <= 0.04 && absBeta <= 0.24) {
      // Portrait mode, on a flat surface.
      rotate = 0
      this.changeScreenOrientationPotrait()
    } else if ((absGamma <= 1.0 || absGamma >= 2.3) && absBeta >= 0.5) {
      // General Portrait mode, accounting for forward and back tilt on the top of the phone.
      rotate = 0
      this.changeScreenOrientationPotrait()
    } else {
      if (gamma < 0) {
        // Landscape mode with the top of the phone to the right.
        rotate = -90
        this.changeScreenOrientationLandscapeRight()
      } else {
        // Landscape mode with the top of the phone to the left.
        rotate = 90
        this.changeScreenOrientationLandscapeLeft()
      }
    }
    this.setState({rotate})
  }

  onFullscreenUpdate = ({fullscreenUpdate}) => {
    // console.log('fullscreenUpdate', fullscreenUpdate)
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT:
        // console.log(' the fullscreen player is about to present');
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT: 
        DeviceMotion.addListener(this.calculateRotation)
        DeviceMotion.setUpdateInterval(1000)
        // console.log('the fullscreen player just finished presenting');
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        DeviceMotion.removeAllListeners()
        this.changeScreenOrientationPotrait()
        // console.log('the fullscreen player is about to dismiss');
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS:
        this.changeScreenOrientationPotrait() 
        // console.log('the fullscreen player just finished dismissing');
    }
  }

  _onPlaybackStatusUpdate(playbackStatus, currentAnswerIndex){
    const state = this.state;
    // console.log('playbackStatus', playbackStatus)
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

  renderVideo(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentId, contentText, videoUri, minTime } = survey[stepIndex];
    const currentContentId = contentId;
    if (state.videoHandlers.find(ans => ans.contentId === currentContentId) === undefined) {
      const defaultValue = {
        totalPlayTime: 0,
        playTime: 0,
        checkpoint: 0,
        ready: false
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
          <Text style={[styles.infoText,{fontSize: 14, textAlign: 'center', color: '#444444'}]}>
            { state.videoHandlers[currentAnswerIndex].ready ? 'วิดีโอโหลดเสร็จแล้ว\nถ้ายังไม่เห็นปุ่มเล่นวิดีโอ ลองแตะในกรอบสี่เหลี่ยมนะคะ' : 'กำลังโหลดวิดีโอ...' }
          </Text>
          <Video
            source={videoUri}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={{ width: '100%', height: (((windowWidth * 0.9) - 40) * 45 / 80), alignSelf: "center", borderWidth: 1, borderColor: '#444444'}}
            onPlaybackStatusUpdate={(playbackStatus) => this._onPlaybackStatusUpdate(playbackStatus,currentAnswerIndex)}
            onFullscreenUpdate={this.onFullscreenUpdate}
            onReadyForDisplay={() => {
              state.videoHandlers[currentAnswerIndex].ready = true;
              this.setState(state);
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
              !!(this.state.videoHandlers[currentAnswerIndex].value.totalPlayTime + this.state.videoHandlers[currentAnswerIndex].value.playTime >= minTime * 1000)
            )
          }
        </View>
      </View>
    )
  }

  renderSortingQuestion(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, choices, expectedAnswer, score } = survey[stepIndex];
    const currentContentId = survey[stepIndex].contentId;
    const defaultValue = [];
    for (let i = 1; i <= choices.length; i++) {
      defaultValue.push('0')
    }
    if (!state.answers.find(ans => ans.contentId === currentContentId)) {
      state.answers.push({
        contentId : currentContentId,
        value: {
          answers: defaultValue,
          value: 0
        }
      });
      // console.log('state', state);
      this.setState(state);
    }
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === currentContentId);
    if(!state.answers[currentAnswerIndex].value) {
      this.updateAnswer({
        contentId: currentContentId,
        value: {
          answers: defaultValue,
          value: 0
        }
      },currentAnswerIndex);
    }
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          {
            this.state.answers[currentAnswerIndex].value.answers.map(( question, index ) =>
              <View key={index}>
                <Picker
                  style={styles.dropDownStyle}
                  selectedValue={this.state.answers[currentAnswerIndex].value.answers[index]}
                  onValueChange={(val) => this.updateSortingInputVal(
                    val,
                    index,
                    currentAnswerIndex,
                    expectedAnswer,
                    score
                  )}
                >
                  {this.pickerChoices(choices)}
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
              !this.state.answers[currentAnswerIndex].value.answers.find(ans => ans === '0')
            )
          }
        </View>
      </View>
    )
  }

  renderPickerInput(survey,stepIndex) {
    const state = this.state;
    const { currentStep } = this.state;
    const { contentText, questions } = survey[stepIndex];
    const currentContentId = survey[stepIndex].contentId;
    const defaultValue = [];
    for(const elem of questions) {
      // console.log('elem', elem);
      // console.log('elem.questionText', elem.questionText);
      defaultValue.push({
        questionText: elem.questionText,
        value: '0',
        otherValue: ''
      })
    }

    if (!state.answers.find(ans => ans.contentId === currentContentId)) {
      // console.log('questions', questions);
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
                <Text style = {[styles.infoText,{ textAlign: 'center', marginLeft: 0, marginBottom: 5, fontSize: 14 }]}>
                  {question.questionText}
                </Text>
                <Picker
                  style={styles.dropDownStyle}
                  selectedValue={this.state.answers[currentAnswerIndex].value[index].value}
                  onValueChange={(val) => this.updatePickerInputVal(
                    val,
                    index,
                    currentAnswerIndex
                  )}
                >
                  {this.pickerChoices(questions[index].choices)}
                </Picker>
                { 
                  this.state.answers[currentAnswerIndex].value[index].value === 'อื่นๆ' ? (
                    <View>
                      <Text style = {[styles.infoText,{ textAlign: 'center', marginLeft: 0, marginBottom: 5, fontSize: 14 }]}>
                        {questions[0].otherQuestionText}
                      </Text>
                      <TextInput
                        style={styles.inputStyle}
                        placeholder="โปรดระบุ"
                        multiline
                        numberOfLines={6}
                        value={this.state.answers[currentAnswerIndex].value[index].otherValue}
                        onChangeText={(val) => {
                          state.answers[currentAnswerIndex].value[index].otherValue = val;
                          this.setState(state);
                        }}
                      />
                    </View>
                  ) : (
                    <></>
                  )
                }
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
                if(this.state.answers[currentAnswerIndex].value[0].value !== 'อื่นๆ') {
                  state.answers[currentAnswerIndex].value[0].otherValue = '';
                  this.setState(state);
                }
                this.setState({ currentStep: currentStep + 1});
              },
              () => {
                if(this.state.answers[currentAnswerIndex].value[0].value !== 'อื่นๆ') {
                  state.answers[currentAnswerIndex].value[0].otherValue = '';
                  this.setState(state);
                }
                this.onSurveyFinished();
              },
              (this.state.answers[currentAnswerIndex].value[0].value === 'อื่นๆ' && !!this.state.answers[currentAnswerIndex].value[0].otherValue.length) || (this.state.answers[currentAnswerIndex].value[0].value !== 'อื่นๆ' && this.state.answers[currentAnswerIndex].value[0].value !== '0')
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
                      onValueChange={(val, index) => this.updateEmotionRatingVal(
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
                  <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={(e) => this.handleEmotionSelection(emotion.name, currentAnswerIndex, maxEmotions)}>
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
                <Text style = {[styles.infoText,{ textAlign: 'center', marginLeft: 0, marginBottom: 5, fontSize: 14 }]}>
                  {question.questionText}
                </Text>
                <TextInput
                  style={questions[index].textBoxSize === 'small' ? styles.smallInputStyle : styles.inputStyle}
                  placeholder={questions[index].placeholderText}
                  multiline={questions[index].textBoxSize === 'large' ? true : false}
                  numberOfLines={questions[index].textBoxSize === 'large' ? 6 : 1}
                  value={this.state.answers[currentAnswerIndex].value[index].value}
                  keyboardType = {questions[index].numeric ? 'number-pad' : ''}
                  onChangeText={(val) => this.updateTextInputVal(
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

  pushAnswerAfterGame(choices, currentAnswerIndex, contentId) {
    const state = this.state;
    const { currentChoiceAfterGame } = this.state;
    const defaultQuestions = [];
    const currentChoiceIndex = choices.findIndex(choice => choice.choiceText === currentChoiceAfterGame[contentId]);
    for(const question of choices[currentChoiceIndex].questions) {
      defaultQuestions.push({
        questionText: question.questionText,
        value: ''
      })
    }
    const newAnswer = {
      choiceText: currentChoiceAfterGame[contentId],
      questions: defaultQuestions
    }
    state.answers[currentAnswerIndex].value.choices.push(newAnswer);
    state.expectedAnswerAfterGame = choices[currentChoiceIndex].expectedAnswer;
    this.setState(state);
  }

  handleSelectionAfterGame(val, contentId) {
    const state = this.state;
    if(val === state.currentChoiceAfterGame[contentId]) {
      state.currentChoiceAfterGame[contentId] = null;
    } else {
      state.currentChoiceAfterGame[contentId] = val;
    }
    this.setState(state);
    // console.log('state', state);
  }

  isSelectedAfterGame(val, contentId) {
    const { currentChoiceAfterGame } = this.state;
    return !!(val === currentChoiceAfterGame[contentId])
  }

  isDisabledAfterGame(val,member) {
    return !!(member.find(elem => elem.choiceText === val));
  }

  renderMainAfterGame(survey,stepIndex) {
    const state = this.state;
    const { currentStep, currentChoiceAfterGame } = this.state;
    const { contentId, contentText, extraText , choices } = survey[stepIndex];
    // console.log('extraText = ', extraText);
    const defaultValue = {
      otherChoiceValue: '',
      choices: []
    }
    if (!state.answers.find(ans => ans.contentId === contentId)) {
      state.answers.push({
        contentId : contentId,
        value: defaultValue
      });
      this.setState(state);
    }
    // console.log('choices', choices);
    // console.log('state',state);
    const currentAnswerIndex = state.answers.findIndex(ans => ans.contentId === contentId);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>
            {!!state.answers[currentAnswerIndex].value.choices.length ? extraText : contentText}
          </Text>
          {choices.map(( choice, index ) =>
            <View
              key={index}
              style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
            >
              <TouchableOpacity
                onPress={(e) => this.handleSelectionAfterGame(choice.choiceText, contentId)}
                disabled={this.isDisabledAfterGame(choice.choiceText, state.answers[currentAnswerIndex].value.choices)}
              >
                <View
                  style={
                    this.isDisabledAfterGame(choice.choiceText, state.answers[currentAnswerIndex].value.choices) ?
                    styles.disabledSelectionButton
                    : this.isSelectedAfterGame(choice.choiceText, contentId) ?
                    styles.selectionButton
                    : styles.nonSelectionButton
                  }
                >
                  <Text
                    style={
                      this.isDisabledAfterGame(choice.choiceText, state.answers[currentAnswerIndex].value.choices) ?
                      {textAlign: 'center', color: '#a3a3a3', fontFamily: 'Kanit-Regular', fontSize: 14}
                      : {textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}
                    }
                  >
                    {choice.choiceText}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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
                this.pushAnswerAfterGame(choices, currentAnswerIndex, contentId);
                this.setState({ currentStep: currentStep + 1});
              },
              () => {
                this.pushAnswerAfterGame(choices, currentAnswerIndex, contentId);
                this.onSurveyFinished();
              },
              !!currentChoiceAfterGame[contentId]
            )
          }
        </View>
        {
          state.answers[currentAnswerIndex].value.choices.length > 0 ? (
            <View>
              <View style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <Text style = {[styles.infoText,{ textAlign: 'center', marginLeft: 0, marginBottom: 5, fontSize: 14 }]}>
                  น้องๆ มีคำพูดอะไรเกิดขึ้นในใจนอกเหนือจากในตัวเลือกไหมคะ ?
                </Text>
                <TextInput
                  style={styles.inputStyle}
                  multiline
                  numberOfLines={6}
                  value={this.state.answers[currentAnswerIndex].value.otherChoiceValue}
                  onChangeText={(val) => {
                    state.answers[currentAnswerIndex].value.otherChoiceValue = val;
                    this.setState(state);
                  }}
                />
              </View>
              <Text style = {[styles.infoText,{ textAlign: 'center', marginLeft: 0, marginBottom: 5, fontSize: 14 }]}>
                ถ้าน้องๆ ไม่มีคำพูดอื่นแล้ว สามารถกดปุ่ม "{currentStep < survey.length - 4 ? 'ไม่มีแล้ว' : 'เสร็จสิ้น'}" ได้เลยนะคะ
              </Text>
              <View style={styles.navButtonContainerStyle}>
                <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                  <TouchableOpacity onPress={() => {
                    currentStep < survey.length - 4 ?
                    this.setState({ currentStep: currentStep + 4})
                    : this.onSurveyFinished()
                  }}>
                    <View style={currentStep < survey.length - 4 ? styles.navButton : [styles.navButton,{backgroundColor: SELECTED}]}>
                      <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>
                      {currentStep < survey.length - 4 ? 'ไม่มีแล้ว' : 'เสร็จสิ้น'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <></>
          )
        }
      </View>
    )
  }

  renderSelectionGroupAfterGame(survey,stepIndex) {
    const state = this.state;
    const { currentStep, currentChoiceAfterGame } = this.state;
    const { contentId, contentText, choices, answerIdRef } = survey[stepIndex];
    const defaultValue = {
      otherChoiceValue: '',
      choices: []
    }
    if (!state.answers.find(ans => ans.contentId === answerIdRef)) {
      state.answers.push({
        contentId : answerIdRef,
        value: defaultValue
      });
      // console.log('state', state);
      this.setState(state);
    }
    // console.log('choices', choices);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>คำพูด "{currentChoiceAfterGame[answerIdRef]}" ที่น้องเลือกนั้น{'\n'}เป็น ความคิด หรือ ความรู้สึก คะ ?</Text>
          {choices.map(( choice, index ) =>
            <View
              key={index}
              style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
            >
              <TouchableOpacity onPress={(e) => this.handleSelectionAfterGame(choice.choiceText, contentId)}>
                <View
                  style={
                    this.isSelectedAfterGame(choice.choiceText, contentId) ?
                    styles.selectionButton : styles.nonSelectionButton
                  }
                >
                  <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Kanit-Regular', fontSize: 14}}>
                    {choice.choiceText}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.navButtonContainerStyle}>
          {
            this.renderNextOrFinishButton(
              survey,
              () => {
                this.setState({ currentStep: currentStep + 1});
              },
              () => {
                this.onSurveyFinished();
              },
              !!currentChoiceAfterGame[contentId]
            )
          }
        </View>
      </View>
    )
  }

  renderQuestionValidateAfterGame(survey,stepIndex) {
    const state = this.state;
    const { currentStep, currentChoiceAfterGame, expectedAnswerAfterGame } = this.state;
    const { contentTextPass, contentTextFail, minScore, answerIdRef } = survey[stepIndex];
    const options = survey[stepIndex].options === undefined ? undefined : survey[stepIndex].options
    let totalScore = 0;
    if(currentChoiceAfterGame[answerIdRef] === expectedAnswerAfterGame) {
      totalScore = 1;
    }
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
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
                this.renderNextOrFinishButton(
                  survey,
                  () => {this.setState({ currentStep: currentStep + 1});},
                  () => {this.onSurveyFinished();},
                  true
                )
              }
            </View>
          ) : (
            <View style={styles.navButtonContainerStyle}>
              {
                this.renderPrevButton(
                  () => {
                    state.currentChoiceAfterGame[answerIdRef] = null;
                    state.currentStep = currentStep - 1;
                    this.setState(state);
                  },
                  true
                )
              }
            </View>
          )
        }
      </View>
    );
  }

  updateTextInputValAfterGame(val, targetId, currentAnswerIndex, currentChoiceIndex, needAnswer) {
    // console.log('val', val);
    // console.log('targetId', targetId);
    // console.log('currentAnswerIndex', currentAnswerIndex);
    // console.log('needAnswer', needAnswer);

    const state = this.state;
    const { currentStep } = this.state;
    state.answers[currentAnswerIndex].value.choices[currentChoiceIndex].questions[targetId].value = val;
    
    if(needAnswer) {
      // console.log('before', state.textInputHandlers[currentStep][targetId]);
      // console.log('!!(val.length)', !!(val.length));

      state.textInputHandlers[currentStep][targetId] = !!(val.length);

      // console.log('after', state.textInputHandlers[currentStep][targetId]);
    }

    this.setState(state);
    // console.log(state);
  }

  renderTextInputAfterGame(survey,stepIndex) {
    const state = this.state;
    const { currentStep, currentChoiceAfterGame } = this.state;
    const { contentText, answerIdRef, otherIdRef } = survey[stepIndex]
    const refContentIndex = survey.findIndex(elem => elem.contentId === answerIdRef);
    const refChoiceIndex = survey[refContentIndex].choices.findIndex(choice => choice.choiceText === currentChoiceAfterGame[answerIdRef]);
    const { questions } = survey[refContentIndex].choices[refChoiceIndex];
    const currentAnswerIndex = this.state.answers.findIndex(ans => ans.contentId === answerIdRef);
    const currentChoiceIndex = this.state.answers[currentAnswerIndex].value.choices.findIndex(choice => choice.choiceText === currentChoiceAfterGame[answerIdRef]);
    // console.log('currentAnswerIndex', currentAnswerIndex);
    // console.log('currentChoiceIndex', currentChoiceIndex);
    // console.log('this.state.answers[currentAnswerIndex].value.choices[currentChoiceIndex]', this.state.answers[currentAnswerIndex].value.choices[currentChoiceIndex])
    const defaultHandlers = [];
    for (const question of questions) {
      defaultHandlers.push(!question.needAnswer);
    }
    if(!state.textInputHandlers[currentStep]) {
      state.textInputHandlers[currentStep] = defaultHandlers;
      this.setState(state);
    }
    return (
      <View style={styles.surveyContainer}>
        
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{contentText}</Text>
          { 
            questions.map((question,index) => 
              <View key={index}>
                <Text style = {[styles.infoText,{ textAlign: 'center', marginLeft: 0, marginBottom: 5, fontSize: 14 }]}>
                  {question.questionText}
                </Text>
                <TextInput
                  style={questions[index].textBoxSize === 'small' ? styles.smallInputStyle : styles.inputStyle}
                  placeholder={questions[index].placeholderText}
                  multiline={questions[index].textBoxSize === 'large' ? true : false}
                  numberOfLines={questions[index].textBoxSize === 'large' ? 6 : 1}
                  value={this.state.answers[currentAnswerIndex].value.choices[currentChoiceIndex].questions[index].value}
                  onChangeText={(val) => this.updateTextInputValAfterGame(
                    val,
                    this.state.answers[currentAnswerIndex].value.choices[currentChoiceIndex].questions.findIndex(elem => elem.questionText === question.questionText),
                    currentAnswerIndex,
                    currentChoiceIndex,
                    survey[refContentIndex].choices[refChoiceIndex].questions[index].needAnswer
                  )}
                />
              </View>
            )
          }
        </View>
        <View style={styles.navButtonContainerStyle}>
          {
            this.renderNextOrFinishButton(
              survey,
              () => {
                state.currentChoiceAfterGame[answerIdRef] = null;
                state.currentChoiceAfterGame[otherIdRef] = null;
                state.expectedAnswerAfterGame = null;
                state.currentStep = currentStep - 3;
                this.setState(state);
              },
              () => {
                state.currentChoiceAfterGame[answerIdRef] = null;
                state.currentChoiceAfterGame[otherIdRef] = null;
                state.expectedAnswerAfterGame = null;
                state.currentStep = currentStep - 3;
                this.setState(state);
              },
              !!(state.textInputHandlers[currentStep].find(elem => elem === false) === undefined)
            )
          }
        </View>
        
      </View>
    )
  }

  renderGame(survey,stepIndex) {
    const { currentStep } = this.state;
    const { contentText } = survey[stepIndex];
    // console.log('state',this.state);
    return (
      <View style={styles.surveyContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>
            {contentText}
          </Text>
          {this.renderSpecialButton(
            'เล่นเกมส์',
            () => {
              if(!this.state.gameHandlers) {
                this.setState({gameHandlers: true})
              }
              this.props.navigation.navigate('GameScreen')
            }
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
              this.state.gameHandlers
            )
          }
        </View>
      </View>
    );
  }

  specialCaseBackward(answerIdRef,specialValue) {
    const state = this.state;
    const { currentStep, answers } = this.state;
    for (const elem of answerIdRef) {
      state.selectionHandlers[elem] = new SelectionHandler({ maxMultiSelect: 1, allowDeselect: true });
      this.setState(state);
    }
    for (const elem of answerIdRef) {
      let currentAnswerIndex = answers.findIndex(ans => ans.contentId === elem);
      this.updateAnswer({
        contentId: elem,
        value: undefined
      },currentAnswerIndex);
    }
    this.setState({ currentStep: currentStep - specialValue});
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
                  () => {
                    this.specialCaseBackward(answerIdRef,backToVideo)
                    // this.setState({ currentStep: currentStep - backToVideo});
                  }
                )
              }
              {
                this.renderSpecialButton(
                  'ตอบแบบสอบถามใหม่อีกครั้ง',
                  () => {
                    this.specialCaseBackward(answerIdRef,backToFirstQuestion)
                    // this.setState({ currentStep: currentStep - backToFirstQuestion});
                  }
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
    } else if (contentType === 'PickerInput') {
      return this.renderPickerInput(survey,stepIndex);
    } else if (contentType === 'MainAfterGame') {
      return this.renderMainAfterGame(survey,stepIndex);
    } else if (contentType === 'SelectionGroupAfterGame') {
      return this.renderSelectionGroupAfterGame(survey,stepIndex);
    } else if (contentType === 'QuestionValidateAfterGame') {
      return this.renderQuestionValidateAfterGame(survey,stepIndex);
    } else if (contentType === 'TextInputAfterGame') {
      return this.renderTextInputAfterGame(survey,stepIndex);
    } else if (contentType === 'Game') {
      return this.renderGame(survey,stepIndex);
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
            <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 16}}>
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
    fontSize: 18
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
    fontSize: 16,
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
    fontSize: 14
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
    fontSize: 14
  },
  dropDownStyle: {
    width: '90%',
    marginBottom: 15,
    paddingVertical: 5,
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
  disabledSelectionButton: {
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
    backgroundColor: '#dfdfdf',
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