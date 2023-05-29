import {COLORS, FONTS} from '@constants/theme';
import useAuthStore from '@store/useAuthStore';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import icons from '@constants/icons';

const HeaderProfile: React.FC = () => {
  const {logout} = useAuthStore(state => state);

  return (
    <View
      style={{
        margin: 0,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          source={icons.Camera}
          style={{
            width: 25,
            height: 25,
          }}
        />
        <Image
          source={icons.Logo}
          style={{
            width: 30,
            height: 30,
          }}
        />
        <TouchableOpacity onPress={logout}>
          <Image
            source={icons.More}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderProfile;
