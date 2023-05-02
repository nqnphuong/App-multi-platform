import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageScreen from '@screens/ImageScreen';
import SplashScreen from '@screens/SplashScreen';
import UploadScreen from '@screens/UploadScreen';
import {persistor, store} from '@store/index';
import useAuthStore from '@store/useAuthStore';
import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MainScreen from './src/navigation/bottomTabs';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/lib/integration/react';
import AuthScreen from '@screens/AuthScreen';
import GettingCall from '@components/GettingCall';
import VideoScreen from '@screens/VideoScreen';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';
import {getStream} from 'utils/WebRTC';
import {Provider} from 'react-redux';

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
    postsId: number;
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
