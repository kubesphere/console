/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  HPA_SET_TIP: 'El Autoscaling Horizontal de Pods ha sido configurado',
  WORKLOAD_EMPTY_DESC:
    'La carga de trabajo suele ser el operador real para acceder a los servicios y también es el operador real para las aplicaciones del sistema, como la recopilación y supervisión de registros de nodos. Workload es también un modelo abstracto para un grupo de Pods.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Container Settings
  INVALID_IMAGE: 'Imagen inválida.',
  INVALID_NAME_DESC:
    'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 63 characters.',
  NO_IMAGE_FOUND: 'No encontré esta imagen',
  CONTAINER_EMPTY_DESC: 'Please add at least one worker container.',
  RESOURC_QUOTAS_UNSET: 'Resource Quotas Unset',
  INSUFFICENT_RESOURCES: 'Insufficent Resources',
  REMAINING_QUOTAS: 'Remaining Quotas',
  // List > Create > Pod Settings > Add Container > Container Settings > Environment Settings
  ENVIRONMENT_INVALID_TIP:
    'The key of an environment variable can contain only letters, numbers, underscores (_), hyphens (-), and periods (.), and must not start with a number.',
  ENVIRONMENT_CANNOT_BE_EMPTY: 'Please set a key for the environment variable.',
  // List > Create > Pod Settings > Port Settings
  WORKLOAD_PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers and hyphens (-), and must start with a lowercase letter and end with a lowercase letter or number. The maximum length is 15 characters.',
  // List > Create > Pod Settings > Update Strategy > Rolling Update Settings
  MAX_EXTRA_PODS_DESC: 'El número máximo de pods permitido durante una actualización continua',
  MAX_EXTRA_PODS: 'El número máximo disponible de pods',
  // List > Create > Storage Settings
  AVAILABLE: 'En desuso',
  IN_USER: 'En uso',
  ACCESS_MODE_SCAP: 'Modo de acceso admitido',
  PVC_OR_TEMPLATE_EMPTY:
    'You have enabled Collect Logs on Volumes. Please add at least one persistent volume, temperary volume, or persistent volume claim template and specify the path of container logs.',
  PVC_EMPTY:
    'You have enabled Collect Logs on Volumes. Please add at least one persistent volume or temperary volume and specify the path of container logs.',
  PROJECT_COLLECT_SAVED_DISABLED_DESC:
    'Please contact the project administrator to enable disk log collection in <b>Project Settings</b> > <b>Advanced Settings</b>.',
  COLLECT_LOGS_ON_VOLUMES_DESC:
    'After you add a volume (ReadAndWrite mode), you can collect logs inside the volume. When you enable disk log collection, the Filebeat image will be used as a sidecar pattern and injected into the Pod to collect logs.',
  // List > Create
  // List > Create > Storage Settings > Mount Volume
  CONTAINER_LOG_PATH: 'ruta relativa del registro de contenedor',
  // List > Create > Storage Settings > Mount Volume > Temporary Volume
  CONTAINER_LOG_PATH_TIP:
    'La ruta relativa del registro del contenedor es la ruta desde la ruta de montaje del módulo, que se puede proporcionar en modo global. Cuando hay varios grupos, sepárelos por comas. Por ejemplo, cuando la ruta de montaje del pod es / data, la ruta relativa del registro de pod se configura como log / *. Log, lo que significa que todos los archivos de sufijos .log en el directorio / data / log coinciden. Si necesita hacer coincidir todos los archivos de sufijos .log en el directorio / data / log y sus subdirectorios, puede configurar la ruta relativa del registro de pod a log / ** / *. Log.',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Re-create
  RECREATE_CONFIRM_DESC:
    'Está a punto de volver a implementar la carga de trabajo {resource} ({type}), el pod se volverá a implementar de acuerdo con la estrategia de actualización y su negocio puede verse interrumpido temporalmente.',
  // List > Delete
  NO_WORKLOAD_RELATED_RESOURCE_DESC: 'No resource related to the workload is found.',
  SELECT_ALL: 'Seleccionar todo',
  DELETE_WORKLOAD_DESC_SI:
    'You are about to delete the workload {resource}.<br/>Do you want to also delete the resource related to the workload?',
  DELETE_WORKLOAD_DESC_PL:
    'You are about to delete the workloads {resource}.<br/>Do you want to also delete the resources related to the workloads?',
  DELETE_WORKLOAD: 'Delete Workload',
  DELETE_MULTIPLE_WORKLOADS: 'Delete Multiple Workloads',
  DELETE_APP_RESOURCE_TIP:
    'The resource is managed by <strong>{app}</strong>, which may affect the normal use of this app if the resource is deleted. Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risks associated with the operation.',
  STOP_APP_RESOURCE_TIP:
    'The resource is managed by <strong>{app}</strong>, which may affect the normal use of this app if the resource is stopped. Please enter the {type} name <strong>{resource}</strong> to make sure you understand the risks associated with the operation.',
};
