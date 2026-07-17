/**
 * Asset maps for user images, challenge images, and percentage indicators.
 * Using a lookup object (O(1)) instead of filtering an array (O(n)) on each render.
 */

const USER_IMAGES = {
  1: require('../../assets/users/1.jpg'),
  2: require('../../assets/users/2.jpg'),
  3: require('../../assets/users/3.jpg'),
  4: require('../../assets/users/4.jpg'),
  5: require('../../assets/users/5.jpg'),
  6: require('../../assets/users/6.jpg'),
  7: require('../../assets/users/7.jpg'),
  8: require('../../assets/users/8.jpg'),
  9: require('../../assets/users/9.jpg'),
  10: require('../../assets/users/10.jpg'),
  11: require('../../assets/users/11.jpg'),
  12: require('../../assets/users/12.jpg'),
  13: require('../../assets/users/13.jpg'),
  14: require('../../assets/users/14.jpg'),
  15: require('../../assets/users/15.jpg'),
  16: require('../../assets/users/16.jpg'),
  17: require('../../assets/users/17.jpg'),
  18: require('../../assets/users/18.jpg'),
  19: require('../../assets/users/19.jpg'),
  20: require('../../assets/users/20.jpg'),
  21: require('../../assets/users/21.jpg'),
  22: require('../../assets/users/22.jpg'),
  23: require('../../assets/users/23.jpg'),
  24: require('../../assets/users/24.jpg'),
  25: require('../../assets/users/25.jpg'),
  26: require('../../assets/users/26.jpg'),
  27: require('../../assets/users/27.jpg'),
  28: require('../../assets/users/28.jpg'),
  29: require('../../assets/users/29.jpg'),
  30: require('../../assets/users/30.jpg'),
  31: require('../../assets/users/31.jpg'),
  32: require('../../assets/users/32.jpg'),
  33: require('../../assets/users/33.jpg'),
  34: require('../../assets/users/34.jpg'),
  35: require('../../assets/users/35.jpg'),
  36: require('../../assets/users/36.jpg'),
  37: require('../../assets/users/37.jpg'),
  38: require('../../assets/users/38.jpg'),
  39: require('../../assets/users/39.jpg'),
  40: require('../../assets/users/40.jpg'),
};

const CHALLENGE_IMAGES = {
  1: require('../../assets/challenge/1.jpg'),
  2: require('../../assets/challenge/2.jpg'),
  3: require('../../assets/challenge/3.jpg'),
  4: require('../../assets/challenge/4.jpg'),
  5: require('../../assets/challenge/5.jpg'),
  6: require('../../assets/challenge/6.jpg'),
  7: require('../../assets/challenge/7.jpg'),
  8: require('../../assets/challenge/8.jpg'),
  9: require('../../assets/challenge/9.jpg'),
  10: require('../../assets/challenge/10.jpg'),
  11: require('../../assets/challenge/11.jpg'),
  12: require('../../assets/challenge/12.jpg'),
  13: require('../../assets/challenge/13.jpg'),
  14: require('../../assets/challenge/14.jpg'),
  15: require('../../assets/challenge/15.jpg'),
};

const PERCENTAGE_IMAGES = {
  50: require('../../assets/percentage/50.png'),
  70: require('../../assets/percentage/70.png'),
  90: require('../../assets/percentage/90.png'),
  100: require('../../assets/percentage/100.png'),
};

export function buildImageMaps() {
  return {
    userImages: USER_IMAGES,
    challengeImages: CHALLENGE_IMAGES,
    percentageImages: PERCENTAGE_IMAGES,
  };
}
