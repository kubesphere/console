/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Form, FormItem, Input, Select, Tag, Textarea, useForm, useWatch } from '@kubed/components';
import { ChevronDown, ChevronUp, Firewall } from '@kubed/icons';

import ClusterIcon from '../../Clusters/ClusterIcon';
import PropertiesInput from '../../Inputs/PropertiesInput';
import { clusterStore } from '../../../stores';
import { Constants, Pattern } from '../../../constants';
import { OriginData, hasPermission, isPlatformAdmin } from '../../../utils';
import type { PathParams } from '../../../types';
import store from '../../../stores/project.new';
import {
  AdvancedButton,
  ClusterTitleWrapper,
  FlexBox,
  FormGroup,
  FormGroupContent,
  FormGroupDesc,
  FormGroupTitle,
  FormItemError,
  HeaderWrapper,
  ModalBody,
  ModalStyle,
  TitleWrapper,
} from './styles';

const getIsClusterManage = () => {
  return isPlatformAdmin() || hasPermission({ module: 'clusters', action: 'manage' });
};

export interface CreateProjectModalProps {
  visible?: boolean;
  onOk?: (value: OriginData) => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  hideFooter?: boolean;
  cancelText?: string;
  okText?: string;
  params?: PathParams;
  initialValues?: Record<string, any>;

  hideCluster: boolean; // If it is not a multi-cluster, or in the cluster management page, hide the cluster selection
}

function CreateProjectModal({
  visible,
  onOk,
  onCancel,
  confirmLoading,
  hideCluster,
  params = {},
  initialValues = {},
}: CreateProjectModalProps) {
  const [form] = useForm();

  const { workspace } = params;
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [error, setError] = React.useState('');
  const { data: clusters = [], isFetching: clusterLoading } =
    clusterStore.useQueryWorkspaceClusters(workspace);

  const formCluster = useWatch(['cluster'], form);

  const clusterOptions = clusters.map(item => {
    const icon = <ClusterIcon cluster={item} noStatus={true} size={20} theme={'light'} />;
    return {
      label: (
        <ClusterTitleWrapper>
          {icon} {item.name}
          {item.group && (
            <Tag color={Constants.CLUSTER_GROUP_TAG_TYPE[item.group]}>
              {t(`ENV_${item.group.toUpperCase()}`, {
                defaultValue: item.group,
              })}
            </Tag>
          )}
          {item.isHost && <Tag color="warning">{t('HOST_CLUSTER')}</Tag>}
        </ClusterTitleWrapper>
      ),
      value: item.name,
      disabled: !item.isReady,
    };
  });

  React.useEffect(() => {
    if (formCluster) {
      form.validateFields([['metadata', 'name']]);
    }
  }, [formCluster]);
  const renderCluster = () => {
    if (hideCluster) {
      return null;
    }
    return (
      <FormGroup>
        <div>
          <FormGroupTitle>{t('CLUSTER')}</FormGroupTitle>
          <FormGroupDesc>{t('SELECT_CLUSTER_DESC')}</FormGroupDesc>
        </div>
        <FormGroupContent>
          <FormItem rules={[{ required: true, message: t('CLUSTER_EMPTY_DESC') }]} name={'cluster'}>
            <Select loading={clusterLoading} options={clusterOptions} />
          </FormItem>
        </FormGroupContent>
      </FormGroup>
    );
  };

  const renderAdvancedSettings = () => {
    if (!getIsClusterManage()) {
      return null;
    }

    return (
      <>
        <AdvancedButton onClick={() => setShowAdvanced(!showAdvanced)}>
          {t('ADVANCED_SETTINGS')}
          {!showAdvanced ? <ChevronDown color={'#329dce'} /> : <ChevronUp color={'#329dce'} />}
        </AdvancedButton>
        {showAdvanced && (
          <FormItem
            label={t('ANNOTATION_PL')}
            name={['metadata', 'annotations']}
            validateStatus={error ? 'error' : undefined}
            help={error ? <FormItemError>{error}</FormItemError> : undefined}
          >
            <PropertiesInput onError={e => setError(e?.message!)} />
          </FormItem>
        )}
      </>
    );
  };

  const nameValidator = (rule: unknown, value: string) => {
    const selectedCluster = formCluster ?? get(initialValues, 'cluster');
    if (!selectedCluster) {
      return Promise.resolve();
    }
    // const store = new ProjectStore();
    return store
      .checkName(
        {
          cluster: selectedCluster,
          name: value,
        },
        {},
      )
      .then(res => {
        return res.exist ? Promise.reject(t('PROJECT_NAME_EXIST_DESC')) : Promise.resolve();
      });
  };

  const handleOk = () => form.submit();

  const onFinish = () => {
    form.validateFields().then(() => {
      const data = form.getFieldsValue(true);
      onOk?.(data);
    });
  };

  return (
    <ModalStyle
      title={t('ASSIGN_WORKSPACE')}
      titleIcon={<Firewall />}
      width={960}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      header={null}
      closable={false}
    >
      <HeaderWrapper>
        <img src="/assets/project-create.svg" alt="" />
        <TitleWrapper>
          <div>{t('CREATE_PROJECT')}</div>
          <p>{t('CREATE_PROJECT_DESC')}</p>
        </TitleWrapper>
      </HeaderWrapper>
      <ModalBody>
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          onFieldsChange={([]) => {}}
        >
          <FlexBox>
            <FormItem
              label={t('NAME')}
              help={t('PROJECT_NAME_DESC')}
              name={['metadata', 'name']}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                {
                  pattern: Pattern.PATTERN_SERVICE_NAME,
                  message: t('PROJECT_NAME_INVALID_DESC'),
                },
                { validator: nameValidator },
              ]}
            >
              <Input maxLength={63} />
            </FormItem>
            <FormItem
              label={t('ALIAS')}
              name={['metadata', 'annotations', 'kubesphere.io/alias-name']}
              help={t('ALIAS_DESC')}
            >
              <Input maxLength={63} />
            </FormItem>
            <FormItem
              label={t('DESCRIPTION')}
              name={['metadata', 'annotations', 'kubesphere.io/description']}
              help={t('DESCRIPTION_DESC')}
            >
              <Textarea maxLength={256} />
            </FormItem>
          </FlexBox>
          {renderCluster()}
          {renderAdvancedSettings()}
        </Form>
      </ModalBody>
    </ModalStyle>
  );
}

export default CreateProjectModal;
