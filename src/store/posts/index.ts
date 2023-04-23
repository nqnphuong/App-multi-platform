import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import IPost from 'models/Posts';
import PostApi from '../../../api/post/request';

export interface IPostState {
  posts: IPost[];
}

const initialState: IPostState = {
  posts: [],
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, {payload}) => {
      state.posts = payload;
    });
    builder.addCase(createPost.fulfilled, (state, {payload}) => {
      state.posts = [payload, ...state.posts];
    });
  },
});

const getPosts = createAsyncThunk('post/getPosts', async () => {
  try {
    const myPostRes = await PostApi.getMyPosts();
    const postRes = await PostApi.getPosts();
    return [...myPostRes.data.data, ...postRes.data.data];
  } catch (error: any) {
    throw new Error(error);
  }
});

const getMyPosts = createAsyncThunk('post/getMyPosts', async () => {
  try {
    const myPostRes = await PostApi.getMyPosts();
    return [...myPostRes.data.data];
  } catch (error: any) {
    throw new Error(error);
  }
});

const createPost = createAsyncThunk(
  'post/createPosts',
  async (payload: FormData) => {
    // return console.log(JSON.stringify(payload));
    try {
      // console.log(axiosInstance.defaults.headers.common);
      const res = await PostApi.createPost(payload);

      return res.data.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  },
);

export const PostAction = {
  getPosts,
  getMyPosts,
  createPost,
};

export const postSelector = (state: {posts: IPostState}) => {
  return state.posts;
};

export default slice.reducer;
