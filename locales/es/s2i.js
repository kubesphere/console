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
  'Build Environment': 'Entorno de build',
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
  'Choose a Language': 'Elige un idioma',
  'Click to upload an artifact':
    'Haz clic para seleccionar el archivo de artefacto a subir',
  'Code Resource': 'Recurso de código',
  'Code URL': 'URL de código',
  'Container Settings': 'Configuración del contenedor',
  creationTimestamp: 'creationTimestamp',
  'Currently only supports git repo': 'Actualmente solo admite repositorio git',
  'Download Artifact': 'Descargar Artefacto',
  'Environment Params': 'Parámetros de entorno',
  'exec: "git": executable file not found in $PATH':
    'exec: "git": archivo ejecutable no encontrado en $PATH',
  'File Size': 'Tamaño del archivo',
  'File Uploaded Successfully': 'Documento subido correctamente',
  'Image Artifacts': 'Image Artifacts',
  'Image Builder': 'Image Builder',
  'Image Builders': 'Image Builders',
  'Image Building': 'Construcción de la imagen',
  'Image building failed': 'La construcción de la imagen falló',
  'Image building succeeded': 'La construcción de la imagen tuvo éxito',
  'Image Size': 'Tamaño de la imagen',
  imageName: 'Image Name',
  ImageName: 'Image Name',
  'is Failed': 'falló',
  'Job Records': 'Registros de trabajos',
  'Last build environment': 'Último entorno de compilación',
  'Last Message': 'Ultimo mensaje',
  'The logging module is not installed.':
    'The logging module is not installed.',
  'Log is loading...': 'El registro se está cargando ...',
  'New Image Tag': 'Nuevo tag de imagen',
  'New Tag': 'Nuevo tag',
  'No Log Records': 'Sin registros',
  'Please set the access policy for the container.':
    'Establece la política de acceso para el contenedor.',
  'Please set the container name and computing resources.':
    'Establece el nombre del contenedor y los recursos de computación.',
  'Published Time': 'Hora publicada',
  'Pull Command': 'Comando de pull',
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
  'Specify a relative directory inside the application. (Default value /)':
    'Especifica un directorio relativo dentro de la aplicación. (Valor por defecto /)',
  'Start Command': 'Comando de inicio',
  StartTime: 'Hora de inicio',
  'Target Image Repository': 'Repositorio de imágenes de destino',
  'The current code repository does not require a key.':
    'El repositorio de código actual no requiere clave.',
  'The file has not been uploaded.': 'El archivo no se ha subido.',
  'The health of the container will be checked regularly according to user needs.':
    'La salud del contenedor se verificará periódicamente de acuerdo con las necesidades del usuario.',
  'Upload Artifact': 'Subir artefactos',
  'Upload file failed': 'Error al cargar el archivo',
  'Upload Percent': 'Porcentaje de subida',
  SORT_BY: 'ordenado por { name }',
  S2I_Building: 'esta construyendo',
  S2I_Failed: 'construcción fallida',
  S2I_Successful: 'construcción exitosa',
  NEW_TAG_DESC: 'introduce el tag para la nueva imagen',
  S2I_RELATIVE_PATH_DESC:
    'Dirección del repositorio de código fuente (actualmente admite git) y puedes asignar ramas de código y rutas relativas en terminales de código fuente',
  START_COMMAND_DESC:
    'Por defecto, el contenedor ejecuta el comando de imagen predeterminado. Puedes cambiar el comando del contenedor desde aquí.',
  RUN_COMMAND_DESC:
    'El comando de inicio del contenedor. Por defecto, se utilizará el comando de inicio para empaquetar. Utiliza comas para separar múltiples comandos.',
  CONTAINER_PARAMS_DESC:
    'Los parámetros del comando de inicio del contenedor. Utiliza comas para separar varios.',
  CONTAINER_ENVIROMENT_DESC: 'Añade la variable de entorno del contenedor.',
  IMAGE_PULL_POLICY_DESC:
    'Por defecto, la imagen se descarga solo si aún no está presente localmente.',
  S2I_ENVIROMENT_DESC:
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
  S2I_SECRET_DESC:
    'Si es un repositorio de código privado, escoge la clave del repositorio de código.',
  S2I_IMAGE_REPONSITRY_DESC:
    'La dirección del repositorio del código fuente (actualmente es compatible con git). Puedes especificar ramas de código y rutas relativas en el terminal del código fuente.',
  S2I_RELATIVE_PATH: 'Ruta relativa del código (opcional):',
  S2I_IMAGENAME_DESC:
    'Nombre de la imagen y tag, que por defecto es el nombre del proyecto del repositorio de código.',
  S2I_TARGET_IMAGE_REPONSTRY_DESC:
    'Debes seleccionar un repositorio de imágenes con permisos push para almacenar la imagen. De lo contrario, puedes <a href={link} target="_blank">crear una nueva credencial de repositorio de imágenes</a> .',
  S2I_BUILDERNAME_DESC:
    'Selecciona el entorno de edición, también puedes ver la <a href={link} target="_blank">plantilla de compilación correspondiente</a>',
  IMAGE_BUILDER_DESC:
    'Image Builder es una herramienta que facilita la creación de imágenes de contenedor que toman el código fuente de la aplicación o artefactos como entrada y producen una nueva imagen que ejecuta la aplicación ensamblada como salida. Incluye Source to Image, también conocido como S2I, que toma el código fuente como entrada, y Binary to Image, también conocido como B2I, que toma los artefactos de la aplicación como entrada.',
  'Build image for service x': 'Crear imagen para el servicio {service}',
  S2I_DESC: 'Por favor elige tu lenguaje de código fuente',
  IMAGE_FROM_S2I: 'Crea una nueva imagen a partir del código',
  IMAGE_FROM_B2I: 'Crea una nueva imagen a partir del artefacto',
  B2I_DESC: 'Elige tu artefacto para construir una imagen de contenedor',
  B2I_DEFAULT_DESC:
    'Elige tu artefacto para construir una imagen de contenedor',
  JAR_DESC:
    'Un archivo JAR es un formato de empaquetado de archivos que se usa comúnmente para agregar una gran cantidad de archivos de clase Java, metadatos relacionados y archivos de recursos (texto, imágenes, etc.) en un archivo.',
  WAR_DESC:
    'El archivo WAR es un archivo utilizado para distribuir una colección de archivos JAR, JavaServer Pages, Java Servlets, clases Java, archivos XML, bibliotecas de tags, páginas web estáticas (HTML y archivos relacionados) y otros recursos que juntos constituyen una aplicación web.',
  BINARY_DESC: '',
  IMAGE_BUILDER_CREATE_DESC:
    'Image Builder es una herramienta que facilita la creación de imágenes de contenedor que toman el código fuente de la aplicación o artefactos como entrada y producen una nueva imagen que ejecuta la aplicación ensamblada como salida. Incluye Source to Image, también conocido como S2I, que toma el código fuente como entrada, y Binary to Image, también conocido como B2I, que toma los artefactos de la aplicación como entrada.',
  WRONG_FILE_EXTENSION_NAME:
    'El tipo de archivo seleccionado no coincide, selecciona el tipo {type}',
  PROBE_COMMAND_DESC: 'Utiliza comas para separar múltiples comandos.',
  'Secret Code': 'Secret Code',
  SECRET_CODE_RULE_DESC:
    'It can only contain upper and lower case letters, numbers.',
  'Remote Trigger Link': 'Remote Trigger Link',
}
