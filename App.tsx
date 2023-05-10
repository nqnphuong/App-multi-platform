import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageScreen from '@screens/ImageScreen';
import SplashScreen from '@screens/SplashScreen';
import UploadScreen from '@screens/UploadScreen';
import {persistor, store} from '@store/index';
import useAuthStore from '@store/useAuthStore';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainScreen from './src/navigation/bottomTabs';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/lib/integration/react';
import AuthScreen from '@screens/AuthScreen';
import {Provider} from 'react-redux';
import ChatRoomScreen from '@screens/ChatRoomScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ChatContextProvider from '@screens/ChatScreen/context/ChatContext';

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
    postsId: string;
  };
  VideoScreen: {
    name: 'VideoScreen';
  };
  ChatRoomScreen: {
    name: 'ChatRoomScreen';
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
      <ChatContextProvider>
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
            <Stack.Screen
              name="ChatRoomScreen"
              component={ChatRoomScreen}
              options={{
                gestureDirection: 'vertical',
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </ChatContextProvider>
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
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default AppProvider;
