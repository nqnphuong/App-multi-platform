import {View} from 'react-native';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import {SIZES} from '@constants/theme';

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: SIZES.width,
        height: SIZES.height,
        backgroundColor: '#000000aa',
      }}>
      <LottieView
        source={require('../../assets/lottieFiles/loading-animation.json')}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
};

export default Loading;
