import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, StatusBar, Alert, TouchableOpacity, Image } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import { gameConstants } from '../constants/gameConstants';
import Physics, { resetPipes } from '../components/Physics';
import Images from '../assets/game-assets/Images';
import Bird from '../components/Bird';
import Floor from '../components/Floor';
import TopFloor from '../components/TopFloor';

export default class GameScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      running: true,
      score: 0,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.0;

    let bird = Matter.Bodies.rectangle( gameConstants.MAX_WIDTH / 2, gameConstants.MAX_HEIGHT / 2, gameConstants.BIRD_WIDTH, gameConstants.BIRD_HEIGHT);

    let floor1 = Matter.Bodies.rectangle(
      gameConstants.MAX_WIDTH / 2,
      gameConstants.MAX_HEIGHT - 25,
      gameConstants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    let floor2 = Matter.Bodies.rectangle(
      gameConstants.MAX_WIDTH + (gameConstants.MAX_WIDTH / 2),
      gameConstants.MAX_HEIGHT - 25,
      gameConstants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    let floor3 = Matter.Bodies.rectangle(
      gameConstants.MAX_WIDTH / 2,
      25,
      gameConstants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    let floor4 = Matter.Bodies.rectangle(
      gameConstants.MAX_WIDTH + (gameConstants.MAX_WIDTH / 2),
      25,
      gameConstants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );


    Matter.World.add(world, [bird, floor1, floor2, floor3, floor4]);
    Matter.Events.on(engine, 'collisionStart', (event) => {
      var pairs = event.pairs;

      this.gameEngine.dispatch({ type: "game-over"});

    });

    return {
      physics: { engine: engine, world: world },
      floor1: { body: floor1, renderer: Floor },
      floor2: { body: floor2, renderer: Floor },
      floor3: { body: floor3, renderer: TopFloor },
      floor4: { body: floor4, renderer: TopFloor },
      bird: { body: bird, pose: 1, renderer: Bird},
    }
  }

  onEvent = (e) => {
    if (e.type === "game-over"){
      //Alert.alert("Game Over");
      this.setState({
        running: false
      });
    } else if (e.type === "score") {
      this.setState({
        score: this.state.score + 1
      })
      if(this.state.score === 10) {
        this.setState({
          running: false
        });
      }
    }
  }

  reset = () => {
    resetPipes();
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
      score: 0
    });
  }

  scoreColor() {
    if(this.state.score >= 10) {
      return '#7bfef0'
    } else if(this.state.score >= 8) {
      return '#7bfe84'
    } else if(this.state.score >= 5) {
      return '#fefc7b'
    } else if(this.state.score >= 2) {
      return '#fed17b'
    } else {
      return '#ffffff'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
        <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={styles.gameContainer}
          systems={[Physics]}
          running={this.state.running}
          onEvent={this.onEvent}
          entities={this.entities}>
          <StatusBar hidden={true} />
        </GameEngine>
        <Text style={styles.instuction}>วิธีเล่น: ค่อยๆแตะหน้าจอ{'\n'}เพื่อให้เจ้านกบินลอดผ่านท่อ</Text>
        <Text style={[styles.score,{color: this.scoreColor()}]}>{this.state.score}</Text>
        {!this.state.running && <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
          <View style={styles.fullScreen}>
            <Text style={[styles.gameOverText,{marginBottom: 30}]}>
              จบเกม
            </Text>
            <Text style={[styles.gameOverSubText,{color: this.scoreColor()}]}>
              คุณได้
            </Text>
            <Text style={[styles.gameOverText,{color: this.scoreColor()}]}>
              {this.state.score}
            </Text>
            <Text style={[styles.gameOverSubText,{marginBottom: 30, color: this.scoreColor()}]}>
              คะแนน
            </Text>
            <Text style={[styles.gameOverSubText,{marginBottom: 30, color: this.scoreColor()}]}>
              {this.state.score >= 10 ?
                'ยินดีด้วย คุณชนะแล้ว!'
                : this.state.score >= 8 ?
                'อีกนิดเดียวก็จะชนะแล้ว สู้ๆ!'
                : this.state.score >= 5 ?
                'มาได้เกินครึ่งทางแล้ว พยายามเข้านะ!'
                : this.state.score >= 2 ?
                'เก่งมาก! ลองเล่นให้ได้ 10 คะแนนดูสิ'
                : 'มาพยายามกันใหม่นะ'}
            </Text>
            <Text style={styles.gameOverSubText}>(แตะหน้าจอเพื่อเล่นอีกครั้ง)</Text>
          </View>
        </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: gameConstants.MAX_WIDTH,
    height: gameConstants.MAX_HEIGHT
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
    fontFamily: 'Kanit-Regular',
  },
  gameOverSubText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Kanit-Regular',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instuction: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Kanit-Regular',
    textAlign: "center",
    marginTop: 5
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: gameConstants.MAX_WIDTH / 2 - 20,
    textShadowColor: '#444444',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 2,
    fontFamily: 'Kanit-Regular'
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  }
});
