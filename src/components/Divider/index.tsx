import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from 'constants/theme';
const Divider: React.FC = () => {
  return (
    <View
      style={{
        marginTop: 15,
        marginBottom: 15,
        width: 320,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flex: 1, height: 2, backgroundColor: '#D8D8D8'}}></View>
      <Text
        style={{
          color: COLORS.black,
          fontSize: 15,
          fontWeight: '500',
          marginHorizontal: 10,
        }}>
        OR
      </Text>
      <View style={{flex: 1, height: 2, backgroundColor: '#D8D8D8'}}></View>
    </View>
  );
};
export default Divider;
