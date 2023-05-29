import React, {useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FollowAction, followsSelector} from '@store/follow';
import {UserAction, userSelector} from '@store/user';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ProfileBody from '@components/Profile/ProfileBody';
import Loading from '@components/LottieAnimation/Loading';
import HeaderProfile from '@components/Profile/Header';
import BottomTabView from '@components/Profile/BottomTabView';
import {PostAction, postSelector} from '@store/posts';
import {COLORS, SIZES} from '@constants/theme';

const DetailUserScreen: React.FC = ({route}: any) => {
  const dispatch = useAppDispatch();
  const {followers} = useAppSelector(followsSelector);
  const {userId} = route.params;

  const [loading, setloading] = useState<boolean>(false);
  const [follow, setFollow] = useState<any>(null);
  const isFollow = followers.findIndex(f => f.userId === userId) !== -1;

  useLayoutEffect(() => {
    const getUser = async () => {
      setloading(true);
      const res = await dispatch(UserAction.getUser(userId));
      if (UserAction.getUser.fulfilled.match(res)) {
        setloading(false);
      } else {
        setloading(false);
      }
    };
    getUser();
    dispatch(PostAction.getPostUser(userId));
  }, [userId]);

  const {user} = useSelector(userSelector);
  const {userPost} = useSelector(postSelector);

  const handleFollow = async () => {
    try {
      setloading(true);
      const res = await dispatch(FollowAction.sendFollow(userId!));
      if (FollowAction.sendFollow.fulfilled.match(res)) {
        setloading(false);
      } else {
        setloading(false);
      }
    } catch (error) {}
  };

  return (
    <>
      <HeaderProfile />
      <ScrollView
        style={{
          gap: 10,
          width: '100%',
          height: SIZES.height,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            gap: 10,
          }}>
          <View
            style={{
              gap: 5,
              backgroundColor: COLORS.white,
            }}>
            <ProfileBody
              name={user.name}
              accountName={user.email}
              profileImage={user.avatar}
              backgroundImage={user.background}
              followers={user.numberOfFollower}
              following={user.numberOfFollowing}
              post={user.numberOfPosts}
            />
            <View
              style={{
                width: '100%',
                height: 45,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: COLORS.white,
              }}>
              <TouchableOpacity
                onPress={handleFollow}
                style={{width: '42%', backgroundColor: COLORS.white}}>
                <View
                  style={{
                    width: '100%',
                    height: 35,
                    borderRadius: 5,
                    backgroundColor: '#7268DC',
                    borderWidth: follow ? 1 : 0,
                    borderColor: '#DEDEDE',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: follow ? 'black' : 'white'}}>
                    {isFollow ? 'Following' : 'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: '42%',
                  height: 35,
                  borderWidth: 1,
                  borderColor: '#DEDEDE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text>Message</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  height: 35,
                  borderWidth: 1,
                  borderColor: '#DEDEDE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Feather
                  name="chevron-down"
                  style={{fontSize: 20, color: 'black'}}
                />
              </View>
            </View>
          </View>
          <BottomTabView posts={userPost} />
        </View>
      </ScrollView>
      {loading && <Loading />}
    </>
  );
};

export default DetailUserScreen;
