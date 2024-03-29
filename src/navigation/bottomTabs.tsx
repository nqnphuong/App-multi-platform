/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LikeScreen from '@screens/LikeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import Avatar from '@components/Avatar';
import UploadScreen from '@screens/UploadScreen';
import HomeStack from './homeStack';
import SearchStack from './searchStack';
import icons from '@constants/icons';
import {useSelector} from 'react-redux';
import {userSelector} from '@store/user';

const MainScreen: React.FC = () => {
  const Tab = createBottomTabNavigator();

  const {userCurrent} = useSelector(userSelector);

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
        tabBarStyle: {height: 50},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => renderIcons(focused, icons.Home),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused}) => renderIcons(focused, icons.Union),
        }}
      />
      <Tab.Screen
        name="AddScreen"
        component={UploadScreen}
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
          tabBarIcon: ({focused}) => (
            <Avatar
              styles={{
                width: 25,
                height: 25,
              }}
              stylesContainer={
                focused
                  ? {
                      width: 28,
                      height: 28,
                    }
                  : {
                      width: 25,
                      height: 25,
                    }
              }
              uri={
                userCurrent.avatar
                  ? userCurrent.avatar
                  : 'https://secure.gravatar.com/avatar/06f59e296827fce579a51549f01af8bd?s=300&d=mm&r=g'
              }
            />
          ),
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
