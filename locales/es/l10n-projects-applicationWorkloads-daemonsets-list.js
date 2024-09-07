/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  // List > Create > Basic Information
  // List > Create > Pod Settings
  CONTAINER_SETTINGS_DESC: 'Establece el nombre del contenedor y los recursos de computación.',
  PORT_SETTINGS_DESC: 'Establece la política de acceso para el contenedor.',
  HEALTH_CHECKER_DESC:
    'La salud del contenedor se verificará periódicamente de acuerdo con las necesidades del usuario.',
  STARTUP_COMMAND: 'Comando de inicio',
  STARTUP_COMMAND_DESC:
    'Por defecto, el contenedor ejecuta el comando de imagen predeterminado. Puedes cambiar el comando del contenedor desde aquí.',
  CONTAINER_COMMAND_DESC:
    'El comando de inicio del contenedor. Por defecto, se utilizará el comando de inicio para empaquetar. Utiliza comas para separar múltiples comandos.',
  CONTAINER_ARGUMENT_DESC:
    'Los parámetros del comando de inicio del contenedor. Utiliza comas para separar varios.',
  CONTAINER_ENVIRONMENT_DESC: 'Añade la variable de entorno del contenedor.',
  PROBE_COMMAND_DESC: 'Utiliza comas para separar múltiples comandos.',
  // List > Create > Pod Settings > Add Container
  IGNORE_CERT_WARN_DESC:
    'Ignoring the verification certificate may cause the account password to be disclosed. ',
  CERT_ERROR: 'A certificate error was found, do you want to ignore the certificate verification',
};
