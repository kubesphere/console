/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Alert, Modal } from '@kubed/components';
import { Wrench } from '@kubed/icons';
import { Content, Title, Wrapper } from './styles';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { getCommonTaints } from './helper';
import { isEmpty } from 'lodash';
import { Taint } from './Taint';
import { CommonTaint } from './CommonTaint';
import { FormattedNode, TaintType } from '@ks-console/shared';

type TaintModalProps = {
  visible: boolean;
  confirmLoading?: boolean;
  onCancel: () => void;
  onOk: (data: any) => void;
  nodes: FormattedNode[];
};
type FormValues = {
  commonTaints: TaintType[];
  formattedNodes: FormattedNode[];
};
export const TaintBatchModal = ({
  visible,
  confirmLoading,
  onCancel,
  onOk,
  nodes,
}: TaintModalProps) => {
  const commonTaints = getCommonTaints(nodes);
  const commonTaintsKeys = commonTaints.map((taint: TaintType) => taint.key);
  // Iterate through each node to set the taint
  const formattedNodes = nodes.map(node => {
    const taints =
      node.taints?.filter(
        taint =>
          (isEmpty(taint.key) && isEmpty(taint.value)) || !commonTaintsKeys.includes(taint.key),
      ) ?? [];
    return {
      ...node,
      taints:
        taints.length > 0
          ? taints
          : [
              {
                key: '',
                value: '',
                effect: 'NoSchedule',
              },
            ],
    };
  });
  const formMethods = useForm<FormValues>({
    defaultValues: {
      commonTaints,
      formattedNodes,
    },
  });

  const handleOk = () => {
    const result = formMethods.getValues().formattedNodes.map(node => ({
      ...node,
      taints: [...(node?.taints ?? []), ...formMethods.getValues().commonTaints].filter(
        t => !isEmpty(t.key),
      ),
    }));
    onOk(result);
  };
  useEffect(() => {
    formMethods.setValue('commonTaints', commonTaints);
  }, [visible]);
  return (
    <Modal
      width={1162}
      visible={visible}
      titleIcon={<Wrench size={20} />}
      title={t('EDIT_TAINTS')}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <FormProvider {...formMethods}>
        <Wrapper>
          <Title>{t('TAINTS')}</Title>
          <Alert type="info" showIcon={false}>
            {t('TAINTS_DESC')}
          </Alert>
          <Content>
            {nodes.length > 1 ? <CommonTaint></CommonTaint> : null}
            {formattedNodes.map((node, index) => {
              return <Taint nodeName={node.name} key={node.uid} nodeIndex={index} />;
            })}
          </Content>
        </Wrapper>
      </FormProvider>
    </Modal>
  );
};
