import axiosInstance from '../axios';

const FollowApi = {
  sendFollow(id: number) {
    const res = axiosInstance.get(`/follow/send/${id}`);
    return res;
  },
  getRequestFollow() {
    const res = axiosInstance.get(`/follow/request`);
    return res;
  },
  getFollowers() {
    const res = axiosInstance.get(`/follow/follower`);
    return res;
  },
  acceptFollow(id: number) {
    const res = axiosInstance.get(`/follow/accept/${id}`);
    return res;
  },
  removeFollow(id: number) {
    const res = axiosInstance.get(`/follow/delete/${id}`);
    return res;
  },
};

export default FollowApi;
