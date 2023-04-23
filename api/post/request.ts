import axiosInstance from '../axios';

const PostApi = {
  getPosts() {
    return axiosInstance.get('/posts/show');
  },
  getMyPosts() {
    return axiosInstance.get('/posts/myPosts');
  },
  createPost(data: FormData) {
    return axiosInstance.post('/posts/new', data, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
  },
};

export default PostApi;
