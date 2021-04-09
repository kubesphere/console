/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

module.exports = {
  'Activate App': 'Activar aplicación',
  'Activate Version': 'Activar versión',
  Activated: 'Activado',
  admin: 'administración',
  'App Information': 'Información de la aplicación',
  'App Instances': 'Instancias de aplicaciones',
  'Audit Records': 'Registros de auditoria',
  business: 'negocio',
  'Cancel Review': 'Cancelar revisión',
  creating: 'creando',
  'Delete Version': 'Eliminar versión',
  deleting: 'borrando',
  'Deployed Instances': 'Instancias desplegadas',
  'Develop and test guide': 'Guía de desarrollar y test',
  developer: 'desarrollador',
  Developing: 'Desarrollando',
  'Download Successfully': 'Descargado con éxito',
  Draft: 'Borrador',
  global_admin: 'global_admin',
  'in-review': 'en revisión',
  'In-review': 'En revisión',
  isv: 'isv',
  'No version information': 'Sin información de versión',
  Pass: 'Pasar',
  Passed: 'Pasado',
  'Pending-review': 'Revisión pendiente',
  Published: 'Publicado',
  Recall: 'Retirar',
  Recalled: 'Retirado',
  Reject: 'Rechazar',
  Rejected: 'Rechazado',
  Release: 'Lanzamiento',
  'Release to Store': 'Lanzar a la tienda',
  Review: 'Revisión',
  Starting: 'Empezando',
  Stopping: 'Parando',
  Submit: 'Enviar',
  'Submit for Review': 'Enviar revisión',
  Submitted: 'Enviada',
  'Suspend App': 'Suspender aplicación',
  'Suspend Version': 'Suspender versión',
  Suspended: 'Suspendido',
  technical: 'técnico',
  'Test Steps': 'Pasos de prueba',
  'Version Management': 'Gestión de versiones',
  'Version Update Info': 'Información de actualización de versión',
  Versions: 'Versiones',
  'View in Store': 'Ver en la tienda',
  Working: 'Trabajando',
  'Wrong version number format': 'Formato de número de versión incorrecto',

  VERSION_DELETE_TIP:
    '¿Está seguro de eliminar la versión <strong>{name}</strong> ?',
  VERSION_SUBMIT_TIP:
    '¿Está seguro de enviar la versión <strong>{name}</strong> para auditoría?',
  VERSION_CANCEL_TIP:
    '¿Está seguro de cancelar la revisión de la versión <strong>{name}</strong> ?',
  VERSION_RELEASE_TIP:
    'Los usuarios pueden ver e implementar la versión <strong>{name}</strong> en la tienda cuando se lance. ¿Estás seguro de lanzarlo ahora?',
  VERSION_SUSPEND_TIP:
    'La versión <strong>{name}</strong> no se mostrará en la tienda cuando se suspenda. ¿Estás seguro de suspenderlo ahora?',
  VERSION_RECOVER_TIP:
    'La versión <strong>{name}</strong> se mostrará nuevamente en la tienda. ¿Estás seguro de activarlo ahora?',
  APP_SUSPEND_TIP:
    'La aplicación <strong>{name}</strong> no se puede comprar en la tienda cuando está suspendida. ¿Estás seguro de suspenderlo ahora?',
  APP_RECOVER_TIP:
    'La aplicación <strong>{name}</strong> y las versiones suspendidas se mostrarán nuevamente en la tienda. ¿Estás seguro de activarlo ahora?',

  PACKAGE_FILE_DESC:
    'El archivo Package.json, que describe la información básica de una aplicación o versión, como el nombre y el número de versión.',
  CONFIG_FILE_DESC: 'Perfil predeterminado de la aplicación',
  LICENSE_FILE_DESC: 'Protocolo en formato de texto',
  LOCALE_ES__FILE_DESC:
    'Traducción al español para la configuración de la aplicación',
  LOCALE_EN__FILE_DESC:
    'Traducción al inglés para la configuración de la aplicación',
  LOCALE_ZH_FILE_DESC:
    'Traducción al chino para la configuración de la aplicación',
  CHART_FILE_DESC:
    'Archivo yaml, que se utiliza para describir la información básica de Chart, ' +
    'como el nombre y la versión.',
  README_FILE_DESC: 'Introducción a la aplicación e instrucciones',
  REQUIREMENTS_FILE_DESC:
    'Archivos de descripción para almacenar otros charts que actualmente dependen del chart',
  VALUES_FILE_DESC: 'Archivo de configuración predeterminado del chart',
  CHARTS_FILE_DESC:
    'Coloque otros chartys de los que depende actualmente el chart en este directorio',
  TEMPLATES_FILE_DESC:
    'Despliega el directorio de plantilla de archivo, completa el valor correspondiente en values.yaml y genera el archivo de configuración final de kubernetes',
  NOTES_FILE_DESC: 'Guía de uso',
  VERSION_SUBMIT_TEST_STEPS: `
    1. Todos los charts dependientes han sido enviados <br/> 
    2. Verificación estática exitosa (helm lint) <br/> 
    3. Inicio exitoso de aplicaciones (helm install) con valores predeterminados: ' +
    'todos los pods están en estado de ejecución y todos los servicios de servicio tienen ' +
    'al menos un endpoint <br /> 
    4. No hay vulnerabilidad de seguridad en los mirros utilizados <br/> 
    5. Admite actualización <br/> 
    6. Admite la configuración de aplicaciones personalizadas <br/> 
    7. No usar la función alfa de Kubernetes <br/> 
    8. Se requieren archivos README detallados, incluida la introducción de aplicaciones, ' +
    'condiciones previas y cómo personalizar los parámetros de configuración <br/>`,

  VERSION_SUBMIT_NOTE:
    'Antes de enviar para su revisión, asegúrate de que su aplicación haya pasado ' +
    'las pruebas básicas mostradas abajo',
  VERSION_SUBMIT_DOC: 'Consulte un manual de prueba más completo',
  UPDATE_LOG_DESC: 'Se usa para describir los detalles de esta actualización.',
}
