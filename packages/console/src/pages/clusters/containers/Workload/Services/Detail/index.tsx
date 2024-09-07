/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, get } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, notify } from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import {
  Icon,
  EditYamlModal,
  DeleteConfirmModal,
  serviceStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  yaml,
  joinSelector,
  IFormatEndPoint,
  useBaseInfoModal,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import type { IServiceDetail } from '@ks-console/shared';
import type { EditYamlConfig, ModalBaseConfig } from '../../../../types/workload';

const {
  useServiceQuery,
  useDeleteMutation,
  usePatchMutation,
  useEndpointQuery,
  useUpdateYamlMutation,
} = serviceStore;
const WORKLOAD_TYPE = 'SERVICE';

const PodsDetail = () => {
  const module = 'services';
  const authKey = module;
  const { cluster, namespace, name } = useParams();
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

  const { renderBaseInfoModal, setEditBaseInfoVisible } = useBaseInfoModal<
    IServiceDetail['_originData']
  >({
    data: detail?._originData,
    usePatchMutation: usePatchMutation(
      { cluster, namespace, name },
      {
        onSuccess: () => {
          setEditBaseInfoVisible(false);
          notify.success(t('UPDATE_SUCCESSFUL'));
          refetch();
        },
      },
    ),
  });

  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<IServiceDetail>>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig<IServiceDetail>>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
  });

  const { mutate: mutateUpdateYaml, isLoading: UpdateYamlLoading } = useUpdateYamlMutation({
    onSuccess: () => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      setEditYamlConfig({
        visible: false,
        yaml: '',
        readOnly: false,
        editResource: null,
      });
      refetch();
    },
  });
  const { mutate: mutateDeleteOpt, isLoading: deleteIsLoading } = useDeleteMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      setDeleteConfig({
        visible: false,
        source: null,
      });
      navigate(listUrl);
    },
  });

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
        onClick: () => {
          setEditBaseInfoVisible(true);
        },
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: () => {
          const originData = get(detail, '_originData', {});
          setEditYamlConfig({
            editResource: detail as any,
            yaml: yaml.getValue(originData),
            visible: true,
            readOnly: false,
          });
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          setDeleteConfig({
            visible: true,
            source: detail as any,
          });
        },
      },
    ];
  };

  const handleUpdateYaml = (value: string) => {
    mutateUpdateYaml({
      params: {
        cluster,
        namespace: get(editYamlConfig, 'editResource.namespace', ''),
        name: get(editYamlConfig, 'editResource.name', ''),
      },
      data: yaml.load(value),
    });
  };
  const handleDelete = () => {
    mutateDeleteOpt(detail as any);
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
      {renderBaseInfoModal()}
      {editYamlConfig.visible && (
        <EditYamlModal
          visible={editYamlConfig.visible}
          yaml={editYamlConfig.yaml}
          readOnly={editYamlConfig.readOnly}
          confirmLoading={UpdateYamlLoading}
          onCancel={() => setEditYamlConfig({ ...editYamlConfig, visible: false })}
          onOk={handleUpdateYaml}
        />
      )}
      {deleteConfig?.visible && (
        <DeleteConfirmModal
          visible={deleteConfig?.visible}
          type={WORKLOAD_TYPE}
          resource={deleteConfig.source?.name}
          confirmLoading={deleteIsLoading}
          onCancel={() =>
            setDeleteConfig({
              visible: false,
              source: null,
            })
          }
          onOk={handleDelete}
        ></DeleteConfirmModal>
      )}
    </>
  );
};

export default PodsDetail;
