import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  Keyboard,
  Image,
} from 'react-native';
import {useEffect, useState} from 'react';
import tw from 'twrnc';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchItem from '@components/SearchItem';
import OnSearchingSkeletion from '@components/Skeleton/OnSearchingSkeletion';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import {UserAction, userSelector} from '@store/user';
import FindingAnimation from '@components/LottieAnimation/FindAnimation';
import icons from '@constants/icons';
import {SIZES} from '@constants/theme';

const SearchScreen: React.FC = () => {
  const {listResult, listHistorySearch, findUserLoading} =
    useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    dispatch(UserAction.findUserByName(input));
  }, [input]);

  return (
    <SafeAreaView style={[tw`bg-white w-full h-full`]}>
      <View style={tw` px-2 flex flex-col items-center`}>
        <View
          style={tw`bg-gray-100 rounded-md flex gap-[2] flex-row items-center px-2 m-1`}>
          <Image
            source={icons.Union}
            style={{
              tintColor: '#6B65DE',
              width: 17,
              height: 17,
            }}
          />
          <TextInput
            value={input}
            placeholder="Search..."
            style={tw`flex-1`}
            onChangeText={val => setInput(val)}
          />
          <TouchableOpacity
            onPress={() => {
              setInput('');
              Keyboard.dismiss();
            }}>
            <Text style={tw`text-sm font-light`}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`w-full h-full px-2`}>
          {findUserLoading ? (
            <OnSearchingSkeletion />
          ) : listResult?.length ? (
            <View
              style={{
                height: SIZES.height - 60,
              }}>
              <Text style={tw`text-base font-light tracking-[.2] mt-3 mb-2`}>
                Results
              </Text>
              <FlatList
                data={listResult}
                renderItem={item => <SearchItem item={item} times={false} />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : input ? (
            <View style={tw`px-3 py-5 border-b border-gray-200 `}>
              <Text style={tw`font-light tracking-[.2]`}>
                No result were found for '{input}'
              </Text>
            </View>
          ) : listHistorySearch.length ? (
            <View>
              <Text style={tw`text-base font-light tracking-[.2] mt-3 mb-2`}>
                History
              </Text>
              <FlatList
                data={listHistorySearch}
                renderItem={item => <SearchItem item={item} times={true} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <FindingAnimation />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
