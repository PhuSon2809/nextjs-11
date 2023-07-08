import { Search } from '@mui/icons-material';
import { InputAdornment, Stack, debounce } from '@mui/material';
import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { WorkFiltersPayload } from '~/models';
import { AutocompleteField, InputField } from '../form';
import { useTagList } from '~/hooks';

export interface WorkFiltersProps {
  initialValue?: WorkFiltersPayload;
  onSubmit?: (payload: WorkFiltersPayload) => void;
}

export function WorkFilters({ initialValue, onSubmit }: WorkFiltersProps) {
  const { data } = useTagList({});
  const tagList = data?.data || [];

  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      selectedTagList: [],
      ...initialValue,
    },
  });

  async function handleLoginSubmit(payload: WorkFiltersPayload) {
    if (!payload) return;

    payload.tagList_like = payload.selectedTagList?.join('|') || '';
    delete payload.selectedTagList;
    await onSubmit?.(payload);
  }

  const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 350);

  return (
    <Stack
      direction="row"
      gap={5}
      mb={5}
      component="form"
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <InputField
        name="search"
        placeholder="Search wrok by title"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          debounceSearchChange();
        }}
      />

      <AutocompleteField
        name="selectedTagList"
        label="Filter by category"
        placeholder="Categories"
        control={control}
        options={tagList}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        onChange={() => debounceSearchChange()}
      />
    </Stack>
  );
}
