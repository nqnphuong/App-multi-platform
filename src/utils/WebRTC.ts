import {mediaDevices} from 'react-native-webrtc';

const getStream = async () => {
  let mediaConstraints = {
    audio: true,
    video: {
      frameRate: 30,
      facingMode: 'user',
    },
  };

  let localMediaStream;
  let isVoiceOnly = false;

  try {
    const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

    if (isVoiceOnly) {
      let videoTrack = await mediaStream.getVideoTracks()[0];
      videoTrack.enabled = false;
    }

    localMediaStream = mediaStream;
  } catch (err) {
    console.log(err);
  }
  if (typeof localMediaStream != 'boolean') return localMediaStream;
  return null;
};

export {getStream};
