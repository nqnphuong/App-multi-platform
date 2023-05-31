import {Image, TextInput, View} from 'react-native';
import tw from 'twrnc';
import React, {useState} from 'react';
import images from '@constants/images';
import {PostAction} from '@store/posts';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import {COLORS} from '@constants/theme';
import {userSelector} from '@store/user';

interface Props {
  postId: string;
}

const WriteComment: React.FC<Props> = ({postId}) => {
  const dispatch = useAppDispatch();
  const [isComment, setComment] = useState<string>('');

  const {userCurrent} = useAppSelector(userSelector);

  const handleComment = async () => {
    if (isComment) {
      const res = await dispatch(
        PostAction.commentPost({
          comment: isComment,
          tusId: postId,
          userId: userCurrent.userId,
        }),
      );
      if (PostAction.commentPost.fulfilled.match(res)) {
        await dispatch(PostAction.getListCommentOfPost(postId));
        await dispatch(PostAction.getPosts());
        await dispatch(PostAction.findPostsById(postId));
        setComment('');
      }
    }
  };

  return (
    <View style={tw`px-3 flex flex-row items-center gap-2 my-2`}>
      <View
        style={{
          width: 40,
          height: 40,
          borderWidth: 1.8,
          borderRadius: 40,
          borderColor: '#7268DC',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={
            userCurrent.avatar
              ? {
                  uri: userCurrent.avatar,
                }
              : images.Avatar
          }
          style={{
            resizeMode: 'cover',
            width: '95%',
            height: '95%',
            borderRadius: 100,
            backgroundColor: COLORS.white,
          }}
        />
      </View>
      <TextInput
        style={tw`bg-white h-10 flex-1 rounded-xl px-3 border border-gray-200`}
        placeholder="Write your comment..."
        placeholderTextColor="#ccc"
        value={isComment}
        onChangeText={(val: string) => setComment(val)}
        onEndEditing={handleComment}
      />
    </View>
  );
};

export default WriteComment;
