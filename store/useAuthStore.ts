import Toast from 'react-native-toast-message';
import {create, SetState} from 'zustand';
import AuthApi from '../api/auth/request';
import {ILoginRequest, IRegisterRequest} from '../api/auth/type';
import IUser from '../models/User';
import AxiosService from '../utils/AxiosService';
import AsyncStorage from '@react-native-community/async-storage';

interface IAuthState {
  register: (form: IRegisterRequest) => Promise<void>;
  login: (form: ILoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  loadAuth: () => Promise<void>;
  isAuthenticated: boolean;
  user: IUser;
  authLoading: boolean;
}

const useAuthStore = create<IAuthState>((set: SetState<IAuthState>) => ({
  async register(form: IRegisterRequest) {
    try {
      const res = await AuthApi.register(form);
      const data = res.data;
      AxiosService.setToken(data.data.token);
      await AsyncStorage.setItem('token', data.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      set({
        isAuthenticated: true,
        user: data.data,
        authLoading: false,
      });
      Toast.show({
        type: 'success',
        text1: data.message,
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
        text2: error.data,
      });
      set({
        authLoading: false,
      });
    }
  },
  async login(form: ILoginRequest) {
    try {
      const res = await AuthApi.login(form);
      const data = res.data;
      AxiosService.setToken(data.data.token);
      await AsyncStorage.setItem('token', data.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      set({
        isAuthenticated: true,
        user: data.data,
        authLoading: false,
      });
      Toast.show({
        type: 'success',
        text1: data.message,
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Incorrect username or password',
      });
      set({
        authLoading: false,
      });
    }
  },
  async loadAuth() {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    if (token) {
      set({
        isAuthenticated: true,
        user: JSON.parse(user!),
        authLoading: false,
      });
    } else {
      set({
        isAuthenticated: false,
        user: undefined,
        authLoading: false,
      });
    }
  },
  async logout() {
    try {
      AxiosService.removeToken();
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      set({
        isAuthenticated: false,
        user: undefined,
      });
      Toast.show({
        type: 'success',
        text1: 'Logout successfully',
      });
    } catch (error: any) {}
  },
  isAuthenticated: false,
  user: undefined as unknown as IUser,
  authLoading: true,
}));

export default useAuthStore;
