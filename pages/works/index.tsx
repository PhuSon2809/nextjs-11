import { Box, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { MainLayout } from '~/components/layout';
import { WorkFilters, WorkList } from '~/components/work';
import { useWorkList } from '~/hooks';
import { ListParams, WorkFiltersPayload } from '~/models';

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const router = useRouter();
  const filters: Partial<ListParams> = {
    _page: 1,
    _limit: 5,
    ...router.query,
  };
  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like?.split('|') || [],
  };

  const { data, isLoading } = useWorkList({ params: filters, enabled: router.isReady });

  const { _limit, _totalRows, _page } = data?.pagination || {};
  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: value,
        },
      },
      undefined,
      // trigger render bên phía client side
      // Sẽ ko trigger chạy lại getStaticProps
      { shallow: true }
    );
  };

  function handleFiltersChange(newFilters: WorkFiltersPayload) {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: 1,
          title_like: newFilters.search,
          tagList_like: newFilters.tagList_like,
        },
      },
      undefined,
      { shallow: true }
    );
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

        {router.isReady ? (
          <WorkFilters initialValue={initFiltersPayload} onSubmit={handleFiltersChange} />
        ) : (
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{ display: 'inline-block', width: '100%', mt: 2, mb: 1 }}
          />
        )}
        <WorkList workList={data?.data || []} loading={!router.isReady || isLoading} />

        {totalPages > 0 && (
          <Stack alignItems="center">
            <Pagination count={totalPages} page={_page} onChange={handlePageChange} />
          </Stack>
        )}
      </Container>
    </Box>
  );
}

WorksPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps<WorksPageProps> = async () => {
  // const postList = await getPostList();

  return {
    props: {},
  };
};
