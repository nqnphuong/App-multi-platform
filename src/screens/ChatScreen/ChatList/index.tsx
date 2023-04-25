import {COLORS, FONTS, SIZES} from '@constants/theme';
import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatList: React.FC = ({navigation}: any) => {
  const contacts = [
    {
      id: '1',
      userName: 'John Doe',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: false,
      lastSeen: '3 Days ago',
      lastMessage: 'How is it going...',
      messageInQueue: 3,
      sentDate: '12/7',
    },
    {
      id: '2',
      userName: 'Marry Lio',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'Good morning...',
      messageInQueue: 0,
      sentDate: '12/7',
    },
    {
      id: '3',
      userName: 'Lucia Mu',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: false,
      lastSeen: '2 weeks ago',
      lastMessage: "What's up...",
      messageInQueue: 0,
      sentDate: '12/7',
    },
    {
      id: '4',
      userName: 'Raki Lili',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'Send me the link',
      messageInQueue: 0,
      sentDate: 'Today',
    },
    {
      id: '5',
      userName: 'Raki Devine',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: false,
      lastSeen: '5 days ago',
      lastMessage: 'We are doing...',
      messageInQueue: 0,
      sentDate: '23/9',
    },
    {
      id: '6',
      userName: 'Aris Yup',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'How is it going...',
      messageInQueue: 3,
      sentDate: 'Today',
    },
    {
      id: '7',
      userName: 'Aris Yup',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'How is it going...',
      messageInQueue: 3,
      sentDate: '12/7',
    },
    {
      id: '8',
      userName: 'Billy Di',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'How is it going...',
      messageInQueue: 3,
      sentDate: '12/7',
    },
    {
      id: '9',
      userName: 'Aris Biu',
      userImg:
        'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'How is it going...',
      messageInQueue: 3,
      sentDate: '12/7',
    },
  ];

  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(contacts);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filteredData = contacts.filter(user =>
      user.userName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredUsers(filteredData);
  };

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        navigation.navigate('ChatContent', {
          userName: item.userName,
        })
      }
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 22,
          borderBottomColor: COLORS.secondaryWhite,
          borderBottomWidth: 1,
        },
        index % 2 !== 0
          ? {
              backgroundColor: COLORS.tertiaryWhite,
            }
          : null,
      ]}>
      <View
        style={{
          paddingVertical: 10,
        }}>
        {item.isOnline && item.isOnline == true && (
          <View
            style={{
              height: 14,
              width: 14,
              borderRadius: 7,
              backgroundColor: COLORS.green,
              borderColor: COLORS.white,
              borderWidth: 2,
              position: 'absolute',
              bottom: 14,
              right: 2,
              zIndex: 1000,
            }}></View>
        )}

        <Image
          source={{
            uri: item.userImg,
          }}
          resizeMode="contain"
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <Text style={{...FONTS.h4, marginBottom: 4}}>{item.userName}</Text>
        <Text style={{fontSize: 14, color: COLORS.secondaryGray}}>
          {item.lastSeen}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <KeyboardAvoidingView
      style={{
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: COLORS.white,
      }}>
      <View style={{flex: 1, padding: 15, gap: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h2, color: COLORS.black}}>Chats</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => console.log('Add contacts')}>
              <MaterialCommunityIcons
                name="message-badge-outline"
                size={20}
                color={COLORS.secondaryBlack}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: 4,
            }}></View>
          <FlatList
            horizontal={true}
            data={contacts}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 15,
                  }}>
                  <Image
                    source={{
                      uri: item.userImg,
                    }}
                    resizeMode="contain"
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                    }}
                  />
                </TouchableOpacity>
                <Text>{item.userName.substring(0, 5)}...</Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.secondaryWhite,
            height: 48,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}>
          <Ionicons name="ios-search-outline" size={24} color={COLORS.black} />
          <TextInput
            style={{
              marginHorizontal: 12,
            }}
            value={search}
            onChangeText={handleSearch}
            placeholder="Search contact..."
          />
        </View>
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default ChatList;
