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

export default {
  SORT_BY: 'sort by { name }',
  S2I_Building: 'is building',
  S2I_Failed: 'building failed',
  S2I_Successful: 'building success',
  NEW_TAG_DESC: 'input tag of the new image',
  S2I_RELATIVE_PATH_DESC:
    'Source code repository address (currently supports git) and can assign code branches and relative paths in source code terminals',
  START_COMMAND_DESC:
    'By default, the container runs the default image command. You can change the container command from here.',
  RUN_COMMAND_DESC:
    'The start command of the container separated by "," if you need the container to run different command than the default image command.',
  CONTAINER_PARAMS_DESC:
    'The start command parameters of the container separated by ","',
  CONTAINER_ENVIROMENT_DESC: "Add the container's environment variable",
  IMAGE_PULL_POLICY_DESC:
    'By default, the image is pulled only if it is not already present locally.',
  S2I_ENVIROMENT_DESC:
    'Application developers can use the following environment variables to configure the runtime behavior of this image; for the detailed configurations, please see <a href={link} target="_blank">Compiling Templates</a>.',
  S2I_UPDATE_WORKLOAD: 'Update workload after building successful',
  S2I_UPDATA_WORKLOAD_DESC:
    'After the image is rebuilt successfully, the image of the relevant workload will be updated and the workload version will be updated.',
  IMAGE_FROM_S2I_DESC:
    'Get the code from the existing code repository and build the image by way of Source to Image. The process of building the image each time will be done as a job.',
  IMAGE_FROM_EXSIT: 'Select an existing image deployment container',
  IMAGE_FROM_EXSIT_DESC:
    'Pulling a image from a public or private image repository',
  S2I_SECRET_DESC:
    'If it is a private code repository, choose the code repository key',
  S2I_IMAGE_REPONSITRY_DESC:
    'The source code repository address (currently supports git) and can specify code branches and relative paths in the source code terminal',
  S2I_RELATIVE_PATH: 'Code relative path (optional):',
  S2I_IMAGENAME_DESC:
    'Image name and tag, defaults to the project name of the code repository',
  S2I_TARGET_IMAGE_REPONSTRY_DESC:
    'You need to select a image repository with push permissions to store the image. If not, you can <a href={link} target="_blank">create a new image repository credential</a>.',
  S2I_BUILDERNAME_DESC:
    'Select the editing environment, you can also view the <a href={link} target="_blank">corresponding compilation template</a>',
  IMAGE_BUILDER_DESC:
    'Image Builder is a tool that makes it easy to write container images that take application source code or artifacts as an input and produce a new image that runs the assembled application as output. It includes Source to Image, a.k.a S2I which takes source code as input, and Binary to Image, a.k.a. B2I which takes application artifacts as input.',
  'Build image for service x': 'Build image for service {service}',
  S2I_DESC: 'Please choose your souce code language',
  IMAGE_FROM_S2I: 'Build a new image from code',
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
}
