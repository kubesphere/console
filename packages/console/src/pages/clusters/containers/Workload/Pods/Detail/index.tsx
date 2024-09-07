/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, get } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, notify, Button } from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import {
  Icon,
  EditYamlModal,
  DeleteConfirmModal,
  podStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  yaml,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';
import type { FormattedPodDetail } from '@ks-console/shared';
import type { EditYamlConfig, ModalBaseConfig } from '../../../../types/workload';

const { usePodQuery, usePodDeleteMutation } = podStore;
const WORKLOAD_TYPE = 'POD';

const PodsDetail = () => {
  const module = 'pods';
  const authKey = module;
  const { cluster, namespace, name } = useParams();
  const navigate = useNavigate();

  const listUrl = useMemo(() => {
    return `/clusters/${cluster}/pods`;
  }, []);

  const {
    data: detail,
    isLoading,
    isError,
  } = usePodQuery({
    cluster,
    namespace,
    name,
  });
  const [, setDetailProps] = useStore('PodDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });

  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<FormattedPodDetail>>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig<FormattedPodDetail>>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
  });

  const { mutate: mutateDeleteOpt, isLoading: deleteIsLoading } = usePodDeleteMutation({
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
    const path = `/clusters/${cluster}/projects/${namespace}/pods/${name}`;
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
        title: t('ENVIRONMENT_VARIABLE_PL'),
        path: `${path}/env`,
      },
      {
        title: t('EVENT_PL'),
        path: `${path}/events`,
      },
    ];
  }, []);

  const attrs = useMemo(() => {
    if (isEmpty(detail)) {
      return [];
    }

    const { status, restarts } = detail!.podStatus;

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
        value: detail!.app,
      },
      {
        label: t('STATUS'),
        value: t(status),
      },
      {
        label: t('POD_IP_ADDRESS'),
        value: detail!.podIp,
      },
      {
        label: t('NODE_NAME'),
        value: detail!.node,
      },
      {
        label: t('NODE_IP_ADDRESS'),
        value: detail!.nodeIp,
      },
      {
        label: t('RESTART_PL'),
        value: restarts,
      },
      {
        label: t('QOS_CLASS'),
        value: get(detail, 'status.qosClass'),
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(detail!.createTime),
      },
      {
        label: t('CREATOR'),
        value: detail!.creator,
      },
    ];
  }, [detail]);

  const actions = () => {
    return [
      {
        key: 'viewYaml',
        icon: <Icon name="pen" />,
        text: t('VIEW_YAML'),
        action: 'view',
        onClick: () => {
          const originData = get(detail, '_originData', {});
          setEditYamlConfig({
            editResource: detail as any,
            yaml: yaml.getValue(originData),
            visible: true,
            readOnly: true,
          });
        },
      },
      {
        key: 'delete',
        action: 'delete',
        render: () => (
          <Button
            color="error"
            onClick={() =>
              setDeleteConfig({
                visible: true,
                source: detail as any,
              })
            }
          >
            {t('DELETE')}
          </Button>
        ),
      },
    ];
  };

  const handleCancelDelete = () => {
    setDeleteConfig({
      visible: false,
      source: null,
    });
  };
  const handleDelete = () => {
    mutateDeleteOpt(detail as FormattedPodDetail);
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
            attrs,
            breadcrumbs: {
              label: t('POD_PL'),
              url: listUrl,
            },
          }}
        />
      )}
      {editYamlConfig.visible && (
        <EditYamlModal
          visible={editYamlConfig.visible}
          yaml={editYamlConfig.yaml}
          readOnly={editYamlConfig.readOnly}
          onCancel={() => setEditYamlConfig({ ...editYamlConfig, visible: false })}
        />
      )}
      {deleteConfig?.visible && (
        <DeleteConfirmModal
          visible={deleteConfig?.visible}
          type={WORKLOAD_TYPE}
          resource={deleteConfig.source?.name}
          confirmLoading={deleteIsLoading}
          onOk={handleDelete}
          onCancel={handleCancelDelete}
        ></DeleteConfirmModal>
      )}
    </>
  );
};

export default PodsDetail;
