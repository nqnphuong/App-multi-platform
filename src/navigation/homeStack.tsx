import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from '@screens/HomeScreen';
import ChatList from '@screens/ChatScreen/ChatList';
import ChatContent from '@screens/ChatScreen/ChatContent';
import DetailUserScreen from '@screens/DetailUserScreen';

export type HomeStackParams = {
  HomeScreen: {
    name: 'HomeScreen';
  };
  ChatContent: {
    name: 'ChatContent';
  };
  ChatList: {
    name: 'ChatList';
  };
};

const HomeStack: React.FC = () => {
  const Stack = createNativeStackNavigator<HomeStackParams>();

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatContent" component={ChatContent} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default HomeStack;
