/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import {
  componentsStore,
  DetailPage,
  formatTime,
  getComponentStatus,
  StatusIndicator,
  SystemComponent,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import { Components } from '@kubed/icons';

const PATH = '/clusters/:cluster/components/:namespace/:name';

function ServiceComponentDetail() {
  const params = useParams();

  const tabs = [{ path: `${PATH}/service-details`, title: t('POD_PL') }];

  const attrs = (data: SystemComponent) => {
    if (!data) return [];
    const status = getComponentStatus(data);
    return [
      {
        label: t('STATUS'),
        value: <StatusIndicator type={status}>{t(status.toUpperCase())}</StatusIndicator>,
      },
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={params.cluster} />,
      },
      {
        label: t('PROJECT'),
        value: <ProjectAliasName project={data?.namespace} />,
      },
      {
        label: t('REPLICA_COUNT'),
        value: `${data.healthyBackends}/${data.totalBackends}`,
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(data.startedAt, 'YYYY-MM-DD HH:mm:ss'),
      },
    ];
  };

  return (
    <DetailPage
      store={componentsStore}
      tabs={tabs}
      sideProps={{
        attrs,
        icon: <Components size={28} />,
        breadcrumbs: {
          listName: '',
          label: t('SYSTEM_COMPONENT_PL'),
          url: `/clusters/${params.cluster}/components`,
        },
      }}
    />
  );
}

export default ServiceComponentDetail;
