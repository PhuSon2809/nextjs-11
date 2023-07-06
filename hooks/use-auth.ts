import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';
import { authApi } from '../api-client';
import { LoginPayload, UserProfile } from '~/models';
import { StorageKeys } from '~/constants';

function getUserInfo(): UserProfile | null {
  try {
    return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '');
  } catch (error) {
    // console.log('Failed to parse user info from local storage', error);
    return null;
  }
}
export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000, // 1hr
    revalidateOnFocus: false,
    ...options,
    fallbackData: getUserInfo(),
    onSuccess(data) {
      // Save user infor to local storage
      localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data));
    },
    onError(err) {
      // failed to get profile --> logout
      console.log(err); // send error log to server if any
      logout();
    },
  });

  const firstLoading = profile === undefined && error === undefined;

  async function login(payload: LoginPayload) {
    await authApi.login(payload);

    await mutate();
  }

  async function logout() {
    await authApi.logout();
    mutate(null, false);
    localStorage.removeItem(StorageKeys.USER_INFO);
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
  };
}
