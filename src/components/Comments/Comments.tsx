import images from '@constants/images';
import {COLORS} from '@constants/theme';
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

  // console.log(item);

  return (
    <TouchableOpacity
      style={tw`w-full flex flex-row my-1 mx-1 items-center`}
      onLongPress={handleLongPress}>
      <TouchableOpacity onPress={handleGetProfile}>
        <Image
          source={item.image ? {uri: item.image} : images.Avatar}
          style={tw`w-10 h-10 rounded-full mr-2 bg-gray-200`}
        />
      </TouchableOpacity>
      <View
        style={{
          gap: 10,
          paddingVertical: 3,
          paddingHorizontal: 10,
          borderRadius: 10,
          borderTopLeftRadius: 0,
          backgroundColor: COLORS.lightGray,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={tw`flex flex-col`}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              textTransform: 'capitalize',
            }}>
            {item.name}
          </Text>
          <Text style={tw`text-gray-500 text-xs`}>{item.comment}</Text>
        </View>
        <Text style={tw`ml-1`}>{item.dateCreate}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Comments;
