import {useChatContextApp} from '@screens/ChatScreen/context/ChatContext';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Channel, MessageInput, MessageList} from 'stream-chat-react-native';

const ChatRoomScreen: React.FC = () => {
  const {currentChannel} = useChatContextApp();

  if (currentChannel)
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Channel channel={currentChannel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </View>
    );
  return <Text>No channel is selected</Text>;
};

export default ChatRoomScreen;
