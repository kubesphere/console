/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DetailPage,
  FormattedUser,
  hasKSModule,
  useCommonActions,
  userStore,
} from '@ks-console/shared';
import { Trash } from '@kubed/icons';

const PATH = '/workspaces/:workspace/members/:name';
const AUTH_KEY = 'members';

export default function MembersDetail() {
  const params = useParams();
  const workspace = params.workspace;
  const navigate = useNavigate();
  const ref = useRef<any>(null);

  const { del } = useCommonActions({
    store: userStore,
    params,
    callback: (type: string) => {
      if (type === 'delete') {
        navigate(`/workspaces/${workspace}/members`);
      }
    },
  });

  const detail = ref.current?.detail || {};

  const actions = [
    {
      key: 'delete',
      icon: <Trash />,
      text: t('REMOVE'),
      action: 'delete',
      show: detail?.name !== globals.user.username,
      onClick: (record: any) =>
        del({
          ...record,
          type: 'USER',
        }),
      props: {
        color: 'error',
        shadow: true,
      },
    },
  ];

  const attrs = (data: FormattedUser) => [
    {
      label: t('WORKSPACE'),
      value: workspace,
    },
    {
      label: t('WORKSPACE_ROLE'),
      value: data?.workspacerole,
    },
    {
      label: t('EMAIL'),
      value: data?.email,
    },
  ];

  const tabs = [{ path: `${PATH}/projects`, title: t('PROJECT_PL') }];

  if (hasKSModule('devops')) {
    tabs.push({ path: `${PATH}/devops`, title: t('DEVOPS_PROJECT_PL') });
  }

  return (
    <DetailPage
      tabs={tabs}
      authKey={AUTH_KEY}
      store={userStore}
      ref={ref}
      sideProps={{
        actions,
        attrs,
        breadcrumbs: {
          label: t('WORKSPACE_MEMBER_PL'),
          url: `/workspaces/${workspace}/members`,
        },
      }}
    />
  );
}
