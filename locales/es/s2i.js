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
  PULL_COMMAND_SCAP: 'Pull command',
  'Add Environment Variables': 'Añade parámetros de entorno',
  'Artifact Type': 'Tipo de artefacto',
  'Authentication required': 'Autenticación requerida',
  b2i: 'b2i',
  binary: 'binario',
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
  CLICK_UPLOAD_ARTIFACT: 'Haz clic para seleccionar el archivo de artefacto a subir',
  'Code Resource': 'Recurso de código',
  CODE_URL: 'URL de código',
  creationTimestamp: 'creationTimestamp',
  'Currently only supports git repo': 'Actualmente solo admite repositorio git',
  'Download Artifact': 'Download Artifact',
  'Environment Params': 'Parámetros de entorno',
  'exec: "git": executable file not found in $PATH': 'exec: "git": archivo ejecutable no encontrado en $PATH',
  'Image Builder': 'Image Builder',
  'Image Building': 'Construcción de la imagen',
  'Image building failed': 'La construcción de la imagen falló',
  'Image building succeeded': 'La construcción de la imagen tuvo éxito',
  ImageName: 'Image Name',
  'is Failed': 'falló',
  'New Image Tag': 'Nuevo tag de imagen',
  'New Tag': 'Nuevo tag',
  'No Log Records': 'Sin registros',
  'Published Time': 'Hora publicada',
  PULL_COMMAND: 'Comando de pull',
  'Rebuild Image': 'Reconstruir imagen',
  'Rebuilt successfully; the image status will be refreshed soon.': 'Reconstruida con éxito; el estado de la imagen se actualizará pronto.',
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
  S2I_RELATIVE_PATH_TIP: 'Especifica un directorio relativo dentro de la aplicación. (Valor por defecto /)',
  StartTime: 'Hora de inicio',
  S2I_NO_SECRET: 'El repositorio de código actual no requiere clave.',
  UPLOAD_ARTIFACT_TIP: 'Please upload an artifact.',
  UPLOAD_ARTIFACT: 'Subir artefactos',
  'Upload file failed': 'Error al cargar el archivo',
  'Upload Percent': 'Porcentaje de subida',
  SORT_BY: 'ordenado por { name }',
  S2I_RELATIVE_PATH_DESC: 'Dirección del repositorio de código fuente (actualmente admite git) y puedes asignar ramas de código y rutas relativas en terminales de código fuente',
  IMAGE_PULL_POLICY_DESC: 'Por defecto, la imagen se descarga solo si aún no está presente localmente.',
  S2I_UPDATE_WORKLOAD: 'Actualiza la carga de trabajo después de construir con éxito',
  S2I_UPDATA_WORKLOAD_DESC: 'Una vez que la imagen se haya reconstruido correctamente, la imagen de la carga de trabajo relevante se actualizará y la versión de la carga de trabajo se actualizará.',
  IMAGE_FROM_S2I_DESC: 'Descarga el código del repositorio existente y crea la imagen a través de Source to Image. El proceso de construir la imagen cada vez se realizará como un trabajo.',
  IMAGE_FROM_EXSIT: 'Selecciona un contenedor de despliegue de imagen existente',
  IMAGE_FROM_EXSIT_DESC: 'Descarga una imagen de un repositorio de imágenes público o privado.',
  S2I_SECRET_DESC: 'Select a secret if the code repository is a private repository.',
  S2I_IMAGE_REPONSITRY_DESC: 'The source code repository address (currently supports Git). You can specify the code branch and relative path in the source code terminal.',
  S2I_RELATIVE_PATH: 'Code Relative Path (Optional)',
  S2I_IMAGENAME_DESC: 'Image name and tag, which defaults to the project name of the code repository.',
  S2I_BUILDERNAME_DESC: 'Selecciona el entorno de edición, también puedes ver la <a href={link} target="_blank">plantilla de compilación correspondiente</a>',
  CONTAINERD_RUNTIME_NOT_SUPPORT: 'S2I and B2I do not support the containerd runtime.',
  'Build image for service x': 'Build image for service {service}',
  BINARY_DESC: '',
  SECRET_CODE: 'Secret Code',
  SECRET_CODE_RULE_DESC: 'It can only contain upper and lower case letters and numbers.',
  S2I_ACCESS_TOKEN_DESC: 'Set the ',
  'Remote Trigger Link': 'Remote Trigger Link',
  // Image Builder List Page
  // Creation Page
  S2I_SECRET: 'Secret'
};