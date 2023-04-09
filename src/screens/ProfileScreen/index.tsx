import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {CustomButton} from '../../components';
import {icons} from '../../constants';
import {COLORS} from '../../constants/theme';
import {useAuthStore} from '../../store';

function ProfileScreen(): JSX.Element {
  const {logout} = useAuthStore(state => state);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 20,
        }}>
        <CustomButton
          onPress={logout}
          iconColor={COLORS.white}
          colors={['#6B65DE', '#E89DE7']}
          buttonContainerStyles={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: 10,
          }}
          buttonText="Logout"
        />
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
