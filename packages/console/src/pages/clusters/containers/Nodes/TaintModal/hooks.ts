export const useScheduleOptions = () => {
  return [
    { label: t('NOSCHEDULE'), value: 'NoSchedule' },
    { label: t('PREFER_NOSCHEDULE'), value: 'PreferNoSchedule' },
    { label: t('NOEXECUTE'), value: 'NoExecute' },
  ];
};
