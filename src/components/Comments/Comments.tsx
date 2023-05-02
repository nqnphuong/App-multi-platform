import images from '@constants/images';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

interface Props {
  item?: any;
  setIdCommentSelected?: any;
  handleVisibleDeleteModal?: any;
  refRBSheet?: any;
}

const Comments: React.FC<Props> = ({
  item,
  setIdCommentSelected,
  handleVisibleDeleteModal,
  refRBSheet,
}: any) => {
  const handleLongPress = () => {
    if (setIdCommentSelected) {
      setIdCommentSelected(item.postsCommentId);
      handleVisibleDeleteModal();
    }
  };

  const handleGetProfile = () => {
    if (refRBSheet) {
      refRBSheet.current.close();
    }
  };

  return (
    <TouchableOpacity
      style={tw`w-full flex flex-row my-1 items-center`}
      onLongPress={handleLongPress}>
      <TouchableOpacity onPress={handleGetProfile}>
        <Image
          source={item.image ? {uri: item.image} : images.Avatar}
          style={tw`w-13 h-13 rounded-full mr-2 bg-gray-200 border-2 border-gray-200`}
        />
      </TouchableOpacity>
      <View style={tw`w-full`}>
        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`font-bold my-1`}>{item.name}</Text>
          <Text style={tw`text-gray-500 text-xs`}> </Text>
        </View>
        <Text style={tw`ml-1`}>{item.comment}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Comments;
