import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

const GREEN = 'rgba(141,196,63,1)';
const BLUE = '#7BDAF8';

export default class EvaluationResult extends Component {
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
    const datas = this.props.route.params.data;
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView>
            { datas.map(( data, index ) => {
                <View style={{paddingBottom: 20}} key={index}>
                  <Text style={styles.questionText}>timestamp = {data.timestamp}</Text>
                </View>
              }
            )}
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