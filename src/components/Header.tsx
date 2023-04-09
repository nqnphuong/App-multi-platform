import icons from '@constants/icons';
import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, Image} from 'react-native';


interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const _header_height = 50;

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: _header_height,
        },
      ]}>
      <TouchableOpacity>
        <Image
          source={icons.Camera}
          style={{
            width: 25,
            height: 25,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      <Image
        source={icons.Logo}
        style={{
          width: 35,
          height: 35,
          resizeMode: 'contain',
        }}
      />
      <TouchableOpacity>
        <Image
          source={icons.Chat}
          style={{
            width: 25,
            height: 25,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
export default Header;
