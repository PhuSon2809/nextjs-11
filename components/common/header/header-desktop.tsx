import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '~/hooks';
import { ROUTE_LIST } from './routes';

export function HeaderDesktop() {
  const router = useRouter();
  const { profile, logout } = useAuth();
  const isLoggedIn = Boolean(profile?.username);

  const routeList = ROUTE_LIST.filter(
    (route) => !route.requireLogin || isLoggedIn
  );

  // const [routeList, setRouteList] = useState(() =>
  //   ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn)
  // );

  // Server render menu not require login (A)
  // Client - first render menu not require login (B)
  // Client - useEffect render second time menu require login

  // useEffect(() => {
  //   // after the first render
  //   // calc routeList and setRouteList
  //   setRouteList(
  //     ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn)
  //   );
  // }, [isLoggedIn]);

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {routeList.map((route) => {
            return (
              <Link key={route.path} href={route.path} passHref>
                <Typography
                  ml={2}
                  fontWeight="bold"
                  sx={{
                    '&:hover': {
                      color: 'primary.main',
                    },
                    color:
                      route.path === router.pathname ? 'primary.main' : 'black',
                  }}
                >
                  {route.label}
                </Typography>
              </Link>
            );
          })}

          {!isLoggedIn ? (
            <Link href="/login" passHref>
              <Typography
                ml={2}
                fontWeight="bold"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Login
              </Typography>
            </Link>
          ) : (
            <MuiLink
              sx={{
                ml: 2,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={logout}
            >
              Logout
            </MuiLink>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
