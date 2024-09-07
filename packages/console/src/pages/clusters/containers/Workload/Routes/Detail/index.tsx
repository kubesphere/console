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
  ingresStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  yaml,
  useBaseInfoModal,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import type { IngressDetail } from '@ks-console/shared';
import type { EditYamlConfig, ModalBaseConfig } from '../../../../types/workload';

const { useDetailQuery, useDeleteMutation, usePatchMutation, useUpdateIngressMutation } =
  ingresStore;
const WORKLOAD_TYPE = 'ROUTE';

const PodsDetail = () => {
  const module = 'ingresses';
  const authKey = module;
  const { cluster, namespace, name } = useParams();
  const navigate = useNavigate();

  const [, setDetailProps] = useStore('IngressDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });
  const listUrl = useMemo(() => {
    return `/clusters/${cluster}/ingresses`;
  }, []);

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

  const { renderBaseInfoModal, setEditBaseInfoVisible } = useBaseInfoModal<
    IngressDetail['_originData']
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

  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<IngressDetail>>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig<IngressDetail>>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
  });

  const { mutate: mutateUpdateYaml, isLoading: UpdateYamlLoading } = useUpdateIngressMutation({
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
  }, [detail]);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/ingresses/${name}`;
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
  }, [isLoading]);

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
