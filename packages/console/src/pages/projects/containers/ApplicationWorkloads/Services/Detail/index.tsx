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
  serviceStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  joinSelector,
  IFormatEndPoint,
  useCommonActions,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import useServiceGateway from '../../../../../clusters/hooks/useServiceGateway';
import useServiceModal from '../../../../../clusters/hooks/useServiceModal';
import type { IServiceDetail } from '@ks-console/shared';

const module = 'services';
const WORKLOAD_TYPE = 'SERVICE';
const store = serviceStore;
const { useServiceQuery, useEndpointQuery, SERVICE_TYPES } = store;

const ServiceDetail = () => {
  const authKey = module;
  const params = useParams();
  const { cluster, namespace, name } = params;
  const navigate = useNavigate();

  const [, setDetailProps] = useStore('ServiceDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });
  const listUrl = useMemo(() => {
    return `/clusters/${cluster}/services`;
  }, []);

  const {
    data: detail = {} as IServiceDetail,
    isLoading,
    isError,
    refetch,
  } = useServiceQuery({
    cluster,
    namespace,
    name,
  });
  const { data: endpoints, isLoading: endpointsLoading } = useEndpointQuery({
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

  const { editServiceGateway } = useServiceGateway({ store, callback: refetch });
  const { editServiceModal } = useServiceModal({ store, callback: refetch });

  useEffect(() => {
    setDetailProps({ module, detail: detail as any, isLoading, isError });
  }, [isLoading]);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/services/${name}`;
    return [
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
  }, []);

  const renderEndpoints = () => {
    const type = detail?.type;
    if (type === 'Headless(ExternalName)') {
      return null;
    }

    if (endpointsLoading) {
      return <Loading size={12} />;
    }
    if (endpoints?.length === 0) {
      return '-';
    }

    const points: string[] = [];
    endpoints?.forEach((subset: IFormatEndPoint) => {
      subset?.addresses?.forEach(addr => {
        subset?.ports?.forEach(port => {
          if (addr.ip && port.port) {
            points.push(`${addr.ip}:${port.port}`);
          }
        });
      });
    });
    return points.map((end, index) => <p key={index}>{end}</p>);
  };

  const attrs = useMemo(() => {
    if (isEmpty(detail)) {
      return;
    }

    let externalIP;
    if (detail!.type === 'ExternalName') {
      externalIP = detail!.externalName;
    } else if (detail!.specType === 'LoadBalancer') {
      externalIP = detail!.loadBalancerIngress?.join('\r\n');
    } else if (detail!.externalIPs) {
      externalIP = detail!.externalIPs.join('\r\n');
    }

    const serviceType = get(detail, 'annotations["kubesphere.io/serviceType"]', '');

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
        label: t('TYPE'),
        value: (
          <span>
            {serviceType ? t(`SERVICE_TYPE_${serviceType.toUpperCase()}`) : t('CUSTOM_SERVICE')}
            <span className="text-desc"> ({t(get(detail, 'type', ''))})</span>
          </span>
        ),
      },
      {
        label: t('APP'),
        value: detail!.app,
      },
      {
        label: t('VIRTUAL_IP_ADDRESS'),
        value: detail!.clusterIP,
      },
      {
        label: t('EXTERNAL_IP_ADDRESS'),
        value: externalIP,
      },
      {
        label: t('SESSION_AFFINITY'),
        value: detail!.sessionAffinity === 'None' ? t('DISABLED') : t('ENABLED'),
      },
      {
        label: t('SELECTOR'),
        value: joinSelector(detail!.selector),
      },
      {
        label: t('DNS'),
        value: `${detail?.name}.${detail?.namespace}`,
      },
      {
        label: t('ENDPOINT'),
        value: renderEndpoints(),
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(detail!.createTime),
      },
      {
        label: t('CREATOR'),
        value: detail?.creator,
      },
    ];
  }, [isLoading, endpointsLoading]);

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
        onClick: () => editYaml({ initialValues: detail }),
      },
      {
        key: 'editService',
        icon: <Icon name="network-router" />,
        text: t('EDIT_SERVICE'),
        action: 'edit',
        onClick: () => editServiceModal({ detail }),
      },
      {
        key: 'editGateway',
        icon: <Icon name="ip" />,
        text: t('EDIT_EXTERNAL_ACCESS'),
        action: 'edit',
        show: detail.type === SERVICE_TYPES.VirtualIP,
        onClick: () => editServiceGateway({ detail }),
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
      {isLoading || endpointsLoading || isError ? (
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
            attrs,
            breadcrumbs: {
              label: t('SERVICE_PL'),
              url: listUrl,
            },
          }}
        />
      )}
    </>
  );
};

export default ServiceDetail;
