import { useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';

export type UseQueryFixProps<T, U> = {
  query: UseQueryResult<T>;
  transform: (data: T) => U;
};

export function useQueryFix<T, U>({
  query,
  transform,
}: UseQueryFixProps<T, U>) {
  const { isLoading, error, data, refetch } = query;

  const [localData, setLocalData] = useState<U | undefined>(
    data ? transform(data) : undefined
  );
  const [localLoading, setLocalLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setLocalLoading(true);
    }

    if (error && localLoading) {
      setLocalLoading(false);
    }

    if (data) {
      setLocalData(transform(data));
      setLocalLoading(false);
    }
  }, [isLoading, error, data]);

  const handleRefetch = async () => {
    await refetch();
  };

  return {
    data: localData,
    loading: localLoading,
    error,
    refetch: handleRefetch,
  };
}
