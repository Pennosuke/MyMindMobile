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

    const infoQuestionsRemoved = [...answers];

    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }
    this.props.navigation.navigate('CompletedSurvey', { surveyAnswers: answersAsObj});
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

  renderInfoText(infoText, hasImage, infoImage) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
        {hasImage ? (
          <Image source={infoImage} style={styles.charecterSize}/>
        ) : (
          <></>
        )}
      </View>
    );
  }

  render() {
    const survey = this.props.route.params?.data ?? defaultSurvey;
    return (
      <View style={styles.background}>
          <TreatmentSurvey
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
    /*minHeight: '70%',*/
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
    /*minHeight: 800,
    maxHeight: 800,*/
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
});