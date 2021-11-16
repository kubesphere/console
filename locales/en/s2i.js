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

  'Add Environment Variables': 'Add Environment Variables',
  'Artifact Type': 'Artifact Type',
  'Authentication required': 'Authentication required',
  b2i: 'b2i',
  binary: 'binary',
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

  CLICK_UPLOAD_ARTIFACT: 'Click to Upload an Artifact',
  'Code Resource': 'Code Resource',
  CODE_URL: 'Code URL',

  creationTimestamp: 'creationTimestamp',
  'Currently only supports git repo':
    'Only Git repositories are supported currently.',
  'Download Artifact': 'Download Artifact',
  'Environment Params': 'Environment Params',
  'exec: "git": executable file not found in $PATH':
    'exec: "git": executable file not found in $PATH',
  'Image Builder': 'Image Builder',

  'Image Building': 'Image Building',
  'Image building failed': 'Image building failed',
  'Image building succeeded': 'Image building succeeded',

  ImageName: 'ImageName',
  'is Failed': 'is Failed',

  'New Image Tag': 'New Image Tag',
  'New Tag': 'New Tag',
  'No Log Records': 'No Log Records',

  'Published Time': 'Published Time',
  PULL_COMMAND: 'Pull Command',

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

  S2I_NO_SECRET: 'The current code repository does not require a secret.',
  UPLOAD_ARTIFACT_TIP: 'Please upload an artifact.',

  UPLOAD_ARTIFACT: 'Upload Artifact',

  'Upload file failed': 'Upload file failed',
  'Upload Percent': 'Upload Percent',

  SORT_BY: 'sort by { name }',

  S2I_RELATIVE_PATH_DESC:
    'Source code repository address (currently supports git) and can assign code branches and relative paths in source code terminals',

  IMAGE_PULL_POLICY_DESC:
    'By default, the image is pulled only if it is not already present locally.',

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

  S2I_BUILDERNAME_DESC:
    'Select the editing environment, you can also view the <a href={link} target="_blank">corresponding compilation template</a>',
  'Build image for service x': 'Build image for service {service}',

  BINARY_DESC: '',

  SECRET_CODE: 'Secret Code',
  SECRET_CODE_RULE_DESC:
    'It can only contain upper and lower case letters and numbers.',

  S2I_ACCESS_TOKEN_DESC: 'Set the ',

  'Remote Trigger Link': 'Remote Trigger Link',

  // Image Builder List Page

  // Creation Page

  S2I_SECRET: 'Secret',
}
