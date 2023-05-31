import {COLORS, FONTS} from '@constants/theme';
import React from 'react';
import {
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
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

const ProfileBody: React.FC<Props> = ({name, accountName, profileImage}) => {
  const currentUser = useUser();
  const dispatch = useAppDispatch();

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
          <TouchableOpacity onPress={imageGallery}>
            <Image source={{uri: profileImage}} style={styles.profileImage} />
          </TouchableOpacity>
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
