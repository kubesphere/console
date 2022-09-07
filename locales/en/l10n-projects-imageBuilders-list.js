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
  IMAGE_BUILDER_EMPTY_DESC: 'Please create an image builder.',
  NOT_RUNNING_YET: 'Not run yet',
  BUILDING: 'Building',
  S2I: 'Source-to-image',
  B2I: 'Artifact-to-image',
  // List > Name (Displayed after you create a service from artifact)
  BUILD_IMAGE_FOR_SERVICE: 'Build image for service {service}.',
  // List > Create > Build Mode
  BUILD_MODE: 'Build Mode',
  CONTAINERD_RUNTIME_NOT_SUPPORTED: 'The containerd runtime does not support this feature.',
  S2I_DESC: 'Select a source code language.',
  IMAGE_FROM_S2I: 'Build Image from Source Code',
  IMAGE_FROM_B2I: 'Build Image from Artifact',
  B2I_DESC: 'Select an artifact file type.',
  EMPTY_IMAGE_TYPE_DESC:'Please select a language or artifact type.',
  // List > Create > Java > Build Settings
  CODE_REPOSITORY_URL: 'Code Repository URL',
  CODE_REPOSITORY_BRANCH: 'Code Repository Branch',
  CODE_REPOSITORY_KEY: 'Code Repository Key',
  CODE_REPOSITORY_URL_DESC: 'Enter the address of the source code repository. Currently, only Git repositories are supported.',
  CODE_REPOSITORY_KEY_DESC: 'Select the secret that contains the code repository key if a private code repository is used.',
  IMAGE_NAME: 'Image Name',
  IMAGE_TAG: 'Image Tag',
  TARGET_IMAGE_REPOSITORY: 'Target Image Registry',
  S2I_IMAGE_NAME_DESC: 'The name can contain only lowercase letters, numbers, hyphens (-), dots (.), slashes (/), and colons (:), and must start and end with a lowercase letter or number.',
  S2I_TARGET_IMAGE_REPOSITORY_DESC: 'Select an image registry for storing the image to be created. If no image registry is available, you need to create an image registry secret. <br/><a href={link} target="_blank">Learn More</a>',
  TRIGGER_TOKEN: 'Trigger Token',
  INVALID_TRIGGER_TOKEN_DESC: 'Invalid token. The token can contain only uppercase letters, lowercase letters, and numbers.',
  TRIGGER_TOKEN_DESC: 'Set a token used to authenticate a client against KubeSphere. You can set a client to automatically trigger image building on KubeSphere over a webhook. The token can contain only uppercase letters, lowercase letters, and numbers.',
  CODE_RELATIVE_PATH: 'Code Relative Path',
  CODE_RELATIVE_PATH_DESC: 'Set the relative path of the code in the code repository. The default path is /.',
  S2I_ENVIRONMENT_DESC: 'Set environment variables to control the runtime behavior of the image. <a href={link} target="_blank">Learn More</a>',
  // List > Create > JAR > Build Settings
  UPLOAD_ARTIFACT_FILE: 'Upload Artifact File',
  UPLOAD_PERCENT: 'Uploaded: {percent}%',
  UPLOAD_FULLY: 'Uploaded: 100%',
  UPLOAD_FAILED: 'Upload failed.',
  ARTIFACT_FILE_EMPTY_DESC: 'Please upload an artifact file.',
  B2I_DEFAULT_DESC: 'Upload an artifact file.',
  JAR_DESC: 'Upload an artifact file in JAR format.',
  WAR_DESC: 'Upload an artifact file in WAR format.',
  BUILD_ENVIRONMENT: 'Build Environment',
  CODE_REPOSITORY_KEY_NOT_REQUIRED: 'The current code repository does not require a key.',
  FILE_SIZE_VALUE: 'File size: {value}',
  FILE_UPLOADED_TIP: 'File uploaded successfully.',
  WRONG_FILE_EXTENSION_NAME: 'The selected file type does not match. Please select the {type} type.',
  IMAGE_NAME_EMPTY_DESC: 'Please enter an image name.',
  IMAGE_TAG_EMPTY_DESC: 'Please enter an image tag.',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: 'Please set a target image registry.',
  // List > Edit Information
  // List > Delete
}
