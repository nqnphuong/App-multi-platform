import {COLORS, SIZES} from '@constants/theme';
import React, {useLayoutEffect, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GiftedChat} from 'react-native-gifted-chat';

const catImageUrl =
  'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d';

const ChatContent: React.FC = ({navigation}: any) => {
  const [messages, setMessages] = useState<any>([]);

  useLayoutEffect(() => {
    const query = firestore()
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .get();

    query.then(querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });
  }, []);

  const onSend = useCallback((messages: any) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];

    firestore()
      .collection('chats')
      .add({
        _id,
        createdAt,
        text,
        user,
      })
      .then(() => {
        console.log('Mess sended!');
      });
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#fff',
        }}
        user={{
          _id: auth().currentUser?.email || '',
          avatar: 'https://i.pravatar.cc/300',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
  },
  chatButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});

export default ChatContent;
