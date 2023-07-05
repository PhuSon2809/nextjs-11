import React from 'react';
import { Box, Container, Stack, Link as MuiLink } from '@mui/material';
// import { Box } from '@mui/system';
import Link from 'next/link';
import { ROUTE_LIST } from './routes';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export function HeaderDesktop() {
  const router = useRouter();

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => {
            return (
              <Link
                key={route.path}
                href={route.path}
                className={clsx({ active: route.path === router.pathname })}
                style={{ marginLeft: 16, fontWeight: 'bold' }}
              >
                {route.label}
              </Link>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
