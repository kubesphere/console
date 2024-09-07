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
  getJobStatus,
  useCommonActions,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';

const WORKLOAD_TYPE = 'JOB';
const module = 'jobs';
const store = workloadStore(module);
const { useGetDetail, reRun } = store;

const DaemonSetDetail = () => {
  const authKey = module;
  const { cluster, workspace, namespace, name } = useParams();
  const navigate = useNavigate();

  const listUrl = workspace
    ? `/${workspace}/clusters/${cluster}/projects/${namespace}/${module}`
    : `/clusters/${cluster}/${module}`;

  const {
    data: detail,
    isLoading,
    isError,
    refetch,
  } = useGetDetail({
    cluster,
    name,
    namespace,
  });
  const [, setDetailProps] = useStore('JobDetailProps', {
    module,
    detail: {},
    isLoading: false,
    isError: false,
  });

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store,
    params: {
      cluster,
      namespace,
      name: detail?.name,
    },
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

  useEffect(() => {
    setDetailProps({ module, detail, isLoading, isError });
  }, [detail]);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/jobs/${name}`;

    return [
      {
        title: t('RUN_RECORDS'),
        path: `${path}/records`,
      },
      {
        title: t('RESOURCE_STATUS'),
        path: `${path}/resource-status`,
      },
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
    const { spec = {} } = detail;
    const status = getJobStatus(detail);

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
        label: t('STATUS'),
        value: t(status),
      },
      {
        label: t('MAXIMUM_RETRIES'),
        value: spec.backoffLimit,
      },
      {
        label: t('COMPLETE_PODS'),
        value: spec.completions,
      },
      {
        label: t('PARALLEL_PODS'),
        value: spec.parallelism,
      },
      {
        label: t('MAXIMUM_DURATION'),
        value: spec.activeDeadlineSeconds || '-',
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(detail.createTime),
      },
      {
        label: t('CREATOR'),
        value: detail.creator || '-',
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
        onClick: () => editBaseInfo(detail),
      },
      {
        key: 'redeploy',
        icon: <Icon name="restart" />,
        text: t('RERUN'),
        action: 'edit',
        onClick: () => {
          reRun(detail).then(() => {
            refetch();
          });
        },
      },
      {
        key: 'editYaml',
        icon: <Icon name="eye" />,
        text: t('VIEW_YAML'),
        action: 'edit',
        onClick: () => editYaml({ ...detail, readOnly: true }),
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
            name: getDisplayName(detail),
            authKey,
            params: { cluster, namespace, name },
            desc: get(detail, 'description', ''),
            actions: actions(),
            attrs,
            breadcrumbs: {
              label: t('JOB_PL'),
              url: listUrl,
            },
          }}
        />
      )}
    </>
  );
};

export default DaemonSetDetail;
