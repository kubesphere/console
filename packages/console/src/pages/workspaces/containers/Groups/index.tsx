/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Banner } from '@kubed/components';
import { Group } from '@kubed/icons';
import { useParams } from 'react-router-dom';
import WujieReact from 'wujie-react';

export default function BaseInfo() {
  const params: Record<string, any> = useParams();
  const { workspace } = params;
  const url = `//${window.location.host}/consolev3/workspaces/${workspace}/groups`;

  return (
    <>
      <Banner
        icon={<Group />}
        title={t('DEPARTMENT_PL')}
        description={t('DEPARTMENT_DESC')}
        className="mb12"
      />
      <div>
        <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />
      </div>
    </>
  );
}
