import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCache = () => {
    const queryClient = useQueryClient();

    const clearCache = () => {
        queryClient.clear();
    };

    const invalidateQueries = (queryKey) => {
        queryClient.invalidateQueries({ queryKey });
    };

    const prefetchQuery = (queryKey, queryFn) => {
        queryClient.prefetchQuery({ queryKey, queryFn });
    };

    const setQueryData = (queryKey, data) => {
        queryClient.setQueryData(queryKey, data);
    };

    const getQueryData = (queryKey) => {
        return queryClient.getQueryData(queryKey);
    };

    return {
        clearCache,
        invalidateQueries,
        prefetchQuery,
        setQueryData,
        getQueryData,
    };
};