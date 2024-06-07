import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false, // Do not refetch on window focus
            retry: 1,
            placeholderData: (prev) => prev,
        },
    },
});

export default queryClient;
