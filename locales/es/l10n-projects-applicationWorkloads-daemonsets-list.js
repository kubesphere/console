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
  CONTAINER_SETTINGS_DESC: 'Establece el nombre del contenedor y los recursos de computación.',
  PORT_SETTINGS_DESC: 'Establece la política de acceso para el contenedor.',
  HEALTH_CHECKER_DESC: 'La salud del contenedor se verificará periódicamente de acuerdo con las necesidades del usuario.',
  STARTUP_COMMAND: 'Comando de inicio',
  STARTUP_COMMAND_DESC: 'Por defecto, el contenedor ejecuta el comando de imagen predeterminado. Puedes cambiar el comando del contenedor desde aquí.',
  CONTAINER_COMMAND_DESC: 'El comando de inicio del contenedor. Por defecto, se utilizará el comando de inicio para empaquetar. Utiliza comas para separar múltiples comandos.',
  CONTAINER_ARGUMENT_DESC: 'Los parámetros del comando de inicio del contenedor. Utiliza comas para separar varios.',
  CONTAINER_ENVIRONMENT_DESC: 'Añade la variable de entorno del contenedor.',
  PROBE_COMMAND_DESC: 'Utiliza comas para separar múltiples comandos.',
  // List > Create > Pod Settings > Add Container
  IGNORE_CERT_WARN_DESC: 'Ignoring the verification certificate may cause the account password to be disclosed. ',
  CERT_ERROR: 'A certificate error was found, do you want to ignore the certificate verification'
};