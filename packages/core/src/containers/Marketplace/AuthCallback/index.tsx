/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { Loading, notify } from '@kubed/components';

import { MARKETPLACE_PAGE_PATH } from '../../../constants/marketplace';
import { useMarketplaceCallbackQuery } from '../../../stores/marketplace';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const error = searchParams.get('error');
  const code = searchParams.get('code') ?? '';
  const state = searchParams.get('state') ?? '';
  const clusterId = searchParams.get('cluster_id') ?? '';
  const referer = searchParams.get('referer');

  const isAuthSuccess = Boolean(!error && code && state && clusterId);

  const params = {
    code,
    state,
    cluster_id: clusterId,
  };

  const handleSuccess = () => {
    notify.success(t('BIND_SUCCESSFULLY'));
    navigate(referer || '/', { replace: true });
  };

  const handleError = () => {
    const search = qs.stringify({ referer });
    navigate(
      {
        pathname: MARKETPLACE_PAGE_PATH.auth.exception,
        search,
      },
      { replace: true },
    );
  };

  useEffect(() => {
    if (!isAuthSuccess) {
      handleError();
    }
  }, [isAuthSuccess, referer]);

  useMarketplaceCallbackQuery({
    enabled: isAuthSuccess,
    params,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return <Loading className="page-loading" />;
}
