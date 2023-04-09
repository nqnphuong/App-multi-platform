import axiosInstance from '../axios';
import {ILoginRequest, IRegisterRequest} from './type';

const AuthApi = {
  register(data: IRegisterRequest) {
    return axiosInstance.post('/user/register', data);
  },
  login(data: ILoginRequest) {
    return axiosInstance.post('/user/login', data);
  },
  logout() {},
};

export default AuthApi;
