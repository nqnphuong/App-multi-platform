import {useConnectUser} from 'hooks/useConnectUser';
import React, {createContext, useContext, useState} from 'react';
import {Channel} from 'stream-chat';
import {OverlayProvider, Chat} from 'stream-chat-react-native';
import {StreamChatGenerics} from '../types';
import useUser from 'hooks/useUser';

type ChatContextType = {
  currentChannel?: Channel;
  setCurrentChannel?: any;
  unreadCount: number | undefined;
};

export const ChatContext = createContext<ChatContextType>(
  {} as ChatContextType,
);

const ChatContextProvider = ({children}: {children: React.ReactNode}) => {
  const apiKey = 'xbgnwb6c8r7n';
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const [unreadCount, setUnreadCount] = useState<number | undefined>(undefined);
  const user = useUser();

  const chatClient = useConnectUser<StreamChatGenerics>(
    apiKey,
    {id: `duongle${user?.userId}`, name: user?.name, image: user?.avatar},
    `duongle${user?.userId}`,
  );

  const value = {
    currentChannel,
    setCurrentChannel,
    unreadCount,
    setUnreadCount,
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
