/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  CRONJOBS: '定时任务',
  CRONJOB_DESC: '定时任务（CronJob）管理基于时间的任务（Job），可用于运行周期性任务或重复性任务。',
  // List
  CRONJOB_PAUSED: '已暂停',
  CRONJOB_RUNNING: '运行中',
  CRONJOB_FAILED: '失败',
  // List > Create > Basic Information
  SCHEDULE: '定时计划',
  ENTER_SCHEDULE_TIP: '请选择定时计划。',
  CRONJOB_CRON_DESC:
    '为定时任务设置定时计划。KubeSphere 默认使用 UTC 时间, 您需要根据时区调整定时计划。<a href="//en.wikipedia.org/wiki/Cron" target="_blank">了解更多</a>',
  // List > Create > Advanced settings
  MAXIMUM_DELAY: '最大启动延后时间（s）',
  SUCCESSFUL_JOBS_RETAINED: '成功任务保留数量',
  FAILED_JOBS_RETAINED: '失败任务保留数量',
  CONCURRENCY_POLICY: '并发策略',
  MAXIMUM_DELAY_DESC: '由于某种原因未能按计划启动任务时，任务启动的最大延后时间。',
  CONCURRENCY_POLICY_DESC: '定时任务创建的多个任务发生重叠时，系统采取的策略。',
  FAILED_JOBS_RETAINED_DESC: '允许保留的失败任务的个数。默认值为 1。',
  SUCCESSFUL_JOBS_RETAINED_DESC: '允许保留的成功任务的个数。默认值为 3。',
  RUN_JOBS_CONCURRENTLY: '同时运行任务',
  SKIP_NEW_JOB: '跳过新任务',
  SKIP_OLD_JOB: '跳过旧任务',
  // List > Create > Strategy Settings
  STRATEGY_SETTINGS: '策略设置',
  MAXIMUM_RETRIES: '最大重试次数',
  MAXIMUM_RETRIES_DESC: '将任务标记为失败前的最大重试次数。默认值为 6。',
  PARALLEL_PODS_DESC: '并行运行的容器组数量。',
  COMPLETE_PODS_DESC: '将任务标记为完成所需成功运行的容器组数量。',
  MAXIMUM_DURATION_DESC: '任务的最大运行时间。任务达到最大运行时间时将被结束。',
  PARALLEL_PODS: '并行容器组数量',
  COMPLETE_PODS: '容器组完成数量',
  MAXIMUM_DURATION: '最大运行时间（s）',
  // List > Create > Pod Settings
  RESTART_POLICY: '重启策略',
  RESTART_POLICY_DESC: '选择容器组中的容器异常退出时，系统采取的策略。',
  // List > Create > Storage Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Pause
  // List > Delete
  CRONJOB_PL: '定时任务',
  CRONJOB_LOW: '定时任务',
};
