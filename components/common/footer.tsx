import React from 'react';
import { Box, Stack, Icon, Typography } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: 'https://google.com' },
    { icon: Instagram, href: 'https://google.com' },
    { icon: Twitter, href: 'https://google.com' },
    { icon: LinkedIn, href: 'https://google.com' },
  ];

  return (
    <Box component="footer" py={2} textAlign="center">
      <Stack direction="row" justifyContent="center">
        {socialLinks.map((item, index) => (
          <Box
            key={index}
            component="a"
            p={2}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon component={item.icon} sx={{ fontSize: 48 }} />
          </Box>
        ))}
      </Stack>

      <Typography>
        Copyright @{new Date().getFullYear()} All rights reserved
      </Typography>
    </Box>
  );
}
