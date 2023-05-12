import LottieView from 'lottie-react-native';
import * as React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';

interface ILoadingIconProps {}

const LoadingIcon: React.FunctionComponent<ILoadingIconProps> = props => {
  return (
    <View>
      <LottieView
        source={require('../../assets/lottieFiles/loading_primary.json')}
        style={tw`w-10 h-10`}
        autoPlay={true}
        loop={true}
        resizeMode="cover"
      />
    </View>
  );
};

export default LoadingIcon;
