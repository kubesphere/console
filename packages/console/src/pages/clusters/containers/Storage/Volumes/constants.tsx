/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Constants } from '@ks-console/shared';
import { Storage } from '@kubed/icons';
import { includes, isEmpty } from 'lodash';
import React from 'react';

export const tabs = () => [
  {
    id: 'Volumes/Volumes',
    navLabel: t('PERSISTENT_VOLUME_CLAIM'),
    banner: { icon: <Storage /> },
  },
  {
    id: 'Volumes/PV',
    navLabel: t('PERSISTENT_VOLUME'),
    banner: { icon: <Storage /> },
  },
];

export const banner = () => ({
  icon: <Storage />,
  title: t('PERSISTENT_VOLUME_CLAIM_PL'),
  description: t('PERSISTENT_VOLUME_CLAIM_DESC'),
  tips: [
    {
      title: t('WHAT_IS_STORAGE_CLASS_Q'),
      key: 'WHAT_IS_STORAGE_CLASS_Q',
      children: t('WHAT_IS_STORAGE_CLASS_A'),
    },
    {
      title: t('WHAT_IS_LOCAL_VOLUME_Q'),
      key: 'WHAT_IS_LOCAL_VOLUME_Q',
      children: t('WHAT_IS_LOCAL_VOLUME_A'),
    },
  ],
});

export const getPVStatus = <T extends Record<string, any>>(record: T) => {
  const conditions = record?.status?.conditions ?? ([] as string[]);

  if (!isEmpty(conditions)) {
    const detailedStatus =
      conditions.find(({ type }: { type: string }) =>
        includes(['FileSystemResizePending', 'Resizing'], type),
      ) || {};

    return detailedStatus.type;
  }
};

export const LOCALES_STATUS: Record<string, string> = {
  Bound: 'VOLUME_STATUS_BOUND',
  Lost: 'VOLUME_STATUS_LOST',
  Pending: 'VOLUME_STATUS_PENDING',
  Terminating: 'VOLUME_STATUS_TERMINATING',
  Updating: 'VOLUME_STATUS_UPDATING',
};

export const getStatusSelectOption = () =>
  Constants.VOLUME_SNAPSHOT_CLASS_STATUS.map(status => ({
    label: t(status.text),
    key: status.value,
  }));

export const getVolumeStatus = <T extends Record<string, any>>(record: T) => {
  const conditions = record?.status?.conditions ?? ([] as string[]);

  if (!isEmpty(conditions)) {
    const detailedStatus =
      conditions.find(({ type }: { type: string }) =>
        includes(['FileSystemResizePending', 'Resizing'], type),
      ) || {};

    return detailedStatus.type;
  }
};
// export const columns: Record<
//   | 'name'
//   | 'pvStatus'
//   | 'volumeStatus'
//   | 'capacity'
//   | 'accessModes'
//   | 'originData'
//   | 'createTime'
//   | 'inUse',
//   Column
// > = {
//   name: {
//     title: t('NAME'),
//     field: 'name',
//     sortable: true,
//     searchable: true,
//     render: (value, record) => {
//       return <Avatar description={record.description} record={record} to={`./${value}`} />;
//     },
//   },
//   pvStatus: {
//     title: t('STATUS'),
//     field: 'status',
//     canHide: true,
//     searchable: true,
//     filterOptions: getStatusSelectOption(),
//     width: '15%',
//     render: (value, { phase }) => (
//       <StatusIndicator type={phase}>{t(`VOLUME_STATUS_${phase.toUpperCase()}`)}</StatusIndicator>
//     ),
//   },
//   volumeStatus: {
//     title: t('STATUS'),
//     field: 'status',
//     canHide: true,
//     searchable: true,
//     filterOptions: getStatusSelectOption(),
//     width: '15%',
//     render: (value, { phase }) => (
//       <StatusIndicator type={phase}>{t(phase ? LOCALES_STATUS[phase] : '')}</StatusIndicator>
//     ),
//   },
//   capacity: {
//     title: t('CAPACITY'),
//     field: 'capacity',
//     canHide: true,
//     width: '7%',
//     render: capacity => (
//       <div>
//         <p>{capacity}</p>
//       </div>
//     ),
//   },
//   accessModes: {
//     title: renderAccessTitle(),
//     field: 'accessModes',
//     canHide: true,
//     width: '10%',
//     render: accessModes => {
//       return renderAccessMode(accessModes);
//     },
//   },
//   originData: {
//     title: t('RECLAIM_POLICY'),
//     field: '_originData',
//     canHide: true,
//     width: '7.74%',
//     render: _ => _.spec.persistentVolumeReclaimPolicy,
//   },
//   createTime: {
//     title: t('CREATION_TIME_TCAP'),
//     field: 'createTime',
//     sortable: true,
//     canHide: true,
//     width: '15%',
//     render: time => formatTime(time),
//   },
//   inUse: {
//     title: t('MOUNT_STATUS'),
//     field: 'inUse',
//     canHide: true,
//     width: '12%',
//     render: inUse => (inUse ? t('MOUNTED') : t('NOT_MOUNTED')),
//   },
// };
