import {Formik} from 'formik';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {icons} from 'constants';
import {COLORS, FONTS, SIZES} from 'constants/theme';
import useAuthStore from 'store/useAuthStore';
import CustomButton from 'components/CustomButton';
import Input from 'components/Input';
import Divider from 'components/Divider';
import auth from '@react-native-firebase/auth';

const SignInScreen: React.FC = ({navigation}: any) => {
  const {register} = useAuthStore(state => state);

  const changeToMainScreen = () => {
    navigation.navigate('Main');
  };

  const onHandleSignup = (data: any) => {
    if (data.email !== '' && data.password !== '') {
      auth()
        .createUserWithEmailAndPassword(
          data.email,
          data.password,
        )
        .then(() => {
          register(data);
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    }
  };

  const changeToSignInScreen = () => {
    navigation.navigate('AuthScreen', {
      screen: 'SignIn',
    });
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Formik
      onSubmit={values => {
        let firstName = '';
        let lastName = '';
        const splitlength = values.fullname.trim().split(' ').length;
        if (splitlength === 1) {
          lastName = values.fullname.split(' ')[0];
        } else if (splitlength === 2) {
          firstName = values.fullname.split(' ')[0];
          lastName = values.fullname.slice(
            firstName.length,
            values.fullname.length,
          );
        }
        const data = {
          firstName,
          lastName,
          email: values.email,
          password: values.password,
          phone: values.phone,
        };
        onHandleSignup(data);
      }}
      initialValues={{
        email: '',
        password: '',
        phone: '',
        fullname: '',
      }}>
      {({handleChange, handleBlur, values, handleSubmit}) => {
        return (
          <View style={styles.container}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 50,
              }}>
              <View style={styles.headContainer}>
                <TouchableOpacity onPress={onBack}>
                  <Image
                    source={icons.Back}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...FONTS.h2,
                    fontSize: 24,
                    marginTop: 30,
                  }}>
                  Create new account
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    marginTop: 5,
                    color: '#161429',
                  }}>
                  Set up your username and password. You can always change it
                  later.
                </Text>
              </View>
              <View></View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 15,
              }}>
              <View
                style={{
                  width: SIZES.widthDefault,
                  display: 'flex',
                  gap: 10,
                }}>
                <Input
                  onChangeText={handleChange('fullname')}
                  icon={icons.User}
                  placeholder="Fullname"
                  value={values?.fullname}
                />
                <Input
                  onChangeText={handleChange('email')}
                  icon={icons.Mail}
                  placeholder="Email"
                  value={values?.email}
                />
                <Input
                  onChangeText={handleChange('phone')}
                  icon={icons.Phone}
                  placeholder="Phone number"
                  keyboardType="numeric"
                  value={values?.phone}
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
                }}
                buttonText="Sign Up"
              />
              <View style={{display: 'flex', flexDirection: 'row', gap: 2}}>
                <Text style={{color: COLORS.black, fontSize: 15}}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => changeToSignInScreen()}>
                  <Text style={{color: '#7268DC', fontSize: 15}}>Sign in</Text>
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
    backgroundColor: 'white',
  },
  headContainer: {
    alignItems: 'flex-start',
    width: SIZES.widthDefault,
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
