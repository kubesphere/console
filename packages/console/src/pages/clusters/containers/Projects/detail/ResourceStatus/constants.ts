/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const timeOptions = () => [
  { label: t('LAST_TIME_H', { count: 1 }), value: 3600 },
  { label: t('LAST_TIME_H', { count: 2 }), value: 7200 },
  { label: t('LAST_TIME_H', { count: 5 }), value: 18000 },
  { label: t('LAST_TIME_H', { count: 12 }), value: 43200 },
  { label: t('LAST_TIME_D', { count: 1 }), value: 86400 },
  { label: t('LAST_TIME_D', { count: 2 }), value: 172800 },
  { label: t('LAST_TIME_D', { count: 3 }), value: 259200 },
  { label: t('LAST_TIME_D', { count: 7 }), value: 604800 },
];
