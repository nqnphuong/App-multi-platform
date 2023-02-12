import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>HomeScreen</Text>
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

export default HomeScreen;
