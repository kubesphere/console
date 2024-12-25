/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { Card } from '@kubed/components';
import { useParams } from 'react-router-dom';

import { useCacheStore as useStore } from '../../../index';
import { AppInfo, LabelText } from './AppInfo';
import type { AppDetail } from '../../../types';

import { isRadonDB } from '../../../utils';
import { openpitrixStore } from '../../../stores';

const { useAppVersionList, fetchAppDetail, fetchDMPDetail } = openpitrixStore;
export { AppInfo, LabelText };

export function AppInformation(): JSX.Element {
  const { appName, workspace } = useParams();
  // const [selectedApp, setSelectedApp] = useStore<AppDetail>('selectedApp');
  const [selectedAppState, setSelectedAppState] = useState<AppDetail | null>(null);

  const { data: versions = [] } = useAppVersionList(
    { appName: appName, workspace },
    { status: 'active' },
    { autoFetch: !!appName },
  );

  useEffect(() => {
    if (!appName) return;
    (isRadonDB(appName) ? fetchDMPDetail : fetchAppDetail)({ appName, app_id: appName }).then(
      setSelectedAppState,
    );
  }, [appName]);

  return (
    <Card sectionTitle={t('APP_INFORMATION')}>
      <AppInfo appDetail={selectedAppState} versionDetail={versions} />
    </Card>
  );
}
