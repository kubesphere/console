/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Field, Modal, Select, Switch, SwitchProps } from '@kubed/components';
import * as React from 'react';

import {
  FormattedNamespace,
  FormattedWorkspace,
  PathParams,
  getDisplayName,
  projectNewStore,
  workspaceStore,
} from '@ks-console/shared';
import { cloneDeep, get, set } from 'lodash';
import { AuthRoleRow, FormContainer, FormItemWrapper, ModalContent } from './styles';

interface AuthorizationRulesProps {
  visible: boolean;
  onCancel: () => void;
  confirmLoading: boolean;
  onOk: (d: Record<string, any>) => void;
  detail?: Record<string, any>;
  params: PathParams;
  storageClassName: string;
}

const EnableSwitch = (
  props: SwitchProps & { value?: boolean; onChange?: (checked: boolean) => void },
) => {
  const { value: valueProp, onChange, ...rest } = props;
  const [value, setValue] = React.useState(valueProp);
  React.useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const handleChange = (checked: boolean) => {
    setValue(checked);
    onChange?.(checked);
  };
  return (
    <Switch
      {...rest}
      onChange={handleChange}
      checked={value}
      label={t(value ? 'ENABLED' : 'DISABLED')}
    />
  );
};

const getStateByDetail = (detail: Record<string, any>) => {
  return {
    newObject: cloneDeep(detail),
    enabled: !get(detail.spec, 'storageClassName', '').includes('disabled'),
    workspace: [],
    namespace: [],
    nsOpt: get(
      detail,
      'spec.namespaceSelector.fieldSelector[0].fieldExpressions[0].operator',
      'In',
    ),
    wsOpt: get(
      detail,
      'spec.workspaceSelector.fieldSelector[0].fieldExpressions[0].operator',
      'In',
    ),
    nsValues: get(detail, 'spec.namespaceSelector.fieldSelector[0].fieldExpressions[0].values', []),
    wsValues: get(detail, 'spec.workspaceSelector.fieldSelector[0].fieldExpressions[0].values', []),
  };
};

const AuthorizationRules = (props: AuthorizationRulesProps) => {
  const { visible, onCancel, confirmLoading, onOk, detail, params, storageClassName } = props;
  const [state, setState] = React.useState(getStateByDetail(detail || {}));
  const { enabled, nsValues, wsValues, newObject, nsOpt, wsOpt } = state;
  const setKv = (key: string) => (value: unknown) => {
    setState(prev => ({ ...prev, [key]: value }));
  };
  const setEnabled = setKv('enabled');
  const setNsValues = setKv('nsValues');
  const setWsValues = setKv('wsValues');
  const setNsOpt = setKv('nsOpt');
  const setWsOpt = setKv('wsOpt');

  React.useEffect(() => {
    if (detail) {
      setState(getStateByDetail(detail));
    }
  }, [detail]);

  const { cluster } = params;

  const { data: workspaceList } = workspaceStore.useWorkspaces({ cluster, limit: -1 });
  const { data: namespaceList } = projectNewStore.useQueryList({
    cluster,
    limit: -1,
    labelSelector: 'kubesphere.io/managed=true',
  });
  const namespaceOptions = React.useMemo(() => {
    return namespaceList?.data?.map((item: FormattedNamespace) => ({
      label: getDisplayName(item),
      value: item.name,
    }));
  }, [namespaceList]);

  const workspaceOptions = React.useMemo(() => {
    return workspaceList?.map((item: FormattedWorkspace) => ({
      label: getDisplayName(item),
      value: item.name,
    }));
  }, [workspaceList]);

  const options = [
    {
      label: t('PROJECT'),
      value: 'project',
    },
    {
      label: t('WORKSPACE'),
      value: 'workspace',
    },
  ];

  const eqOptions = [
    {
      label: t('OPERATOR_IN'),
      value: 'In',
    },
    {
      label: t('OPERATOR_NOT_IN'),
      value: 'NotIn',
    },
  ];

  const expression = (values: unknown) => {
    return {
      fieldExpressions: [
        {
          field: 'Name',
          operator: 'In',
          values,
        },
      ],
    };
  };

  const handleOk = () => {
    const namespaceItem = get(newObject.spec, 'namespaceSelector.fieldSelector', [expression([])]);
    const workspaceItem = get(newObject.spec, 'workspaceSelector.fieldSelector', [expression([])]);
    const name = state.enabled ? storageClassName : `${storageClassName}-disabled`;
    set(newObject.spec, 'storageClassName', name);
    set(namespaceItem[0], 'fieldExpressions[0].values', state.nsValues);
    set(namespaceItem[0], 'fieldExpressions[0].operator', state.nsOpt);
    set(workspaceItem[0], 'fieldExpressions[0].values', state.wsValues);
    set(workspaceItem[0], 'fieldExpressions[0].operator', state.wsOpt);
    set(newObject.spec, 'namespaceSelector.fieldSelector', namespaceItem);
    set(newObject.spec, 'workspaceSelector.fieldSelector', workspaceItem);
    if (nsValues.length === 0) {
      delete newObject.spec.namespaceSelector;
    }

    if (wsValues.length === 0) {
      delete newObject.spec.workspaceSelector;
    }
    onOk(newObject);
  };
  return (
    <Modal
      title={t('SET_AUTHORIZATION_RULES')}
      width={960}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <ModalContent>
        <AuthRoleRow>
          <Field
            label={t('AUTHORIZATION_RULES_DESC')}
            value={t('SET_AUTHORIZATION_RULES')}
            avatar={<img src="/assets/storageclass-tree.svg" width="40" height="40" alt="" />}
          />
          <EnableSwitch
            variant="button"
            onChange={(checked: boolean) => {
              setEnabled(checked);
            }}
            value={enabled}
          />
        </AuthRoleRow>
        <FormContainer>
          <FormItemWrapper>
            <Select options={options} value="project" disabled />
            <Select options={eqOptions} onChange={setNsOpt} value={nsOpt} />
            <Select
              options={namespaceOptions}
              mode="multiple"
              onChange={setNsValues}
              value={nsValues}
            />
          </FormItemWrapper>
          <FormItemWrapper>
            <Select options={options} value="workspace" disabled />
            <Select options={eqOptions} onChange={setWsOpt} value={wsOpt} />
            <Select
              options={workspaceOptions}
              mode="multiple"
              onChange={setWsValues}
              value={wsValues}
            />
          </FormItemWrapper>
        </FormContainer>
      </ModalContent>
    </Modal>
  );
};

export default AuthorizationRules;
