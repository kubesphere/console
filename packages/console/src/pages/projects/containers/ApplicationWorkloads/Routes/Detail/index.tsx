/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, get } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import {
  Icon,
  ingresStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  useCommonActions,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import type { IngressDetail } from '@ks-console/shared';
import useRoutesAnnotations from '../../../../../clusters/hooks/useRoutesAnnotations';

const module = 'ingresses';
const WORKLOAD_TYPE = 'ROUTE';
const store = ingresStore;
const { useDetailQuery } = store;

const IngressRoutesDetail = () => {
  const authKey = module;
  const params = useParams();
  const { cluster, namespace, name } = useParams();
  const navigate = useNavigate();

  const [, setDetailProps] = useStore('IngressDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });
  const listUrl = `/clusters/${cluster}/ingresses`;

  const {
    data: detail = {} as IngressDetail,
    isLoading,
    isError,
    refetch,
  } = useDetailQuery({
    cluster,
    namespace,
    name,
  });

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store,
    params,
    callback: (type: string) => {
      switch (type) {
        case 'delete':
          navigate(listUrl);
          break;
        default:
          refetch();
      }
    },
  });

  const { editAnnotations } = useRoutesAnnotations({
    store,
    callback: () => {
      refetch();
    },
  });

  useEffect(() => {
    setDetailProps({ module, detail: detail as any, isLoading, isError });
  }, [isLoading]);

  const path = `/clusters/${cluster}/projects/${namespace}/ingresses/${name}`;
  const tabs = [
    // {
    //   title: t('RESOURCE_STATUS'),
    //   path: `${path}/resource-status`,
    // },
    {
      title: t('METADATA'),
      path: `${path}/metadata`,
    },
    {
      title: t('EVENT_PL'),
      path: `${path}/events`,
    },
  ];

  const getAttrs = useMemo(() => {
    if (isEmpty(detail)) {
      return;
    }

    return [
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={cluster} />,
      },
      {
        label: t('PROJECT'),
        value: <ProjectAliasName project={namespace} />,
      },
      {
        label: t('APP'),
        value: detail.app,
      },
      {
        label: t('GATEWAY_ADDRESS_TCAP'),
        value: detail.loadBalancerIngress.join('\r\n'),
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(detail.createTime),
      },
      {
        label: t('CREATOR'),
        value: detail.creator,
      },
    ];
  }, [detail]);

  const actions = () => {
    return [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: () => editBaseInfo(detail),
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: () => editYaml(detail),
      },
      {
        key: 'editAnnotations',
        icon: <Icon name="firewall" />,
        text: t('EDIT_ANNOTATIONS'),
        action: 'edit',
        onClick: () => editAnnotations({ detail }),
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        onClick: () => del({ type: WORKLOAD_TYPE, resource: [detail] }),
      },
    ];
  };

  return (
    <>
      {isLoading || isError ? (
        <Loading className="page-loading" />
      ) : (
        <DetailPagee
          tabs={tabs}
          cardProps={{
            name: getDisplayName(detail as any),
            authKey,
            params: { cluster, namespace, name },
            desc: get(detail, 'description', ''),
            actions: actions(),
            attrs: getAttrs,
            breadcrumbs: {
              label: t('ROUTE_PL'),
              url: listUrl,
            },
          }}
        />
      )}
    </>
  );
};

export default IngressRoutesDetail;
