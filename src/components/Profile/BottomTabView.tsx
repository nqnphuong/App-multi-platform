import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {Image, ScrollView, View, TouchableOpacity, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import posts, {IPostState, PostAction, postSelector} from '@store/posts';
import {useAppDispatch} from 'hooks/store';
import IPost from 'models/Posts';
import {COLORS, FONTS, SIZES} from '@constants/theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../App';
import {FlatList} from 'react-native-gesture-handler';
import {TabView, TabBar} from 'react-native-tab-view';
import {styles} from './ProfileStyle';
import PostCard from '@components/PostCard';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

interface Props {
  posts: IPost[];
}

const BottomTabView: React.FC<Props> = ({posts}) => {
  const dispatch = useAppDispatch();
  const [postsId, setpostsId] = useState<string>('');

  const [loading, setLoading] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useLayoutEffect(() => {
    const getMyPost = async () => {
      dispatch(PostAction.getPostUserId());
    };
    getMyPost();
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['100%', '100%'];
  const [isOpen, setIsOpen] = useState(false);

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  return (
    <View
      style={{
        gap: 10,
      }}>
      <Text
        style={{
          ...FONTS.h4,
          fontSize: 15,
          padding: 10,
          borderRadius: 5,
          backgroundColor: COLORS.white,
        }}>
        Posts
      </Text>
      <View
        style={{
          gap: 10,
        }}>
        {posts &&
          posts.map(p => (
            <PostCard
              post={p}
              key={p.postsId}
              setpostsId={setpostsId}
              setLoading={setLoading}
              handleSnapPress={handleSnapPress}
            />
          ))}
      </View>
    </View>
  );
};

export default BottomTabView;
