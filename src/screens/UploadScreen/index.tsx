import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const UploadScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>UploadScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default UploadScreen;
