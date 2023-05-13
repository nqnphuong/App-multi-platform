import Avatar from '@components/Avatar';
import Header from '@components/Header';
import PostCard from '@components/PostCard';
import UploadPost from '@components/UploadPost';
import {PostAction, postSelector} from '@store/posts';
import {UserAction, userSelector} from '@store/user';
import {COLORS, FONTS, SIZES} from 'constants/theme';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import useUser from 'hooks/useUser';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import CommentBottomSheet from '@components/Comments/CommentBottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StoryAction, storiesSelector} from '@store/stories';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../App';
import {IStoryByUser} from 'models/Story';
import icons from '@constants/icons';
import images from '@constants/images';

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {posts} = useSelector(postSelector);
  const dispatch = useAppDispatch();

  const {stories} = useAppSelector(storiesSelector);

  const {setIsStoryViewShow, setPressedIndex} = StoryAction;
  const openStories = (index: number) => {
    dispatch(setIsStoryViewShow(true));
    dispatch(setPressedIndex(index));
  };

  const {userId} = useUser();

  useEffect(() => {
    dispatch(PostAction.getPosts());
    dispatch(StoryAction.getStories());
  }, []);

  useEffect(() => {
    dispatch(UserAction.getUser(userId));
  }, [userId]);

  const {userCurrent} = useSelector(userSelector);

  const renderNewsHeader = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UploadStoryScreen' as never);
        }}>
        <ImageBackground
          source={{
            uri: 'https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/275230582_1173189403508740_1249611582808657292_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZP09G27NIwEAX9PCHqx&_nc_ht=scontent.fdad1-2.fna&oh=00_AfBwMHyHu_HWbiajSZid7HxJIUHffo-FdH-Ik4-Ar79xeA&oe=6441F5D5',
          }}
          style={styles.addNews}
          imageStyle={{
            width: 100,
            height: 130,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <LinearGradient
            colors={['#6B65DE', '#E89DE7']}
            start={{x: 0.1, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              borderRadius: 20,
              borderColor: COLORS.white,
              marginBottom: 15,
            }}>
            <Image
              source={icons.AddNoBorder}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderNewsItem = (item: IStoryByUser, index: number) => {
    return (
      <TouchableOpacity onPress={() => openStories(index)}>
        <ImageBackground
          style={styles.newsPost}
          source={{
            uri: item.stories[0].url,
          }}
          imageStyle={{
            borderRadius: 10,
          }}>
          <View style={{margin: 2}}>
            <Avatar uri={item.profile} />
          </View>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 17,
              margin: 5,
              color: COLORS.white,
            }}>
            {item.username}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['100%', '100%'];
  const [isOpen, setIsOpen] = useState(false);
  const [postsId, setpostsId] = useState<string>('');

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Header />
        <Animated.ScrollView
          style={[styles.scrollView]}
          scrollEnabled={!isOpen}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={stories}
            keyExtractor={item => `${item.id.toString()}-story`}
            bounces={true}
            horizontal={true}
            renderItem={({item, index}) => renderNewsItem(item, index)}
            ListHeaderComponent={renderNewsHeader()}
            showsHorizontalScrollIndicator={false}
          />
          <UploadPost avatar={userCurrent.avatar} />
          <View
            style={{
              flex: 1,
              gap: 5,
            }}>
            {posts.length > 0 ? (
              posts.map(p => (
                <PostCard
                  post={p}
                  key={p.postsId}
                  setpostsId={setpostsId}
                  handleSnapPress={handleSnapPress}
                />
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={images.AuthImage}
                  style={{
                    width: 300,
                    height: 300,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h2,
                  }}>
                  No posts
                </Text>
              </View>
            )}
          </View>
        </Animated.ScrollView>
      </View>
      {postsId && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}>
          <BottomSheetView>
            <CommentBottomSheet postsId={postsId} />
          </BottomSheetView>
        </BottomSheet>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 12,
  },
  news: {
    height: 160,
  },
  addNews: {
    width: 100,
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: '#FFFEFF',
  },
  newsPost: {
    width: 100,
    height: 160,
    marginRight: 5,
    justifyContent: 'space-between',
  },
  post: {
    height: 250,
  },
});

export default HomeScreen;
