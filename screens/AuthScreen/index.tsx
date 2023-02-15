import React from 'react';
import {StyleSheet, Image, View, ImageBackground} from 'react-native';
import {CustomButton} from '../../components';
import Divider from '../../components/Divider';
import {icons, images} from '../../constants';
import {COLORS} from '../../constants/theme';

function AuthScreen({navigation}): JSX.Element {
  const changeToMainScreen = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.Background}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 15,
          }}>
          <Image
            source={images.AuthImage}
            style={{
              width: 300,
              height: 300,
              resizeMode: 'contain'
            }}
          />
          <CustomButton
            onPress={() => changeToMainScreen()}
            icon={icons.Google}
            iconColor={COLORS.white}
            colors={['#6B65DE', '#E89DE7']}
            buttonContainerStyles={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 5,
              ...styles.buttonContainerStyles,
            }}
            buttonText="Login with Google"
          />
          <CustomButton
            onPress={() => changeToMainScreen()}
            colors={[COLORS.lightGray]}
            buttonContainerStyles={styles.buttonContainerStyles}
            buttonText="Sign up with email or phone number"
          />
          <Divider />
          <View
            style={{
              width: 320,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 25,
            }}>
            <CustomButton
              colors={[COLORS.white]}
              icon={icons.Google}
              iconStyle={styles.iconStyles}
              buttonContainerStyles={styles.buttonCircle}
            />
            <CustomButton
              colors={[COLORS.white]}
              icon={icons.Apple}
              iconStyle={styles.iconStyles}
              buttonContainerStyles={styles.buttonCircle}
            />
            <CustomButton
              colors={[COLORS.white]}
              icon={icons.Facebook}
              iconStyle={styles.iconStyles}
              buttonContainerStyles={styles.buttonCircle}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  imageBackgroundStyles: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerStyles: {
    paddingVertical: 13,
    borderRadius: 20,
  },
  iconStyles: {
    width: 25,
    height: 25,
  },
  buttonCircle: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthScreen;
