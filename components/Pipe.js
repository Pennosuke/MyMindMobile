import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from '../assets/game-assets/Images';

export default class Pipe extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const pipeRatio = 160 / width;
    const pipeHeight = 33 * pipeRatio;
    const pipeIterations = Math.ceil(height / pipeHeight)

    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          overflow: 'hidden',
          flexDirection: 'column'
        }}>
        {Array.apply(null, Array(pipeIterations)).map(( el, idx) => {
          /* return <Image style={{ width: width, height: pipeHeight }} key={idx} resizeMode="stretch" source={Images.pipeCore} /> */
          return (
            <View style={{flex: 1, flexDirection: 'row'}} key={idx}>
              <View style={{width: width * 0.04, height: pipeHeight, backgroundColor: '#486600'}} />
              <View style={{width: width * 0.01, height: pipeHeight, backgroundColor: '#679e02'}} />
              <View style={{width: width * 0.05, height: pipeHeight, backgroundColor: '#86d504'}} />
              <View style={{width: width * 0.08, height: pipeHeight, backgroundColor: '#c6f808'}} />
              <View style={{width: width * 0.01, height: pipeHeight, backgroundColor: '#a9e806'}} />
              <View style={{width: width * 0.43, height: pipeHeight, backgroundColor: '#86d504'}} />
              <View style={{width: width * 0.01, height: pipeHeight, backgroundColor: '#76cc03'}} />
              <View style={{width: width * 0.33, height: pipeHeight, backgroundColor: '#66c302'}} />
              <View style={{width: width * 0.04, height: pipeHeight, backgroundColor: '#486600'}} />
            </View>
          )
        })}
      </View>
  );
  }
}
