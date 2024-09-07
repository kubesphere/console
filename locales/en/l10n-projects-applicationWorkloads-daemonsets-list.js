/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  // List > Create > Basic Information
  // List > Create > Pod Settings
  CONTAINER_SETTINGS_DESC: 'Set the image, name, type, and computing resources of the container.',
  PORT_SETTINGS_DESC: 'Set the ports used for accessing the container.',
  HEALTH_CHECKER_DESC: 'Add probes to check the container health status regularly.',
  STARTUP_COMMAND: 'Start Command',
  STARTUP_COMMAND_DESC:
    'Customize the command run by the container upon startup. By default, the container runs the default image command.',
  CONTAINER_COMMAND_DESC: 'Startup command of the container.',
  CONTAINER_ARGUMENT_DESC:
    'Parameters of the startup command. Use commas to separate multiple parameters.',
  CONTAINER_ENVIRONMENT_DESC: 'Add environment variables to the container.',
  PROBE_COMMAND_DESC: 'Use commas to separate multiple commands.',
  // List > Create > Pod Settings > Add Container
  IGNORE_CERT_WARN_DESC: 'Ignoring certificate verification may cause password disclosure.',
  CERT_ERROR: 'Certificate error.',
  // List > Create > Storage Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  // List > Delete
};
