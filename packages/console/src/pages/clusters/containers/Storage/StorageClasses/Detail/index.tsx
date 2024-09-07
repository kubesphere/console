/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  DetailPage,
  StorageClassDetail,
  accessorStore,
  compareVersion,
  crdStore,
  storageClassStore as store,
  useCommonActions,
  validateWebhookCFStore,
} from '@ks-console/shared';
import { Pen, Slider, Trash } from '@kubed/icons';
import { get, isEmpty, omit } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { getStoreWithQueryHooks } from '../../../../stores/useStore';
import { getAccessorsTemplate } from '../constains';
import {
  useEditAuthorizationRules,
  useEditAutoExpansion,
  useEditDefaultStorageClass,
  useEditVolumeOperations,
} from '../hooks/modals';
import { notify } from '@kubed/components';

// const store = getStoreWithQueryHooks(storageClassStore);

export default function StorageClassDetailPage() {
  const ref = useRef<{ detail: StorageClassDetail; refetch: () => void }>(null);
  const params = useParams();
  //   const module = 'storageclasses';
  const authKey = 'storageclasses';

  const navigate = useNavigate();

  const listUrl = `/clusters/${params.cluster}/storageclasses`;

  const [shouldAddCrd, setShouldAddCrd] = React.useState(false);
  const ksVersionRef = React.useRef<number>();

  const { data: list, refetch: refetchList } = store.useQueryList({
    ...omit(params, 'name'),
    limit: -1,
    // annotation: 'storageclass.beta.kubernetes.io/is-default-class=true',
  });

  const defaultStorageClass = useMemo(() => {
    return list?.data?.find((item: StorageClassDetail) => item.default);
  }, [list]);

  const [data, setData] = React.useState<StorageClassDetail>();
  const [accessorData, setAccessorData] = React.useState<StorageClassDetail>();
  const dataRef = React.useRef<StorageClassDetail>();

  const checkHasAccessor = async () => {
    const storageClassName = get(dataRef.current, 'name');
    const detail = await accessorStore.fetchDetailWithoutWarning({
      ...params,
      name: `${storageClassName}-accessor`,
    });
    if (detail.urlNotSupport) {
      setShouldAddCrd(true);
    } else if (isEmpty(detail)) {
      const template = getAccessorsTemplate(storageClassName!);
      await accessorStore.post(template, { ...params });
      const detail1 = await accessorStore.fetchDetail({
        cluster: params.cluster,
        name: `${params.name}-accessor`,
      });
      setAccessorData(detail1);
    } else {
      setAccessorData(detail);
    }
  };

  const checkAccessorExist = async () => {
    if (compareVersion(`${ksVersionRef.current}`, 'v3.3') < 0) {
      // check if k8s supports accessor resource
      Promise.all([
        validateWebhookCFStore.fetchDetailWithoutWarning({
          ...params,
          name: 'storageclass-accessor.storage.kubesphere.io',
        }),
        crdStore.fetchDetailWithoutWarning({
          ...params,
          name: 'accessors.storage.kubesphere.io',
        }),
      ]).then(async ([validate, crd]) => {
        const { urlNotSupport: u1 } = validate;
        const { urlNotSupport: u2 } = crd;
        if (u1 || u2) {
          setShouldAddCrd(true);
        } else if (!isEmpty(validate) && !isEmpty(crd)) {
          await checkHasAccessor();
        }
      });
    } else {
      await checkHasAccessor();
    }
  };

  const fetchData = async () => {
    ksVersionRef.current = await accessorStore.getKsVersion(params);
    const detail = await store.fetchDetail(params);
    dataRef.current = detail;
    setData(detail);

    if (compareVersion(`${ksVersionRef.current}`, 'v3.3') < 0) {
    } else {
      checkHasAccessor();
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const callback = (type: string) => {
    if (type === 'editBaseInfo' || type === 'editYaml') {
      ref.current?.refetch();
    } else {
      navigate(listUrl);
    }
  };

  const { editYaml, del } = useCommonActions({
    store,
    params,
    callback,
  });

  const { openWithDeps: openEditAuthorizationRules, close: closeEditAuthorizationRules } =
    useEditAuthorizationRules({
      deps: {
        accessorData,
        data,
        shouldAddCrd,
      },
    });

  const { openWithDeps: openEditVolumeOperations, close: closeEditVolumeOperations } =
    useEditVolumeOperations({
      deps: {
        data,
      },
    });

  const { open: openEditAutoExpansion, close: closeEditAutoExpansion } = useEditAutoExpansion();

  const { open: openEditDefaultStorageClass, close: closeEditDefaultStorageClass } =
    useEditDefaultStorageClass();

  const attrs = useCallback(detail => {
    if (isEmpty(detail)) {
      return [];
    }
    return [
      {
        label: t('PROVISIONER'),
        value: detail.provisioner,
      },
      {
        label: t('DEFAULT_STORAGE_CLASS'),
        value: detail.default ? t('YES') : '-',
      },
      {
        label: t('ALLOW_VOLUME_EXPANSION'),
        value: detail.allowVolumeExpansion ? t('TRUE') : t('FALSE'),
      },
      {
        label: t('RECLAIM_POLICY'),
        value: detail.reclaimPolicy,
      },
      {
        label: t('ALLOW_VOLUME_SNAPSHOT'),
        value: detail.supportSnapshot ? t('TRUE') : t('FALSE'),
      },
    ];
  }, []);

  const tabs = useMemo(() => {
    const path = `/clusters/${params.cluster}/storageclasses/${params.name}`;
    return [
      {
        title: t(`PERSISTENT_VOLUME_CLAIM_PL`),
        path: `${path}/volumes`,
      },
    ];
  }, []);

  const show = compareVersion(`${ksVersionRef.current}`, 'v3.3') >= 0;

  const actions = [
    {
      key: 'editYaml',
      icon: <Pen />,
      text: t('EDIT_YAML'),
      action: 'edit',
      show: true,
      onClick: editYaml,
    },
    {
      key: 'setDefault',
      icon: <Pen />,
      text: t('SET_AS_DEFAULT_STORAGE_CLASS'),
      action: 'edit',
      disabled: data?.default,
      onClick: async (detail: StorageClassDetail) => {
        openEditDefaultStorageClass(
          {
            params,
            store,
          },
          {
            params: omit(params, 'name'),
            name: detail.name,
            defaultName: defaultStorageClass?.name,
            onSuccess: () => {
              notify.success(t('UPDATE_SUCCESSFUL'));
              closeEditDefaultStorageClass();
              refetchList();
              setData({
                ...((data ?? {}) as StorageClassDetail),
                default: true,
              });
              fetchData();
            },
          },
        );
      },
    },
    {
      key: 'editAuthorizationRules',
      icon: (
        <img src="/assets/storageclass-tree.svg" style={{ width: '16px', marginRight: '12px' }} />
      ),
      text: t('SET_AUTHORIZATION_RULES'),
      action: 'edit',
      show: true,
      onClick: async () => {
        await checkAccessorExist();
        openEditAuthorizationRules(deps => [
          {
            params,
            store: accessorStore,
            detail: deps?.accessorData,
            storageClassName: deps?.data?.name,
          },
          {
            detail: deps?.accessData,
            onSuccess: () => {
              notify.success(t('UPDATE_SUCCESSFUL'));
              closeEditAuthorizationRules();
              fetchData();
            },
          },
        ]);
      },
    },
    {
      key: 'funcManage',
      icon: <Slider />,
      text: t('SET_VOLUME_OPERATIONS'),
      action: 'edit',
      show: true,
      onClick: () => {
        openEditVolumeOperations(deps => [
          {
            params,
            store,
          },
          {
            detail: deps?.data,
            params,
            onSuccess: () => {
              notify.success(t('UPDATE_SUCCESSFUL'));
              closeEditVolumeOperations();
            },
          },
        ]);
      },
    },
    {
      key: 'autoResizer',
      icon: (
        <img
          src="/assets/storageclass_autoresizer.svg"
          style={{ width: '16px', marginRight: '12px' }}
        />
      ),
      text: t('SET_AUTO_EXPANSION'),
      action: 'edit',
      show: true,
      disabled: !show || !get(data, 'allowVolumeExpansion', false),
      onClick: (detail: StorageClassDetail) => {
        openEditAutoExpansion(
          {
            params,
            store,
            formData: detail?._originData,
          },
          {
            detail,
            params,
            onSuccess: () => {
              notify.success(t('UPDATE_SUCCESSFUL'));
              closeEditAutoExpansion();
              fetchData();
            },
          },
        );
      },
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      onclick: del,
    },
  ];

  return (
    <DetailPage
      ref={ref}
      tabs={tabs}
      store={store}
      data={data}
      authKey={authKey}
      sideProps={{
        actions: actions,
        attrs: attrs,
        breadcrumbs: {
          label: t('PERSISTENT_VOLUME_PL'),
          url: listUrl,
        },
      }}
    />
  );
}
