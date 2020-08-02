import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from '../constants/validColors';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ViewBase } from 'react-native';

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
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value.value;
    }

    const depression = answersAsObj.DASS_3_depression + answersAsObj.DASS_5_depression + answersAsObj.DASS_10_depression + answersAsObj.DASS_16_depression + answersAsObj.DASS_17_depression + answersAsObj.DASS_21_depression;

    const db = this.props.route.params.database;

    if(depression >= 11) {
      this.props.navigation.navigate('SurveyQ1', { surveyAnswers: answersAsObj, database : db });
    } else {
      answersAsObj['timestamp'] = firebase.firestore.Timestamp.fromDate(new Date());
      db.collection("result").add(answersAsObj)
      this.props.navigation.replace('CompletedSurvey', { surveyAnswers: answersAsObj});
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

  sendData() {
    const db = this.props.route.params.database;
    const fbTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
    const mockupdata = {
      timestamp : fbTimestamp,
      totalScore : 0,
      value : {
        'SPWB_1' : 0,
        'SPWB_2' : 0,
        'SPWB_3' : 0
      }
    }
    db.collection('แบบวัดสุขภาวะทางจิตใจ').doc('mockupINWZA007').collection('ALSOmockupINWZA007').add(mockupdata);
    this.props.navigation.replace('MUMyMind');
  }

  async showData() {
    const db = this.props.route.params.database;
    const snapshot = await db.collection('แบบวัดสุขภาวะทางจิตใจ').doc('mockupINWZA007').collection("ALSOmockupINWZA007").orderBy("timestamp", "desc").get()
    console.log(snapshot.docs.map(doc => ({
      timestamp : doc.data().timestamp.toDate().toLocaleDateString() + ' ' + doc.data().timestamp.toDate().toLocaleTimeString(),
      totalScore : doc.data().totalScore,
      value : doc.data().value
    })))
  }

  render() {
    const survey = this.props.route.params?.data ?? defaultSurvey;
    return (
      <View style={[styles.background, { backgroundColor: this.state.backgroundColor }]}>
        <View style={styles.container}>
          {/* <SimpleSurvey
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
          /> */}
          
          <TouchableOpacity onPress={() => this.sendData()}>
            <View style={styles.roundedButton}>
              <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>send data!!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.showData()}>
            <View style={styles.roundedButton}>
              <Text style={{textAlign: 'center', padding: 20, color: 'white', fontFamily: 'Kanit-Regular', fontSize: 18}}>show data!!</Text>
            </View>
          </TouchableOpacity>

        </View>
        
        <ScrollView style={styles.answersContainer}>
          <Text style={{textAlign:'center', color: BLUE }}>JSON output</Text>
          {/* <Text>{this.state.answersSoFar}</Text> */}
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  answersContainer: {
    width: '90%',
    maxHeight: '20%',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: BLUE,
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    minWidth: '70%',
    maxWidth: '90%',
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
  roundedButton: {
    justifyContent:"center",
    alignItems:"center",
    width: 292,
    height: 62,
    borderRadius:30,
    backgroundColor:"#22459E",
    display: "flex",
    padding: 10,
    margin: 10
  }
});