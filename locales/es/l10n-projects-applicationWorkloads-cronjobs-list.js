/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  CRONJOBS: 'Cronjobs',
  CRONJOB_DESC:
    'CronJobs manages Jobs on a time-based schedule and can be used to perform periodic or recurring tasks.',
  // List
  CRONJOB_PAUSED: 'Pausado',
  CRONJOB_RUNNING: 'En ejecución',
  CRONJOB_FAILED: 'Failed',
  // List > Create > Basic Information
  SCHEDULE: 'Schedule',
  ENTER_SCHEDULE_TIP: 'Please select a schedule.',
  CRONJOB_CRON_DESC:
    'Set a schedule for the CronJob. KubeSphere uses UTC by default and you need to adjust the schedule according to your time zone. <a href="//en.wikipedia.org/wiki/Cron" target="_blank">Learn More</a>',
  // List > Create > Advanced settings
  MAXIMUM_DELAY: 'Maximum Start Delay (s)',
  SUCCESSFUL_JOBS_RETAINED: 'Success Records',
  FAILED_JOBS_RETAINED: 'Failed Jobs Record',
  CONCURRENCY_POLICY: 'Concurrency Policy',
  MAXIMUM_DELAY_DESC:
    'Deadline for starting the Job if the scheduled run is missed for any reason.',
  CONCURRENCY_POLICY_DESC: 'Select a concurrency policy of a Job created by the CronJob.',
  FAILED_JOBS_RETAINED_DESC: 'Specify the number of failed Jobs to be retained.',
  SUCCESSFUL_JOBS_RETAINED_DESC: 'Specify the number of successful Jobs to be retained.',
  RUN_JOBS_CONCURRENTLY: 'Run Jobs concurrently',
  SKIP_NEW_JOB: 'Skip new Job',
  SKIP_OLD_JOB: 'Skip old Job',
  // List > Create > Strategy Settings
  STRATEGY_SETTINGS: 'Strategy Settings',
  MAXIMUM_RETRIES: 'Límite de retroceso',
  MAXIMUM_RETRIES_DESC:
    'Maximum number of retries before the Job is marked as failed. The default value is 6.',
  PARALLEL_PODS_DESC: 'Number of Pods that run concurrently.',
  COMPLETE_PODS_DESC:
    'Number of Pods that complete successfully required for the Job to be marked as complete.',
  MAXIMUM_DURATION_DESC:
    'Maximum duration of the Job. The Job is terminated when it reaches the specified deadline.',
  PARALLEL_PODS: 'Paralelismo',
  COMPLETE_PODS: 'Terminaciones',
  MAXIMUM_DURATION: 'Active Deadline (s)',
  // List > Create > Pod Settings
  RESTART_POLICY: 'Política de reinicio',
  RESTART_POLICY_DESC: 'Set the Pod restart policy.',
  // List > Create > Storage Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Pause
  // List > Delete
  CRONJOB_PL: 'CronJobs',
  CRONJOB_LOW: 'CronJob',
};
