import {useConnectUser} from 'hooks/useConnectUser';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {StreamChat, Channel} from 'stream-chat';
import {OverlayProvider, Chat} from 'stream-chat-react-native';
import {StreamChatGenerics} from '../types';
import useUser from 'hooks/useUser';

type ChatContextType = {
  currentChannel?: Channel;
  setCurrentChannel?: any;
};

export const ChatContext = createContext<ChatContextType>({});

const ChatContextProvider = ({children}: {children: React.ReactNode}) => {
  const apiKey = 'v2xkx2avad6h';
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const user = useUser();

  const chatClient = useConnectUser<StreamChatGenerics>(
    apiKey,
    {id: `duongle${user?.userId}`, name: user?.name, image: user?.avatar},
    `duongle${user?.userId}`,
  );

  const value = {
    currentChannel,
    setCurrentChannel,
  };

  return (
    <OverlayProvider>
      {chatClient && (
        <Chat client={chatClient}>
          <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
        </Chat>
      )}
    </OverlayProvider>
  );
};

export const useChatContextApp = () => useContext(ChatContext);

export default ChatContextProvider;
