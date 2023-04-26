import axiosInstance from '../axios';

const UserApi = {
  getUser(id: string) {
    return axiosInstance.get(`/user/${id}`);
  },
};

export default UserApi;
