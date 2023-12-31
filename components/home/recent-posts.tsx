import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { PostCard } from './post-card';
import { Post } from '~/models';

export function RecentPosts() {
  const postList: Post[] = [
    {
      id: '1',
      slug: '',
      title: 'Making a design system from scratch',
      publishedDate: '2023-07-05T10:00:00Z',
      tagList: ['Design', 'Pattern'],
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
    {
      id: '2',
      slug: '',
      title: 'Creating pixel perfect icons in Figma',
      publishedDate: '2023-07-05T10:00:00Z',
      tagList: ['Figma', 'Icon Design'],
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
  ];
  return (
    <Box component="section" bgcolor="secondary.light" pt={2} pb={4}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          mb={2}
        >
          <Typography variant="h6">Recent Posts</Typography>
          <Link href="/blog">
            <Typography
              sx={{ display: { xs: 'none', md: 'inline' }, color: 'blue' }}
            >
              View all
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            '& > div': {
              width: { xs: '100%', md: '50%' },
            },
          }}
        >
          {postList.map((post) => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
