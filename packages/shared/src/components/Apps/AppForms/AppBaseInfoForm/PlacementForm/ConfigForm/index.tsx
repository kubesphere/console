/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { Ref, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { omit } from 'lodash';
import { FormItem, useForm } from '@kubed/components';
import { RuleObject, ValidateFields } from 'rc-field-form/lib/interface';

import PlacementField from './PlacementField';
import ConfigEditItems from './ConfigEditItems';
import type { ValidNamespace } from '../../../../../../types';
import { projectStore, workspaceStore } from '../../../../../../stores';

import { PlacementItemWrapper, StyledForm } from './styles';

export type AppPlacementFieldsData = {
  cluster?: string;
  workspace?: string;
  namespace?: string;
  placement?: AppPlacementFieldsData;
};

type AppConfirmedFormData = Omit<AppPlacementFieldsData, 'placement'>;

export type AppPlacementConfigFormRef = {
  formData: AppConfirmedFormData;
  validateFields: ValidateFields<AppPlacementFieldsData>;
};

export interface AliasName {
  workspace?: string;
  cluster?: string;
  namespace?: string;
}
interface Props extends AliasName {
  confirmedPlacementData?: AppPlacementFieldsData;
  isEdge?: boolean;
}

function PlacementConfigForm(
  { workspace, confirmedPlacementData, isEdge }: Props,
  ref?: Ref<AppPlacementConfigFormRef>,
): JSX.Element {
  const { useNamespaceList } = projectStore;
  const { useWorkspaces, useFetchWorkspaceClustersQuery } = workspaceStore;
  const [form] = useForm<AppPlacementFieldsData>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const checkWorkspace = workspace ?? confirmedPlacementData?.workspace;
  const initFormConfirmedData = useMemo(
    () => ({
      ...confirmedPlacementData,
      workspace: checkWorkspace,
      placement: {
        ...confirmedPlacementData,
        workspace: checkWorkspace,
      },
    }),
    [checkWorkspace],
  );
  const [confirmedFormData, setConfirmedFormData] =
    useState<AppPlacementFieldsData>(initFormConfirmedData);
  const { data: workspaces = [], isLoading: workspaceLoading } = useWorkspaces(
    { limit: -1, ascending: false },
    ({ items }) => {
      if (!form.getFieldValue('placement').workspace) {
        const patchWorkspaces = items?.filter(item => item.name !== globals.config.systemWorkspace);

        setConfirmedFormData(prev => {
          return {
            ...prev,
            workspace: patchWorkspaces?.[0]?.name || workspace,
            placement: { ...prev.placement, workspace: patchWorkspaces?.[0]?.name || workspace },
          };
        });
      }
    },
  );
  const { formattedClusters, refetch: refetchClusters } = useFetchWorkspaceClustersQuery({
    workspace: workspace || form.getFieldValue('workspace'),
    hasDefaultCluster: false,
  });
  const namespaceAutoFetch = useMemo(() => {
    return (
      !!(workspace || form.getFieldValue('workspace')) &&
      // !!confirmedPlacementData?.cluster &&
      !!form.getFieldValue('cluster') &&
      !workspaceLoading
    );
  }, [
    workspace,
    workspaceLoading,
    form.getFieldValue('cluster'),
    form.getFieldValue('workspace'),
    confirmedFormData?.cluster,
  ]);

  const { data: namespaces = [], reFetch: refetchNamespace } = useNamespaceList(
    {
      workspace: workspace ?? form.getFieldValue('workspace'),
      cluster: confirmedFormData?.cluster,
      ascending: false,
    },
    {
      autoFetch: namespaceAutoFetch,
      onSuccess: ({ items }) => {
        if (!confirmedFormData?.namespace) {
          const filteredNamespace = items?.filter(item => item.status !== 'Terminating');

          if (filteredNamespace) {
            const filteredNamespacesOptions: ValidNamespace[] = filteredNamespace?.map(item => ({
              label: item.name,
              value: item.name,
              disabled: item.isFedManaged,
              isFedManaged: item.isFedManaged,
            }));
            const firstValidNamespace = filteredNamespacesOptions.find(item => !item.disabled);
            const patchData = {
              workspace: form.getFieldValue('workspace'),
              cluster: form.getFieldValue('cluster'),
              namespace: firstValidNamespace?.value ?? '',
            };

            setConfirmedFormData({
              ...patchData,
              placement: { ...patchData },
            });
          }
        }
      },
    },
  );
  const workspaceName = workspaces.find(item => item.name === workspace)?.aliasName;
  const clusterName = formattedClusters.find(
    item => item.name === form.getFieldValue('cluster'),
  )?.aliasName;
  const namespaceName = namespaces.find(
    item => item.name === form.getFieldValue('namespace'),
  )?.aliasName;
  const placementValidator = (
    rule: RuleObject,
    value: Record<string, unknown>,
    callback: (error?: any) => void,
  ) => {
    if (!value?.namespace && !isEdge) {
      return callback(t('PROJECT_NOT_SELECT_DESC'));
    }

    return callback();
  };

  const closePlacementForm = () => setShowForm(false);

  const handleFormValuesChange = (values: AppPlacementFieldsData) => {
    const changeFieldKey = Object.keys(values)[0];

    switch (changeFieldKey) {
      case 'workspace':
        form.setFieldValue('cluster', undefined);
        form.setFieldValue('namespace', undefined);
        break;
      case 'cluster':
        form.setFieldValue('namespace', undefined);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (data: AppPlacementFieldsData) => {
    setConfirmedFormData({ ...data, placement: { ...data } });
    closePlacementForm();
  };

  useImperativeHandle(ref, () => ({
    formData: omit(confirmedFormData, 'placement'),
    validateFields: () =>
      form.validateFields().then(data => ({ ...omit(data, 'placement'), ...data.placement })),
  }));

  useEffect(() => {
    const cluster = formattedClusters[0]?.name || '';
    if (!workspaceLoading && form.getFieldValue('cluster') !== cluster) {
      const patchData = {
        workspace: form.getFieldValue('workspace'),
        cluster,
      };

      setConfirmedFormData({
        ...patchData,
        placement: {
          ...patchData,
        },
      });
    }
  }, [workspaceLoading, formattedClusters]);

  useEffect(() => {
    setConfirmedFormData(initFormConfirmedData);
  }, [initFormConfirmedData]);

  useEffect(() => {
    form.resetFields();
  }, [confirmedFormData]);

  useEffect(() => {
    return closePlacementForm();
  }, []);

  return (
    <StyledForm
      form={form}
      initialValues={confirmedFormData}
      onValuesChange={handleFormValuesChange}
      onFinish={handleFormSubmit}
    >
      {showForm ? (
        <ConfigEditItems
          isEdge={isEdge}
          workspace={workspace}
          clusters={formattedClusters}
          workspaces={workspaces}
          namespaces={namespaces}
          refetchClusters={refetchClusters}
          refetchNamespaces={(val: any) => {
            setConfirmedFormData(prev => ({
              ...prev,
              ...val,
              namespace: '',
            }));
            refetchNamespace();
          }}
          onConfirm={form.submit}
          onCancel={closePlacementForm}
        />
      ) : (
        <PlacementItemWrapper>
          <FormItem name={['placement']} rules={[{ validator: placementValidator }]}>
            <PlacementField
              initializing={workspaceLoading}
              isEdge={isEdge}
              aliasName={{
                cluster: clusterName,
                namespace: namespaceName,
                workspace: workspaceName,
              }}
              showPlacementForm={() => setShowForm(true)}
            />
          </FormItem>
        </PlacementItemWrapper>
      )}
    </StyledForm>
  );
}

export default forwardRef(PlacementConfigForm);
