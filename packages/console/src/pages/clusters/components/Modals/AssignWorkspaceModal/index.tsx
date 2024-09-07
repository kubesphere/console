/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { OriginData, PathParams } from '@ks-console/shared';
import { Alert, Form, FormItem, Select, useForm, useWatch } from '@kubed/components';
import { Firewall } from '@kubed/icons';
import { debounce, set } from 'lodash';
import React, { UIEvent } from 'react';
import { useInfinityQueryUserList } from '../../../stores/user';
import { useInfinityQueryWorkspaceList } from '../../../stores/workspace';
import { Modalbody, ModalStyle } from './styles';

interface Props {
  initialValues: OriginData;
  visible?: boolean;
  onOk?: (value: OriginData) => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  hideFooter?: boolean;
  cancelText?: string;
  okText?: string;
  params?: PathParams;
}

function AssignWorkspaceModal({
  visible,
  onOk,
  onCancel,
  confirmLoading,
  initialValues,
  params = {},
}: Props) {
  const [form] = useForm();
  const handleOk = () => form.submit();

  const [workspaceName, setWorkspaceName] = React.useState('');
  // const [workspace, setWorkspace] = React.useState(
  //   get(initialValues, 'metadata.labels["kubesphere.io/workspace"]', ''),
  // );

  const workspace = useWatch(['metadata', 'labels', 'kubesphere.io/workspace'], form);

  React.useEffect(() => {
    form.setFieldValue(['metadata', 'annotations', 'kubesphere.io/creator'], '');
  }, [workspace]);

  // workspace
  const {
    data: workspaces = [],
    hasNextPage,
    fetchNextPage,
  } = useInfinityQueryWorkspaceList(params, {
    name: workspaceName,
    limit: 10,
    page: 1,
  });

  const onFinish = () => {
    form.validateFields().then(() => {
      const data = form.getFieldsValue(true);
      set(data, 'metadata.labels["kubesphere.io/managed"]', 'true');
      onOk?.(data);
    });
  };

  const onSearch = debounce((val: string) => setWorkspaceName(val), 500);
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!hasNextPage) {
      return;
    }
    //@ts-ignore
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight - scrollHeight >= 0) {
      fetchNextPage();
    }
  };
  const options = workspaces.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const [userName, setUserName] = React.useState('');
  // user
  const {
    data: users = [],
    hasNextPage: userHasMore,
    fetchNextPage: userNext,
  } = useInfinityQueryUserList(
    { workspace },
    {
      name: userName,
      limit: 10,
      page: 1,
    },
    {
      enabled: !!workspace,
    },
  );

  const userOptions = (users ?? []).map(({ name }) => ({
    label: name,
    value: name,
  }));

  const onUserSearch = debounce((val: string) => setUserName(val), 500);
  const onUserScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!userHasMore) {
      return;
    }
    //@ts-ignore
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight - scrollHeight >= 0) {
      userNext();
    }
  };

  return (
    <ModalStyle
      title={t('ASSIGN_WORKSPACE')}
      titleIcon={<Firewall />}
      width={691}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <Modalbody>
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          onFieldsChange={([]) => {}}
        >
          <Alert showIcon={false} className="mb12" type={'info'}>
            {t('PROJECT_ASSIGN_DESC')}
          </Alert>
          <FormItem
            label={t('WORKSPACE')}
            name={['metadata', 'labels', 'kubesphere.io/workspace']}
            help={t('SELECT_WORKSPACE_DESC')}
          >
            <Select
              showSearch
              options={options}
              onPopupScroll={debounce(onScroll, 500)}
              onSearch={onSearch}
              allowClear
            />
          </FormItem>
          <FormItem
            label={t('PROJECT_ADMINISTRATOR')}
            name={['metadata', 'annotations', 'kubesphere.io/creator']}
          >
            <Select
              showSearch
              options={userOptions}
              onPopupScroll={debounce(onUserScroll, 500)}
              onSearch={onUserSearch}
              onChange={setUserName}
              allowClear
            />
          </FormItem>
        </Form>
      </Modalbody>
    </ModalStyle>
  );
}

export default AssignWorkspaceModal;
