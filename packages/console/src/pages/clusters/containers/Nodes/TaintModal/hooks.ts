/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const useScheduleOptions = () => {
  return [
    { label: t('NOSCHEDULE'), value: 'NoSchedule' },
    { label: t('PREFER_NOSCHEDULE'), value: 'PreferNoSchedule' },
    { label: t('NOEXECUTE'), value: 'NoExecute' },
  ];
};
