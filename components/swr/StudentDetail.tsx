import * as React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
  studentId: any;
}

const MILLISECOND_PER_HOUR = 60 * 60 * 1000;

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
    // dedupingInterval: MILLISECOND_PER_HOUR,
    dedupingInterval: 2000,
  });

  const handleMutateClick = () => {
    mutate({ name: 'Phu Son' }, true);
  };

  return (
    <div>
      Name: {data?.name || '--'}
      <button onClick={handleMutateClick}>Mutate</button>
    </div>
  );
}
