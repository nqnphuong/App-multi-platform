import React from 'react';
import {View, Text} from 'react-native';

interface NewsCardProps {
  focused: boolean;
  icon: any;
}

const NewsCard: React.FC<NewsCardProps> = ({focused, icon}) => {
  console.log(focused);
  console.log(icon);
  return (
    <View>
      <Text>Duong LE</Text>
    </View>
  );
};
export default NewsCard;
