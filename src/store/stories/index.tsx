import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {IStoryByUser} from 'models/Story';
import StoryApi from '../../../api/story/request';
import images from '@constants/images';

export interface IStoriesState {
  stories: IStoryByUser[];
  isStoryViewVisible: boolean;
  pressedIndex: number;
}

const initialState: IStoriesState = {
  stories: [],
  isStoryViewVisible: false,
  pressedIndex: 0,
};

const slice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setIsStoryViewShow(state, action) {
      state.isStoryViewVisible = action.payload;
    },
    setPressedIndex(state, action) {
      state.pressedIndex = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getStories.fulfilled, (state, action) => {
      state.stories = action.payload;
    });
  },
});

const getStories = createAsyncThunk('stories/getStories', async () => {
  try {
    const res = await StoryApi.getStories();
    const data = res.data.data.filter((d: any) => {
      return d.storyInfoList.length > 0;
    });

    try {
      const transform_list = data.map((d: any) => ({
        id: d.userId,
        username: d.name,
        title: d.name,
        profile:
          d.image ||
          'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
        stories: d.storyInfoList.map((s: any) => ({
          id: s.storyId,
          url: s.link,
          type: s.type,
          // duration: 15,
          isReadMore: true,
          storyId: d.userId,
          isSeen: false,
        })),
      }));
      return transform_list;
    } catch (error) {
      console.log(error);
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

const createStories = createAsyncThunk(
  'stories/createStories',
  async (payload: FormData) => {
    try {
      const res = await StoryApi.createStories(payload);
      console.log(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

const commentStory = createAsyncThunk(
  'stories/commentStory',
  async (payload: {comment: string; userId: string; tusId: string}) => {
    try {
      const res = await StoryApi.commentStoryApi(payload);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

export const StoryAction = {
  ...slice.actions,
  getStories,
  createStories,
  commentStory,
};

export const storiesSelector = (state: {stories: IStoriesState}) => {
  return state.stories;
};

export default slice.reducer;
