import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import IUser from 'models/User';
import UserApi from '../../../api/user/request';

export interface IUserState {
  user: IUser;
}

const initialState: IUserState = {
  user: {
    userId: ' ',
    firstName: ' ',
    lastName: ' ',
    avatar: ' ',
    background: ' ',
    email: ' ',
    password: ' ',
    name: ' ',
    phone: ' ',
    followStatus: true,
    numberOfPosts: 0,
    numberOfFollower: 0,
    numberOfFollowing: 0,
    token: ' ',
    dateCreate: ' ',
    follow: 0,
    userSender: ' ',
    userRecipient: ' ',
    postsList: ' ',
    songList: ' ',
    listSongInfoList: ' ',
    postsUserList: ' ',
  },
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, {payload}) => {
      state.user = payload.data;
    });
  },
});

const getUser = createAsyncThunk('post/getUser', async (id: string) => {
  try {
    const res = await UserApi.getUser(id);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const UserAction = {
  getUser,
};

export const userSelector = (state: {user: IUserState}) => {
  return state.user;
};

export default slice.reducer;
