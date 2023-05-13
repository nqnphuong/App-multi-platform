import {useChatContextApp} from '@screens/ChatScreen/context/ChatContext';
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Channel, MessageInput, MessageList} from 'stream-chat-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '@constants/theme';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import useUser from 'hooks/useUser';

const ChatRoomScreen: React.FC = () => {
  const user = useUser();
  const {currentChannel} = useChatContextApp();
  const [invitees, setInvitees] = useState<any>([]);

  const getMembers = async () => {
    if (currentChannel) {
      await currentChannel.queryMembers({}).then(res => {
        res.members.map(member => {
          if (member.user_id != `duongle${user.userId}`) {
            if(member.user_id){
              setInvitees([member.user_id])
            }
          }
        });
      });
    }
  };

  console.log(invitees)

  useEffect(() => {
    getMembers();
  }, []);

  if (currentChannel)
    return (
      <Channel channel={currentChannel}>
        <View
          style={{
            paddingHorizontal: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 2,
            justifyContent: 'space-between',
            borderBottomColor: COLORS.lightGray,
            backgroundColor: COLORS.white,
          }}>
          <View>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color={'#6B65DE'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              gap: 15,
              height: 50,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ZegoSendCallInvitationButton
              invitees={invitees.map((inviteeID: string) => {
                return {userID: inviteeID, userName: 'user_' + inviteeID};
              })}
              isVideoCall={false}
            />
            <ZegoSendCallInvitationButton
              invitees={invitees.map((inviteeID: any) => {
                return {userID: inviteeID, userName: 'user_' + inviteeID};
              })}
              isVideoCall={true}
            />
          </View>
        </View>
        <MessageList />
        <MessageInput />
      </Channel>
    );
  return <Text>No channel is selected</Text>;
};

export default ChatRoomScreen;
