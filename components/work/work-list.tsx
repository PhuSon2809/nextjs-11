import { Box, Divider } from '@mui/material';
import { Fragment } from 'react';
import { Work } from '~/models';
import WorkCard from './work-card';

export interface WorkListProps {
  workList: Work[];
}

export default function WorkList({ workList }: WorkListProps) {
  if (workList.length === 0) return null;

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
