import axiosInstance from '../../api';

const AxiosService = {
  setToken(token: string | null) {
    if (token) {
      return (axiosInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + token);
    }
    return (axiosInstance.defaults.headers.common['Authorization'] = false);
  },
  removeToken() {
    return (axiosInstance.defaults.headers.common['Authorization'] = false);
  },
};

export default AxiosService;
