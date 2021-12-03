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
  // List
  // List > Create > Basic Information
  // List > Create > Pod Settings
  CONTAINER_SETTINGS_DESC: 'Set the image, name, type, and computing resources of the container.',
  PORT_SETTINGS_DESC: 'Set the ports used for accessing the container.',
  HEALTH_CHECKER_DESC: 'Add probes to check the container health status regularly.',
  STARTUP_COMMAND: 'Start Command',
  STARTUP_COMMAND_DESC: 'Customize the command run by the container upon startup. By default, the container runs the default image command.',
  CONTAINER_COMMAND_DESC: 'Startup command of the container.',
  CONTAINER_ARGUMENT_DESC: 'Parameters of the startup command. Use commas to separate multiple parameters.',
  CONTAINER_ENVIRONMENT_DESC: 'Add environment variables to the container.',
  PROBE_COMMAND_DESC: 'Use commas to separate multiple commands.',
  // List > Create > Pod Settings > Add Container
  IGNORE_CERT_WARN_DESC: 'Ignoring certificate verification may cause password disclosure.',
  CERT_ERROR: 'Certificate error.'
};