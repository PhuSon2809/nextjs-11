import React from 'react';
import { authApi } from '../api-client';
import { useAuth } from '~/hooks';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const { profile, login, logout } = useAuth({ revalidateOnMount: false });

  async function handleLoginClick() {
    try {
      await login();

      console.log('Redirect to dashboard');

      router.push('/about');
    } catch (error) {
      console.log('Fail to login', error);
    }
  }

  async function handlegetProfileClick() {
    try {
      await authApi.getProfile();
    } catch (error) {
      console.log('Fail to get profile', error);
    }
  }

  async function handleLogoutClick() {
    try {
      await logout();

      console.log('Redirect to login page');
    } catch (error) {
      console.log('Fail to logout', error);
    }
  }

  return (
    <div>
      <h1>Login page</h1>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handlegetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={() => router.push('/about')}>go to about</button>
    </div>
  );
}
