import Link from 'next/link';
import * as React from 'react';
import { LayoutProps } from '~/models';
import { Auth } from '../common';
import { useAuth } from '~/hooks/use-auth';
import { useRouter } from 'next/router';

export function AdminLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { profile, logout } = useAuth({ revalidateOnMount: false });

  async function handleLogoutClick() {
    try {
      await logout();

      console.log('Redirect to login page');

      router.push('/login');
    } catch (error) {
      console.log('Fail to logout', error);
    }
  }

  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <div>
        <button onClick={handleLogoutClick}>logout</button>
      </div>

      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      <div>{children}</div>
    </Auth>
  );
}
