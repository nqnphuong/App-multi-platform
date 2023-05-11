import React, {useLayoutEffect} from 'react';
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
import useUser from 'hooks/useUser';

const DetailUserScreen: React.FC = ({route}: any) => {
  let circuls = [];
  let numberofcircels = 10;

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(UserAction.getUser(route.params.userId));
  }, [route.params.userId]);

  const {user} = useSelector(userSelector);

  const authUser = useUser();

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
          profileImage={user.avatar}
          backgroundImage={user.background}
          followers={user.numberOfFollower}
          following={user.numberOfFollowing}
          post={user.numberOfPosts}
        />
        <ProfileButtons
          id={user.userId === authUser.userId ? 0 : 1}
          name={user.name}
          accountName={user.email}
          profileImage={user.avatar}
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
        }}></View>
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

export default DetailUserScreen;
