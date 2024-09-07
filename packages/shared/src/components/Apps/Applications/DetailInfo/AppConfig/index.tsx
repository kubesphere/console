/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Card } from '@kubed/components';
import { CodeEditor } from '@kubed/code-editor';

import { useCacheStore as useStore } from '../../../../../hooks';
import { safeAtob } from '../../../../../utils';

function AppConfig(): JSX.Element {
  const [appDetail] = useStore<any>('appDetail');
  return (
    <Card sectionTitle={t('APP_SETTINGS')}>
      <CodeEditor
        mode="yaml"
        style={{ height: 'calc(100vh - 240px)' }}
        value={safeAtob(appDetail.spec?.values || '')}
        hasUpload={false}
        hasDownload={false}
      />
    </Card>
  );
}

export default AppConfig;
