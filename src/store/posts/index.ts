import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import IPost from 'models/Posts';
import PostApi from '../../../api/post/request';

export interface IPostState {
  post: IPost;
  listCommentOfPost: any[];
  posts: IPost[];
  myPosts: IPost[];
}

const initialState: IPostState = {
  post: {
    caption: '',
    feel: false,
    dateCreate: '',
    postsCommentList: [],
    postsFeelList: [],
    postsId: 0,
    postsImageList: [
      {
        dateCreate: '',
        image: '',
        postsImageId: '',
      },
    ],
    postsUserList: [
      {
        dateCreate: '',
        image: '',
        name: '',
        postsUserId: 0,
        userId: 0,
      },
    ],
    totalFeel: 0,
    type: '',
  },
  listCommentOfPost: [],
  posts: [],
  myPosts: [],
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
    builder.addCase(getPostUserId.fulfilled, (state, {payload}) => {
      state.myPosts = payload;
    });
    builder.addCase(findPostsById.fulfilled, (state, {payload}) => {
      state.post = payload;
    });
    builder.addCase(getListCommentOfPost.fulfilled, (state, {payload}) => {
      state.listCommentOfPost = payload;
    });
    builder.addCase(commentPost.fulfilled, (state, {payload}) => {
      state.listCommentOfPost = [payload, ...state.listCommentOfPost];
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
    try {
      const res = await PostApi.createPost(payload);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);
const commentPost = createAsyncThunk(
  'post/commentPost',
  async (payload: FormData) => {
    try {
      console.log(payload)
      const res = await PostApi.commentPostApi(payload);
      console.log(res);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);
const getPostUserId = createAsyncThunk('post/getPostUserId', async () => {
  try {
    const res = await PostApi.getMyPosts();
    return res.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

const findPostsById = createAsyncThunk(
  'post/findPostsById',
  async (id: string) => {
    try {
      const res = await PostApi.findPostsByIdApi(id);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

const getListCommentOfPost = createAsyncThunk(
  'post/getListCommentOfPost',
  async (id: string) => {
    try {
      const res = await PostApi.getListCommentOfPostApi(id);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

export const PostAction = {
  getPosts,
  getMyPosts,
  getPostUserId,
  createPost,
  findPostsById,
  commentPost,
  getListCommentOfPost,
};

export const postSelector = (state: {posts: IPostState}) => {
  return state.posts;
};

export default slice.reducer;
