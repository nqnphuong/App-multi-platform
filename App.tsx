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
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import ChatRoomScreen from '@screens/ChatRoomScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import ChatContextProvider from '@screens/ChatScreen/context/ChatContext';
import UploadStoryScreen from '@screens/UploadStory';
import {UserAction} from '@store/user';
import {useAppDispatch} from 'hooks/store';
import useUser from 'hooks/useUser';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

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
  ZegoUIKitPrebuiltCallWaitingScreen: {
    name: 'ZegoUIKitPrebuiltCallWaitingScreen';
  };
  ZegoUIKitPrebuiltCallInCallScreen: {
    name: 'ZegoUIKitPrebuiltCallInCallScreen';
  };
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  const {isAuthenticated, authLoading} = useAuthStore(state => state);

  const user = useUser();

  const dispatch = useAppDispatch();

  if (isAuthenticated && user.userId) {
    dispatch(UserAction.getUserCurrent(user.userId));
  }

  const connectCallServer = async (userID: string, userName: string) => {
    if (isAuthenticated) {
      return ZegoUIKitPrebuiltCallService.init(
        '534618824',
        '13a2084eb69957898fee1dc2bde024e45d6749168993e5e262215faadacd3bbb',
        userID,
        userName,
        [ZIM, ZPNs],
        {
          ringtoneConfig: {
            incomingCallFileName: 'zego_incoming.mp3',
            outgoingCallFileName: 'zego_outgoing.mp3',
          },
          notifyWhenAppRunningInBackgroundOrQuit: true,
          isIOSSandboxEnvironment: true,
          androidNotificationConfig: {
            channelID: 'ZegoUIKit',
            channelName: 'ZegoUIKit',
          },
        },
      );
    }
  };

  console.log(user);

  connectCallServer(`duongle10`, 'duongle10');
  useEffect(() => {
    if (isAuthenticated) {
    }
  }, []);

  if (authLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <ChatContextProvider>
        <ZegoCallInvitationDialog />
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
              options={{headerShown: false}}
              name="ZegoUIKitPrebuiltCallWaitingScreen"
              component={ZegoUIKitPrebuiltCallWaitingScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ZegoUIKitPrebuiltCallInCallScreen"
              component={ZegoUIKitPrebuiltCallInCallScreen}
            />
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
