import React from 'react';
import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

export function HeaderMobile() {
  return (
    <Box display={{ xs: 'block', md: 'none' }} p={1} textAlign="right">
      <IconButton>
        <MenuIcon />
      </IconButton>
    </Box>
  );
}
