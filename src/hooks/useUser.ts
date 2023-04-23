import useAuthStore from '@store/useAuthStore';

const useUser = () => {
  const data = useAuthStore();
  return data.user;
};

export default useUser;
