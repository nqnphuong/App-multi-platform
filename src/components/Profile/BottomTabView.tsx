import React, {useLayoutEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {PostAction, postSelector} from '@store/posts';
import {useAppDispatch} from 'hooks/store';
import IPost from 'models/Posts';
import {COLORS} from '@constants/theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../App';

interface Props {}

const BottomTabView: React.FC<Props> = () => {
  const Tab = createMaterialTopTabNavigator();

  const {myPosts} = useSelector(postSelector);
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const imageDetail = (postId: string) => {
    navigation.navigate('ImageScreen', {
      name: 'ImageScreen',
      postsId: postId,
    });
  };

  useLayoutEffect(() => {
    const getMyPost = async () => {
      dispatch(PostAction.getPostUserId());
    };
    getMyPost();
  }, []);

  const Posts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {myPosts.map((post: IPost) => (
            <View key={post.postsId}>
              <TouchableOpacity onPress={() => imageDetail(post.postsId)}>
                <Image
                  source={{
                    uri: post.postsImageList[0].image,
                  }}
                  style={{
                    width: 130,
                    height: 150,
                    resizeMode: 'cover',
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };
  const Video = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}></View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: '#6B65DE',
          height: 1.5,
        },
        tabBarIcon: ({focused, colour}: any) => {
          let iconName: string = '';
          if (route.name === 'Posts') {
            iconName = focused ? 'ios-apps-sharp' : 'ios-apps-sharp';
            colour = focused ? '#6B65DE' : 'gray';
          } else if (route.name === 'Video') {
            iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
            colour = focused ? '#6B65DE' : 'gray';
          } else if (route.name === 'Tags') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
            colour = focused ? '#6B65DE' : 'gray';
          }
          return <Ionicons name={iconName} color={colour} size={22} />;
        },
      })}>
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Video" component={Video} />
    </Tab.Navigator>
  );
};

export default BottomTabView;
