import CustomButton from '@components/CustomButton';
import {COLORS} from '@constants/theme';
import useAuthStore from '@store/useAuthStore';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
interface Props {
  name: string;
  accountName: string;
  profileImage: string;
  followers: number;
  following: number;
  post: number;
}

const ProfileBody: React.FC<Props> = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
}) => {
  const {logout} = useAuthStore(state => state);
  return (
    <View>
      {accountName ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
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
            <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: 'black',
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={logout}>
              <Entypo
                name="log-out"
                style={{
                  fontSize: 20,
                  opacity: 0.5,
                  color: 'black',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingTop: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image
              source={{
                uri: profileImage,
              }}
              style={{
                resizeMode: 'cover',
                width: 80,
                height: 80,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.black}}>
            {post}
          </Text>
          <Text>Posts</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.black}}>
            {followers}
          </Text>
          <Text>Followers</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.black}}>
            {following}
          </Text>
          <Text>Following</Text>
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
});

export default ProfileBody;
