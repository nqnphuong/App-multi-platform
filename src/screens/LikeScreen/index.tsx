import FollowRequest from '@components/Follow/FollowRequest';
import {FollowAction} from '@store/follow';
import {UserAction} from '@store/user';
import {useAppDispatch} from 'hooks/store';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const LikeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FollowAction.getRequestFollow());
  }, []);

  useEffect(() => {
    dispatch(UserAction.findUserByName(''));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FollowRequest />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});

export default LikeScreen;
