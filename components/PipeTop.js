import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from '../assets/game-assets/Images';

export default class PipeTop extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    return (
      /*<Image
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
        }}
        resizeMode="stretch"
        source={Images.pipeTop} />*/
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: '#86d504',
        borderColor: '#486600',
        borderRadius: 12,
        borderWidth: width * 0.04
      }} >
        <View style={{width: width * 0.05, height: height - (width * 0.08), backgroundColor: '#86d504', borderTopLeftRadius: 8, borderBottomLeftRadius: 8}} />
        <View style={{width: width * 0.08, height: height - (width * 0.08), backgroundColor: '#c6f808'}} />
        <View style={{width: width * 0.01, height: height - (width * 0.08), backgroundColor: '#a9e806'}} />
        <View style={{width: width * 0.43, height: height - (width * 0.08), backgroundColor: '#86d504'}} />
        <View style={{width: width * 0.01, height: height - (width * 0.08), backgroundColor: '#76cc03'}} />
        <View style={{width: width * 0.35, height: height - (width * 0.08), backgroundColor: '#66c302', borderTopRightRadius: 8, borderBottomRightRadius: 8}} />
      </View>
  );
  }
}
