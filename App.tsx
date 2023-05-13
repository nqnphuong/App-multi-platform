import Story from '@components/Story/Story';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from '@screens/AuthScreen';
import 'react-native-gesture-handler';

import ImageScreen from '@screens/ImageScreen';
import SplashScreen from '@screens/SplashScreen';
import UploadScreen from '@screens/UploadScreen';
import {persistor, store} from '@store/index';
import useAuthStore from '@store/useAuthStore';
import MainScreen from 'navigation/bottomTabs';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import messaging from '@react-native-firebase/messaging';
import ChatRoomScreen from '@screens/ChatRoomScreen';
import ChatContextProvider from '@screens/ChatScreen/context/ChatContext';
import UploadStoryScreen from '@screens/UploadStory';
import {UserAction} from '@store/user';
import {useAppDispatch} from 'hooks/store';
import useUser from 'hooks/useUser';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
  UploadStoryScreen: {
    name: 'UploadStoryScreen';
  };
  ChatRoomScreen: {
    name: 'ChatRoomScreen';
  };
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    const token = await messaging().getToken();
    console.log(token);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const {isAuthenticated, authLoading} = useAuthStore(state => state);

  const user = useUser();
  const dispatch = useAppDispatch();

  if (isAuthenticated) {
    dispatch(UserAction.getUserCurrent(user?.userId));
  }

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
              name="UploadStoryScreen"
              component={UploadStoryScreen}
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
      <Story />
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
