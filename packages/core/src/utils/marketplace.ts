/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { FormattedMarketplaceConfig, MarketplaceBindResponse } from '../types/marketplace';
import { MARKETPLACE_PAGE_PATH } from '../constants/marketplace';
import { createURL, getCallbackURL } from './url';
import { getBrowserLang, getUserLang } from '@ks-console/shared';

interface GetMarketplaceURLOptions {
  baseURL: string;
  path: string;
  searchParams: {
    user_id: string;
    [key: string]: any;
  };
}

function getMarketplaceURL({ baseURL, path, searchParams }: GetMarketplaceURLOptions) {
  return createURL({ baseURL, path, searchParams, trailingSlash: true });
}

interface GetMarketplaceAuthURLOptions {
  baseURL: string;
  params: {
    client_id: string;
    // redirect_uri: string;
    state: string;
    // response_type: 'code';
    // code_challenge_method: 'S256';
    code_challenge: string;
    cluster_id: string;
  };
  referer: string | null | undefined;
}

function getMarketplaceAuthURL({ baseURL, params, referer }: GetMarketplaceAuthURLOptions) {
  const path = '/auth/v1/auth';
  const redirectUri = getCallbackURL({
    path: MARKETPLACE_PAGE_PATH.auth.callback,
    searchParams: { referer },
  });
  const searchParams = {
    redirect_uri: redirectUri,
    response_type: 'code',
    code_challenge_method: 'S256',
    ...params,
  };

  return createURL({ baseURL, path, searchParams });
}

interface HandleBindMarketplaceSuccessOptions {
  formattedMarketplaceConfig: FormattedMarketplaceConfig | undefined;
  params: MarketplaceBindResponse;
  referer: string | null | undefined;
}

function handleBindMarketplaceSuccess({
  formattedMarketplaceConfig,
  params,
  referer,
}: HandleBindMarketplaceSuccessOptions) {
  const url = getMarketplaceAuthURL({
    baseURL: formattedMarketplaceConfig?.baseURL ?? '',
    params,
    referer,
  });
  window.location.href = url;
}

interface GetMarketplaceSubscribeURLOptions {
  baseURL: string;
  pathParams: {
    extensionId: string;
  };
  searchParams: {
    user_id: string;
  };
  referer: string;
}

function getMarketplaceSubscribeURL({
  baseURL,
  pathParams,
  searchParams,
  referer,
}: GetMarketplaceSubscribeURLOptions) {
  const lang = getUserLang() || getBrowserLang();
  const path = `${lang === 'en' ? '/en' : ''}/subscribe/${pathParams.extensionId}`;
  const callbackUri = getCallbackURL({
    path: MARKETPLACE_PAGE_PATH.subscribe.callback,
    searchParams: { referer },
  });
  return getMarketplaceURL({
    baseURL,
    path,
    searchParams: { ...searchParams, callback_uri: callbackUri },
  });
}

export { getMarketplaceURL, handleBindMarketplaceSuccess, getMarketplaceSubscribeURL };
