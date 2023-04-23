import React from 'react';
import {MediaStream, RTCView} from 'react-native-webrtc';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface Props {
  hangUp: () => void;
  localStreem: MediaStream;
  remoteStream: MediaStream;
}

const VideoScreen: React.FC<Props> = ({localStreem, remoteStream, hangUp}) => {
  if (localStreem && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={localStreem.toURL()}
          objectFit={'cover'}
          style={styles.video}
        />
      </View>
    );
  }
  if (localStreem && remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={localStreem.toURL()}
          objectFit={'cover'}
          style={styles.video}
        />
        <RTCView
          streamURL={remoteStream.toURL()}
          objectFit={'cover'}
          style={styles.video}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>VideoScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoLocal: {
    position: 'absolute',
    width: 140,
    height: 140,
  },
});

export default VideoScreen;
