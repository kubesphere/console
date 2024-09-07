/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { last, get } from 'lodash';
import { Link } from 'react-router-dom';
import { Entity, Field } from '@kubed/components';
import { getProjectAliasName, getClusterAliasName } from '../../../utils/caches';

import { formatTime, getDisplayName } from '../../../utils';
import { AppStatusWithLogInfo } from '../AppStatusWithLogInfo';

type Props = {
  version?: any;
  detail?: any;
  showVersion?: boolean;
  className?: string;
};

function InstanceItem({ detail, showVersion }: Props): JSX.Element {
  const { labels = {} } = detail || {};
  // TODO 这个地址不对！！！！！是否判断edge
  return (
    <Entity>
      <Field
        label={t('NAME')}
        value={
          <Link
            to={`/${labels['kubesphere.io/workspace']}/clusters/${labels['kubesphere.io/cluster']}/projects/${labels['kubesphere.io/namespace']}/deploy/${detail.name}`}
          >
            {getDisplayName(detail) || '-'}
          </Link>
        }
      />
      <Field
        label={t('STATUS')}
        value={
          <AppStatusWithLogInfo
            status={detail.status}
            showLogInfo={get(detail, 'spec.appType', '') === 'helm'}
            jobName={get(detail, '_status.installJobName', '')}
            message={get(detail, '_status.message', '')}
            cluster={get(detail, 'metadata.labels.["kubesphere.io/cluster"]', '')}
            namespace={get(detail, 'metadata.labels.["kubesphere.io/namespace"]', '')}
          />
        }
      />
      {showVersion && (
        <Field
          label={t('VERSION')}
          value={
            detail?.metadata?.annotations?.['application.kubesphere.io/app-versionName'] ||
            last(detail?.spec?.appVersionID.split('-')) ||
            '-'
          }
        />
      )}
      <Field
        label={t('PROJECT')}
        value={
          getProjectAliasName(
            detail?.metadata?.labels?.['kubesphere.io/namespace'],
            detail?.metadata?.labels?.['kubesphere.io/workspace'],
          ) || '-'
        }
      />
      <Field
        label={t('CLUSTER_PL')}
        value={getClusterAliasName(detail?.metadata?.labels?.['kubesphere.io/cluster']) || '-'}
      />
      <Field
        label={t('CREATION_TIME')}
        value={formatTime(
          detail?.metadata.creationTimestamp || detail?.create_time,
          'YYYY-MM-DD HH:mm:ss',
        )}
      />
    </Entity>
  );
}

export default InstanceItem;
