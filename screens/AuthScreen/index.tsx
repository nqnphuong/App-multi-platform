import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from './SignInScreen';
import WelcomeAuthScreen from './WelcomeAuthScreen';

function AuthScreen(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeAuthScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}
export default AuthScreen;
