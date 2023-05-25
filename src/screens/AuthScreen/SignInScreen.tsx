import {Formik} from 'formik';
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {COLORS, FONTS, SIZES} from 'constants/theme';
import CustomButton from 'components/CustomButton';
import Input from 'components/Input';
import Divider from 'components/Divider';
import useAuthStore from 'store/useAuthStore';
import auth from '@react-native-firebase/auth';
import images from '@constants/images';
import icons from '@constants/icons';

const SignInScreen: React.FC = ({navigation}: any) => {
  const changeToMainScreen = () => {
    navigation.navigate('Main');
  };

  const changeToSignInScreen = () => {
    navigation.navigate('SignUp');
  };

  const {login} = useAuthStore(state => state);

  const handelSignIn = (values: any) => {
    if (values.userName !== '' && values.password !== '') {
      auth()
        .signInWithEmailAndPassword(values.userName, values.password)
        .then(() => {
          login(values);
          console.log('Login success');
        })
        .catch(err => console.log('Login error', err));
    }
  };

  return (
    <Formik
      onSubmit={values => {
        handelSignIn(values);
      }}
      initialValues={{
        userName: '',
        password: '',
      }}>
      {({handleChange, handleSubmit, values}) => {
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
                <View style={{display: 'flex', alignItems: 'center', gap: 5}}>
                  <Image
                    source={icons.Logo}
                    style={{
                      width: 70,
                      height: 70,
                    }}
                  />
                  <Text style={{color: COLORS.black, ...FONTS.h3}}>
                    Log in to make your memories
                  </Text>
                </View>
                <View
                  style={{width: SIZES.widthDefault, display: 'flex', gap: 10}}>
                  <Input
                    onChangeText={handleChange('userName')}
                    icon={icons.User}
                    placeholder="Enter phone or email"
                    value={values?.userName}
                  />
                  <Input
                    onChangeText={handleChange('password')}
                    icon={icons.Password}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={values?.password}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity>
                      <Text style={{color: '#7268DC', fontSize: 15}}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <CustomButton
                  onPress={handleSubmit}
                  iconColor={COLORS.white}
                  colors={['#6B65DE', '#E89DE7']}
                  
                  buttonContainerStyles={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 5,
                    ...styles.buttonContainerStyles,
                    borderRadius: 10,
                    width: 320,
                  }}
                  buttonText="Login"
                />
                <View style={{display: 'flex', flexDirection: 'row', gap: 2}}>
                  <Text style={{color: COLORS.black, fontSize: 15}}>
                    Don't have an account ?
                  </Text>
                  <TouchableOpacity onPress={() => changeToSignInScreen()}>
                    <Text style={{color: '#7268DC', fontSize: 15}}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
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
      }}
    </Formik>
  );
};

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

export default SignInScreen;
