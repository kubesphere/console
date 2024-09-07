/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Constants } from '@ks-console/shared';
import { Snapshot } from '@kubed/icons';
import * as React from 'react';

export const tabs = () => [
  {
    id: 'volume-snapshots/snapshots',
    navLabel: t('VOLUME_SNAPSHOT'),
    banner: { icon: <Snapshot /> },
  },
  {
    id: 'volume-snapshots/snapshot-content',
    navLabel: t('VOLUME_SNAPSHOT_CONTENT'),
    banner: { icon: <Snapshot /> },
  },
];

export const banner = () => ({
  icon: <Snapshot />,
  title: t('VOLUME_SNAPSHOT_PL'),
  description: t('VOLUME_SNAPSHOT_DESC'),
  tips: [
    {
      title: t('WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q'),
      key: 'WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q',
      children: t('WHAT_IS_VOLUME_SNAPSHOT_CLASS_A'),
    },
    {
      title: t('WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q'),
      key: 'WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q',
      children: t('WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A'),
    },
  ],
});

export const getStatusSelectOption = () =>
  Constants.VOLUME_SNAPSHOT_STATUS.map(status => ({
    label: t(status.text),
    key: status.value,
  }));
