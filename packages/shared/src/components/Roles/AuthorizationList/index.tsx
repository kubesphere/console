/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get, groupBy, isEmpty } from 'lodash';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Card, Loading } from '@kubed/components';

import RuleList from '../RuleList';
import { roleStore } from '../../../stores';
import { FormattedRole, RoleModule } from '../../../types';
import { useDetailPage } from '../../Layouts/DetailPage';

interface Props {
  module: string;
}

const Empty = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #abb4be;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: #f9fbfd;
  border-radius: 4px;
`;

const Title = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  zoom: 1;
`;

function AuthorizationList({ module }: Props) {
  const { getTemplates, getTemplatesCategory } = roleStore(`${module}roles`);

  const { data: roleTemplates = [], isLoading } = useQuery<FormattedRole[]>(
    [`globals-${module}`],
    async () => {
      const res = await getTemplates(module);
      return res;
    },
  );

  const { data: roleModules = [] } = useQuery<RoleModule[]>([`${module}_category`], async () => {
    const res = await getTemplatesCategory(module);
    return res;
  });

  const { detail: roleDetail } = useDetailPage<FormattedRole>();

  const templates = groupBy(
    roleTemplates?.filter(
      rt =>
        get(rt, 'labels["iam.kubesphere.io/category"]') &&
        roleDetail?.roleTemplates.includes(rt.name),
    ),
    'labels["iam.kubesphere.io/category"]',
  );

  return isLoading ? (
    <Loading className="page-loading" />
  ) : (
    <Card hoverable={true} padding={20}>
      {isEmpty(templates) ? (
        <Empty>{t('NO_PERMISSION')}</Empty>
      ) : (
        <>
          <Title>{t('PERMISSION_PL')}</Title>
          <RuleList templates={templates} roleModules={roleModules} />
        </>
      )}
    </Card>
  );
}

export default AuthorizationList;
