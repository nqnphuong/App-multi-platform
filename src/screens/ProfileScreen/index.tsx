import React from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView, Text} from 'react-native';
import {COLORS} from 'constants/theme';
import CustomButton from 'components/CustomButton';
import useAuthStore from 'store/useAuthStore';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '@components/Profile/BottomTabView';
import ProfileButtons from '@components/Profile/ProfileButtons';
import ProfileBody from '@components/Profile/ProfileBody';
const ProfileScreen: React.FC = () => {
  const {logout} = useAuthStore(state => state);

  let circuls = [];
  let numberofcircels = 10;

  for (let index = 0; index < numberofcircels; index++) {
    circuls.push(
      <View key={index}>
        {index === 0 ? (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderWidth: 1,
              opacity: 0.7,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="plus" style={{fontSize: 40, color: 'black'}} />
          </View>
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: 'black',
              opacity: 0.1,
              marginHorizontal: 5,
            }}></View>
        )}
      </View>,
    );
  }

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody
          name="Mr Peobody"
          accountName="mr_peobody"
          profileImage="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
          followers="3.6M"
          following="35"
          post="458"
        />
        <ProfileButtons
          id={0}
          name="Mr Peobody"
          accountName="mr_peobody"
          profileImage="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
        }}>
     {/*    <CustomButton
          onPress={logout}
          iconColor={COLORS.white}
          colors={['#6B65DE', '#E89DE7']}
          buttonContainerStyles={{
            height: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: 10,
          }}
          textStyle={{
            fontSize:10
          }}
          buttonText="Logout"
        /> */}
      </View>
      <View>
        <Text
          style={{
            padding: 10,
            letterSpacing: 1,
            fontSize: 14,
          }}>
          Story Highlights
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          {circuls}
        </ScrollView>
      </View>
      <BottomTabView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default ProfileScreen;
