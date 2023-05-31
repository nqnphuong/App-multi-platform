import images from '@constants/images';
import {COLORS} from '@constants/theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FollowAction} from '@store/follow';
import {useAppDispatch} from 'hooks/store';
import IFollow from 'models/Follow';
import {SearchStackParams} from 'navigation/searchStack';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import I from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const FollowItem = ({
  item,
  setDeletes,
  deletes,
}: {
  item: IFollow;
  setDeletes: any;
  deletes: any;
}) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<SearchStackParams>>();

  const handleSelect = () => {
    navigation.navigate('DetailUserScreen', {
      name: 'DetailUserScreen',
      userId: item.userId,
    });
  };

  const handleDelete = async () => {
    setDeletes([...deletes, item as never]);
  };

  const sendFollow = () => {
    dispatch(FollowAction.sendFollow(item.userId));
    handleDelete();
    Toast.show({
      text1: 'Send follow request successfully !',
    });
  };

  return (
    <View style={tw`flex flex-row items-center justify-between py-2`}>
      <TouchableOpacity
        style={tw`flex flex-row items-center flex-1`}
        onPress={handleSelect}>
        <Image
          source={item.avatar ? {uri: item.avatar} : images.Avatar}
          style={tw`w-14 h-14 rounded-full border border-[#6B65DE] mr-2`}
        />
        <View>
          <Text style={tw`text-base font-semibold`}>{item.name}</Text>
          <Text style={tw`text-xs font-light`}>{item.email}</Text>
        </View>
      </TouchableOpacity>
      <View style={tw`flex flex-row items-center  py-2`}>
        <TouchableOpacity
          onPress={handleDelete}
          style={tw`rounded pl-5 pr-5 pt-3 pb-3 bg-gray-400 font-bold `}>
          <AntDesign style={tw`text-white`} name="close" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={sendFollow}
          style={tw`rounded pl-5 pr-5 pt-3 pb-3 bg-[${COLORS.primary}] font-bold ml-2`}>
          <I style={tw`text-white`} name="person-add" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FollowItem;
