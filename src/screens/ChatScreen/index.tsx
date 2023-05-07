import {useConnectUser} from 'hooks/useConnectUser';
import useUser from 'hooks/useUser';
import React from 'react';
import {Chat, ChannelList, OverlayProvider} from 'stream-chat-react-native';
import {StreamChatGenerics} from './types';
import Header from '@components/Header';

const ChatScreen: React.FC = ({navigation}: any) => {
  const apiKey = 'v2xkx2avad6h';

  const user = useUser();

  const chatClient = useConnectUser<StreamChatGenerics>(
    apiKey,
    {id: `duongle${user.userId}`, name: user.name, image: user.avatar},
    `duongle${user.userId}`,
  );

  if (!chatClient) {
    return null;
  }
  return (
    <OverlayProvider>
      <Header />
      <Chat client={chatClient}>
        <ChannelList />
      </Chat>
    </OverlayProvider>
  );
};

export default ChatScreen;
