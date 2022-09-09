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
  // Banner
  IMAGE_BUILDER_PL: 'Image Builders',
  IMAGE_BUILDER_DESC: 'Image Builder is a tool that builds container images from source code or artifacts. You can build container images from source code or artifacts through simple configurations.',
  // List
  IMAGE_BUILDER_EMPTY_DESC: 'Crea un generador de image builder.',
  NOT_RUNNING_YET: 'Aún no está en ejecución',
  BUILDING: 'Building',
  S2I: 'Source-to-image',
  B2I: 'Artifact-to-image',
  // List > Name (Displayed after you create a service from artifact)
  BUILD_IMAGE_FOR_SERVICE: 'Crear imagen para el servicio {service}',
  // List > Create > Build Mode
  BUILD_MODE: 'Elige un idioma',
  CONTAINERD_RUNTIME_NOT_SUPPORTED: 'The containerd runtime does not support this feature.',
  S2I_DESC: 'Por favor elige tu lenguaje de código fuente',
  IMAGE_FROM_S2I: 'Crea una nueva imagen a partir del código',
  IMAGE_FROM_B2I: 'Crea una nueva imagen a partir del artefacto',
  B2I_DESC: 'Select the file type of your artifact.',
  EMPTY_IMAGE_TYPE_DESC: 'Please select a language or artifact type.',
  // List > Create > Java > Build Settings
  CODE_REPOSITORY_URL: 'URL de código',
  CODE_REPOSITORY_BRANCH: 'Rama',
  CODE_REPOSITORY_KEY: 'Key',
  CODE_REPOSITORY_URL_DESC: 'La dirección del repositorio del código fuente (actualmente es compatible con git). Puedes especificar ramas de código y rutas relativas en el terminal del código fuente.',
  CODE_REPOSITORY_KEY_DESC: 'Si es un repositorio de código privado, escoge la clave del repositorio de código.',
  IMAGE_NAME: 'Image Name',
  IMAGE_TAG: 'Image Tag',
  TARGET_IMAGE_REPOSITORY: 'Repositorio de imágenes de destino',
  S2I_IMAGE_NAME_DESC: 'Nombre de la imagen y tag, que por defecto es el nombre del proyecto del repositorio de código.',
  S2I_TARGET_IMAGE_REPOSITORY_DESC: 'Select a Secret with push permissions to the image repository. De lo contrario, puedes <a href={link} target="_blank">crear una nueva credencial de repositorio de imágenes</a> .',
  TRIGGER_TOKEN: 'Secret Code',
  INVALID_TRIGGER_TOKEN_DESC: 'It can only contain upper and lower case letters, numbers.',
  TRIGGER_TOKEN_DESC: 'Set a token used to authenticate a client against KubeSphere when the client attempts to trigger image building on KubeSphere. The token can contain only uppercase letters, lowercase letters, and numbers.',
  CODE_RELATIVE_PATH: 'Ruta relativa del código (opcional):',
  CODE_RELATIVE_PATH_DESC: 'Especifica un directorio relativo dentro de la aplicación. (Valor por defecto /)',
  S2I_ENVIRONMENT_DESC: 'Los desarrolladores de aplicaciones pueden usar las siguientes variables de entorno para configurar el comportamiento en tiempo de ejecución de esta imagen; para configuraciones detalladas, consulta <a href={link} target="_blank">plantillas de compilación</a> .',
  // List > Create > JAR > Build Settings
  UPLOAD_ARTIFACT_FILE: 'Haz clic para seleccionar el archivo de artefacto a subir',
  UPLOAD_PERCENT: 'Uploaded: {percent}%',
  UPLOAD_FULLY: 'Uploaded: 100%',
  UPLOAD_FAILED: 'Upload failed.',
  ARTIFACT_FILE_EMPTY_DESC: 'El archivo no se ha subido.',
  B2I_DEFAULT_DESC: 'Elige tu artefacto para construir una imagen de contenedor',
  JAR_DESC: 'Un archivo JAR es un formato de empaquetado de archivos que se usa comúnmente para agregar una gran cantidad de archivos de clase Java, metadatos relacionados y archivos de recursos (texto, imágenes, etc.) en un archivo.',
  WAR_DESC: 'El archivo WAR es un archivo utilizado para distribuir una colección de archivos JAR, JavaServer Pages, Java Servlets, clases Java, archivos XML, bibliotecas de tags, páginas web estáticas (HTML y archivos relacionados) y otros recursos que juntos constituyen una aplicación web.',
  BUILD_ENVIRONMENT: 'Entorno de build',
  CODE_REPOSITORY_KEY_NOT_REQUIRED: 'El repositorio de código actual no requiere clave.',
  FILE_SIZE_VALUE: 'File size: {value}',
  FILE_UPLOADED_TIP: 'Documento subido correctamente',
  WRONG_FILE_EXTENSION_NAME: 'El tipo de archivo seleccionado no coincide, selecciona el tipo {type}',
  IMAGE_NAME_EMPTY_DESC: 'Please enter an image name.',
  IMAGE_TAG_EMPTY_DESC: 'Please enter an image tag.',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: 'Please set a target image registry.'
};