import {
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ChannelList,
  useChatContext,
} from 'stream-chat-react-native';
import {StreamChatGenerics} from './types';
import Header from '@components/Header';
import tw from 'twrnc';
import icons from '@constants/icons';
import {COLORS} from '@constants/theme';
import {Channel} from 'stream-chat';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {useChatContextApp} from './context/ChatContext';
import type {UserResponse} from 'stream-chat';
import useUser from 'hooks/useUser';
import _ from 'lodash';
import OnSearchingSkeletion from '@components/Skeleton/OnSearchingSkeletion';
import images from '@constants/images';
import moment from 'moment';

const ChatScreen: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const {setCurrentChannel} = useChatContextApp();
  const {client} = useChatContext<StreamChatGenerics>();
  const [searching, setSearching] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<
    UserResponse<StreamChatGenerics>[]
  >([]);
  const [users, setUsers] = useState<UserResponse<StreamChatGenerics>[]>([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const findUsers = async () => {
    if (searching) return;
    setSearching(true);

    try {
      const response = await client.queryUsers(
        {
          id: {$ne: client.userID as string},
          $and: [{name: {$autocomplete: input}}],
        },
        {id: 1},
        {limit: 6},
      );

      if (!response.users.length) {
        setUsers([]);
      } else {
        setUsers(response.users);
      }
    } catch (error) {
      console.log({error});
    }

    setSearching(false);
  };

  const findUsersDebounce = _.debounce(findUsers, 100, {
    trailing: true,
  });

  useEffect(() => {
    if (input) {
      findUsersDebounce();
    }
  }, [input]);

  const onSelect = (chanel: Channel) => {
    navigation.navigate('ChatRoomScreen', {
      name: 'ChatRoomScreen',
    });
    setCurrentChannel(chanel);
  };

  const user = useUser();

  const filters = {members: {$in: [`duongle${user.userId}`]}};

  const createChannel = async (id: string) => {
    const conversation = client.channel('messaging', {
      members: [id, client.userID ? client.userID : ''],
    });
    await conversation.watch();
    setUsers([]);
    setInput('');
    onSelect(conversation);
  };
  const renderUserItem = (user: any) => {
    return (
      <View style={tw`flex flex-row items-center justify-between py-1 m-1`}>
        <TouchableOpacity
          style={tw`flex flex-row items-center flex-1`}
          onPress={() => createChannel(user.id)}>
          <View>
            <Image
              source={user.avatar ? {uri: user.avatar} : images.Avatar}
              style={tw`w-12 h-12 rounded-full border border-[#6B65DE] mr-2`}
            />
            {user.online && (
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 7,
                  backgroundColor: COLORS.green,
                  borderColor: COLORS.white,
                  borderWidth: 2,
                  position: 'absolute',
                  bottom: 1,
                  right: 5,
                  zIndex: 1000,
                }}></View>
            )}
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              {user.name}
            </Text>
            {user.active ? (
              <Text>Is active</Text>
            ) : (
              <Text style={tw`text-xs font-light`}>
                {`Last active ${moment(new Date(user.last_active)).fromNow()}`}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    if (input) {
      if (users.length > 0) {
        return (
          <FlatList
            data={users}
            keyExtractor={item => item.id}
            bounces={true}
            renderItem={({item}) => renderUserItem(item)}
            showsHorizontalScrollIndicator={false}
          />
        );
      }
      return (
        <View>
          <Text>No result</Text>
        </View>
      );
    }
    return <ChannelList onSelect={onSelect} filters={filters} />;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
      }}>
      <Header />
      <View
        style={tw`h-10 bg-gray-100 rounded-md flex gap-[2] flex-row items-center px-2 m-1`}>
        <Image
          source={icons.Union}
          style={{
            tintColor: '#6B65DE',
            width: 17,
            height: 17,
          }}
        />
        <TextInput
          value={input}
          placeholder="Search..."
          style={tw`flex-1`}
          onChangeText={val => setInput(val)}
        />
        <TouchableOpacity
          onPress={() => {
            setInput('');
            Keyboard.dismiss();
          }}>
          <Text style={tw`text-sm font-light`}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {!searching ? (
        renderContent()
      ) : (
        <View style={tw`w-full h-full px-2`}>
          <OnSearchingSkeletion />
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
