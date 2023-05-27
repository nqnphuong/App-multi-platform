import {View} from 'react-native';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
       
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
