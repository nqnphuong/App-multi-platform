import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/navigation/bottomTabs';
import Toast from 'react-native-toast-message';
import AuthScreen from '@screens/AuthScreen';
import SplashScreen from '@screens/SplashScreen';
import useAuthStore from '@store/useAuthStore';
import UploadScreen from '@screens/UploadScreen';
import ImageScreen from '@screens/ImageScreen';

export type RootStackParams = {
  Main: {
    name: 'Main';
  };
  AuthScreen: {
    name: 'AuthScreen';
  };
  UploadScreen: {
    name: 'UploadScreen';
  };
  ImageScreen: {
    name: 'ImageScreen';
  };
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  const {isAuthenticated, authLoading} = useAuthStore(state => state);

  if (authLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!isAuthenticated ? (
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
          ) : (
            <>
              <Stack.Screen name="Main" component={MainScreen} />
            </>
          )}
          <Stack.Screen
            name="UploadScreen"
            component={UploadScreen}
            options={{
              gestureDirection: 'vertical',
            }}
          />
          <Stack.Screen
            name="ImageScreen"
            component={ImageScreen}
            options={{
              gestureDirection: 'vertical',
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
      <Toast />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
