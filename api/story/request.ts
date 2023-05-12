import axiosInstance from '../axios';

const StoryApi = {
  getStories() {
    return axiosInstance.get('/story/show');
  },
  createStories(data: FormData) {
    return axiosInstance.post('/story/new', data, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
  },
  commentStoryApi(data: any) {
    const res = axiosInstance.post(`/story/comment`, data);
    return res;
  },
  reactStoryApi(id: string) {
    const res = axiosInstance.get(`/story/like/${id}`);
    return res;
  },
};

export default StoryApi;
