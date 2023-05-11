import {useEffect, useState} from 'react';
import {
  DefaultGenerics,
  ExtendableGenerics,
  OwnUserResponse,
  StreamChat,
  TokenOrProvider,
  UserResponse,
} from 'stream-chat';

export const useConnectUser = <
  SCG extends ExtendableGenerics = DefaultGenerics,
>(
  apiKey: string,
  userToConnect: OwnUserResponse<SCG> | UserResponse<SCG>,
  userTokenOrProvider: string,
) => {
  const [chatClient, setChatClient] = useState<StreamChat<SCG> | null>(null);
  useEffect(() => {
    const client = new StreamChat<SCG>(apiKey, {
      enableInsights: true,
      enableWSFallback: true,
    });

    let didUserConnectInterrupt = false;

    const connectUser = client
      .connectUser(userToConnect, client.devToken(userTokenOrProvider))
      .catch(e => {
        console.error(`Failed to connect user`, e);
      })
      .then(() => {
        if (!didUserConnectInterrupt) {
          setChatClient(client);
        }
      });

    return () => {
      didUserConnectInterrupt = true;
      connectUser.then(() => {
        setChatClient(null);
        client.disconnectUser().catch(e => {
          console.error(`Failed to disconnect user`, e);
        });
      });
    };
  }, []);

  return chatClient;
};
