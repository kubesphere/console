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
  workloadStore,
  DetailPagee,
  getDisplayName,
  formatTime,
  getCronJobStatus,
  useCommonActions,
  ClusterDetail,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';

const WORKLOAD_TYPE = 'CRONJOB';
const module = 'cronjobs';
const store = workloadStore(module);
const { useGetDetail, useSwitchStatusMutation } = store;

const DaemonSetDetail = () => {
  const [clusterDetail] = useStore<ClusterDetail>('cluster');
  const authKey = module;
  const params = useParams();
  const { cluster, workspace, namespace, name } = params;
  const navigate = useNavigate();

  const listUrl = workspace
    ? `/${workspace}/clusters/${cluster}/projects/${namespace}/${module}`
    : `/clusters/${cluster}/${module}`;

  const {
    data: detail,
    isLoading,
    isError,
    refetch,
  } = useGetDetail(
    {
      cluster,
      name,
      namespace,
    },
    clusterDetail.kubernetesVersion,
  );
  const [, setDetailProps] = useStore('cronjobsDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
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

  const { mutate: mutateSwitchStatus } = useSwitchStatusMutation({
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    setDetailProps({ module, detail, isLoading, isError });
  }, [detail]);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/cronjobs/${name}`;
    return [
      {
        title: t('RUN_RECORDS'),
        path: `${path}/records`,
      },
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

  const attrs = useMemo(() => {
    if (isEmpty(detail)) {
      return [];
    }

    const { spec = {} } = detail;
    const status = getCronJobStatus(detail);

    return [
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={cluster} />,
      },
      {
        label: t('PROJECT'),
        value: <ProjectAliasName workspace={workspace} project={namespace} />,
      },
      {
        label: t('STATUS'),
        value: t(status),
      },
      {
        label: t('SCHEDULE'),
        value: spec.schedule,
      },
      {
        label: t('MAXIMUM_DELAY'),
        value: spec.startingDeadlineSeconds,
      },
      {
        label: t('SUCCESSFUL_JOBS_RETAINED'),
        value: spec.successfulJobsHistoryLimit,
      },
      {
        label: t('FAILED_JOBS_RETAINED'),
        value: spec.failedJobsHistoryLimit,
      },
      {
        label: t('CONCURRENCY_POLICY'),
        value:
          spec.concurrencyPolicy === 'Allow'
            ? t('RUN_JOBS_CONCURRENTLY')
            : spec.concurrencyPolicy === 'Forbid'
              ? t('SKIP_NEW_JOB')
              : t('SKIP_OLD_JOB'),
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
        show: true,
        onClick: () => {
          editBaseInfo(detail, clusterDetail?.kubernetesVersion);
        },
      },
      {
        key: 'start',
        icon: <Icon name="start" />,
        text: t('START'),
        action: 'edit',
        show: detail.suspend,
        onClick: () => {
          mutateSwitchStatus({
            params: { cluster: detail.cluster, name: detail.name, namespace: detail.namespace },
            on: true,
            k8sVersion: clusterDetail.kubernetesVersion,
          });
        },
      },
      {
        key: 'pause',
        icon: <Icon name="stop" />,
        text: t('PAUSE'),
        action: 'edit',
        show: !detail.suspend,
        onClick: () => {
          mutateSwitchStatus({
            params: { cluster: detail.cluster, name: detail.name, namespace: detail.namespace },
            on: false,
            k8sVersion: clusterDetail.kubernetesVersion,
          });
        },
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: () => {
          editYaml(detail, clusterDetail?.kubernetesVersion);
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        onClick: () =>
          del({ type: WORKLOAD_TYPE, resource: [detail] }, clusterDetail?.kubernetesVersion),
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
            name: getDisplayName(detail),
            authKey,
            params: { cluster, namespace, name },
            desc: get(detail, 'description', ''),
            actions: actions(),
            attrs,
            breadcrumbs: {
              label: t('CRONJOB_PL'),
              url: listUrl,
            },
          }}
        />
      )}
    </>
  );
};

export default DaemonSetDetail;
