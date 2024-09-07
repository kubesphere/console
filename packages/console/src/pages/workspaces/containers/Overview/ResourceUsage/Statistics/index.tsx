/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { getActions, monitorStore, Constants } from '@ks-console/shared';
import { Card, Col, LoadingOverlay, Row } from '@kubed/components';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Info from '../../../../components/Info';

const { useFetchStatisticsQuery } = monitorStore;
const { ICON_TYPES } = Constants;

function ResourceStatistics() {
  const { workspace } = useParams();

  const getLink = (module: string) => {
    const actions = getActions({
      module,
      workspace,
    });

    if (actions.includes('view') || actions.includes('manage')) {
      return `/workspaces/${workspace}/${module}`;
    }

    return undefined;
  };

  const { formattedStatistics = {}, isLoading } = useFetchStatisticsQuery({
    workspace: workspace ?? '',
  });

  const metrics = useMemo(() => {
    const data: Record<string, any> = {};

    Object.entries(formattedStatistics).forEach(([key, value]) => {
      data[key] = `${get(value, 'data.result[0].value[1]', 0)}`;
    });

    return data;
  }, [formattedStatistics]);

  return (
    <Card className="mb12">
      <LoadingOverlay visible={isLoading} />
      <Row>
        {/* <Col span={3}>
          <Info
            icon={ICON_TYPES.projects}
            desc={metrics.workspace_namespace_count === '1' ? t('PROJECT') : t('PROJECT_PL')}
            title={metrics.workspace_namespace_count}
            url={getLink('projects')}
            size="large"
          />
        </Col> */}
        {/* {hasKSModule('devops') && (
          <Col span={3}>
            <Info
              icon={ICON_TYPES.devops}
              desc={
                metrics.workspace_devops_project_count === '1'
                  ? t('DEVOPS_PROJECT_TCAP')
                  : t('DEVOPS_PROJECT_TCAP_PL')
              }
              title={metrics.workspace_devops_project_count || 0}
              url={getLink('devops')}
              size="large"
            />
          </Col>
        )} */}

        <Col span={3}>
          <Info
            icon={ICON_TYPES.roles}
            desc={metrics.workspace_workspacerole_count === '1' ? t('ROLE') : t('ROLE_PL')}
            title={metrics.workspace_workspacerole_count}
            url={getLink('roles')}
            size="large"
          />
        </Col>
        <Col span={3}>
          <Info
            icon={ICON_TYPES.members}
            desc={
              metrics.workspace_workspacerolebinding_count === '1'
                ? t('WORKSPACE_MEMBER_TCAP')
                : t('WORKSPACE_MEMBER_TCAP_PL')
            }
            title={metrics.workspace_workspacerolebinding_count}
            url={getLink('members')}
            size="large"
          />
        </Col>
      </Row>
    </Card>
  );
}

export default ResourceStatistics;
