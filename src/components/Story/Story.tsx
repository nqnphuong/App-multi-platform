import icons from '@constants/icons';
import {COLORS, FONTS} from '@constants/theme';
import {StoryAction, storiesSelector} from '@store/stories';
import {useAppDispatch, useAppSelector} from 'hooks/store';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {MultiStoryContainer} from 'react-native-story-view';
import {dateStringToFromNow} from 'utils/dateUtils';

const Footer = ({userStories, story, progressIndex}: any) => <View></View>;

const Header = ({userStories, onClose, position}: any) => {
  const dateString = userStories.stories[position].dateCreate;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
      }}>
      <Image
        source={{
          uri: userStories?.profile,
        }}
        style={{
          width: 34,
          height: 34,
          borderRadius: 16,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: -2,
        }}>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.white,
            marginLeft: 15,
          }}>
          {userStories?.username}
        </Text>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.white,
            marginLeft: 15,
          }}>
          {`${dateStringToFromNow(dateString)}`}
        </Text>
        <Image
          source={icons.Earth}
          style={{
            width: 10,
            height: 10,
            tintColor: COLORS.white,
            marginLeft: 5,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: 25,
        }}>
        <TouchableOpacity>
          <Image
            source={icons.More}
            style={{
              tintColor: COLORS.white,
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Image
            source={icons.CloseX}
            style={{
              tintColor: COLORS.white,
              width: 15,
              height: 15,
              marginLeft: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Story = () => {
  const {isStoryViewVisible, pressedIndex, stories} =
    useAppSelector(storiesSelector);
  // const storyIndex = useRef<number | undefined>();
  const [position, setPosition] = useState(0);

  const {setIsStoryViewShow} = StoryAction;
  const dispatch = useAppDispatch();
  return (
    <>
      {isStoryViewVisible && (
        <MultiStoryContainer
          onUserStoryIndexChange={i => {
            // storyIndex.current = i;
          }}
          onChangePosition={i => {
            setPosition(i);
          }}
          visible={isStoryViewVisible}
          onComplete={() => dispatch(setIsStoryViewShow(false))}
          stories={stories}
          containerStyle={{
            marginLeft: 10,
          }}
          imageStyle={{
            resizeMode: 'contain',
            height: '100%',
            width: '100%',
          }}
          videoProps={
            {
              resizeMode: 'cover',
            } as any
          }
          barStyle={{
            barActiveColor: COLORS.white,
            barInActiveColor: '#aaa8a2',
            barHeight: 2,
          }}
          renderHeaderComponent={props => (
            <Header
              {...props}
              position={position}
              // storyIndex={storyIndex.current}
              onClose={() => dispatch(setIsStoryViewShow(false))}
            />
          )}
          renderFooterComponent={props => <Footer {...props} />}
          userStoryIndex={pressedIndex}
          viewedStories={[]}
        />
      )}
    </>
  );
};

export default Story;
