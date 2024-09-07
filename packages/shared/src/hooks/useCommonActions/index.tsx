/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { createRef } from 'react';
import {
  Form,
  FormItem,
  Input,
  notify,
  Select,
  Textarea,
  useForm,
  useModal,
} from '@kubed/components';
import { Eye, Pen } from '@kubed/icons';
import { CodeEditor, CodeEditorRef } from '@kubed/code-editor';

import yaml from '../../utils/yaml';
import type { DeleteConfirmContentProps } from '../../components/Modals/DeleteConfirm/DeleteConfirm';
import { DeleteConfirmContent } from '../../components/Modals/DeleteConfirm/DeleteConfirm';
import type { PathParams } from '../../types';

interface BaseInfoProps extends Record<string, any> {
  initialValues?: any;
  onOk?: (data?: any) => Promise<any>;
  extraForm?: React.ReactNode;
  categories?: { label: string; value: string }[];
}

interface EditYamlProps extends Record<string, any> {
  initialValues?: any;
  onOk?: (data?: any, initialValues?: any) => Promise<any>;
  readOnly?: boolean;
}

interface DelProps extends DeleteConfirmContentProps, Record<string, any> {}

type CallbackType = 'editBaseInfo' | 'editYaml' | 'delete';

interface CommonActionProps {
  store?: any;
  callback?: (type: CallbackType) => void;
  params?: PathParams;
}

const useCommonActions = ({ store, callback = () => {}, params = {} }: CommonActionProps) => {
  const modal = useModal();
  const [form] = useForm();
  const codeEditorRef = createRef<CodeEditorRef>();

  const editBaseInfo = (props: BaseInfoProps, k8sVersion = '') => {
    form.resetFields();
    let onOk: any;
    let initialValues: any;

    if (!props.onOk) {
      initialValues = props.initialValues || props;
      onOk = async (data: any) => {
        await store.patch({ ...initialValues, ...params }, data, undefined, k8sVersion);
        notify.success(t('UPDATE_SUCCESSFUL'));
        callback('editBaseInfo');
      };
    } else {
      initialValues = props.initialValues;
      onOk = props.onOk;
    }

    form.setFieldsValue(initialValues._originData);

    modal.open({
      title: t('EDIT_INFORMATION'),
      titleIcon: <Pen />,
      width: 691,
      className: 'modal-pd',
      onAsyncOk: async () => {
        await form.validateFields();
        const data = form.getFieldsValue(true);
        await onOk(data);
        return true;
      },
      content: (
        <Form form={form} key={initialValues.name}>
          <FormItem label={t('NAME')} name={['metadata', 'name']}>
            <Input disabled />
          </FormItem>
          <FormItem
            label={t('ALIAS')}
            help={t('ALIAS_DESC')}
            name={['metadata', 'annotations', 'kubesphere.io/alias-name']}
          >
            <Input maxLength={63} />
          </FormItem>
          {props.extraForm}
          {!!props.categories?.length && (
            <FormItem
              label={t('Tag')}
              help={t('CLUSTER_TAG_EMPTY_DESC')}
              name={['metadata', 'labels', 'application.kubesphere.io/app-category-name']}
            >
              <Select options={props.categories} />
            </FormItem>
          )}
          <FormItem
            label={t('DESCRIPTION')}
            help={t('DESCRIPTION_DESC')}
            name={['metadata', 'annotations', 'kubesphere.io/description']}
          >
            <Textarea maxLength={256} />
          </FormItem>
        </Form>
      ),
    });
  };

  const editYaml = (props: EditYamlProps, k8sVersion = '') => {
    let { initialValues, onOk, readOnly } = props;
    const title = readOnly ? t('VIEW_YAML') : t('EDIT_YAML');
    const icon = readOnly ? <Eye /> : <Pen />;
    const footer = readOnly ? null : undefined;
    const bodyHeight = readOnly ? 'calc(100vh - 106px)' : 'calc(100vh - 170px)';
    if (!initialValues) initialValues = props;
    if (!onOk) {
      onOk = async (data: any) => {
        await store.put({ ...initialValues, ...params }, yaml.load(data), false, k8sVersion);
        notify.success(t('UPDATE_SUCCESSFUL'));
        callback('editYaml');
      };
    }

    const yamlValue = yaml.getValue(initialValues._originData);

    modal.open({
      title,
      titleIcon: icon,
      content: (
        <CodeEditor
          ref={codeEditorRef}
          mode="yaml"
          acceptFileTypes={['.yaml', '.yml']}
          fileName="config.yaml"
          readOnly={readOnly}
          value={yamlValue}
        />
      ),
      footer,
      className: 'modal-fullscreen',
      width: 'calc(100vw - 40px)',
      bodyStyle: { padding: '20px', height: bodyHeight },
      onAsyncOk: async () => {
        if (!onOk) return;
        // @ts-ignore
        const newYaml = codeEditorRef.current?.getValue();
        await onOk(newYaml, initialValues);
        return true;
      },
    });
  };

  const del = (props: DelProps, k8sVersion = '') => {
    const { type, resource, onOk, onCancel = () => {}, ...rest } = props;
    const items = resource ? resource : Array.isArray(props) ? props : [props];
    const handleOk = async () => {
      const deleteParams = items.map(item => ({
        namespace: item.namespace,
        name: item.name,
        ...params,
      }));
      await store.batchDelete(deleteParams, k8sVersion);
      notify.success(t('DELETED_SUCCESSFULLY'));
      callback('delete');
    };

    const modalId = modal.open({
      header: null,
      footer: null,
      closable: false,
      width: 504,
      content: (
        <DeleteConfirmContent
          onOk={onOk || handleOk}
          resource={items}
          type={type || store.module}
          onCancel={() => {
            onCancel();
            modal.close(modalId);
          }}
          {...rest}
        />
      ),
    });
  };

  return {
    editBaseInfo,
    editYaml,
    del,
  };
};

export default useCommonActions;
