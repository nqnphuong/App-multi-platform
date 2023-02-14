import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function ProfileScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default ProfileScreen;
