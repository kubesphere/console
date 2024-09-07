/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { cloneDeep, get, noop, unset, set } from 'lodash';
import { Step, Modal, Button, Group, Divider, Switch, useForm, notify } from '@kubed/components';
import { Close, Cluster } from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';
import { clusterStore, safeBtoa, useEventEmitter } from '@ks-console/shared';
import { useNavigate } from 'react-router-dom';

import { IMPORT_CLUSTER_SPEC } from '../../../constants';
import ClusterBaseInfoFrom from '../../../components/Forms/ClusterBaseInfo';
import ConnectSettingStep from './ConnectSettingStep';
import YamlMode from './YamlMode';
import {
  Wrapper,
  StyledSteps,
  Footer,
  HeaderLine,
  HeaderLeft,
  HeaderRight,
  StepItem,
} from './styles';

interface FullScreenFormProps {
  visible: boolean;
  onCancel: () => void;
  onRefresh?: () => void;
}

const AddClusterModal = ({ visible, onCancel, onRefresh }: FullScreenFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [yamlMode, setYamlMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formValue, setFormValue] = useStore('cluster:clusterForm', cloneDeep(IMPORT_CLUSTER_SPEC));
  const prevStep = () => setActiveTab(current => (current > 0 ? current - 1 : current));

  const [baseInfoForm] = useForm();
  const [configForm] = useForm();

  const handleNextStep = () => {
    baseInfoForm
      .validateFields()
      .then(() => {
        setActiveTab(current => (current < 2 ? current + 1 : current));
      })
      .catch(noop);
  };

  const handleCancel = () => {
    setFormValue(cloneDeep(IMPORT_CLUSTER_SPEC));
    setActiveTab(0);
    setYamlMode(false);
    onCancel();
  };

  const onCreateSuccess = (clusterName?: string) => {
    notify.success(t('CREATE_SUCCESSFUL'));
    handleCancel();
    if (onRefresh) {
      onRefresh();
    }
    if (clusterName) navigate(`/clusters/${clusterName}/overview`);
    else navigate('/clusters');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const postData = cloneDeep(formValue);
    const clusterName = get(postData, 'metadata.name');
    if (get(postData, 'spec.connection.type') === 'proxy') {
      unset(postData, 'spec.connection.kubeconfig');
      await clusterStore.post({}, postData).then(() => onCreateSuccess(clusterName));
    } else {
      const config = get(postData, 'spec.connection.kubeconfig', '');
      set(postData, 'spec.connection.kubeconfig', safeBtoa(config));
      await clusterStore
        .validate(postData)
        .then(async () => {
          await clusterStore.post({}, postData).then(() => onCreateSuccess());
        })
        .catch(e => {
          const { $emit } = useEventEmitter();
          $emit('globalMsg', {
            status: 400,
            reason: t('VALIDATION_FAILED'),
            message: e.response.data,
          });
        });
    }

    setIsSubmitting(false);
  };

  return (
    <Modal
      visible={visible}
      header={null}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      width="calc(100% - 1px)"
      style={{ maxWidth: 'initial', padding: 0 }}
      bodyStyle={{ border: 'none', height: '100vh', backgroundColor: '#eff4f9' }}
    >
      <Wrapper>
        {yamlMode ? (
          <YamlMode />
        ) : (
          <StyledSteps active={activeTab} classNames="test" iconSize="13px">
            <Step label={t('BASIC_INFORMATION')}>
              <StepItem>
                <ClusterBaseInfoFrom
                  form={baseInfoForm}
                  initialValues={formValue}
                  className="mt12"
                  onChange={setFormValue}
                />
              </StepItem>
            </Step>
            <Step label={t('CONNECTION_SETTINGS')}>
              <StepItem>
                <ConnectSettingStep form={configForm} />
              </StepItem>
            </Step>
          </StyledSteps>
        )}
        <HeaderLeft>
          <Close size={20} className="close-icon" onClick={handleCancel} />
          <Divider direction="vertical" style={{ margin: '0 12px' }} height={20} />
          <div className="title-wrapper">
            <Cluster size={20} className="title-icon" />
            {t('ADD_CLUSTER')}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Switch variant="button" label={t('EDIT_YAML')} onChange={setYamlMode} />
        </HeaderRight>
        <HeaderLine />
        <Footer>
          <div className="footer-inner">
            <Group>
              <Button onClick={handleCancel}>{t('CANCEL')}</Button>
              {activeTab > 0 && !yamlMode ? (
                <Button color="secondary" shadow onClick={prevStep}>
                  {t('PREVIOUS')}
                </Button>
              ) : null}
              {activeTab === 1 || yamlMode ? (
                <Button color="secondary" shadow onClick={handleSubmit} loading={isSubmitting}>
                  {t('Create')}
                </Button>
              ) : (
                <Button color="secondary" shadow onClick={handleNextStep}>
                  {t('NEXT')}
                </Button>
              )}
            </Group>
          </div>
        </Footer>
      </Wrapper>
    </Modal>
  );
};

export default AddClusterModal;
