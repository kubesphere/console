/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loading, notify } from '@kubed/components';

import { useMarketplaceSyncQuery } from '../../../stores/marketplace';

export default function SubscribeCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const referer = searchParams.get('referer');
  const orderStatus = searchParams.get('order_status');

  const isOrderSuccess = orderStatus === 'success';

  const navigateToReferer = () => navigate(referer || '/', { replace: true });

  useMarketplaceSyncQuery({
    enabled: isOrderSuccess,
    onSuccess: navigateToReferer,
    onError: navigateToReferer,
  });

  useEffect(() => {
    if (!isOrderSuccess) {
      setTimeout(() => notify.error(t('SUBSCRIPTION_FAILED')), 1000);
      navigateToReferer();
    }
  }, [isOrderSuccess, referer]);

  return <Loading className="page-loading" />;
}
