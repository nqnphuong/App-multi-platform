import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import DetailUserScreen from '@screens/DetailUserScreen';
import SearchScreen from '@screens/SearchScreen';

export type SearchStackParams = {
  SearchScreen: {
    name: 'SearchScreen';
  };
  DetailUserScreen: {
    name: 'DetailUserScreen';
    userId: any;
  };
};

const SearchStack: React.FC = () => {
  const Stack = createNativeStackNavigator<SearchStackParams>();

  return (
    <Stack.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="DetailUserScreen"
        component={DetailUserScreen}
        options={{
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default SearchStack;
