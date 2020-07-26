import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { tabA } from '../tabs/tabA'
import { tabB } from '../tabs/tabB'
import tabC from '../tabs/tabC'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export function HomeScreen() {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="แบบประเมิน" component={tabA} />
      <Tab.Screen name="โปรแกรมฝึกปฏิบัติ" component={tabB} />
      <Tab.Screen name="โปรไฟล์" component={tabC} />
    </Tab.Navigator>
  );
}