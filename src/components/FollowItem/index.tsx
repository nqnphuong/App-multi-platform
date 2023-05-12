import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import images from '@constants/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SearchStackParams} from 'navigation/searchStack';
import {useAppDispatch} from 'hooks/store';
import IFollow from 'models/Follow';
import {FollowAction} from '@store/follow';

const FollowItem = ({item}: {item: IFollow}) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<SearchStackParams>>();

  const handleSelect = () => {
    navigation.navigate('DetailUserScreen', {
      name: 'DetailUserScreen',
      userId: item.userId,
    });
  };

  const handleDelete = () => {
    dispatch(FollowAction.deleteFollow(item.followId));
  };

  const sendFollow = () => {
    dispatch(FollowAction.deleteFollow(item.followId));
  };

  return (
    <View style={tw`flex flex-row items-center justify-between py-2`}>
      <TouchableOpacity
        style={tw`flex flex-row items-center flex-1`}
        onPress={handleSelect}>
        <Image
          source={item.userImage ? {uri: item.userImage} : images.Avatar}
          style={tw`w-14 h-14 rounded-full border border-[#6B65DE] mr-2`}
        />
        <View>
          <Text style={tw`text-base font-semibold`}>{item.userName}</Text>
          <Text style={tw`text-xs font-light`}>{item.email}</Text>
        </View>
      </TouchableOpacity>
      <View style={tw`flex flex-row items-center  py-2`}>
        <TouchableOpacity
          onPress={sendFollow}
          style={tw`rounded pl-5 pr-5 pt-3 pb-3 bg-red-500 font-bold `}>
          <AntDesign style={tw`text-white`} name="close" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={tw`rounded pl-5 pr-5 pt-3 pb-3 bg-green-500 font-bold ml-2`}>
          <Feather style={tw`text-white`} name="check" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FollowItem;
