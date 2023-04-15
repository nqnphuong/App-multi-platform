import {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {icons, images} from 'constants';
import useAuthStore from '@store/useAuthStore';

const SplashScreen: React.FC = () => {
  const {loadAuth} = useAuthStore(state => state);

  useEffect(() => {
    loadAuth();
  }, []);
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.background}
          source={images.SplashImage}>
          <Image
            style={styles.image}
            source={icons.Logo}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 134,
    height: 134,
  },
});

export default SplashScreen;
