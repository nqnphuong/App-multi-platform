import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useLayoutEffect, useState} from 'react';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {PostAction, postSelector} from '@store/posts';
import {useAppDispatch} from 'hooks/store';
import images from '@constants/images';
import Comments from '@components/Comments/Comments';
import WriteComment from '@components/Comments/WriteComment';
import PostApi from '../../../api/post/request';
import Loading from '@components/LottieAnimation/Loading';
import {COLORS, SIZES} from '@constants/theme';
interface Props {
  postsId: string;
}

const CommentBottomSheet: React.FC<Props> = ({postsId}) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(PostAction.findPostsById(postsId));
    dispatch(PostAction.getListCommentOfPost(postsId));
  }, [postsId]);

  const {post, listCommentOfPost} = useSelector(postSelector);
  const [loading, setLoading] = useState(false);

  const [isVisibleDeleteModal, setVisibleDeleteModal] =
    useState<boolean>(false);
  const handleVisibleDeleteModal = () => {
    setVisibleDeleteModal(!isVisibleDeleteModal);
  };

  const [isIdCommentSelected, setIdCommentSelected] = useState(null);

  const handleReact = async () => {
    setLoading(true);
    await PostApi.reactPostApi(post.postsId).then(async () => {
      await dispatch(PostAction.getPosts());
      await dispatch(PostAction.findPostsById(postsId));
      setLoading(false);
    });
  };

  return (
    <>
      <View style={tw`h-[100%] w-full items-center`}>
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={tw`flex flex-row items-center p-2`}>
            <View style={tw`flex flex-row items-center justify-between w-full`}>
              {post.postsUserList ? (
                <View>
                  <Image
                    style={tw`w-14 h-14 rounded-full absolute -top-5 bg-gray-300 border border-2 border-white`}
                    source={
                      post?.postsUserList[0].image
                        ? {uri: post?.postsUserList[0].image}
                        : images.Avatar
                    }
                  />
                  <View style={tw`ml-15 flex`}>
                    <Text style={tw`font-bold text-base`}>
                      {post?.postsUserList[0].name}
                    </Text>
                    <Text style={[{fontSize: 11}, tw`font-light`]}>
                      {post.dateCreate}
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
              <View
                style={tw` flex flex-row items-center justify-around bg-gray-50 px-3 py-1 my-2 rounded-xl border border-gray-200`}>
                <TouchableOpacity
                  style={tw` items-center flex flex-row justify-center`}
                  onPress={handleReact}>
                  <Ionicons
                    name={post.feel ? 'heart' : 'heart-outline'}
                    style={
                      post.feel
                        ? tw`text-2xl text-[#7268DC] mr-2`
                        : tw`text-2xl text-gray-300 mr-2`
                    }
                    size={24}
                  />
                  <Text style={tw`font-semibold text-gray-800 mr-3`}>
                    {post.totalFeel ? post.totalFeel : 0}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={tw`items-center justify-center`}>
                  <FontAwesome
                    name="send"
                    style={tw`text-gray-400`}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                maxWidth: '75%',
              }}>
              {post.caption}
            </Text>
            <Text style={tw`text-gray-500 `}>{post.totalComment} comments</Text>
          </View>
          <View style={tw`w-full flex justify-center items-center`}>
            <View
              style={tw`bg-gray-200 rounded-full w-2/5 h-[1] items-center mt-4 mb-1`}
            />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: 20,
            }}>
            {listCommentOfPost ? (
              listCommentOfPost.map(item => {
                return (
                  <Comments
                    item={item}
                    key={item.postsCommentId}
                    setIdCommentSelected={setIdCommentSelected}
                    handleVisibleDeleteModal={handleVisibleDeleteModal}
                  />
                );
              })
            ) : (
              <></>
            )}
          </ScrollView>
          <View
            style={{
              width: '100%',
              height: 50,
              marginVertical: 10,
            }}>
            <WriteComment postId={postsId} />
          </View>
        </View>
      </View>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: SIZES.width,
            height: SIZES.height,
          }}>
          <View
            style={{
              position: 'absolute',
              height: SIZES.height,
              width: SIZES.width,
              backgroundColor: COLORS.black,
              opacity: 0.1,
            }}
          />
          <Loading />
        </View>
      )}
    </>
  );
};

export default CommentBottomSheet;
