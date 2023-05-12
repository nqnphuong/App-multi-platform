import CustomButton from '@components/CustomButton';
import icons from '@constants/icons';
import images from '@constants/images';
import {COLORS, FONTS, SIZES} from '@constants/theme';
import {useNavigation} from '@react-navigation/native';
import {PostAction} from '@store/posts';
import {useAppDispatch} from 'hooks/store';
import useUser from 'hooks/useUser';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {requestCameraPermission} from 'utils/RequestPermission';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RederItem = ({index, item, onDelete}: any) => {
  return (
    <View
      style={[
        styles.item,
        index % 3 !== 3 - 1 && {
          marginRight: 25,
          marginBottom: 15,
        },
      ]}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemBackground}
      />
      <TouchableOpacity onPress={() => onDelete(item.uri?.toString()!)}>
        <Image source={icons.Close} style={styles.itemDelete} />
      </TouchableOpacity>
    </View>
  );
};

const UploadScreen: React.FC = () => {
  const [files, setFiles] = useState<ImagePickerResponse | null>(null);
  const user = useUser();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [formdata, setFormdata] = useState({
    caption: '',
    type: '',
    userId: user.userId,
  });

  const handlePostNew = () => {
    const form = new FormData();
    form.append('caption', formdata.caption);
    form.append('type', formdata.type);
    const images = files?.assets as Asset[];

    form.append(
      'files',
      images.map(image => ({
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      }))[0],
    );
    form.append('userId', formdata.userId);

    dispatch(PostAction.createPost(form));
    navigation.navigate(
      'Main' as never,
      {
        screen: 'HomeScreen',
      } as never,
    );
  };

  const pickerMedia = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 6,
      });

      setFiles({
        assets: [...(files?.assets || []), ...result.assets!],
      });
    } catch (error) {}
  };

  const takeMedia = async () => {
    try {
      await requestCameraPermission();
      const result = await launchCamera({
        mediaType: 'photo',
      });

      setFiles({
        assets: [...(files?.assets || []), ...result.assets!],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFile = (id: string) => {
    setFiles({
      assets: files?.assets?.filter(f => {
        return f.uri?.toString()! !== id;
      }),
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      ]}>
      <View>
        <View style={styles.topContainer}>
          <Image style={styles.backIcon} source={icons.Back} />
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.black,
            }}>
            Create Post
          </Text>
          <TouchableOpacity onPress={handlePostNew}>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.primary,
                fontSize: 18,
              }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
        {/* post container  */}
        <View style={styles.postContainer}>
          <Image style={styles.avatar} source={images.Avatar} />
          <TextInput
            editable
            onChangeText={text =>
              setFormdata({
                ...formdata,
                caption: text,
              })
            }
            value={formdata.caption}
            multiline
            numberOfLines={15}
            maxLength={40}
            textAlignVertical="top"
            placeholder="What is your mind ?"
            style={styles.textInput}
          />
        </View>
        <View style={styles.previewContainer}>
          <FlatList
            data={files?.assets || []}
            renderItem={({item, index}) => {
              return (
                <RederItem item={item} index={index} onDelete={deleteFile} />
              );
            }}
            keyExtractor={item => item.uri?.toString()!}
            numColumns={3}
          />
        </View>
      </View>
      {/* post action  */}
      <View style={styles.devideLine}></View>
      <View style={styles.postActionContainer}>
        <View style={styles.postAction}>
          <TouchableOpacity onPress={takeMedia}>
            <Ionicons name="camera-outline" size={27} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickerMedia}>
            <Ionicons name="image-outline" size={26} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <CustomButton
          onPress={handlePostNew}
          containerStyle={{
            width: 80,
          }}
          colors={['#6B65DE', '#6B65DE']}
          buttonContainerStyles={{
            paddingVertical: 12,
            borderRadius: 10,
            width: 80,
          }}
          textStyle={{
            ...FONTS.body3,
          }}
          buttonText="Post"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#f9f9fe',
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backIcon: {
    width: 18,
    height: 18,
  },
  postContainer: {
    height: '50%',
    marginTop: 30,
    backgroundColor: COLORS.white,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  textInput: {
    padding: 15,
    flex: 1,
  },
  previewContainer: {
    marginTop: 30,
  },

  devideLine: {
    height: 1,
    backgroundColor: '#edebec',
    marginTop: 10,
  },

  postActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },

  postAction: {
    gap: 10,
    flexDirection: 'row',
    flex: 1,
  },

  postActionIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  item: {
    height: 90,
    width: (SIZES.width - 90) / 3,
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'relative',
  },

  itemBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 8,
  },
  itemDelete: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default UploadScreen;
