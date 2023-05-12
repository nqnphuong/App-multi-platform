import React, {useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '@components/Profile/BottomTabView';
import ProfileButtons from '@components/Profile/ProfileButtons';
import ProfileBody from '@components/Profile/ProfileBody';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import {userSelector} from '@store/user';
import {useSelector} from 'react-redux';
import {News} from 'models/News';
import Avatar from '@components/Avatar';
import {COLORS} from '@constants/theme';
import {StoryAction, storiesSelector} from '@store/stories';
import {useNavigation} from '@react-navigation/native';
const ProfileScreen: React.FC = () => {
  let circuls = [];
  let numberofcircels = 10;

  const {stories} = useAppSelector(storiesSelector);

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const {userCurrent} = useSelector(userSelector);
  const {setIsStoryViewShow, setPressedIndex} = StoryAction;

  const openStories = (index: number) => {
    dispatch(setIsStoryViewShow(true));
    dispatch(setPressedIndex(index));
  };

  for (let index = 0; index < stories.length + 1; index++) {
    circuls.push(
      <View key={index}>
        {index === 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('UploadStoryScreen' as never)}>
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
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              openStories(index - 1);
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                backgroundColor: 'black',
                opacity: 1,
                marginHorizontal: 5,
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri: stories[index - 1].profile,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </TouchableOpacity>
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
