/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import dayjs from 'dayjs';

import { AppVersion } from '../../../../types';

type Props = {
  versions: AppVersion[];
};

function VersionTable({ versions }: Props): JSX.Element {
  return (
    <table className="versions">
      <thead>
        <tr>
          <th>{t('VERSION_NUMBER')}</th>
          <th>{t('UPDATE_LOG')}</th>
        </tr>
      </thead>

      <tbody>
        {versions.map(({ metadata, spec, status }) => (
          <tr key={spec.versionName}>
            <td>
              <p className="name">{metadata.name}</p>
              <p className="date">{dayjs(spec.created).format('YYYY-MM-DD')}</p>
            </td>
            <td>
              <p className="desc">{status.message || '-'}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VersionTable;
