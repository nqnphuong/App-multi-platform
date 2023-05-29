import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParams} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS, SIZES} from '@constants/theme';
import {useAppDispatch} from 'hooks/store';
import {FollowAction} from '@store/follow';
import {Image} from 'react-native';
import icons from '@constants/icons';

interface Props {
  name: string;
  accountName: string;
  profileImage: any;
  userId?: number;
}

const ProfileButtons: React.FC<Props> = ({userId}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FollowAction.getFollowers());
  }, []);

  return (
    <>
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
    </>
  );
};

export default ProfileButtons;
