import {COLORS, FONTS, SIZES} from '@constants/theme';
import React, {useLayoutEffect, useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {useFirestore} from 'services/firebase';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const ChatList: React.FC = ({navigation}: any) => {
  const contacts = [
    {
      id: '1',
      userName: 'John Doe',
      userImg:
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
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
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
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
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
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
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
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
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
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
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
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
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
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
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
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
        'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'How is it going...',
      messageInQueue: 3,
      sentDate: '12/7',
    },
  ];
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(contacts);
  /* 
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: auth().currentUser?.uid,
    };
  }, [auth().currentUser?.uid]);

  const rooms = useFirestore('rooms', roomsCondition);
 */

  useLayoutEffect(() => {
    const query = firestore().collection('users').get();
    query.then(querySnapshot => {
      console.log(querySnapshot.docs);
      setUsers(
        querySnapshot.docs.map(doc => ({
          _id: doc.data().uid,
          displayName: doc.data().displayName,
          email: doc.data().email,
          createdAt: doc.data().createdAt.toDate(),
        })),
      );
    });
    console.log(users);
  }, []);


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
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.secondaryWhite,
          gap: 10,
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
        <View>
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
                bottom: 0,
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
      </View>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <Text style={{...FONTS.h4, marginBottom: 4, color: COLORS.black}}>
          {item.userName}
        </Text>
        <Text style={{fontSize: 14, color: COLORS.secondaryGray}}>
          {item.lastSeen}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <KeyboardAvoidingView
      style={{
        height: SIZES.height - 50,
        width: SIZES.width,
        backgroundColor: COLORS.white,
      }}>
      <View style={{flex: 1, gap: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            marginHorizontal: 15,
            justifyContent: 'space-between',
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
            marginHorizontal: 15,
          }}>
          <FlatList
            horizontal={true}
            data={contacts}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => (
              <TouchableOpacity>
                <LinearGradient
                  colors={['#6B65DE', '#E89DE7']}
                  start={{x: 0.1, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    height: 50,
                    width: 50,
                    marginRight: 5,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e6edff',
                  }}>
                  <AntDesign name="plus" size={24} color={COLORS.white} />
                </LinearGradient>
              </TouchableOpacity>
            )}
            renderItem={({item}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                }}>
                <TouchableOpacity>
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
            marginHorizontal: 15,
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
