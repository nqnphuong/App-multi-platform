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
  getPostUserApi(id: number) {
    return axiosInstance.get(`/posts/user/${id}`);
  },
  findPostsByIdApi(id: string) {
    return axiosInstance.get(`/posts/${id}`);
  },
  getListCommentOfPostApi(id: string) {
    return axiosInstance.get(`/posts/listComment/${id}`);
  },
  commentPostApi(data: any) {
    const res = axiosInstance.post(`/posts/comment`, data);
    return res;
  },
  reactPostApi(id: string) {
    const res = axiosInstance.get(`/posts/like/${id}`);
    return res;
  },
};

export default PostApi;
