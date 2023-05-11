import GettingCall from '@components/GettingCall';
import Story from '@components/Story/Story';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from '@screens/AuthScreen';

import ImageScreen from '@screens/ImageScreen';
import SplashScreen from '@screens/SplashScreen';
import UploadScreen from '@screens/UploadScreen';
import VideoScreen from '@screens/VideoScreen';
import {persistor, store} from '@store/index';
import useAuthStore from '@store/useAuthStore';
import MainScreen from 'navigation/bottomTabs';
import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

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
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  const {isAuthenticated, authLoading} = useAuthStore(state => state);

  const [localStream, setlocalStream] = useState<MediaStream | null>();
  const [remoteStream, setremoteStream] = useState<MediaStream | null>();
  const [gettingCall, setgettingCall] = useState<boolean>(false);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef<boolean>(false);

  const setupWebRTC = async () => {};
  const create = async () => {};
  const join = async () => {};
  const hangup = async () => {};

  if (authLoading) {
    return <SplashScreen />;
  }

  if (localStream && remoteStream) {
    return (
      <VideoScreen
        hangUp={hangup}
        localStreem={localStream}
        remoteStream={remoteStream}
      />
    );
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
      <Story />
      {gettingCall && <GettingCall hangup={hangup} join={join} />}
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
