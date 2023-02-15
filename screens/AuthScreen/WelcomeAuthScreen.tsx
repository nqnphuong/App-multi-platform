import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {CustomButton} from '../../components';
import Divider from '../../components/Divider';
import {icons, images} from '../../constants';
import {COLORS, FONTS} from '../../constants/theme';

function WelcomeAuthScreen({navigation}): JSX.Element {
  const changeToMainScreen = () => {
    navigation.navigate('Main');
  };

  const changeToSignInScreen = () => {
    navigation.navigate('SignIn');
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
              resizeMode: 'contain',
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
          <View style={{display: 'flex', flexDirection: 'row', gap: 2}}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>
              Already have an account ?
            </Text>
            <TouchableOpacity onPress={() => changeToSignInScreen()}>
              <Text style={{color: '#7268DC', ...FONTS.h3}}>Sign in</Text>
            </TouchableOpacity>
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

export default WelcomeAuthScreen;
