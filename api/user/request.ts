import axiosInstance from '../axios';

const UserApi = {
  getUser(id: string) {
    return axiosInstance.get(`/user/${id}`);
  },
  updateAvatarApi(data: FormData) {
    return axiosInstance.post(`/user/updateAvatar`, data, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
  },
  findUserByNameApi(name: string) {
    return axiosInstance.get(`/user/find/name=${name}`);
  },
};

export default UserApi;
