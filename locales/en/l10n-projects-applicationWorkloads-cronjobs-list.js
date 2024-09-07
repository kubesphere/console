/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  CRONJOBS: 'Cronjobs',
  CRONJOB_DESC:
    'Cronjobs manage jobs on a time-based schedule and can be used to perform periodic or recurring tasks.',
  // List
  CRONJOB_PAUSED: 'Paused',
  CRONJOB_RUNNING: 'Running',
  CRONJOB_FAILED: 'Failed',
  // List > Create > Basic Information
  SCHEDULE: 'Schedule',
  ENTER_SCHEDULE_TIP: 'Please select a schedule.',
  CRONJOB_CRON_DESC:
    'Set a schedule for the cronjob. KubeSphere uses UTC by default and you need to adjust the schedule according to your time zone. <a href="//en.wikipedia.org/wiki/Cron" target="_blank">Learn More</a>',
  // List > Create > Advanced settings
  MAXIMUM_DELAY: 'Maximum Start Delay (s)',
  SUCCESSFUL_JOBS_RETAINED: 'Successful Jobs Retained',
  FAILED_JOBS_RETAINED: 'Failed Jobs Retained',
  CONCURRENCY_POLICY: 'Concurrency Policy',
  MAXIMUM_DELAY_DESC:
    'Maximum delay before starting a scheduled job when the job is missed for certain reasons.',
  CONCURRENCY_POLICY_DESC:
    'Policy adopted by the system when multiple jobs of the cronjob overlap with each other.',
  FAILED_JOBS_RETAINED_DESC:
    'Number of failed jobs allowed to be retained. The default value is 1.',
  SUCCESSFUL_JOBS_RETAINED_DESC:
    'Number of successful jobs allowed to be retained. The default value is 3.',
  RUN_JOBS_CONCURRENTLY: 'Run jobs concurrently',
  SKIP_NEW_JOB: 'Skip new job',
  SKIP_OLD_JOB: 'Skip old job',
  // List > Create > Strategy Settings
  STRATEGY_SETTINGS: 'Strategy Settings',
  MAXIMUM_RETRIES: 'Maximum Retries',
  MAXIMUM_RETRIES_DESC:
    'Maximum number of retries before the job is marked as failed. The default value is 6.',
  PARALLEL_PODS_DESC: 'Number of pods that run in parallel in the job.',
  COMPLETE_PODS_DESC: 'Number of complete pods required for the job to be marked as complete.',
  MAXIMUM_DURATION_DESC:
    'Maximum duration of the job. The job is terminated when it reaches the maximum duration.',
  PARALLEL_PODS: 'Parallel Pods',
  COMPLETE_PODS: 'Complete Pods',
  MAXIMUM_DURATION: 'Maximum Duration (s)',
  // List > Create > Pod Settings
  RESTART_POLICY: 'Restart Policy',
  RESTART_POLICY_DESC:
    'Select the policy adopted by the system when a container in the pod exits abnormally.',
  // List > Create > Storage Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Pause
  // List > Delete
  CRONJOB_PL: 'Cronjobs',
  CRONJOB_LOW: 'cronjob',
};
