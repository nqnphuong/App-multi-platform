import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
          }}>
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  tabBar: {
    position: 'absolute',
  },
});

export default App;
