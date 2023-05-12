import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import FollowApi from '../../../api/follow/request';
import IFollow from 'models/Follow';

export interface IFollowsState {
  follows: IFollow[];
  followers: IFollow[];
  followings: IFollow[];
}

const initialState: IFollowsState = {
  follows: [],
  followers: [],
  followings: [],
};

const slice = createSlice({
  name: 'follows',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRequestFollow.fulfilled, (state, action) => {
      state.follows = action.payload;
    });
    builder.addCase(getFollowers.fulfilled, (state, action) => {
      state.followers = action.payload;
    });
  },
});

const sendFollow = createAsyncThunk(
  'follow/sendFollow',
  async (id: number, {dispatch}) => {
    try {
      const res = await FollowApi.sendFollow(id);

      dispatch(getFollowers());
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

const deleteFollow = createAsyncThunk(
  'follow/deleteFollow',
  async (id: number, {dispatch}) => {
    try {
      const res = await FollowApi.removeFollow(id);
      dispatch(getRequestFollow());
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

const acceptFollow = createAsyncThunk(
  'follow/accept',
  async (id: number, {dispatch}) => {
    try {
      const res = await FollowApi.acceptFollow(id);
      dispatch(getRequestFollow());
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

const getRequestFollow = createAsyncThunk(
  'follow/getRequestFollow',
  async () => {
    try {
      const res = await FollowApi.getRequestFollow();
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

const getFollowers = createAsyncThunk('follow/getFollowers', async () => {
  try {
    const res = await FollowApi.getFollowers();
    console.log(res.data.data);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const FollowAction = {
  sendFollow,
  getRequestFollow,
  deleteFollow,
  getFollowers,
  acceptFollow,
};

export const followsSelector = (state: {follows: IFollowsState}) => {
  return state.follows;
};

export default slice.reducer;
