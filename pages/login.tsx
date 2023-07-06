import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { LoginForm } from '~/components/auth';
import { useAuth } from '~/hooks';
import { LoginPayload } from '~/models';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth({ revalidateOnMount: false });

  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      await login(payload);
      router.push('/');
    } catch (error) {
      console.log('Fail to login', error);
    }
  }

  return (
    <Stack
      minHeight="100vh"
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        elevation={4}
        sx={{ p: 4, maxWidth: '480px', textAlign: 'center' }}
      >
        <Typography component="h1" variant="h4" fontWeight="bold" mb={2}>
          Learn NextJS - Login
        </Typography>

        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Stack>
  );
}
