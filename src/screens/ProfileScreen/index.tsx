import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import BottomTabView from '@components/Profile/BottomTabView';
import ProfileButtons from '@components/Profile/ProfileButtons';
import ProfileBody from '@components/Profile/ProfileBody';
import {useAppSelector} from 'hooks/store';
import {userSelector} from '@store/user';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '@constants/theme';
import {storiesSelector} from '@store/stories';
import UploadPost from '@components/UploadPost';
import {styles} from '@components/Profile/ProfileStyle';
import icons from '@constants/icons';
import {followsSelector} from '@store/follow';
import images from '@constants/images';
import {postSelector} from '@store/posts';
import HeaderProfile from '@components/Profile/Header';

const ProfileScreen: React.FC = () => {
  const {stories} = useAppSelector(storiesSelector);

  const {userCurrent} = useSelector(userSelector);
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
        <HeaderProfile />
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
      <Modal animationType="slide" visible={isOpen} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000aa',
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 50,
              padding: 10,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: COLORS.gray,
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                }}>
                List Following
              </Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Image
                  source={icons.CloseX}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.gray,
                  }}
                />
              </TouchableOpacity>
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
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;
