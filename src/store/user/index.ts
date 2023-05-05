import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import IUser from 'models/User';
import UserApi from '../../../api/user/request';

export interface IUserState {
  user: IUser;
  userCurrent: IUser;
  listResult: any[];
  listHistorySearch: any[];
  findUserLoading: boolean;
}

const initialState: IUserState = {
  user: {
    userId: '',
    firstName: '',
    lastName: '',
    avatar: '',
    background: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    followStatus: true,
    numberOfPosts: 0,
    numberOfFollower: 0,
    numberOfFollowing: 0,
    token: '',
    dateCreate: '',
    follow: 0,
    userSender: '',
    userRecipient: '',
    postsList: '',
    songList: '',
    listSongInfoList: '',
    postsUserList: '',
  },
  userCurrent: {
    userId: '',
    firstName: '',
    lastName: '',
    avatar: '',
    background: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    followStatus: true,
    numberOfPosts: 0,
    numberOfFollower: 0,
    numberOfFollowing: 0,
    token: '',
    dateCreate: '',
    follow: 0,
    userSender: '',
    userRecipient: '',
    postsList: '',
    songList: '',
    listSongInfoList: '',
    postsUserList: '',
  },
  listResult: [],
  listHistorySearch: [],
  findUserLoading: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, {payload}) => {
      state.user = payload.data;
    });
    builder.addCase(getUserCurrent.fulfilled, (state, {payload}) => {
      state.userCurrent = payload.data;
    });
    builder.addCase(findUserByName.pending, state => {
      state.findUserLoading = true;
    });
    builder.addCase(findUserByName.fulfilled, (state, {payload}) => {
      state.listResult = payload.data;
      state.findUserLoading = false;
    });
    builder.addCase(findUserByName.rejected, state => {
      state.findUserLoading = false;
    });
  },
});

const getUserCurrent = createAsyncThunk(
  'post/getUserCurrent',
  async (id: string) => {
    try {
      const res = await UserApi.getUser(id);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

const getUser = createAsyncThunk('post/getUser', async (id: string) => {
  try {
    const res = await UserApi.getUser(id);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

const findUserByName = createAsyncThunk(
  'post/findUserByName',
  async (input: string) => {
    try {
      const res = await UserApi.findUserByNameApi(input);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

const updateAvatar = createAsyncThunk(
  'post/updateAvatar',
  async (data: FormData) => {
    try {
      const res = await UserApi.updateAvatarApi(data);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

export const UserAction = {
  getUser,
  getUserCurrent,
  updateAvatar,
  findUserByName,
};

export const userSelector = (state: {user: IUserState}) => {
  return state.user;
};

export default slice.reducer;
