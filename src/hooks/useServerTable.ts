import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { type PaginationState } from "@tanstack/react-table";

export function useServerTable<T>(
  queryKey: string,
  fetchFn: (params: {
    page: number;
    perPage: number;
  }) => Promise<{ data: T[]; total: number }>
) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetchFn({
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    data: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    pagination,
    setPagination,
  };
}
