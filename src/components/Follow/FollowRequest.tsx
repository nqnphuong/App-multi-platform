import FollowItem from '@components/FollowItem';
import {followsSelector} from '@store/follow';

import {useAppSelector} from 'hooks/store';
import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import tw from 'twrnc';

interface IFollowRequestProps {}

const FollowRequest: React.FunctionComponent<IFollowRequestProps> = props => {
  const {follows} = useAppSelector(followsSelector);

  return (
    <View style={tw`pl-5 pr-5 pb-5`}>
      <Text style={tw`text-base font-light tracking-[.2] mt-3 mb-2`}>
        List follow
      </Text>
      <FlatList
        data={follows}
        renderItem={({item}: any) => <FollowItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FollowRequest;
