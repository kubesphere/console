/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ActionConfirm, Col, FormItem, Select, Tooltip } from '@kubed/components';

import Icon from '../../../../../../Icon';
import StatusReason from '../../../../../../StatusReason';
import { isMultiCluster } from '../../../../../../../utils';
import type {
  FormattedCluster,
  FormattedNamespace,
  FormattedWorkspace,
} from '../../../../../../../types';

import {
  Option,
  BorderRow,
  FormWrapper,
  StyledField,
  OptionWrapper,
  PlacementConfirm,
} from './styles';

const StyledSelect = styled(Select)`
  .kubed-select-selection-item {
    .field-value {
      color: ${({ theme }) => theme.palette.accents_8};
    }
  }
`;

type Props = {
  clusters: FormattedCluster[];
  workspaces: FormattedWorkspace[];
  namespaces: FormattedNamespace[];
  refetchClusters: () => void;
  refetchNamespaces: (data: { cluster: string }) => void;
  workspace?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isEdge?: boolean;
};

export function getAliasName(name: string, aliasName: string) {
  return aliasName ? `${aliasName}（${name}）` : name;
}
function ConfigForm({
  workspace,
  clusters,
  workspaces,
  namespaces,
  refetchClusters,
  refetchNamespaces,
  onConfirm,
  onCancel,
  isEdge,
}: Props): JSX.Element {
  const workspaceOptions = useMemo(() => {
    return workspaces
      .filter(({ name }) => name !== globals.config.systemWorkspace)
      .map(({ name, aliasName }) => ({
        label: getAliasName(name, aliasName),
        value: name,
      }));
  }, [workspaces]);
  const clusterOptions = useMemo(() => {
    return clusters.map(item => ({
      label: getAliasName(item.name, item.aliasName),
      value: item.name,
      notReady: !item.isReady,
      cluster: item,
    }));
  }, [clusters]);
  const namespaceOptions = useMemo(() => {
    return namespaces
      .filter(({ status }) => status !== 'Terminating')
      .map(({ name, isFedManaged, aliasName }) => ({
        label: getAliasName(name, aliasName),
        value: name,
        isFedManaged,
      }));
  }, [namespaces]);

  const handleSelectWorkspaceChange = () => {
    if (isMultiCluster()) {
      return refetchClusters();
    }
  };

  return (
    <FormWrapper>
      <BorderRow>
        <Col span={4}>
          <FormItem name="workspace" label={t('WORKSPACE')}>
            <StyledSelect
              placeholder={t('WORKSPACE_EMPTY_DESC')}
              onSelect={handleSelectWorkspaceChange}
              disabled={!!workspace}
            >
              {workspaceOptions.map(({ label, value }) => (
                <Option key={value} value={value}>
                  <StyledField value={label} avatar={<Icon name="enterprise" />} />
                </Option>
              ))}
            </StyledSelect>
          </FormItem>
        </Col>
        <Col span={4}>
          <FormItem name="cluster" label={t('CLUSTER')}>
            <StyledSelect
              placeholder=" "
              onSelect={(val: string) => refetchNamespaces({ cluster: val })}
            >
              {clusterOptions.map(({ label, value, notReady, cluster }) => (
                <Option key={value} value={value} disabled={notReady}>
                  <OptionWrapper>
                    <StyledField value={label} avatar={<Icon name="cluster" />} />
                    {notReady && <StatusReason data={cluster} hasTip={false} />}
                  </OptionWrapper>
                </Option>
              ))}
            </StyledSelect>
          </FormItem>
        </Col>
        {!isEdge && (
          <Col span={4}>
            <FormItem
              name="namespace"
              label={t('PROJECT')}
              rules={[{ required: !isEdge, message: t('PROJECT_NOT_SELECT_DESC') }]}
            >
              <StyledSelect placeholder=" ">
                {namespaceOptions.map(({ label, value, isFedManaged }) => (
                  <Option key={value} value={value} disabled={isFedManaged}>
                    <OptionWrapper>
                      <StyledField
                        value={label}
                        avatar={
                          isFedManaged ? <img src="/assets/cluster.svg" /> : <Icon name="project" />
                        }
                      />
                      {isFedManaged && (
                        <Tooltip content={t('FEDPROJECT_CANNOT_DEPLOY_APP_TIP')}>
                          <Icon name="question" />
                        </Tooltip>
                      )}
                    </OptionWrapper>
                  </Option>
                ))}
              </StyledSelect>
            </FormItem>
          </Col>
        )}
      </BorderRow>
      <PlacementConfirm>
        <ActionConfirm visible={true} onOk={onConfirm} onCancel={onCancel} />
      </PlacementConfirm>
    </FormWrapper>
  );
}

export default ConfigForm;
