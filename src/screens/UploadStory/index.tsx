import CustomButton from '@components/CustomButton';
import icons from '@constants/icons';
import {COLORS, FONTS} from '@constants/theme';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from 'hooks/store';
import useUser from 'hooks/useUser';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';

import {StoryAction} from '@store/stories';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {requestCameraPermission} from 'utils/RequestPermission';

const RederItem = ({index, item, onDelete}: any) => {
  return (
    <View
      style={[
        styles.item,
        index % 2 === 0
          ? {
              marginRight: '3%',
            }
          : {
              marginLeft: '3%',
            },
      ]}>
      {item.type.includes('video') ? (
        <Video
          source={{
            uri: item.uri,
          }}
          resizeMode="contain"
          style={styles.itemBackground}
          controls={true}
        />
      ) : (
        <Image
          source={{
            uri: item.uri,
          }}
          resizeMode="contain"
          style={styles.itemBackground}
        />
      )}
      <TouchableOpacity onPress={() => onDelete(item.uri?.toString()!)}>
        <Image source={icons.Close} style={styles.itemDelete} />
      </TouchableOpacity>
    </View>
  );
};

const UploadStoryScreen: React.FC = () => {
  const [files, setFiles] = useState<ImagePickerResponse | null>(null);
  const user = useUser();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [formdata, setFormdata] = useState({
    type: 'story',
    userId: user?.userId,
  });

  const handlePostNew = () => {
    const form = new FormData();
    form.append('type', formdata.type);
    const medias = files?.assets as Asset[];

    form.append(
      'files',
      medias.map(m => ({
        uri: m.uri,
        name: m.fileName,
        type: m.type,
      }))[0],
    );
    form.append('userId', formdata.userId);

    dispatch(StoryAction.createStories(form));
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
        mediaType: 'mixed',
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
        mediaType: 'mixed',
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
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.backIcon} source={icons.Back} />
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.black,
          }}>
          Create Story
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

      <View style={{...styles.devideLine, marginTop: 15}}></View>
      <View
        style={{
          marginTop: 20,
        }}>
        <Text
          style={{
            ...FONTS.h2,
          }}>
          Add images or videos to create your story .
        </Text>
      </View>
      <View style={styles.previewContainer}>
        <FlatList
          data={files?.assets || []}
          renderItem={({item, index}) => {
            return (
              <RederItem item={item} index={index} onDelete={deleteFile} />
            );
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          keyExtractor={item => item.uri?.toString()!}
          numColumns={2}
        />
      </View>

      {/* post action  */}
      <View style={styles.postActionContainer}>
        <View style={styles.postAction}>
          <TouchableOpacity onPress={takeMedia}>
            <Image
              style={{...styles.postActionIcon, marginRight: 10}}
              source={icons.CameraOutline}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickerMedia}>
            <Image
              style={{...styles.postActionIcon, width: 28, height: 28}}
              source={icons.Image}
            />
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
    height: '30%',
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
    flex: 1,
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
    marginBottom: 5,
  },

  postAction: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  postActionIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  item: {
    height: 200,
    aspectRatio: 1,
    flexGrow: 1,
    width: '47%',
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

export default UploadStoryScreen;
