/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './navigation/bottomTabs';
import AuthScreen from './screens/AuthScreen';
import Toast from 'react-native-toast-message';
import SplashScreen from './screens/SplashScreen';
import {useAuthStore} from './store';

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
