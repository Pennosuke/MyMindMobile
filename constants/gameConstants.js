import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const gameConstants = {
  MAX_WIDTH: ((windowWidth * 0.9) - 40),
  MAX_HEIGHT: (((windowWidth * 0.9) - 40) * 4 / 3),
  GAP_SIZE: 320,
  PIPE_WIDTH: 100,
  BIRD_WIDTH: 50,
  BIRD_HEIGHT: 41
}
