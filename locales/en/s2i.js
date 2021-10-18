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
  'Add Environment Variables': 'Add Environment Variables',
  'Artifact Type': 'Artifact Type',
  'Authentication required': 'Authentication required',
  b2i: 'b2i',
  binary: 'binary',
  BUILD_ENVIRONMENT: 'Build Environment',
  'Build Times': 'Build Times',
  Builder: 'Builder',
  'builder name': 'builder name',
  builderImage: 'builderImage',
  BuilderImage: 'BuilderImage',
  BuilderPullPolicy: 'BuilderPullPolicy',
  builderPullPolicy: 'builderPullPolicy',
  Building: 'Building',
  'Building Image': 'Building Image',
  'Building Log': 'Building Log',
  'building logs': 'building logs',
  BUILD_MODE: 'Build Mode',
  CLICK_UPLOAD_ARTIFACT: 'Click to Upload an Artifact',
  'Code Resource': 'Code Resource',
  CODE_URL: 'Code URL',
  DOWNLOAD_ARTIFACT: 'Download Artifact',
  UPLOAD_ARTIFACT_FILE: 'Upload Artifact File',
  CODE_REPOSITORY_URL: 'Code Repository URL',
  CONTAINER_SETTINGS: 'Container Settings',
  creationTimestamp: 'creationTimestamp',
  'Currently only supports git repo':
    'Only Git repositories are supported currently.',
  'Download Artifact': 'Download Artifact',
  'Environment Params': 'Environment Params',
  'exec: "git": executable file not found in $PATH':
    'exec: "git": executable file not found in $PATH',
  FILE_SIZE_VALUE: 'File size: {value}',
  FILE_UPLOADED_TIP: 'File uploaded successfully.',
  IMAGE_ARTIFACTS: 'Image Artifacts',
  'Image Builder': 'Image Builder',
  IMAGE_BUILDER: 'Image Builder',
  IMAGE_BUILDER_PL: 'Image Builders',
  IMAGE_BUILDER_LOW: 'image builder',
  BUILDER_IMAGE: 'Builder Image',
  BUILDER_IMAGE_SCAP: 'Builder image',
  PULL_POLICY: 'Pull Policy',
  SOURCE_URL: 'Source URL',
  REMOTE_TRIGGER: 'Remote Trigger',
  'Image Building': 'Image Building',
  'Image building failed': 'Image building failed',
  'Image building succeeded': 'Image building succeeded',
  IMAGE_SIZE_SCAP: 'Image size',
  IMAGE_NAME: 'Image Name',
  IMAGE_NAME_SCAP: 'Image name',
  IMAGE_NAME_EMPTY_DESC: 'Please enter an image name.',
  IMAGE_TAG_EMPTY_DESC: 'Please enter an image tag.',
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: 'Please set a target image registry.',
  IMAGE_TAG: 'Image Tag',
  ImageName: 'ImageName',
  'is Failed': 'is Failed',
  JOB_RECORDS: 'Job Records',
  LAST_BUILD_ENVIRONMENT: 'Last Build Environment',
  LOG_MODULE_NOT_INSTALLED: 'The logging module is not installed.',
  LOADING_DOTS: 'Loading...',
  'New Image Tag': 'New Image Tag',
  'New Tag': 'New Tag',
  'No Log Records': 'No Log Records',
  PORT_SETTINGS_DESC: 'Set the ports used for accessing the container.',
  CONTAINER_SETTINGS_DESC:
    'Set the image, name, type, and computing resources of the container.',
  'Published Time': 'Published Time',
  PULL_COMMAND: 'Pull Command',
  PULL_COMMAND_SCAP: 'Pull command',
  'Rebuild Image': 'Rebuild Image',
  'Rebuilt successfully; the image status will be refreshed soon.':
    'Rebuilt successfully; the image status will be refreshed soon.',
  'Release Time': 'Release Time',
  'Repo reading failed': 'Repo reading failed',
  'Repo url': 'Repo url',
  'Repo URL': 'Repo URL',
  'Repository Not Found': 'Repository Not Found',
  RevisionId: 'RevisionId',
  'Run Command': 'Run Command',
  s2i: 's2i',
  S2IJobs: 'S2IJobs',
  'Source to image jobs': 'Source to image jobs',
  sourceUrl: 'sourceUrl',
  SourceUrl: 'SourceUrl',
  S2I_RELATIVE_PATH_TIP:
    'Specify a relative directory inside the application. (Default value /)',
  StartTime: 'StartTime',
  TARGET_IMAGE_REPOSITORY: 'Target Image Registry',
  S2I_NO_SECRET: 'The current code repository does not require a secret.',
  UPLOAD_ARTIFACT_TIP: 'Please upload an artifact.',
  HEALTH_CHECKER_DESC:
    'Add probes to check the container health status regularly.',
  UPLOAD_ARTIFACT: 'Upload Artifact',
  UPLOAD_FAILED: 'Upload failed.',
  CODE_RELATIVE_PATH_DESC:
    'Set the relative path of the code in the code repository. The default path is /.',
  STARTUP_COMMAND: 'Start Command',
  CODE_REPOSITORY_KEY_NOT_REQUIRED:
    'The current code repository does not require a key.',
  ARTIFACT_FILE_EMPTY_DESC: 'Please upload an artifact file.',
  ARTIFACT_FILE: 'Artifact File',
  'Upload file failed': 'Upload file failed',
  'Upload Percent': 'Upload Percent',

  SORT_BY: 'sort by { name }',
  IMAGE_NAME_BUILDING: 'Image: {name}/Building',
  IMAGE_NAME_FAILED: 'Image: {name}/Failed',
  IMAGE_NAME_SUCCESSFUL: 'Image: {name}/Successful',
  NEW_TAG_DESC: 'enter tag of the new image',
  S2I_RELATIVE_PATH_DESC:
    'Source code repository address (currently supports git) and can assign code branches and relative paths in source code terminals',
  STARTUP_COMMAND_DESC:
    'Customize the command run by the container upon startup. By default, the container runs the default image command.',
  CONTAINER_COMMAND_DESC: 'Startup command of the container.',
  CONTAINER_ARGUMENT_DESC:
    'Parameters of the startup command. Use commas to separate multiple parameters.',
  CONTAINER_ENVIRONMENT_DESC: 'Add environment variables to the container.',
  IMAGE_PULL_POLICY_DESC:
    'By default, the image is pulled only if it is not already present locally.',
  S2I_ENVIRONMENT_DESC:
    'Set environment variables to control the runtime behavior of the image. <a href={link} target="_blank">Learn More</a>',
  S2I_UPDATE_WORKLOAD: 'Update workload after building is successful',
  S2I_UPDATA_WORKLOAD_DESC:
    'After the image is rebuilt successfully, the image of the relevant workload will be updated and the workload version will be updated.',
  IMAGE_FROM_S2I_DESC:
    'Get the code from the existing code repository and build the image by way of Source to Image. The process of building the image each time will be done as a Job.',
  IMAGE_FROM_EXSIT: 'Select an existing image deployment container',
  IMAGE_FROM_EXSIT_DESC:
    'Pull an image from a public or private image repository',
  S2I_SECRET_DESC:
    'Select a secret if the code repository is a private repository.',
  S2I_IMAGE_REPONSITRY_DESC:
    'The source code repository address (currently supports Git). You can specify the code branch and relative path in the source code terminal.',
  S2I_RELATIVE_PATH: 'Code Relative Path (Optional)',
  S2I_IMAGENAME_DESC:
    'Image name and tag, which defaults to the project name of the code repository.',
  IMAGE_BUILDER_DESC:
    'Image Builder is a tool that builds container images from source code or artifacts. You can build container images from source code or artifacts through simple configurations.',
  BUILD_IMAGE_FOR_SERVICE: 'Build image for Service {service}.',
  S2I_DESC: 'Select a source code language.',
  IMAGE_FROM_S2I: 'Build Image from Source Code',
  IMAGE_FROM_B2I: 'Build Image from Artifact',
  B2I_DESC: 'Select an artifact file type.',
  CODE_REPOSITORY_KEY_DESC:
    'Select the Secret that contains the code repository key if a private code repository is used.',
  CODE_REPOSITORY_URL_DESC:
    'Enter the address of the source code repository. Currently, only Git repositories are supported.',
  CODE_RELATIVE_PATH: 'Code Relative Path',
  S2I_IMAGE_NAME_DESC:
    'The name can contain only lowercase letters, numbers, hyphens (-), dots (.), slashes (/), and colons (:), and must start and end with a lowercase letter or number.',
  S2I_TARGET_IMAGE_REPOSITORY_DESC:
    'Select an image registry for storing the image to be created. If no image registry is available, you need to create an image registry Secret. <br/><a href={link} target="_blank">Learn More</a>',
  S2I_BUILDERNAME_DESC:
    'Select the editing environment, you can also view the <a href={link} target="_blank">corresponding compilation template</a>',
  'Build image for service x': 'Build image for service {service}',
  B2I_DEFAULT_DESC: 'Upload an artifact file.',
  JAR_DESC: 'Upload an artifact file in JAR format.',
  WAR_DESC: 'Upload an artifact file in WAR format.',
  BINARY_DESC: '',
  IMAGE_BUILDER_EMPTY_DESC: 'Please create an image builder.',
  WRONG_FILE_EXTENSION_NAME:
    'The selected file type does not match. Please select the {type} type.',
  PROBE_COMMAND_DESC: 'Use commas to separate multiple commands.',
  SECRET_CODE: 'Secret Code',
  SECRET_CODE_RULE_DESC:
    'It can only contain upper and lower case letters and numbers.',
  TRIGGER_TOKEN: 'Trigger Token',
  TRIGGER_TOKEN_DESC:
    'Set a token used to authenticate a client against KubeSphere. You can set a client to automatically trigger image building on KubeSphere over a webhook. The token can contain only uppercase letters, lowercase letters, and numbers.',
  S2I_ACCESS_TOKEN_DESC: 'Set the ',
  INVALID_TRIGGER_TOKEN_DESC:
    'Invalid token. The token can contain only uppercase letters, lowercase letters, and numbers.',
  'Remote Trigger Link': 'Remote Trigger Link',

  // Image Builder List Page

  // Creation Page
  UPLOAD_PERCENT: 'Uploaded: {percent}%',
  UPLOAD_FULLY: 'Uploaded: 100%',
  FILE_SIZE: 'File size: {size}',
  S2I_SECRET: 'Secret',
}
