import { QueryClient } from 'react-query';

export const QUERY_SETTINGS_DEFAULT = {
  staleTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: true,
};

export const QUERY_SETTINGS_NO_FETCH = {
  staleTime: Infinity,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

const queryClient = new QueryClient();

export default queryClient;
