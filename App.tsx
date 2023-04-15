import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/navigation/bottomTabs';
import AuthScreen from './src/screens/AuthScreen';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen';
import useAuthStore from './src/store/useAuthStore';

const App: React.FC = () => {
  const Stack = createNativeStackNavigator();

  const {isAuthenticated, authLoading} = useAuthStore(state => state);

  if (authLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          // initialRouteName="AuthScreen"
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
