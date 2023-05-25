import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '@components/Profile/BottomTabView';
import ProfileButtons from '@components/Profile/ProfileButtons';
import ProfileBody from '@components/Profile/ProfileBody';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import {IUserState, userSelector} from '@store/user';
import {useSelector} from 'react-redux';
import {News} from 'models/News';
import Avatar from '@components/Avatar';
import {COLORS, FONTS, SIZES} from '@constants/theme';
import {StoryAction, storiesSelector} from '@store/stories';
import {useNavigation} from '@react-navigation/native';
import {bottom_tabs, screens} from '@constants/constants';
import UploadPost from '@components/UploadPost';
import {styles} from '@components/Profile/ProfileStyle';
import icons from '@constants/icons';
import IUser from 'models/User';
import {followsSelector} from '@store/follow';
import images from '@constants/images';
import {Modal, Provider} from '@ant-design/react-native';
import {postSelector} from '@store/posts';

const ProfileScreen: React.FC = () => {
  const {stories} = useAppSelector(storiesSelector);

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const {userCurrent} = useSelector(userSelector);
  const {setIsStoryViewShow, setPressedIndex} = StoryAction;
  const {followers} = useAppSelector(followsSelector);
  const {myPosts} = useAppSelector(postSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const Follower = ({user}: any) => {
    const renderFollowerCard = (follower: any, index: any) => {
      return (
        <TouchableOpacity
          style={[
            {
              gap: 5,
            },
            index !== 0
              ? {
                  paddingLeft: 5,
                }
              : {
                  paddingLeft: 0,
                },
          ]}>
          <Image
            source={
              follower?.userImage
                ? {
                    uri: follower.userImage,
                  }
                : images.Avatar
            }
            style={{
              width: (SIZES.width - 55) / 3,
              height: (SIZES.width - 55) / 3,
              resizeMode: 'contain',
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              ...FONTS.h4,
            }}>
            {follower.userName}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          marginVertical: 10,
          borderRadius: 5,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...FONTS.h4,
              fontSize: 15,
            }}>
            {`Following`}
          </Text>
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <Image
              source={icons.More}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <FlatList
            data={followers.slice(0, 6)}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={follower => `BrowseCategories-${follower.userId}`}
            contentContainerStyle={{
              marginTop: SIZES.radius,
            }}
            renderItem={({item, index}) => renderFollowerCard(item, index)}
          />
        </View>
      </View>
    );
  };

  const renderListFollowing = (follower: any, index: any) => {
    return (
      <TouchableOpacity
        style={[
          {
            gap: 10,
            display: 'flex',
            flexDirection: 'row',
          },
          index !== 0
            ? {
                marginTop: 5,
              }
            : {
                marginTop: 0,
              },
        ]}>
        <Image
          source={
            follower?.userImage
              ? {
                  uri: follower.userImage,
                }
              : images.Avatar
          }
          style={{
            width: 50,
            height: 50,
            resizeMode: 'contain',
            borderRadius: 50,
          }}
        />
        <View>
          <Text
            style={{
              ...FONTS.h4,
            }}>
            {follower.userName}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              fontSize: 10,
            }}>
            {`Email: ${follower.email}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.lightGray,
          paddingHorizontal: 10,
        }}>
        <View style={{width: '100%', gap: 10}}>
          <ProfileBody
            name={userCurrent.name}
            accountName={userCurrent.email}
            profileImage={userCurrent.avatar}
            backgroundImage={userCurrent.background}
            followers={userCurrent.numberOfFollower}
            following={userCurrent.numberOfFollowing}
            post={userCurrent.numberOfPosts}
            isCurrentUser={true}
          />
          <ProfileButtons
            id={0}
            name={userCurrent.name}
            accountName={userCurrent.email}
            profileImage={userCurrent.avatar}
          />
        </View>
        <UploadPost avatar={userCurrent.avatar} />
        <Follower user={userCurrent} />
        <View>
          <BottomTabView posts={myPosts} />
        </View>
      </View>
      <Provider>
        <Modal
          transparent
          onClose={() => setIsOpen(!isOpen)}
          maskClosable
          visible={isOpen}
          style={{
            minWidth: SIZES.width - 30,
          }}>
          <View
            style={{
              borderBottomColor: COLORS.lightGray,
              borderBottomWidth: 1,
            }}>
            <View>
              <Text
                style={{
                  ...FONTS.h4,
                }}>
                List Following
              </Text>
            </View>
          </View>
          <FlatList
            data={followers}
            scrollEnabled={false}
            keyExtractor={follower => `BrowseCategories-${follower.userId}`}
            contentContainerStyle={{
              marginTop: SIZES.radius,
            }}
            renderItem={({item, index}) => renderListFollowing(item, index)}
          />
        </Modal>
      </Provider>
    </ScrollView>
  );
};

export default ProfileScreen;
