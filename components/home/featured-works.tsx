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
import { Post, Work } from '~/models';
import WorkList from '../work/work-list';

export function FeatureWorks() {
  const workList: Work[] = [
    {
      id: '1',
      title: 'Designing Dashboards',
      createdAt: '1688455196158',
      updatedAt: '1688455196158',
      tagList: ['Dashboard'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/doka5sp9n/image/upload/v1688457482/Rectangle_30_sidlrh.jpg',
    },
    {
      id: '2',
      title: 'Vibrant Portraits of 2020',
      createdAt: '1688455196158',
      updatedAt: '1688455196158',
      tagList: ['Illustration'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/doka5sp9n/image/upload/v1688457482/Rectangle_30_sidlrh.jpg',
    },
    {
      id: '3',
      title: '36 Days of Malayalam type',
      createdAt: '1688455196158',
      updatedAt: '1688455196158',
      tagList: ['Typography'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/doka5sp9n/image/upload/v1688457482/Rectangle_30_sidlrh.jpg',
    },
  ];

  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Typography variant="h6" mb={4}>
          Featured Works
        </Typography>

        <WorkList workList={workList} />
      </Container>
    </Box>
  );
}
