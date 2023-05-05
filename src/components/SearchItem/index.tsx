import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '@constants/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SearchStackParams} from 'navigation/searchStack';
import {useAppDispatch} from 'hooks/store';

const SearchItem = ({item, times}: any) => {
    
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<SearchStackParams>>();

  const handleSelect = () => {
    navigation.navigate('DetailUserScreen', {
      name: 'DetailUserScreen',
      userId: item.item.userId,
    });
    /* dispatch(
      addHistorySearch({
        avatar: item.item.avatar,
        name: item.item.name,
        email: item.item.email,
        userId: item.item.userId,
      }),
    ); */
  };

  /*   const handleDelete = () => {
    dispatch(
      deleteHistorySearch({
        userId: item.item.userId,
      }),
    );
  }; */

  return (
    <View style={tw`flex flex-row items-center justify-between py-2`}>
      <TouchableOpacity
        style={tw`flex flex-row items-center flex-1`}
        onPress={handleSelect}>
        <Image
          source={item.item.avatar ? {uri: item.item.avatar} : images.Avatar}
          style={tw`w-14 h-14 rounded-full border border-[#6B65DE] mr-2`}
        />
        <View>
          <Text style={tw`text-base font-semibold`}>{item.item.name}</Text>
          <Text style={tw`text-xs font-light`}>{item.item.email}</Text>
        </View>
      </TouchableOpacity>
      {times ? (
        <TouchableOpacity /* onPress={handleDelete} */>
          <AntDesign name="close" size={16} style={tw`p-2`} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};
export default SearchItem;
