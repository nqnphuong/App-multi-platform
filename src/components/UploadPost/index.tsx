import React, {useEffect} from 'react';
import {View, Platform, Text, Image, TouchableOpacity} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import styles from './styles';
import Avatar from '@components/Avatar';
import icons from '@constants/icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../App';
interface UploadPostProps {
  avatar: string;
}

const UploadPost: React.FC<UploadPostProps> = ({avatar}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (Platform.OS === 'android') {
        request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      }
    };
    getCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Avatar uri={avatar} />
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() =>
          navigation.navigate('UploadScreen', {
            name: 'UploadScreen',
          })
        }>
        <Text style={styles.title}>What's on your mind?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={icons.Images}
          style={{
            resizeMode: 'contain',
            width: 22,
            height: 22,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UploadPost;
