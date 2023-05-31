import FollowItem from '@components/FollowItem';
import {followsSelector} from '@store/follow';
import {userSelector} from '@store/user';

import {useAppSelector} from 'hooks/store';
import useUser from 'hooks/useUser';
import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import tw from 'twrnc';
import _ from 'lodash';

interface IFollowRequestProps {}

const FollowRequest: React.FunctionComponent<IFollowRequestProps> = props => {
  const {follows, followers} = useAppSelector(followsSelector);
  const [deletes, setDeletes] = React.useState([]);
  const {listResult, listHistorySearch, findUserLoading} =
    useAppSelector(userSelector);

  const currentUser = useUser();

  const list = _.difference(
    listResult,
    [...followers, currentUser, ...deletes],
    'userId',
  );

  return (
    <View style={tw`pl-5 pr-5 pb-5`}>
      <Text style={tw`text-base font-light tracking-[.2] mt-3 mb-2`}>
        Suggest follow for you
      </Text>
      <FlatList
        data={list}
        renderItem={({item}: any) => (
          <FollowItem deletes={deletes} setDeletes={setDeletes} item={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FollowRequest;
