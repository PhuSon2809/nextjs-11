import useSWR, { SWRConfiguration } from 'swr';
import { workApi } from '~/api-client';
import { QueryKeys } from '~/constants';
import { ListParams } from '~/models';

export interface UseWorkListProps {
  params: Partial<ListParams>;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useWorkList({ params, options, enabled }: UseWorkListProps) {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_WORK_LIST, params] : null,
    () => workApi.getAll(params),
    {
      dedupingInterval: 30 * 1000, // Có nhiều req gọi liên lục trong vòng 30s thì chỉ gọi 1 lần th
      keepPreviousData: true,
      fallbackData: {
        data: [],
        pagination: {
          _page: 1,
          _limit: 10,
          _totalRows: 0,
        },
      },
      ...options,
    }
  );

  return swrResponse;
}
