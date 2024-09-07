/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  DetailPage,
  DetailPageRef,
  FormattedNamespace,
  getLocalTime,
  hasKSModule,
  StatusIndicator,
  useCommonActions,
  quotaStore,
  limitRangesStore,
  ClusterAliasName,
} from '@ks-console/shared';
import { notify } from '@kubed/components';
import { Pen, Project, Trash } from '@kubed/icons';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import limitRangesStore from '../../../stores/limitranges';
import { useQueryProjectLimitRanges } from '../../../stores/project';
import projectNewStore from '../../../stores/project.new';
import { isSystemWorkspace, PROJECTS_SYSTEM_KEY, PROJECTS_USER_KEY } from '../constants';
import {
  useProjectAnnotationsModal,
  useProjectEditDefaultQuotasModal,
  // useProjectEditQuotasModal,
} from '../hooks/useProjectModals';
// import quotaStore from '../../../stores/quota';
import { useProjectEditQuotasModal } from '../../../../../actions/project';

const { useQueryDetail } = projectNewStore;
const ProjectDetail = () => {
  const ref = React.useRef<DetailPageRef<FormattedNamespace>>(null);

  const params = useParams();
  const { cluster, namespace } = params;

  const { data, isLoading, refetch } = useQueryDetail<FormattedNamespace>({
    cluster,
    name: namespace,
  });
  const { data: limitranges, refetch: limitrangesRefetch } = useQueryProjectLimitRanges(params);

  const {
    openWithDeps: openEditDefaultContainerQuotasModal,
    close: closeDefaultContainerQuotasModal,
  } = useProjectEditDefaultQuotasModal({
    deps: {
      limitranges,
      projectDetail: data,
    },
  });

  const { openWithDeps: openAnnotationsModal, close: closeAnnotationsModal } =
    useProjectAnnotationsModal({
      deps: { data },
    });

  const { openWithDeps: openEditQuotasModal, close: closeQuotasModal } = useProjectEditQuotasModal({
    deps: {
      data,
    },
  });

  const listUrl = React.useMemo(() => {
    const path = `/clusters/${cluster}/projects`;
    if (isLoading || !data) {
      return path;
    }
    return isSystemWorkspace(data) ? `${path}/system` : `${path}/user`;
  }, [data]);

  const tableName = React.useMemo(() => {
    if (isLoading || !data) {
      return '';
    }
    const type = isSystemWorkspace(data) ? PROJECTS_SYSTEM_KEY : PROJECTS_USER_KEY;
    return `namespace:table:${type}:list`;
  }, [data]);

  const navigate = useNavigate();
  const callback = (type: string) => {
    if (type === 'delete') {
      navigate(listUrl);
    } else {
      refetch();
    }
  };
  const { editBaseInfo, del } = useCommonActions({
    params: {
      cluster,
      name: namespace,
    },
    store: projectNewStore,
    callback,
  });

  const attrs = React.useCallback((detail: FormattedNamespace) => {
    if (isEmpty(detail)) {
      return [];
    }
    return [
      {
        label: t('STATUS'),
        value: detail?.status ? (
          <StatusIndicator type={detail!.status as any}>
            {t(detail?.status.toUpperCase())}
          </StatusIndicator>
        ) : null,
      },
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={cluster} />,
      },
      {
        label: t('WORKSPACE'),
        value: detail!.workspace,
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail!.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        label: t('CREATOR'),
        value: detail!.creator || '-',
      },
    ];
  }, []);

  const tabs = React.useMemo(() => {
    const hasGateway = !!hasKSModule('gateway');
    const omitKeys = new Set();
    if (!hasGateway) {
      omitKeys.add('GATEWAY');
    }
    const path = `/clusters/${cluster}/projects/${namespace}`;
    return [
      {
        title: t('Overview'),
        path: `${path}/overview`,
      },
      {
        title: t('POD_PL'),
        path: `${path}/pods`,
      },
      {
        title: t('GATEWAY'),
        path: `${path}/gateway`,
        id: 'GATEWAY',
      },
      {
        title: t('QUOTA'),
        path: `${path}/quota`,
      },
      {
        title: t('METADATA'),
        path: `${path}/metadata`,
      },
    ].filter(i => !omitKeys.has(i.id));
  }, []);
  const actions = React.useMemo(() => {
    return [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT'),
        action: 'edit',
        show: true,
        onClick: editBaseInfo,
      },
      {
        key: 'edit-annotations',
        icon: <Pen />,
        text: t('EDIT_ANNOTATIONS'),
        action: 'manage',
        show: data && data?.workspace !== globals.config.systemWorkspace,
        onClick: () => {
          openAnnotationsModal(({ data: detail } = {}) => {
            return [
              {
                initialValues: detail?._originData,
                store: projectNewStore,
              },
              {
                params: { ...params, name: detail?.name },
                onSuccess: () => {
                  closeAnnotationsModal();
                  refetch();
                },
              },
            ];
          });
        },
      },
      {
        key: 'editQuota',
        icon: <Pen />,
        text: t('EDIT_PROJECT_QUOTAS'),
        action: 'edit',
        onClick: () => {
          openEditQuotasModal(({ data: detail }) => {
            return [
              {
                store: quotaStore,
                detail: detail!,
              },
              {
                detail: detail!,
                params: {
                  cluster: params.cluster,
                  namespace: params.namespace,
                  name: params.namespace,
                },
                onSuccess: () => {
                  closeQuotasModal();
                },
              },
            ];
          });
        },
      },
      {
        key: 'edit-default-resource',
        icon: <Pen />,
        action: 'edit',
        text: t('EDIT_DEFAULT_CONTAINER_QUOTAS'),
        onClick: () => {
          openEditDefaultContainerQuotasModal(
            ({ limitranges: limitranges1, data: projectDetail } = {}) => {
              return [
                {
                  detail: limitranges1?.[0],
                  params: { ...params },
                  workspace: projectDetail?.workspace,
                  store: limitRangesStore,
                },
                {
                  params: { ...params },
                  detail: limitranges1?.[0],
                  projectDetail,
                  onSuccess: () => {
                    closeDefaultContainerQuotasModal();
                    notify.success(t('UPDATE_SUCCESSFUL'));
                    limitrangesRefetch();
                  },
                },
              ];
            },
          );
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: (detail: FormattedNamespace) => detail?.workspace !== globals.config.systemWorkspace,
        onClick: del,
      },
    ];
  }, []);

  return (
    <DetailPage
      ref={ref}
      tabs={tabs}
      store={projectNewStore}
      isLoading={isLoading}
      authKey="projects"
      data={data}
      params={{ cluster, name: namespace }}
      sideProps={{
        actions: actions,
        attrs: attrs,
        icon: <Project size={28} />,
        breadcrumbs: {
          label: t('PROJECT'),
          url: listUrl,
          listName: tableName,
        },
      }}
    />
  );
};

export default ProjectDetail;
