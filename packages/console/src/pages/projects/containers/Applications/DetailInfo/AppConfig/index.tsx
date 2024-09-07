/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Card } from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { CodeEditor } from '@kubed/code-editor';

function AppConfig(): JSX.Element {
  const [appDetail] = useStore<any>('appDetail');

  return (
    <Card sectionTitle={t('APP_SETTINGS')}>
      <CodeEditor
        mode="yaml"
        style={{ height: 'calc(100vh - 240px)' }}
        value={appDetail.env || ''}
        hasUpload={false}
        hasDownload={false}
      />
    </Card>
  );
}

export default AppConfig;
