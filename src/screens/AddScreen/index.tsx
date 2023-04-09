import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function AddScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>AddScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default AddScreen;
