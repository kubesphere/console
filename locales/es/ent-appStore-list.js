/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  APP_AUTHORIZED: 'Authorized',
  APP_UNAUTHORIZED: 'Unauthorized',
  DEPLOY_YAML_APPS: 'Deploying YAML applications',
  CREATE_CHARTS_APPS: 'Create HELM application',
  CREATE_YAML_APPS: 'Create YAML application',
  CREATE_TEMPLATE_APPS: 'Create a template application',
  REPO_MANAGE: 'Repo source management',
  APP_INSTANCES_MANAGE: 'Instance Management',
  ADD_APP_REPO: 'Add application repository',
  APP_INSTANCES_MANAGE_DESC: 'Instance Management Description.',
  NO_APPLICATION_FOUND: 'No application instances found.',
  APPLICATION_EMPTY_DESC: 'Please add an instance.',
  APP_DEPLOY: 'Application Deployment',
  DEPLOY_MANAGE: 'Deployment Management',
  VERSIONS: 'Versions',
  APP_INFORMATION: 'Application Information',
  APP_REVIEW: 'Application Review',
  APP_INSTANCES: 'Application Instance',
  MODIFY_CATEGORY: 'Change classification',
  MODIFY_CATEGORY_HELP:
    'The application classification will determine the classification of the application in the app store.',
  MODIFY_CATEGORY_REQUIRED: 'Please select a category',
  MODIFY_CATEGORY_SUCCESSFULLY: 'Change classification operation successful.',
  NO_APP_REPO_FOUND: 'No application repository found',
  APPROVE_AND_RELEASE: 'Approved and published',
  create_edge_APPS: 'Create edge template',
  SUBMITTED_SUCCESSFUL: 'Submitted successfully.',
  APP_SUSPENDED_TIP:
    'After app <strong>{name}</strong> is taken down, users cannot deploy this app from the middle of the store. Are you sure you want to take it down?',
  APP_ACTIVE_TIP:
    'After the application <strong>{name}</strong> is launched, all relevant offline versions will become listed. Are you sure you want to list this application?',
  APP_TEMPLATE_VERSION_DESC:
    'The application version needs to comply with the Semantic Version specification.',
  APP_SUSPEND: 'Removal',
  APP_LISTING: 'Listing',
  APP_VERSION_STATUS_ACTIVE: 'Published',
  APP_VERSION_STATUS_SUSPENDED: 'Unpublished',
  APP_VERSION_RELEASE: 'Release',
  APP_VERSION_SUSPENDED: 'Unpublish',
  VERSION_DRAFT_SUCCESSFUL: 'Unpublished successfully.',
  VERSION_SUSPEND_SUCCESSFUL: 'Successfully published.',
  APP_ACTIVE_SUCCESSFUL: 'App successfully launched.',
  APP_SUSPENDED_SUCCESSFUL: 'App successfully taken down.',
  APP_REPO_STATUS_UPGRADING: 'En sincronización',
  'Helm Application': 'helm Application',
  'Yaml Application': 'yaml Application',
  'Edge Application': 'Edge template application',
  APPLICATION: 'Application',
  CREAT_YAML_FORMAT_DESC: 'Soporte para el formato YAML.',
  clusterDeleted: 'El clúster ha sido eliminado',
  APP_DELETED_TIP:
    'La plantilla de aplicación utilizada en el despliegue actual de la instancia de aplicación no existe .',
  CREATE_YAML_TEMPLATE_TIP: '¿Múltiples archivos yaml divididos con "- -"?',
  FILE_MAX_PACKAGE: 'Soporte máximo para cargar archivos de 2M.',
  APP_TYPE: 'Tipo de aplicación',
  deleting: 'Eliminado',
  Running: 'En funcionamiento',
  Creating: 'En creación',
  creating: 'En creación',
  REPO_URL_ERR_TIP: 'Elimine el prefijo de Protocolo https: / / o https: / / en la Caja derecha .',
  VERSION_ACTIVATE_SUCCESSFUL: 'Lanzamiento exitoso .',
  SYSTEM_REPO_TYPE: 'Almacén del sistema',
  OWNER_REPO_TYPE: 'Almacén propio',
  USE_GUIDE_TITLE: 'Guía de uso de KubeSphere App Store',
  USE_GUIDE_DESC:
    'KubeSphere App Store proporciona una plataforma de distribución de aplicaciones a nivel interno visible para todas las empresas, donde todas las aplicaciones deben pasar por la aprobación de "KubeSphere App Store Management" y ser listadas. KubeSphere no se hace responsable de la garantía de las aplicaciones en la App Store.',
  USE_GUIDE_DESC2:
    'Si necesita crear una aplicación a través de KubeSphere App Store Management, por favor consulte los siguientes pasos:',
  USE_GUIDE_STEP_1: 'Instale el componente de extensión "KubeSphere App Store Management"',
  USE_GUIDE_STEP_2:
    'Cree una plantilla de aplicación en un espacio de empresa personalizado y envíela para su aprobación',
  USE_GUIDE_STEP_3:
    '"El administrador del sistema" aprueba la plantilla de aplicación a través de "KubeSphere App Store Management" y la lista en la App Store',
  USE_GUIDE_STEP_4:
    'Luego, los usuarios de cada proyecto pueden crear aplicaciones a través de KubeSphere App Store',
};
