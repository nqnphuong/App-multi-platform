import React from 'react';
import {View, Text} from 'react-native';

interface TabIconProps {
  focused: boolean;
  icon: any;
}

const TabIcon: React.FC<TabIconProps> = ({focused, icon}) => {
  console.log(focused);
  console.log(icon);
  return (
    <View>
      <Text>Duong LE</Text>
    </View>
  );
};
export default TabIcon;
