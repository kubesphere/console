/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  DAEMONSETS: 'DaemonSets',
  DAEMONSET_EMPTY_DESC:
    'Un DaemonSet asegura que todos (o algunos) nodos ejecuten una copia de un Pod. Por lo general, un DaemonSet se usa para ejecutar una colección de registros, monitorear daemon u otras aplicaciones de administración del sistema.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Update Strategy > Rolling Update Settings
  MIN_READY_SECONDS: 'Minimum Running Time for Pod Readiness (s)',
  MAX_UNAVAILABLE_PODS: 'Maximum Unavailable Pods',
  ROLLING_UPDATE_SETTINGS: 'El número de pods cuando se actualiza',
  MAX_UNAVAILABLE_PODS_DESC: 'Maximum number or percentage of unavailable Pods during the update.',
  MIN_READY_SECONDS_DESC:
    'Especifica el número mínimo de segundos para los pods de un inicio de daemonset',
  MIN_READY_SECONDS_EMPTY:
    'Please set the minimum stable running time required for a Pod replica to be considered ready.',
  MAX_UNAVAILABLE_EMPTY:
    'Please set the maximum number of unavailable Pod replicas allowed during the update process.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > HTTP Request
  FAILURE_THRESHOLD: 'Umbral de éxito',
  HTTP_REQUEST: 'Comprobación de solicitudes HTTP',
  INITIAL_DELAY_S: 'Retraso (s) inicial',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}s initial delay, {timeout}s timeout period',
  PROBE_TIME: '{delay} s delay, {timeout} s timeout',
  TIMEOUT_PERIOD_S: 'Tiempo de espera (s)',
  CHECK_INTERVAL_S: 'Periodo de Segundos',
  SUCCESS_THRESHOLD: 'Umbral de fallo',
  INITIAL_DELAY_DESC:
    'Número de segundos después de que el contenedor se haya iniciado antes de que se inicien las sondas de vida.',
  TIMEOUT_PERIOD_DESC:
    'Número de segundos después de los cuales la sonda agota el tiempo de espera. El valor predeterminado es 1 segundo y el valor mínimo es 1.',
  CHECK_INTERVAL_DESC:
    'Frecuencia de la sonda (en segundos), que por defecto es de 10 segundos. El valor mínimo es 1.',
  SUCCESS_THRESHOLD_DESC:
    'Mínimos éxitos consecutivos para que la sonda se considere exitosa después de haber fallado. El valor predeterminado es 1 y debe ser 1 para la vida y el inicio. El valor mínimo es 1.',
  FAILURE_THRESHOLD_DESC:
    'Fallos mínimos consecutivos para que la sonda se considere fallida después de haber tenido éxito. El valor predeterminado es 3 y el valor mínimo es 1.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > Command
  PROBE_COMMAND_EMPTY: 'Por favor introduce el comando',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > TCP Port
  TCP_PORT: 'Comprobación de puerto TCP',
  // List > Create > Storage Settings
  MOUNT_PATH_IN_USE: 'El punto de montaje ya está en uso',
};
