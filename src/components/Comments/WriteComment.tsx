import {Image, TextInput, View} from 'react-native';
import tw from 'twrnc';
import React, {useState} from 'react';
import {BlurView} from '@react-native-community/blur';
import images from '@constants/images';
import AsyncStorage from '@react-native-community/async-storage';
import {PostAction} from '@store/posts';
import useUser from 'hooks/useUser';
import {useAppDispatch} from 'hooks/store';
import {COLORS} from '@constants/theme';

interface Props {
  postId: string;
}

const WriteComment: React.FC<Props> = ({postId}) => {
  const dispatch = useAppDispatch();
  const [isComment, setComment] = useState<string>('');

  const user = useUser();

  const handleComment = () => {
    if (isComment) {
      dispatch(
        PostAction.commentPost({
          comment: isComment,
          tusId: postId,
          userId: user.userId,
        }),
      );
      dispatch(PostAction.getListCommentOfPost(postId));
      setComment('');
    }
  };

  return (
    <View style={tw`py-2 px-3 flex flex-row items-center h-12 gap-2 my-2`}>
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
            user.avatar
              ? {
                  uri: user.avatar,
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
