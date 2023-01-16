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
  ROUTE_DESC: 'Eine ingress bietet eine Möglichkeit, Dienste zusammenzufassen. Sie können die internen Dienste außerhalb des Clusters durch eine externe zugängliche IP-Adresse freigeben.',
  PREREQUESTS_FOR_USE_ROUTE_Q: 'What are the prerequisites for using ingresses?',
  PREREQUESTS_FOR_USE_ROUTE_A: 'To use ingresses, you need to contact the project administrator to set the gateway for the project.',
  ACCESS_TYPES_OF_ROUTE_Q: 'What are the external access modes of ingresses?',
  ACCESS_TYPES_OF_ROUTE_A: 'KubeSphere ingresses support the NodePort and LoadBalancer external access modes.',
  ROUTE_PL: 'Ingresses',
  // List
  GATEWAY_ADDRESS_TCAP: 'Gatewayadresse',
  ROUTE_EMPTY_DESC: 'Please create an ingress.',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC: 'Add a routing rule to map domain name paths to services.',
  ADD_ROUTING_RULE: 'Routingregel hinzufügen',
  ROUTING_RULE_EMPTY_DESC: 'Bitte mindestens eine Routingregel hinzufügen.',
  PATH_EMPTY_DESC: 'Bitte fügen Sie mindestens einen Pfad hinzu.',
  AUTO_GENERATE_TCAP: 'Automatisch generieren',
  DOMAIN_NAME_TCAP: 'Domainname',
  DOMAIN_NAME_EMPTY_DESC: 'Bitte geben Sie einen Domainnamen ein.',
  INVALID_DOMAIN_DESC: 'Ungültiger Domainname.',
  INVALID_PATH_DESC: 'Ungültiger Pfad.',
  MODE_TCAP: 'Modus',
  PATH_PL: 'Pfade',
  PATH_SERVICE_TIP: 'Dienst',
  SET_ROUTING_RULES: 'Routingregeln festlegen',
  SPECIFY_DOMAIN_TCAP: 'Domain angeben',
  NO_GATEWAY_DESC: 'Um Auto Generate zu verwenden, wenden Sie sich bitte an den Projektadministrator, um den Gateway-Zugriffsmodus in den Gateway-Einstellungen des Projekts festzulegen.',
  PATH: 'Pfad',
  PROTOCOL: 'Protokoll',
  PORT: 'Port',
  PORT_VALUE: 'Port: {value}',
  CERTIFICATE: 'Zertifikat',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Routing Rules
  EDIT_ROUTING_RULES: 'Routingregeln bearbeiten',
  // List > Edit Annotations
  EDIT_ANNOTATIONS: 'Anmerkungen bearbeiten',
  // List > Delete
  ROUTE_LOW: 'ingress'
};