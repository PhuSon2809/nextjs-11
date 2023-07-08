import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { Fragment } from 'react';
import { Work } from '~/models';
import { WorkCard } from './work-card';
import { WorkSkeleton } from './work-skeleton';

export interface WorkListProps {
  workList: Work[];
  loading?: boolean;
}

export function WorkList({ workList, loading }: WorkListProps) {
  if (loading)
    return (
      <Box>
        {Array.from({ length: 5 }).map((_, index) => (
          <Fragment key={index}>
            <WorkSkeleton />
            <Divider sx={{ my: 3 }} />
          </Fragment>
        ))}
      </Box>
    );

  if (workList.length === 0)
    return (
      <Box textAlign="center" my={5}>
        <Image src="/images/nodata.png" width={400} height={400} alt="No data" />
        <Typography component="h3" variant="h5" fontWeight="bold">
          No Data
        </Typography>
      </Box>
    );

  return (
    <Box>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work} />
          <Divider sx={{ my: 3 }} />
        </Fragment>
      ))}
    </Box>
  );
}
