import {COLORS, FONTS} from '@constants/theme';
import useAuthStore from '@store/useAuthStore';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import images from '@constants/images';
import icons from '@constants/icons';
import UserApi from '../../../api/user/request';
import useUser from 'hooks/useUser';
import {useAppDispatch} from 'hooks/store';
import {UserAction} from '@store/user';
import {PostAction} from '@store/posts';
import {styles} from './ProfileStyle';

interface Props {
  name: string;
  accountName: string;
  profileImage: string;
  followers: number;
  following: number;
  post: number;
  backgroundImage: string;
  isCurrentUser?: boolean;
}

const ProfileBody: React.FC<Props> = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
  isCurrentUser,
}) => {
  const currentUser = useUser();
  const dispatch = useAppDispatch();
  const {logout} = useAuthStore(state => state);

  const imageGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then((image: any) => {
      const form = new FormData();
      form.append('file', {
        uri: image.path,
        name: image.path.replace(/^.*[\\\/]/, ''),
        type: image.mime,
      });
      form.append('userId', currentUser.userId);
      UserApi.updateAvatarApi(form).then(() => {
        dispatch(UserAction.getUserCurrent(currentUser.userId));
        dispatch(PostAction.getPosts());
      });
    });
  };

  return (
    <View
      style={{
        margin: 0,
        padding: 0,
      }}>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          source={icons.Camera}
          style={{
            width: 25,
            height: 25,
          }}
        />
        <Image
          source={icons.Logo}
          style={{
            width: 30,
            height: 30,
          }}
        />
        <TouchableOpacity onPress={logout}>
          <Image
            source={icons.More}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{uri: profileImage}}
            style={styles.coverImage}>
            <View style={styles.coverTitleContainer}>
              <Text style={styles.coverTitle} />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.profileImageContainer}>
          <View>
            <Image source={{uri: profileImage}} style={styles.profileImage} />
          </View>
          <View>
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.black,
                textTransform: 'capitalize',
              }}>
              {name}
            </Text>
            <Text>{`@${accountName}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileBody;
