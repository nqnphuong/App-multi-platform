import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from 'navigation/homeStack';
import {COLORS} from '@constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons} from 'constants';

const Header: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Ionicons name="ios-camera-outline" size={24} color={COLORS.black} />
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
        <Ionicons
          name="ios-chatbubbles-outline"
          size={24}
          color={COLORS.black}
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
