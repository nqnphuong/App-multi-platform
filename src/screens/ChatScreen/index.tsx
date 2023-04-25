import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ChatList from './ChatList';
import ChatContent from './ChatContent';

export type RootStackParams = {
  ChatList: {
    name: 'ChatList';
  };
  ChatContent: {
    name: 'ChatContent';
  };
};

const ChatScreen: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={{headerShown: false}}>
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

export default ChatScreen;
