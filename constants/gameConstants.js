import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const gameConstants = {
  // MAX_WIDTH: ((windowWidth * 0.9) - 50),
  // MAX_HEIGHT: (((windowWidth * 0.9) - 50) * 4 / 3),
  MAX_WIDTH: Dimensions.get('window').width,
  MAX_HEIGHT: Dimensions.get('window').height - 56,
  GAP_SIZE: 360,
  PIPE_WIDTH: 100,
  BIRD_WIDTH: 50,
  BIRD_HEIGHT: 41
}
