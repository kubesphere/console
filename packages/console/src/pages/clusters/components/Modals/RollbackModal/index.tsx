/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { get, sortBy } from 'lodash';
import { StyledModal } from './styles';
import { Icon, useRevisionStore, getCurrentRevision } from '@ks-console/shared';
import type { OriginData } from '@ks-console/shared';
import { Form, useForm, FormItem, Input, Select, LoadingOverlay } from '@kubed/components';

interface IProps {
  module: string;
  detail: Record<string, any>;
  initialValues: OriginData;
  visible?: boolean;
  confirmLoading?: boolean;
  hideFooter?: boolean;
  cancelText?: string;
  okText?: string;
  onOk?: (value: OriginData) => void;
  onCancel?: () => void;
}

const RollbackModal = ({
  module,
  detail,
  initialValues,
  visible,
  confirmLoading,
  onCancel,
  onOk,
}: IProps) => {
  const [form] = useForm();
  const [fetchLoading, setFetchLoading] = useState(true);
  const { fetchList } = useRevisionStore({ module });

  const [revisionList, setRevisionList] = useState<Record<string, any>[]>([]);

  const getCurRevision = useCallback(
    ({ revisions }: { revisions: Record<string, any>[] }) => {
      return getCurrentRevision({ workloadDetail: detail, revisions, module: module });
    },
    [detail],
  );

  const curRevision = getCurRevision({ revisions: revisionList });

  const fetchRevisionList = useCallback(async () => {
    setFetchLoading(true);
    const list = await fetchList(detail as any);
    setRevisionList(list);
    setFetchLoading(false);
  }, [detail]);

  useEffect(() => {
    if (!detail) {
      return;
    }
    fetchRevisionList();
  }, [detail]);

  const onFinish = () => {
    form.validateFields().then(() => {
      const formData = form.getFieldsValue(true);
      const selectedRevision = revisionList.find(
        item => Number(item.revision) === formData.revision,
      );
      let data;
      if (module === 'deployments') {
        data = [
          {
            op: 'replace',
            path: '/spec/template',
            value: get(selectedRevision, 'spec.template'),
          },
          {
            op: 'replace',
            path: '/metadata/annotations',
            value: detail.annotations,
          },
        ];
      } else {
        data = {
          spec: {
            template: {
              $patch: 'replace',
              ...get(selectedRevision, 'spec.template'),
            },
          },
        };
      }

      onOk?.(data);
    });
  };

  const handleOk = () => form.submit();

  const formData = {
    name: get(initialValues, 'metadata.name', ''),
    currentRevision: `#${curRevision}`,
    revision: null,
  };

  const options = useMemo(() => {
    const revisions = sortBy(revisionList, item => parseInt(item.revision, 10));

    return revisions
      .map(({ revision }) => ({
        label: `#${revision}`,
        value: Number(revision),
      }))
      .filter(item => item.value !== curRevision);
  }, [revisionList]);

  const Option = Select.Option;
  return (
    <StyledModal
      title={t('ROLL_BACK')}
      titleIcon={<Icon name="timed-task" />}
      width={691}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      {fetchLoading ? (
        <LoadingOverlay visible={fetchLoading} />
      ) : (
        <Form form={form} initialValues={formData} onFinish={onFinish}>
          <FormItem label={t('RESOURCE_NAME')} name={['name']}>
            <Input disabled />
          </FormItem>
          <FormItem label={t('CURRENT_REVISION_RECORD')} name={['currentRevision']}>
            <Input disabled />
          </FormItem>
          <FormItem label={t('TARGET_REVISION_RECORD')} name={['revision']}>
            <Select>
              {options.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      )}
    </StyledModal>
  );
};

export default RollbackModal;
