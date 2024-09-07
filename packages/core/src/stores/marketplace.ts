/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { UseQueryOptions } from 'react-query';
import { useQuery, useMutation } from 'react-query';

import { request } from '@ks-console/shared';

import type {
  OriginalMarketplaceConfig,
  FormattedMarketplaceConfig,
  MarketplaceCallbackResponse,
  MarketplaceBindResponse,
  MarketplaceUnbindResponse,
  MarketplaceSyncResponse,
} from '../types/marketplace';

const module = 'extensions.marketplace';

function formatMarketplaceConfig(
  originalMarketplaceConfig: OriginalMarketplaceConfig,
): FormattedMarketplaceConfig {
  const { url, account } = originalMarketplaceConfig;
  return {
    ...originalMarketplaceConfig,
    isBound: Boolean(account?.userID),
    baseURL: url,
    account: {
      ...account,
      displayHeadImageURL:
        account?.headImageURL || '/assets/marketplace-user-avatar-placeholder.png',
    },
  };
}

interface UseMarketplaceConfigQueryOptions {
  isIgnoreErrorNotify?: boolean;
  onSuccess?: (data: FormattedMarketplaceConfig) => void;
}

function useMarketplaceConfigQuery(options?: UseMarketplaceConfigQueryOptions) {
  const url = 'kapis/config.kubesphere.io/v1alpha2/configs/marketplace';
  const queryKey = [module, url];
  const isIgnoreErrorNotify = options?.isIgnoreErrorNotify;
  const headers = isIgnoreErrorNotify ? { 'x-ignore-error-notify': 'true' } : undefined;
  const onSuccess = options?.onSuccess;

  const result = useQuery({
    queryKey,
    queryFn: () =>
      request.get<never, OriginalMarketplaceConfig>(url, { headers }).then(formatMarketplaceConfig),
    onSuccess: data => onSuccess?.(data),
  });
  const isSettled = result.isSuccess || result.isError;
  const formattedMarketplaceConfig = result.data;
  const isOnline = isSettled ? Boolean(formattedMarketplaceConfig?.url) : undefined;
  const isOffline = isSettled ? !isOnline : undefined;

  return { ...result, formattedMarketplaceConfig, isOnline, isOffline };
}

interface UseMarketplaceCallbackQueryOptions {
  enabled?: boolean;
  params: {
    code: string;
    state: string;
    cluster_id: string;
  };
  onSuccess?: () => void;
  onError?: () => void;
}

function useMarketplaceCallbackQuery({
  enabled,
  params,
  onSuccess,
  onError,
}: UseMarketplaceCallbackQueryOptions) {
  const url = 'apis/marketplace/callback';
  const queryKey = [module, url, params];

  return useQuery({
    enabled,
    queryKey,
    queryFn: () => request.get<never, MarketplaceCallbackResponse>(url, { params }),
    onSuccess: () => onSuccess?.(),
    onError: () => onError?.(),
  });
}

interface UseBindMarketplaceMutationOptions {
  onSuccess?: (data: MarketplaceBindResponse) => void;
}

function useBindMarketplaceMutation(options?: UseBindMarketplaceMutationOptions) {
  const onSuccess = options?.onSuccess;
  return useMutation({
    mutationFn: () => request.post<never, MarketplaceBindResponse>('apis/marketplace/bind'),
    onSuccess: data => onSuccess?.(data),
  });
}

interface UseUnbindMarketplaceMutationOptions {
  onSuccess?: () => void;
}

function useUnbindMarketplaceMutation(options?: UseUnbindMarketplaceMutationOptions) {
  const onSuccess = options?.onSuccess;
  return useMutation({
    mutationFn: () => request.post<never, MarketplaceUnbindResponse>('apis/marketplace/unbind'),
    onSuccess: () => onSuccess?.(),
  });
}

interface UseMarketplaceSyncQueryOptions {
  enabled?: UseQueryOptions['enabled'];
  onSuccess?: (data: MarketplaceSyncResponse) => void;
  onError?: () => void;
}

function useMarketplaceSyncQuery(options?: UseMarketplaceSyncQueryOptions) {
  const url = 'apis/marketplace/sync';
  const queryKey = [url];
  const onSuccess = options?.onSuccess;
  const onError = options?.onError;
  const enabled = options?.enabled;

  return useQuery({
    queryKey,
    queryFn: () => request.post<never, MarketplaceSyncResponse>('apis/marketplace/sync'),
    onSuccess: data => onSuccess?.(data),
    onError: () => onError?.(),
    enabled,
  });
}

interface UseSyncMarketplaceMutationOptions {
  onSuccess?: (data: MarketplaceSyncResponse) => void;
}

function useSyncMarketplaceMutation(options?: UseSyncMarketplaceMutationOptions) {
  const onSuccess = options?.onSuccess;
  return useMutation({
    mutationFn: () => request.post<never, MarketplaceSyncResponse>('apis/marketplace/sync'),
    onSuccess: data => onSuccess?.(data),
  });
}

export {
  useMarketplaceConfigQuery,
  useMarketplaceCallbackQuery,
  useBindMarketplaceMutation,
  useUnbindMarketplaceMutation,
  useMarketplaceSyncQuery,
  useSyncMarketplaceMutation,
};
