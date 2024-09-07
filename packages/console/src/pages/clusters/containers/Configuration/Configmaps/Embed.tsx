/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WujieReact from 'wujie-react';
import { Banner } from '@kubed/components';
import { useLocation, useParams } from 'react-router-dom';
import { Icon, secretStore } from '@ks-console/shared';

export default function Embed() {
  const location = useLocation();
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const { getDocsUrl } = secretStore;
  const docUrl = getDocsUrl();

  const desc = (
    <div className="banner-desc">
      {t('CONFIGMAP_DESC')}
      <Icon name="documentation" size={20} />
      <a href={docUrl} target="_blank">
        {t('LEARN_MORE')}
      </a>
    </div>
  );

  const url = `//${window.location.host}/consolev3/clusters/${cluster}/configmaps${location.search}`;

  return (
    <>
      <Banner
        icon={<Icon name="hammer" />}
        title={t('CONFIGMAP_PL')}
        description={docUrl ? desc : t('CONFIGMAP_DESC')}
        className="mb12"
      />
      <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />
    </>
  );
}
