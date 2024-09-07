/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  CONFIGURATION_MANAGEMENT: 'Configuration management',
  CONFIGURATION_MANAGEMENT_PL: 'Configuration Management',
  CONFIGURATION_MANAGEMENT_DESC:
    'Configuration can decouple the application from the configuration information, and perform version control of the configuration. The microservice configuration refers to the configuration type pushed to the deployment group instance in the form of key value. ',
  // List
  CONFIGURATION_MANAGEMENT_EMPTY_DESC: 'Please create a configuration. ',
  CONFIGURATION_STATUS_SUCCEEDED: 'Published',
  CONFIGURATION_STATUS_PENDING: 'Not published',
  CONFIGURATION_STATUS_FAILED: 'Failed',
  // List > Create
  CREATE_CONFIGURATION: 'Create configuration',
  CONFIGURATION_CONTENT: 'Configuration content',
  CONFIGURATION_CONTENT_EMPTY_DESC: 'Please fill in the configuration content',
  // List > Edit Settings
  EDIT_CONFIGURATION: 'Edit configuration',
  ORIGINAL_CONFIGURATION_CONTENT_READONLY: 'Original configuration content (read only)',
  CURRENT_CONFIGURATION_CONTENT: 'Current configuration content',
  // List > Copy
  COPY_CONFIGURATION: 'Copy configuration',
  COPY_CONFIGURATION_FROM: 'Copy configuration (copy from {name})',
  // List > Delete
  CONFIGURATION_MANAGEMENT_LOW: 'Configuration management',
};
