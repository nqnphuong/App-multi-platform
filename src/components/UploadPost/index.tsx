import React, {useState, useEffect} from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import styles from './styles';
import Avatar from '@components/Avatar';
import icons from '@constants/icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../App';
interface UploadPostProps {
  avatar?: string;
}

const UploadPost: React.FC<UploadPostProps> = ({avatar}) => {
  const [granted, setGranted] = useState<boolean>();
  const [files, setfiles] = useState([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleFileChange = (file: any) => {
    console.log(files);
  };

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
      <Avatar
        uri={
          'https://secure.gravatar.com/avatar/06f59e296827fce579a51549f01af8bd?s=300&d=mm&r=g'
        }
      />
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
