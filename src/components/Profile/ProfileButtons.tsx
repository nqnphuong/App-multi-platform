import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {RootStackParams} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Feather from 'react-native-vector-icons/Feather';
import {COLORS, SIZES} from '@constants/theme';
import FollowApi from '../../../api/follow/request';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import {FollowAction, followsSelector} from '@store/follow';
import useUser from 'hooks/useUser';
import {Image} from 'react-native';
import icons from '@constants/icons';

interface Props {
  id: number;
  name: string;
  accountName: string;
  profileImage: any;
  userId?: number;
}

const ProfileButtons: React.FC<Props> = ({
  id,
  name,
  accountName,
  userId,
  profileImage,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [follow, setFollow] = useState<any>(null);

  const {followers} = useAppSelector(followsSelector);

  const dispatch = useAppDispatch();

  const isFollow = followers.findIndex(f => f.userId === userId) !== -1;

  const handleFollow = async () => {
    try {
      dispatch(FollowAction.sendFollow(userId!));
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(FollowAction.getFollowers());
  }, []);

  return (
    <>
      {id === 0 ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity onPress={() => console.log('Hello')}>
            <View
              style={{
                width: SIZES.width - 20,
                height: 40,
                gap: 5,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#7268DC',
              }}>
              <Image
                source={icons.AddNoBorder}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  letterSpacing: 1,
                  color: COLORS.white,
                }}>
                Add News
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={handleFollow} style={{width: '42%'}}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                backgroundColor: /*  follow ? null : */ '#3493D9',
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default ProfileButtons;
