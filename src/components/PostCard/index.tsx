import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {COLORS, SIZES} from 'constants/theme';
import IPost from 'models/Posts';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import {userSelector} from '@store/user';
import Share from 'react-native-share';
import icons from '@constants/icons';
import images from '@constants/images';
import {ImageGallery, ImageObject} from '@georstat/react-native-image-gallery';
import PostApi from '../../../api/post/request';
import {PostAction, hidePost} from '@store/posts';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IPostCardProps {
  post: IPost;
  setpostsId: (id: string) => void;
  handleSnapPress: (key: number) => void;
}

const PostCard = ({post, setpostsId, handleSnapPress}: IPostCardProps) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(userSelector);

  const [listImage, setlistImage] = useState<ImageObject[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);

  useEffect(() => {
    const images: ImageObject[] = [];
    post.postsImageList.map((item, index) => {
      images.push({
        id: index,
        url: item.image,
      });
    });
    setlistImage(images);
  }, []);

  const handelOnClickComment = () => {
    setpostsId(post.postsId);
    handleSnapPress(0);
  };

  const sharePost = async () => {
    const options = {
      message: post.caption,
      url: post.postsImageList[0].image,
      email: 'codes.sg@gmail.com',
      subject: 'Eiusmod esse veniam esse.',
      recipient: '919988998899',
    };
    try {
      const res = await Share.open(options);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReact = async () => {
    await PostApi.reactPostApi(post.postsId).then(async () => {
      await dispatch(PostAction.getPosts());
      await dispatch(PostAction.findPostsById(post.postsId));
    });
  };

  const handleHidePost = () => {
    dispatch(hidePost(post.postsId));
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <View>
          <View
            style={[
              styles.rowCenter,
              {
                justifyContent: 'space-between',
              },
            ]}>
            <TouchableOpacity style={[styles.rowCenter]} onPress={handleReact}>
              <Ionicons
                name={post.feel ? 'heart' : 'heart-outline'}
                style={
                  post.feel
                    ? tw`text-2xl text-[#7268DC]`
                    : tw`text-2xl text-black`
                }
                size={24}
              />
              <Text style={[{color: COLORS.black}]}>
                {`${post.totalFeel ? post.totalFeel : 0} Like`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rowCenter]}
              onPress={handelOnClickComment}>
              <Image
                source={icons.Comment}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={[
                  {color: COLORS.black},
                ]}>{`${post.totalComment} Comment`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowCenter]} onPress={sharePost}>
              <Image
                source={icons.Share}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
              />
              <Text style={[{color: COLORS.black}]}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.rowCenter]}>
        <TouchableOpacity style={styles.rowCenter}>
          <Image
            source={
              post.postsUserList[0].image
                ? {
                    uri: post.postsUserList[0].image,
                  }
                : images.Avatar
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
            }}
          />
          <View>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontWeight: '600',
                textTransform: 'capitalize',
              }}>
              {post?.postsUserList?.length > 0
                ? post?.postsUserList[0].name
                : user.name}
            </Text>
            <View
              style={[
                styles.rowCenter,
                {
                  gap: 5,
                },
              ]}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 12,
                }}>
                {post.dateCreate}
              </Text>
              <Image
                source={icons.Earth}
                style={{
                  width: 10,
                  height: 10,
                  tintColor: COLORS.gray,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            gap: 15,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <Image
              source={icons.More}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.gray,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHidePost}>
            <Image
              source={icons.CloseX}
              style={{
                width: 13,
                height: 13,
                tintColor: COLORS.gray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textBody}>
        <Text style={{color: COLORS.black, fontSize: 14}}>{post.caption}</Text>
      </View>
      <TouchableOpacity onPress={openGallery} activeOpacity={1}>
        <AutoHeightImage
          width={SIZES.width - 20}
          source={{
            uri: post.postsImageList[0].image,
          }}
        />
      </TouchableOpacity>
      {renderFooter()}
      <ImageGallery close={closeGallery} isOpen={isOpen} images={listImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  header: {
    justifyContent: 'space-between',
    margin: 10,
  },
  textBody: {
    margin: 10,
    marginTop: 0,
    display: 'flex',
    gap: 5,
  },
  createdTime: {
    color: COLORS.gray,
    fontSize: 12,
  },
  footer: {
    borderTopColor: COLORS.gray,
    borderTopWidth: 0.5,
    paddingTop: 10,
    margin: 10,
  },
});

export default PostCard;
