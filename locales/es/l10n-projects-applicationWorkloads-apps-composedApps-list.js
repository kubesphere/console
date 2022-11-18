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
  COMPOSED_APP_PL: 'Aplicación por composición',
  // List
  NO_COMPOSED_APP_FOUND: 'No Composed App Found',
  COMPOSED_APP_EMPTY_DESC: 'Puedes publicar servicios para crear aplicaciones a través de la orquestación de recursos (compatible con la gestión de aplicación).',
  // List > Edit Information
  // List > Delete
  // List > Create
  STATEFUL_SERVICE: 'Stateful Service',
  STATELESS_SERVICE: 'Stateless Service',
  CREATE_COMPOSED_APP: 'Crear aplicación por composición',
  SAVE_FORM_TIP: 'Por favor guarda el formulario actual primero',
  // List > Create > Edit YAML
  YAML_FILE: 'YAML File',
  CREATE_BY_YAML_DESC: 'Customize the settings in the YAML file.',
  // List > Create > Basic Information
  APPLICATION_GOVERNANCE: 'Gestión de aplicación',
  VERSION_DESC: 'Para gestión, ayudándote a distinguir entre componentes. Solo puede contener letras minúsculas y números. La longitud máxima de caracteres se establece en 16.',
  APPLICATION_GOVERNANCE_DESC: 'Enable Application Governace to use the Traffic Monitoring, Grayscale Release, and Tracing features for the app.',
  APP_BASIC_INFORMATION_DESC: 'Información básica de la aplicación (como la descripción)',
  // List > Create > Service Settings
  APP_SELECT_SERVICE_TYPE_DESC: 'Create a stateless or stateful Service.',
  STATEFUL_SERVICE_DESC: 'Los servicios con estado o stateful se usan para administrar aplicaciones con estado, asegurando un despliegue y escala ordenada y elegante. También proporcionan almacenamiento persistente estable e identificadores de red.',
  STATELESS_SERVICE_DESC: 'El servicio más utilizado en servicios de contenedores. Define la plantilla del Pod para controlar el estado del Pod, incluidas las actualizaciones continuas y los retrocesos.',
  APPLICATION_SERVICE_DESC: 'Puedes configurar diferentes componentes de servicio basándote en el tipo de servicio dentro de una aplicación. Tanto los servicios con estado como los sin estado están soportados.',
  APP_CREATE_SERVICE_DESC: 'Create a service for the app.',
  // List > Create > Route Settings
  ROUTE_SETTINGS: 'Route Settings',
  ROUTING_RULES: 'Reglas de ruta',
  ROUTE_SETTINGS_DESC: 'Puedes definir las reglas de acceso a internet para la aplicación (Ingress).',
  ADD_ROUTE_SUCCESS: 'The route was added successfully.'
};