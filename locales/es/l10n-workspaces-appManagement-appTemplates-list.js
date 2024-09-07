/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  APP_TEMPLATE_PL: 'App Templates',
  APPS_MANAGEMENT: 'Gestión de Alicaciones',
  UPLOAD_TEMPLATE: 'Subir Plantilla',
  APP_TEMPLATE_DESC:
    'KubeSphere proporciona una gestión completa del ciclo de vida para las aplicaciones. Puedes subir o crear nuevas plantillas de aplicación y probarlas rápidamente. Además, puedes publicar tus aplicaciones en la Tienda de Aplicaciones para que otros usuarios puedan desplegarlas con un solo click.',
  DEVELOP_APP_DESC:
    'Puedes subir Charts de Helm o utilizar la herramienta de orquestación de recursos proporcionada por KubeSphere para desarrollar plantillas de aplicaciones.',
  DEVELOP_APP_TITLE: 'Cómo desarrollar plantillas de aplicación?',
  HOW_PUBLISH_APP_TITLE: 'Cómo publicar aplicaciones en la Tienda de Aplicaciones?',
  HOW_PUBLISH_APP_DESC:
    'KubeSphere actualmente admite la subida de Charts de Helm a través de plantillas de aplicación dentro del espacio de trabajo, donde puedes enviar tu plantilla para su revisión. Una vez que se apruebe la plantilla, podrás publicarla en la Tienda de Aplicaciones.',
  // List
  // APP_STATUS_ACTIVE: 'Released',
  // APP_STATUS_DRAFT: 'Unreleased',
  APP_STATUS_ACTIVE: 'En los estantes',
  APP_STATUS_DRAFT: 'No en los estantes',

  APP_STATUS_SUSPENDING: 'Suspending',
  APP_TEMPLATE_EMPTY_DESC: 'Please create an app template.',
  LATEST_VERSION: 'Última versión',
  // List > Create
  CREATE_APP_TEMPLATE: 'Crear Plantilla de Aplicación',
  CREATE_APP_TEMPLATE_DESC:
    'La ligera, portable y autocontenida tecnología de empaquetado de software, permite que las aplicaciones se ejecuten de la misma manera en casi cualquier lugar.',
  APP_CREATE_GUIDE: 'Ver la especificación de desarrollo de aplicaciones',
  UPLOAD: 'Subir',
  // List > Create > Upload
  UPLOAD_HELM_TITLE: 'Subir un Chart de Helm empaquetado',
  UPLOAD_HELM_CHART_DESC: 'Subir un Chart de Helm existente',
  HELM_CHART_FORMAT_DESC: 'Subir tu Chart de Helm en el formato de fichero tar.gz o tgz.',
  UPLOAD_ICON: 'Subir icono',
  UPLOAD_SUCCESSFUL: 'Subida Satisfactoriamente',
  UPLOADING: 'Subiendo',
  FILE_MAX_SIZE_ICON: 'The maximum size of the icon is 96x96 pixels.',
  FILE_MAX_SCREENSHOTS: 'El tamaño de la imagen no debe exceder 2M',
  APP_ICON_NOTE: 'JPG o PNG menor o igual a 96px * 96px',
  MISS_FILE_NOTE: 'No se encuentra el fichero {file}',
  LICENSE_FILE_DESC: 'Protocolo en formato de texto',
  CHART_FILE_DESC:
    'YAML file that describes basic information about the chart such as the name and version.',
  README_FILE_DESC: 'Introducción a la aplicación e instrucciones',
  REQUIREMENTS_FILE_DESC:
    'Archivos de descripción para almacenar otros charts que actualmente dependen del chart',
  VALUES_FILE_DESC: 'Archivo de configuración predeterminado del chart',
  CHARTS_FILE_DESC:
    'Coloque otros chartys de los que depende actualmente el chart en este directorio',
  TEMPLATES_FILE_DESC:
    'Despliega el directorio de plantilla de archivo, completa el valor correspondiente en values.yaml y genera el archivo de configuración final de kubernetes',
  NOTES_FILE_DESC: 'Guía de uso',
  INCORRECT_FILE: 'Incorrect files? ',
  TRY_AGAIN: 'Try Again',
  FILE_MAX_ICON_DESC: 'The icon size should not exceed 20 KB. Please try again.',
  HOMEPAGE: 'Página principal',
  OPTIONAL: 'Opcional',
  created: 'Creado',
};
