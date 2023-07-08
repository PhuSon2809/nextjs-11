import { Box, Skeleton, Stack, Typography } from '@mui/material';

export function WorkSkeleton() {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Box width={{ xs: '100%', sm: '246px' }} flexShrink={0}>
        <Skeleton variant="rectangular" width={246} height={180} />
      </Box>
      <Box flexGrow={1}>
        <Typography variant="h4" fontWeight="bold">
          <Skeleton variant="text" />
        </Typography>

        <Stack direction="row" alignItems="center" my={2}>
          <Skeleton variant="rectangular" width={60} height={24} />
          <Typography ml={3} color="GrayText" flexGrow={1}>
            <Skeleton variant="text" />
          </Typography>
        </Stack>

        <Typography>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="40%" />
        </Typography>
      </Box>
    </Stack>
  );
}
