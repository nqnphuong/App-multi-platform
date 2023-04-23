import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageScreen from '@screens/ImageScreen';
import SplashScreen from '@screens/SplashScreen';
import UploadScreen from '@screens/UploadScreen';
import {persistor, store} from '@store/index';
import useAuthStore from '@store/useAuthStore';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import MainScreen from './src/navigation/bottomTabs';
import AuthScreen from '@screens/AuthScreen';

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

const AppProvider = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
