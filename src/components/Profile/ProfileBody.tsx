import CustomButton from '@components/CustomButton';
import {COLORS, FONTS} from '@constants/theme';
import useAuthStore from '@store/useAuthStore';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import images from '@constants/images';
import icons from '@constants/icons';

interface Props {
  name: string;
  accountName: string;
  profileImage: string;
  followers: number;
  following: number;
  post: number;
  backgroundImage: string;
}

const ProfileBody: React.FC<Props> = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
  backgroundImage,
}) => {
  const {logout} = useAuthStore(state => state);

  const imageGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const imageCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View>
      {accountName ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={icons.Logo}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {accountName}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={logout}>
              <Entypo
                name="log-out"
                style={{
                  fontSize: 20,
                  color: 'black',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View
        style={{
          gap: 15,
          padding: 20,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            gap: 5,
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity
              onPress={imageGallery}
              style={{
                width: 80,
                height: 80,
                borderWidth: 1.8,
                borderRadius: 100,
                borderColor: '#7268DC',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  profileImage
                    ? {
                        uri: profileImage,
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
            </TouchableOpacity>
            <TouchableOpacity onPress={imageCamera} style={styles.cameraButton}>
              <Entypo
                name="camera"
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: 'bold',
              color: COLORS.black,
              textTransform: 'capitalize',
            }}>
            {name}
          </Text>
        </View>
        <View style={styles.informationContainer}>
          <Text style={{color: COLORS.black, fontFamily: 'Poppins-Bold'}}>
            Account information:
          </Text>
          <View style={styles.informationContent}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: COLORS.black}}>
                {post}
              </Text>
              <Text>Posts</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: COLORS.black}}>
                {followers}
              </Text>
              <Text>Followers</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: COLORS.black}}>
                {following}
              </Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
  cameraButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.lightGray,
  },
  informationContainer: {
    flex: 1,
    gap: 5,
    padding: 5,
  },
  informationContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileBody;
