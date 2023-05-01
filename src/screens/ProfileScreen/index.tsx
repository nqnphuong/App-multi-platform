import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '@components/Profile/BottomTabView';
import ProfileButtons from '@components/Profile/ProfileButtons';
import ProfileBody from '@components/Profile/ProfileBody';
import {useAppDispatch} from 'hooks/store';
import {UserAction, userSelector} from '@store/user';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';
const ProfileScreen: React.FC = () => {
  let circuls = [];
  let numberofcircels = 10;

  const {user} = useSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    AsyncStorage.getItem('user').then(async (value: any) => {
      if (value) await dispatch(UserAction.getUser(JSON.parse(value).userId));
    });
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

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody
          name={user.name}
          accountName={user.email}
          profileImage="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
          followers={user.numberOfFollower}
          following={user.numberOfFollowing}
          post={user.numberOfPosts}
        />
        <ProfileButtons
          id={0}
          name="Mr Peobody"
          accountName="mr_peobody"
          profileImage="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
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
});

export default ProfileScreen;
