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
  'Add Environment Variables': 'Añade parámetros de entorno',
  'Artifact Type': 'Tipo de artefacto',
  'Authentication required': 'Autenticación requerida',
  b2i: 'b2i',
  binary: 'binario',
  BUILD_ENVIRONMENT: 'Entorno de build',
  'Build Times': 'Tiempos de build',
  Builder: 'Builder',
  'builder name': 'nombre del builder',
  builderImage: 'builderImage',
  BuilderImage: 'BuilderImage',
  BuilderPullPolicy: 'BuilderPullPolicy',
  builderPullPolicy: 'builderPullPolicy',
  Building: 'Construyendo',
  'Building Image': 'Construyendo la imagen',
  'Building Log': 'Registro de construcción',
  'building logs': 'registros de construcción',
  BUILD_MODE: 'Elige un idioma',
  CLICK_UPLOAD_ARTIFACT:
    'Haz clic para seleccionar el archivo de artefacto a subir',
  CODE_URL: 'URL de código',
  UPLOAD_ARTIFACT_FILE:
    'Haz clic para seleccionar el archivo de artefacto a subir',
  'Code Resource': 'Recurso de código',
  CODE_REPOSITORY_URL: 'URL de código',
  CONTAINER_SETTINGS: 'Configuración del contenedor',
  creationTimestamp: 'creationTimestamp',
  'Currently only supports git repo': 'Actualmente solo admite repositorio git',
  DOWNLOAD_ARTIFACT: 'Descargar Artefacto',
  'Environment Params': 'Parámetros de entorno',
  'exec: "git": executable file not found in $PATH':
    'exec: "git": archivo ejecutable no encontrado en $PATH',
  FILE_SIZE_VALUE: 'File size: {value}',
  FILE_UPLOADED_TIP: 'Documento subido correctamente',
  IMAGE_ARTIFACTS: 'Image Artifacts',
  'Image Builder': 'Image Builder',
  IMAGE_BUILDER: 'Image Builder',
  BUILDER_IMAGE: 'Builder Image',
  BUILDER_IMAGE_SCAP: 'Builder image',
  PULL_POLICY: 'Pull Policy',
  SOURCE_URL: 'Source URL',
  REMOTE_TRIGGER: 'Remote Trigger',
  IMAGE_BUILDER_LOW: 'image builder',
  IMAGE_BUILDER_PL: 'Image Builders',
  'Image Building': 'Construcción de la imagen',
  'Image building failed': 'La construcción de la imagen falló',
  'Image building succeeded': 'La construcción de la imagen tuvo éxito',
  IMAGE_SIZE_SCAP: 'Tamaño de la imagen',
  IMAGE_NAME: 'Image Name',
  IMAGE_NAME_SCAP: 'Image name',
  IMAGE_NAME_EMPTY_DESC: 'Please enter an image name.',
  IMAGE_TAG_EMPTY_DESC: 'Please enter an image tag.',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: 'Please set a target image registry.',
  IMAGE_TAG: 'Image Tag',
  ImageName: 'Image Name',
  'is Failed': 'falló',
  JOB_RECORDS: 'Registros de trabajos',
  LAST_BUILD_ENVIRONMENT: 'Último entorno de compilación',
  LOG_MODULE_NOT_INSTALLED: 'The logging module is not installed.',
  LOADING_DOTS: 'El registro se está cargando ...',
  'New Image Tag': 'Nuevo tag de imagen',
  'New Tag': 'Nuevo tag',
  'No Log Records': 'Sin registros',
  PORT_SETTINGS_DESC: 'Establece la política de acceso para el contenedor.',
  CONTAINER_SETTINGS_DESC:
    'Establece el nombre del contenedor y los recursos de computación.',
  'Published Time': 'Hora publicada',
  PULL_COMMAND: 'Comando de pull',
  PULL_COMMAND_SCAP: 'Pull command',
  'Rebuild Image': 'Reconstruir imagen',
  'Rebuilt successfully; the image status will be refreshed soon.':
    'Reconstruida con éxito; el estado de la imagen se actualizará pronto.',
  'Release Time': 'Tiempo de despliegue',
  'Repo reading failed': 'Lectura del repositorio fallida',
  'Repo url': 'url del repositorio',
  'Repo URL': 'URL de repositorio',
  'Repository Not Found': 'Repositorio no encontrado',
  RevisionId: 'RevisionId',
  'Run Command': 'Ejecutar comando',
  s2i: 's2i',
  S2IJobs: 'S2IJobs',
  'Source to image jobs': 'Trabajos de origen a imagen',
  sourceUrl: 'sourceUrl',
  SourceUrl: 'SourceUrl',
  S2I_RELATIVE_PATH_TIP:
    'Especifica un directorio relativo dentro de la aplicación. (Valor por defecto /)',
  StartTime: 'Hora de inicio',
  TARGET_IMAGE_REPOSITORY: 'Repositorio de imágenes de destino',
  S2I_NO_SECRET: 'El repositorio de código actual no requiere clave.',
  UPLOAD_ARTIFACT_TIP: 'Please upload an artifact.',
  HEALTH_CHECKER_DESC:
    'La salud del contenedor se verificará periódicamente de acuerdo con las necesidades del usuario.',
  UPLOAD_ARTIFACT: 'Subir artefactos',
  UPLOAD_FAILED: 'Upload failed.',
  CODE_RELATIVE_PATH_DESC:
    'Especifica un directorio relativo dentro de la aplicación. (Valor por defecto /)',
  STARTUP_COMMAND: 'Comando de inicio',
  'Target Image Repository': 'Repositorio de imágenes de destino',
  CODE_REPOSITORY_KEY_NOT_REQUIRED:
    'El repositorio de código actual no requiere clave.',
  ARTIFACT_FILE_EMPTY_DESC: 'El archivo no se ha subido.',
  ARTIFACT_FILE: 'Subir artefactos',
  'Upload file failed': 'Error al cargar el archivo',
  'Upload Percent': 'Porcentaje de subida',
  SORT_BY: 'ordenado por { name }',
  IMAGE_NAME_BUILDING: 'Image: {name}/Building',
  IMAGE_NAME_FAILED: 'Image: {name}/Failed',
  IMAGE_NAME_SUCCESSFUL: 'Image: {name}/Successful',
  NEW_TAG_DESC: 'introduce el tag para la nueva imagen',
  S2I_RELATIVE_PATH_DESC:
    'Dirección del repositorio de código fuente (actualmente admite git) y puedes asignar ramas de código y rutas relativas en terminales de código fuente',
  STARTUP_COMMAND_DESC:
    'Por defecto, el contenedor ejecuta el comando de imagen predeterminado. Puedes cambiar el comando del contenedor desde aquí.',
  CONTAINER_COMMAND_DESC:
    'El comando de inicio del contenedor. Por defecto, se utilizará el comando de inicio para empaquetar. Utiliza comas para separar múltiples comandos.',
  CONTAINER_ARGUMENT_DESC:
    'Los parámetros del comando de inicio del contenedor. Utiliza comas para separar varios.',
  CONTAINER_ENVIRONMENT_DESC: 'Añade la variable de entorno del contenedor.',
  IMAGE_PULL_POLICY_DESC:
    'Por defecto, la imagen se descarga solo si aún no está presente localmente.',
  S2I_ENVIRONMENT_DESC:
    'Los desarrolladores de aplicaciones pueden usar las siguientes variables de entorno para configurar el comportamiento en tiempo de ejecución de esta imagen; para configuraciones detalladas, consulta <a href={link} target="_blank">plantillas de compilación</a> .',
  S2I_UPDATE_WORKLOAD:
    'Actualiza la carga de trabajo después de construir con éxito',
  S2I_UPDATA_WORKLOAD_DESC:
    'Una vez que la imagen se haya reconstruido correctamente, la imagen de la carga de trabajo relevante se actualizará y la versión de la carga de trabajo se actualizará.',
  IMAGE_FROM_S2I_DESC:
    'Descarga el código del repositorio existente y crea la imagen a través de Source to Image. El proceso de construir la imagen cada vez se realizará como un trabajo.',
  IMAGE_FROM_EXSIT:
    'Selecciona un contenedor de despliegue de imagen existente',
  IMAGE_FROM_EXSIT_DESC:
    'Descarga una imagen de un repositorio de imágenes público o privado.',
  CODE_REPOSITORY_KEY_DESC:
    'Si es un repositorio de código privado, escoge la clave del repositorio de código.',
  CODE_REPOSITORY_URL_DESC:
    'La dirección del repositorio del código fuente (actualmente es compatible con git). Puedes especificar ramas de código y rutas relativas en el terminal del código fuente.',
  CODE_RELATIVE_PATH: 'Ruta relativa del código (opcional):',
  S2I_IMAGE_NAME_DESC:
    'Nombre de la imagen y tag, que por defecto es el nombre del proyecto del repositorio de código.',
  S2I_TARGET_IMAGE_REPOSITORY_DESC:
    'Select a Secret with push permissions to the image repository. De lo contrario, puedes <a href={link} target="_blank">crear una nueva credencial de repositorio de imágenes</a> .',
  S2I_BUILDERNAME_DESC:
    'Selecciona el entorno de edición, también puedes ver la <a href={link} target="_blank">plantilla de compilación correspondiente</a>',
  IMAGE_BUILDER_DESC:
    'Image Builder is a tool that builds container images from source code or artifacts. You can build container images from source code or artifacts through simple configurations.',
  BUILD_IMAGE_FOR_SERVICE: 'Crear imagen para el servicio {service}',
  S2I_DESC: 'Por favor elige tu lenguaje de código fuente',
  IMAGE_FROM_S2I: 'Crea una nueva imagen a partir del código',
  IMAGE_FROM_B2I: 'Crea una nueva imagen a partir del artefacto',
  B2I_DESC: 'Select the file type of your artifact.',
  B2I_DEFAULT_DESC:
    'Elige tu artefacto para construir una imagen de contenedor',
  JAR_DESC:
    'Un archivo JAR es un formato de empaquetado de archivos que se usa comúnmente para agregar una gran cantidad de archivos de clase Java, metadatos relacionados y archivos de recursos (texto, imágenes, etc.) en un archivo.',
  WAR_DESC:
    'El archivo WAR es un archivo utilizado para distribuir una colección de archivos JAR, JavaServer Pages, Java Servlets, clases Java, archivos XML, bibliotecas de tags, páginas web estáticas (HTML y archivos relacionados) y otros recursos que juntos constituyen una aplicación web.',
  BINARY_DESC: '',
  IMAGE_BUILDER_EMPTY_DESC: 'Crea un generador de image builder.',
  WRONG_FILE_EXTENSION_NAME:
    'El tipo de archivo seleccionado no coincide, selecciona el tipo {type}',
  PROBE_COMMAND_DESC: 'Utiliza comas para separar múltiples comandos.',
  SECRET_CODE: 'Secret Code',
  SECRET_CODE_RULE_DESC:
    'It can only contain upper and lower case letters and numbers.',
  TRIGGER_TOKEN: 'Secret Code',
  TRIGGER_TOKEN_DESC:
    'Set a token used to authenticate a client against KubeSphere when the client attempts to trigger image building on KubeSphere. The token can contain only uppercase letters, lowercase letters, and numbers.',
  INVALID_TRIGGER_TOKEN_DESC:
    'It can only contain upper and lower case letters, numbers.',
  'Remote Trigger Link': 'Remote Trigger Link',

  // Image Builder List Page

  // Creation Page
  UPLOAD_PERCENT: 'Uploaded: {percent}%',
  UPLOAD_FULLY: 'Uploaded: 100%',
  FILE_SIZE: 'File size: {size}',
  S2I_SECRET: 'Secret',
}
