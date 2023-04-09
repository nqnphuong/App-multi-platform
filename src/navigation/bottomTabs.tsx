/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import icons from '../constants/icons';
import AddScreen from '../screens/AddScreen';
import HomeScreen from '../screens/HomeScreen';
import LikeScreen from '../screens/LikeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import LinearGradient from 'react-native-linear-gradient';

const MainScreen: React.FC = () => {
  const Tab = createBottomTabNavigator();

  const renderIcons = (focused: boolean, icon: any) => {
    return (
      <View style={styles.tabBarIconContainer}>
        {focused ? (
          <MaskedView
            style={styles.maskedView}
            maskElement={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={icon} style={styles.iconStyles} />
              </View>
            }>
            <LinearGradient
              colors={['#6B65DE', '#E89DE7']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{flex: 1}}
            />
          </MaskedView>
        ) : (
          <Image source={icon} style={styles.iconStyles} />
        )}
        {focused && (
          <View
            style={{
              position: 'absolute',
              bottom: 5,
              height: 3,
              width: '100%',
            }}>
            <LinearGradient
              colors={['#6B65DE', '#E89DE7']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{flex: 1}}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {height: 60},
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => renderIcons(focused, icons.Home),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => renderIcons(focused, icons.Union),
        }}
      />
      <Tab.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          tabBarIcon: ({focused}) => renderIcons(focused, icons.Add),
        }}
      />
      <Tab.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={{
          tabBarIcon: ({focused}) => renderIcons(focused, icons.Heart),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => renderIcons(focused, icons.Home),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  tabBarIconContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
  },
  maskedView: {
    flexDirection: 'row',
    height: 20,
  },
  iconStyles: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#161429',
  },
});

export default MainScreen;
