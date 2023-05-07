import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {icons} from 'constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from 'navigation/homeStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '@constants/theme';

const Header: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <View style={styles.header}>
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatList', {
            name: 'ChatList',
          })
        }>
        <Image
          source={icons.Chat}
          style={{
            width: 25,
            height: 25,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.lightGray,
  },
});
export default Header;
