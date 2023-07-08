import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoginPayload } from '~/models';
import { InputField } from '../form';

export interface LoginFormProps {
  onSubmit?: (payload: LoginPayload) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter username')
      .min(4, 'Username is required to have at least 4 characters'),
    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Password is required to have at least 6 characters'),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  async function handleLoginSubmit(payload: LoginPayload) {
    await onSubmit?.(payload);
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField name="username" label="Username" control={control} />
      <InputField
        type={showPassword ? 'text' : 'password'}
        name="password"
        label="Password"
        control={control}
        autoComplete="on"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((x) => !x)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        disabled={isSubmitting}
        startIcon={isSubmitting && <CircularProgress color="inherit" size="1em" sx={{ mr: 0.5 }} />}
        variant="contained"
        type="submit"
        fullWidth
        sx={{ mt: 4 }}
      >
        Login
      </Button>
    </Box>
  );
}
