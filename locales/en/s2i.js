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
  'Build Environment': 'Build Environment',
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
  'Choose a Language': 'Choose a Language',
  'Click to upload an artifact': 'Click to upload an artifact',
  'Code Resource': 'Code Resource',
  'Code URL': 'Code URL',
  'Container Settings': 'Container Settings',
  creationTimestamp: 'creationTimestamp',
  'Currently only supports git repo': 'Currently only supports git repo',
  'Download Artifact': 'Download Artifact',
  'Environment Params': 'Environment Params',
  'exec: "git": executable file not found in $PATH':
    'exec: "git": executable file not found in $PATH',
  'File Size': 'File Size',
  'File Uploaded Successfully': 'File Uploaded Successfully',
  'Image Artifacts': 'Image Artifacts',
  'Image Builder': 'Image Builder',
  'Image Builders': 'Image Builder',
  'Image Building': 'Image Building',
  'Image building failed': 'Image building failed',
  'Image building succeeded': 'Image building succeeded',
  'Image Size': 'Image Size',
  imageName: 'imageName',
  ImageName: 'ImageName',
  'is Failed': 'is Failed',
  'Job Records': 'Job Records',
  'Last build environment': 'Last build environment',
  'Last Message': 'Last Message',
  'The logging module is not installed.':
    'The logging module is not installed.',
  'Log is loading...': 'Log is loading...',
  'New Image Tag': 'New Image Tag',
  'New Tag': 'New Tag',
  'No Log Records': 'No Log Records',
  'Please set the access policy for the container.':
    'Please set the access policy for the container.',
  'Please set the container name and computing resources.':
    'Please set the container name and computing resources.',
  'Published Time': 'Published Time',
  'Pull Command': 'Pull Command',
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
  'Specify a relative directory inside the application. (Default value /)':
    'Specify a relative directory inside the application. (Default value /)',
  'Start Command': 'Start Command',
  StartTime: 'StartTime',
  'Target Image Repository': 'Target Image Repository',
  'The current code repository does not require a key.':
    'The current code repository does not require a key.',
  'The file has not been uploaded.': 'The file has not been uploaded.',
  'The health of the container will be checked regularly according to user needs.':
    'The health of the container will be checked regularly according to user needs.',
  'Upload Artifact': 'Upload Artifact',
  'Upload file failed': 'Upload file failed',
  'Upload Percent': 'Upload Percent',

  SORT_BY: 'sort by { name }',
  S2I_Building: 'building',
  S2I_Failed: 'building failed',
  S2I_Successful: 'building successful',
  NEW_TAG_DESC: 'enter tag of the new image',
  S2I_RELATIVE_PATH_DESC:
    'Source code repository address (currently supports git) and can assign code branches and relative paths in source code terminals',
  START_COMMAND_DESC:
    'By default, the container runs the default image command. You can change the container command from here.',
  RUN_COMMAND_DESC:
    'The start command of the container. By default, the start command for packaging will be used. Please use commas to separate multiple commands.',
  CONTAINER_PARAMS_DESC:
    'The start command parameters of the container. Please use commas to separate multiple ones.',
  CONTAINER_ENVIROMENT_DESC: "Please add the container's environment variable.",
  IMAGE_PULL_POLICY_DESC:
    'By default, the image is pulled only if it is not already present locally.',
  S2I_ENVIROMENT_DESC:
    'App developers can use the following environment variables to configure the runtime behavior of the image. For more information, see <a href={link} target="_blank">S2I Templates</a>.',
  S2I_UPDATE_WORKLOAD: 'Update workload after building is successful',
  S2I_UPDATA_WORKLOAD_DESC:
    'After the image is rebuilt successfully, the image of the relevant workload will be updated and the workload version will be updated.',
  IMAGE_FROM_S2I_DESC:
    'Get the code from the existing code repository and build the image by way of Source to Image. The process of building the image each time will be done as a Job.',
  IMAGE_FROM_EXSIT: 'Select an existing image deployment container',
  IMAGE_FROM_EXSIT_DESC:
    'Pull an image from a public or private image repository',
  S2I_SECRET_DESC:
    'If it is a private code repository, choose the code repository key.',
  S2I_IMAGE_REPONSITRY_DESC:
    'The source code repository address (currently supports git). You can specify the code branch and relative path in the source code terminal.',
  S2I_RELATIVE_PATH: 'Code Relative Path (optional):',
  S2I_IMAGENAME_DESC:
    'Image name and tag, which defaults to the project name of the code repository.',
  S2I_TARGET_IMAGE_REPONSTRY_DESC:
    'You need to select an image repository with push permissions to store the image. If it is not available, you need to <a href={link} target="_blank">create a new image repository Secret</a>.',
  S2I_BUILDERNAME_DESC:
    'Select the editing environment, you can also view the <a href={link} target="_blank">corresponding compilation template</a>',
  IMAGE_BUILDER_DESC:
    'Image Builder is a tool that makes it easy to write container images that take application source code or artifacts as an input and produce a new image that runs the assembled application as output. It includes Source to Image, a.k.a S2I which takes source code as input, and Binary to Image, a.k.a. B2I which takes application artifacts as input.',
  'Build image for service x': 'Build image for service {service}',
  S2I_DESC: 'Please choose your source code language',
  IMAGE_FROM_S2I: 'Build a new image from source code',
  IMAGE_FROM_B2I: 'Build a new image from the artifact',
  B2I_DESC: 'Please choose your artifact to build a container image',
  B2I_DEFAULT_DESC: 'Please choose your artifact to build a container image',
  JAR_DESC:
    'A JAR file is a package file format that is commonly used to aggregate a large number of Java class files, related metadata and resources (text, images, etc.) files into a file.',
  WAR_DESC:
    'WAR file is a file used to distribute a collection of JAR-files, JavaServer Pages, Java Servlets, Java classes, XML files, tag libraries, static web pages (HTML and related files) and other resources that together constitute a web application.',
  BINARY_DESC: '',
  IMAGE_BUILDER_CREATE_DESC:
    'Image Builder is a tool that makes it easy to write container images that take application source code or artifacts as an input and produce a new image that runs the assembled application as output. It includes Source to Image, a.k.a S2I which takes source code as input, and Binary to Image, a.k.a. B2I which takes application artifacts as input.',
  WRONG_FILE_EXTENSION_NAME:
    'The selected file type does not match, please select the {type} type',
  PROBE_COMMAND_DESC: 'Please use commas to separate multiple commands.',
  'Secret Code': 'Secret Code',
  SECRET_CODE_RULE_DESC:
    'It can only contain upper and lower case letters, numbers.',
  'Remote Trigger Link': 'Remote Trigger Link',
}
