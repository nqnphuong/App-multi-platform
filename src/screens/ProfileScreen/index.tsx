import React, {useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '@components/Profile/BottomTabView';
import ProfileButtons from '@components/Profile/ProfileButtons';
import ProfileBody from '@components/Profile/ProfileBody';
import {useAppDispatch} from 'hooks/store';
import {UserAction, userSelector} from '@store/user';
import {useSelector} from 'react-redux';
import {News} from 'models/News';
import Avatar from '@components/Avatar';
import {COLORS} from '@constants/theme';
import useUser from 'hooks/useUser';
const ProfileScreen: React.FC = () => {
  let circuls = [];
  let numberofcircels = 10;

  const {userId} = useUser();
  const dispatch = useAppDispatch();
  const {userCurrent} = useSelector(userSelector);

  useEffect(() => {
    dispatch(UserAction.getUserCurrent(userId));
  }, []);

  for (let index = 0; index < numberofcircels; index++) {
    circuls.push(
      <View key={index}>
        {index === 0 ? (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderWidth: 1,
              opacity: 0.7,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="plus" style={{fontSize: 40, color: 'black'}} />
          </View>
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: 'black',
              opacity: 0.1,
              marginHorizontal: 5,
            }}></View>
        )}
      </View>,
    );
  }

  const renderNewsItem = (item: News) => {
    return (
      <TouchableOpacity>
        <ImageBackground
          style={styles.newsPost}
          source={{
            uri: item.newsBackground,
          }}
          imageStyle={{
            borderRadius: 10,
          }}>
          <View style={{margin: 2}}>
            <Avatar uri={item.userAvatar} />
          </View>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 17,
              margin: 5,
              color: COLORS.white,
            }}>
            {item.userName}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody
          name={userCurrent.name}
          accountName={userCurrent.email}
          profileImage={userCurrent.avatar}
          backgroundImage={userCurrent.background}
          followers={userCurrent.numberOfFollower}
          following={userCurrent.numberOfFollowing}
          post={userCurrent.numberOfPosts}
          isCurrentUser={true}
        />
        <ProfileButtons
          id={0}
          name={userCurrent.name}
          accountName={userCurrent.email}
          profileImage={userCurrent.avatar}
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
        }}></View>
      <View>
        <Text
          style={{
            padding: 10,
            letterSpacing: 1,
            fontSize: 14,
          }}>
          Story Highlights
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          {circuls}
        </ScrollView>
      </View>
      <BottomTabView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
  newsPost: {
    width: 100,
    height: 160,
    marginRight: 5,
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
