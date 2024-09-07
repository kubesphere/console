/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Edit
  MODIFY_SUCCESSFUL: 'Modificado Satisfactoriamente',
  SERVICE_PROVIDER_WEBSITE_DESC: 'Official website address of the service provider.',
  WRONG_ADDRESS_TIP: 'Incorrect format. Please enter a correct website address.',
  APP_NAME_DESC:
    'El nombre puede contener cualquier carácter y el largo máximo es de 20 caracteres.',
  APP_DESCRIPTION_DESC:
    'The description can contain any characters and the maximum length is 120 characters.',
  APP_ICON_FORMAT: 'Formato: png Mejor transparencia del fondo',
  APP_ICON_SIZE: 'Icon size: 96x96 pixels',
  CHOOSE_APP_CATEGORY_DESC: 'Select a category for the app.',
  EDIT_APP_DESC: 'Configurar la información básica de aplicación.',
  ICON: 'Icon',
  SERVICE_PROVIDER_WEBSITE_TCAP: 'Service Provider Website',
  START_EDITING: 'Start editing...',
  SCREENSHOTS_COLON: 'Screenshots: ',
  DELETE_ALL: 'Delete All',
  // More > Install
  // More > Upload Version
  ADD_VERSION_SUCCESSFUL: 'Versión Añadida Satisfactoriamente',
  UPLOAD_PACKAGE_OK_NOTE: 'The version already exists. Please upload another version.',
  UPLOAD_NEW_VERSION: 'Upload Version',
  UPLOAD_NEW_VERSION_DESC: 'Upload a new version of the app.',
  // More > Delete
  DELETE_APP_TEMPLATE_DESC:
    'Enter the app template name <b>{resource}</b> to confirm that you understand the risks of this operation.',
  DELETE_APP_TEMPLATE_VERSIONS_DESC:
    'Enter the app template name <b>{resource}</b> to confirm that you understand the risks of this operation. Before deleting the app template, you must delete all versions of the template.',
  APP_TEMPLATE_LOW: 'app template',
  // Attributes
  // Versions
  APP_STATUS_SUBMITTED: 'Submitted',
  APP_STATUS_NOT_SUBMITTED: 'Not submitted',
  VERSION_INFO: 'Version Information',
  INSTALL: 'Install',
  SUBMIT_FOR_REVIEW: 'Submit for Review',
  DOWNLOAD_SUCCESSFUL: 'Descargado con éxito',
  VERSION_DELETE_TIP: '¿Está seguro de eliminar la versión <strong>{name}</strong> ?',
  VERSION_SUBMIT_TIP: '¿Está seguro de enviar la versión <strong>{name}</strong> para auditoría?',
  VERSION_CANCEL_TIP:
    '¿Está seguro de cancelar la revisión de la versión <strong>{name}</strong> ?',
  VERSION_RELEASE_TIP:
    'Los usuarios pueden ver e implementar la versión <strong>{name}</strong> en la tienda cuando se lance. ¿Estás seguro de lanzarlo ahora?',
  VERSION_SUSPEND_TIP:
    'La versión <strong>{name}</strong> no se mostrará en la tienda cuando se suspenda. ¿Está seguro de que quiere cancelar la publicación?',
  VERSION_RECOVER_TIP:
    'La versión <strong>{name}</strong> se mostrará nuevamente en la tienda. ¿Está seguro de que quiere reanudar la publicación?',
  UPDATE_TIME_SCAP: 'Update time',
  VIEW_IN_STORE: 'View in Store',
  // Versions > Upload
  UPLOAD_AGAIN_TIP: 'Please try again.',
  // Versions > Submit for Review
  ENTER_VERSION_NUMBER_TIP: 'Please enter a version number.',
  SUBMIT_REVIEW_DESC: 'Submit the app template for review before releasing it to the App Store.',
  APP_LEARN_MORE:
    '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">Learn More</a>',
  INVALID_VERSION_TIP: 'Versión no válida',
  // Versions > Submit for Review > Test Steps
  TEST_STEPS: 'Test Steps',
  VERSION_SUBMIT_TEST_STEPS:
    '1. All dependent charts have been submitted.<br/>' +
    '2. The static analysis has been passed (helm lint).<br/>' +
    '3. The app can be started using default values (helm install). All pods are in running state and all services have at least one endpoint.<br/>' +
    '4. The images used have no security vulnerabilities.<br/>' +
    '5. Upgrade is supported.<br/>' +
    '6. Custom application configuration is supported.<br/>' +
    '7. Do not use the alpha features of Kubernetes.<br/>' +
    '8. Detailed documentation is provided, including app introduction, prereauisites, and custom parameter configurations.<br/>',
  VERSION_SUBMIT_NOTE:
    'Please make sure your app has met the following requirements before submission:',
  // Versions > Submit for Review > Update Log
  UPDATE_LOG_DESC: 'Se usa para describir los detalles de esta actualización.',
  SUBMIT_SUCCESSFUL: 'Submitted successfully.',
  CANCEL_SUCCESSFUL: 'Canceled successfully.',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: 'App Instances',
};
