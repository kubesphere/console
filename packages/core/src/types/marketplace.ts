/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

interface OriginalMarketplaceConfig {
  url: string;
  oauth: {
    clientID: string;
  };
  account?: {
    userID: string;
    expiresIn: number;
    email?: string;
    headImageURL?: string;
    username: string;
  };
  subscription: {
    syncPeriod: number;
    lastSyncTime?: string;
  };
  repository: {
    url: string;
    repoName: string;
    syncPeriod: number;
    lastSyncTime?: string;
  };
}

interface FormattedMarketplaceConfig extends Omit<OriginalMarketplaceConfig, 'account'> {
  isBound: boolean;
  baseURL: string;
  account: Partial<OriginalMarketplaceConfig['account']> & {
    displayHeadImageURL: string;
  };
}

interface MarketplaceCallbackResponse {
  message: 'success';
}

interface MarketplaceBindResponse {
  state: string;
  client_id: string;
  cluster_id: string;
  code_challenge: string;
}

interface MarketplaceUnbindResponse {
  message: 'success';
}

interface MarketplaceSyncResponse {
  message: 'success';
}

export type {
  OriginalMarketplaceConfig,
  FormattedMarketplaceConfig,
  MarketplaceCallbackResponse,
  MarketplaceBindResponse,
  MarketplaceUnbindResponse,
  MarketplaceSyncResponse,
};
