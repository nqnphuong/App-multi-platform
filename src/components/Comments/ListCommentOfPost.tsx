import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import Comments from './Comments';
import {postSelector} from '@store/posts';

const ListCommentOfPost = ({refRBSheet}: any) => {
  const {listCommentOfPost} = useSelector(postSelector);

  return (
    <FlatList
      contentContainerStyle={tw`h-full flex flex-col pt-3 px-5 w-full`}
      data={listCommentOfPost}
      renderItem={({item}) => {
        return <Comments item={item} refRBSheet={refRBSheet} />;
      }}
      keyExtractor={comment => comment}
    />
  );
};

export default ListCommentOfPost;
