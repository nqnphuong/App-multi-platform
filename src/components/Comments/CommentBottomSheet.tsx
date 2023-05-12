import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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

  const [isHeart, setHeart] = useState(post.feel);
  const [isTotalFeel, setTotalFeel] = useState(post.totalFeel);

  const [isVisibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const handleVisibleDeleteModal = () => {
    setVisibleDeleteModal(!isVisibleDeleteModal);
  };

  const [isIdCommentSelected, setIdCommentSelected] = useState(null);

  const handleReact = async () => {
    setHeart(!isHeart);
    await PostApi.reactPostApi(post.postsId);
    isHeart ? setTotalFeel(isTotalFeel - 1) : setTotalFeel(isTotalFeel + 1);
  };

  return (
    <View style={tw`h-[100%] w-full items-center`}>
      <View style={tw`w-full h-[90%] px-5 mt-2`}>
        <View style={tw`flex flex-row items-center`}>
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
                  name={isHeart ? 'heart' : 'heart-outline'}
                  style={
                    isHeart
                      ? tw`text-2xl text-[#ED4366] mr-2`
                      : tw`text-2xl text-gray-300 mr-2`
                  }
                  size={24}
                />
                <Text style={tw`font-semibold text-gray-800 mr-3`}>
                  {isTotalFeel ? isTotalFeel : 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`items-center justify-center`}>
                <FontAwesome name="send" style={tw`text-gray-400`} size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
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
            style={{
              height: '78%',
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
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
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 50,
        }}>
        <WriteComment postId={postsId} />
      </View>
    </View>
  );
};

export default CommentBottomSheet;
