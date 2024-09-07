/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Card } from '@kubed/components';
import { useParams } from 'react-router-dom';

import { useCacheStore as useStore } from '../../../index';
import { AppInfo, LabelText } from './AppInfo';
import type { AppDetail } from '../../../types';
import { useAppVersionList } from '../../../stores/openpitrix';

export { AppInfo, LabelText };

export function AppInformation(): JSX.Element {
  const { appName, workspace } = useParams();
  const [selectedApp] = useStore<AppDetail>('selectedApp');
  const { data: versions = [] } = useAppVersionList(
    { appName: appName, workspace },
    { status: 'active' },
    { autoFetch: !!appName },
  );

  return (
    <Card sectionTitle={t('APP_INFORMATION')}>
      <AppInfo appDetail={selectedApp} versionDetail={versions} />
    </Card>
  );
}
