import React from 'react';
import {Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

interface AvatarProps {
  uri: string;
  styles?: any;
  stylesContainer?: any;
}

const Avatar: React.FC<AvatarProps> = ({uri, styles, stylesContainer}) => {
  return (
    <LinearGradient
      colors={['#6B65DE', '#E89DE7']}
      start={{x: 0.1, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        width: 35,
        height: 35,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        ...stylesContainer,
      }}>
      <Image
        source={{
          uri: uri,
        }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 28,
          ...styles,
        }}
      />
    </LinearGradient>
  );
};
export default Avatar;
