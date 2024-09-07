/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { merge, set } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Modal, Input, Alert, LoadingOverlay, useForm } from '@kubed/components';
import {
  Icon,
  NumberInput,
  hpaStore,
  IHpaDetail,
  getApiVersion,
  memoryFormat,
} from '@ks-console/shared';
import { Loading, StyledFormItem, StyledForm } from './styles';

interface IProps {
  module: string;
  data: Record<string, any>;
  detail: Record<string, any>;
  confirmLoading?: boolean;
  visible: boolean;
  cancelText?: string;
  okText?: string;
  onOk?: (value: Record<string, any>, isEdit: boolean) => void;
  onCancel?: () => void;
}

const { checkName, fetchDetail } = hpaStore;

const AutoScalingModal = ({ visible, confirmLoading, detail, onOk, onCancel }: IProps) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [hpaDetail, setHpaDetail] = useState<IHpaDetail>();
  const [formData, setFormData] = useState<Record<string, any>>();

  const getFormDataFn = () => {
    if (!hpaDetail) {
      return;
    }
    const { name, namespace, uid, kind } = detail;
    const apiVersion = 'apps/v1';
    const {
      cpuCurrentUtilization = '',
      cpuTargetUtilization = '',
      memoryCurrentValue = '',
      memoryTargetValue = '',
    } = hpaDetail as IHpaDetail;
    return merge({}, hpaDetail?._originData, {
      metadata: {
        name,
        namespace,
        annotations: {
          cpuCurrentUtilization,
          cpuTargetUtilization,
          memoryCurrentValue,
          memoryTargetValue: memoryTargetValue ? memoryFormat(memoryTargetValue, 'Mi') + '' : '',
        },
        ownerReferences: [
          {
            apiVersion,
            blockOwnerDeletion: true,
            controller: true,
            kind,
            name,
            uid,
          },
        ],
      },
      spec: {
        minReplicas: hpaDetail?.minReplicas ?? 1,
        maxReplicas: hpaDetail?.maxReplicas ?? 1,
        scaleTargetRef: {
          apiVersion: 'apps/v1',
          kind,
          name,
        },
      },
    });
  };
  // @ts-expect-error
  const findMetric = (metrics, name) =>
    // @ts-expect-error
    metrics?.find(m => m.type === 'Resource' && m.resource.name === name)?.resource;

  // @ts-expect-error
  const findCurrent = (metrics, name) =>
    // @ts-expect-error
    metrics?.find(m => m.type === 'Resource' && m.resource.name === name)?.resource?.current;
  const fetchData = async () => {
    const { namespace, cluster, annotations = {} } = detail;
    const name = annotations['kubesphere.io/relatedHPA'] || detail.name;
    const checkNameParams = { name, cluster, namespace };
    const k8sVersion = globals.clusterConfig?.[cluster!]?.k8sVersion;
    const version = getApiVersion('horizontalpodautoscalers', k8sVersion);
    const url = `/clusters/${cluster}/apis/${version}/namespaces/${namespace}/horizontalpodautoscalers/${name}`;
    setLoading(true);
    const checkResult = await checkName(checkNameParams, {}, url);
    setIsEdit(checkResult.exist);
    if (checkResult.exist) {
      const fetchResult: IHpaDetail = await fetchDetail(checkNameParams, url);
      const { spec = {} } = fetchResult?._originData || {};
      const { status = {} } = fetchResult;
      const cpuTargetUtilization =
        findMetric(spec?.metrics, 'cpu')?.target?.averageUtilization || '';
      const memoryTargetValue = findMetric(spec?.metrics, 'memory')?.target?.averageValue || '';
      const cpuCurrentUtilization =
        findCurrent(status?.currentMetrics, 'cpu')?.current?.averageUtilization || 0;
      const memoryCurrentValue =
        findCurrent(status?.currentMetrics, 'memory')?.current?.averageValue || 0;
      const result = {
        ...fetchResult,
        minReplicas: spec?.minReplicas ?? 1,
        maxReplicas: spec?.maxReplicas ?? 1,
        cpuTargetUtilization,
        memoryTargetValue,
        cpuCurrentUtilization,
        memoryCurrentValue,
      };
      setHpaDetail(result);
    } else {
      setHpaDetail({} as IHpaDetail);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getFormData = getFormDataFn();
    setFormData(getFormData);
  }, [hpaDetail]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData);
    }
  }, [form, formData]);

  const onFinish = () => {
    form.validateFields().then(() => {
      const formValues = form.getFieldsValue(true);
      if (isEdit) {
        set(formValues, 'metadata.resourceVersion', null);
      }
      onOk?.(formValues, isEdit);
    });
  };

  return (
    <Modal
      width={691}
      title={t('AUTOSCALING')}
      titleIcon={<Icon name="firewall" size={20} />}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <StyledForm form={form} initialValues={formData} onFinish={onFinish}>
        <Loading>
          <LoadingOverlay visible={loading} />
        </Loading>
        <Alert type="info" showIcon={false}>
          {t('CONFIGURE_AUTOSCALING_DESC')}
        </Alert>
        <StyledFormItem
          label={t('RESOURCE_NAME')}
          name={['metadata', 'name']}
          rules={[{ required: true }]}
        >
          <Input disabled />
        </StyledFormItem>
        <StyledFormItem
          label={t('TARGET_CPU_USAGE_UNIT')}
          help={t('TARGET_CPU_USAGE_DESC')}
          name={['metadata', 'annotations', 'cpuTargetUtilization']}
        >
          {/* TODO: User should just only input Number  */}
          <NumberInput integer min={0} max={Infinity} defaultValue="" />
        </StyledFormItem>
        <StyledFormItem
          label={t('TARGET_MEMORY_USAGE_UNIT')}
          help={t('TARGET_MEMORY_USAGE_DESC')}
          name={['metadata', 'annotations', 'memoryTargetValue']}
        >
          <NumberInput unit={'Mi'} integer min={0} max={Infinity} defaultValue="" />
        </StyledFormItem>
        <StyledFormItem
          label={t('MINIMUM_REPLICAS')}
          help={t('MINIMUM_REPLICAS_DESC')}
          name={['spec', 'minReplicas']}
        >
          <NumberInput integer min={1} max={Infinity} defaultValue="1" />
        </StyledFormItem>
        <StyledFormItem
          label={t('MAXIMUM_REPLICAS')}
          help={t('MAXIMUM_REPLICAS_DESC')}
          name={['spec', 'maxReplicas']}
        >
          <NumberInput integer min={1} max={Infinity} defaultValue="1" />
        </StyledFormItem>
      </StyledForm>
    </Modal>
  );
};

export default AutoScalingModal;
