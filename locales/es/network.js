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
  ADD_ALLOWLIST_ENTRY: 'Agregar lista de permitidos',
  CREATE_NETWORK_POLICY_TCAP: 'Crear política de red',
  // Network Policies Page
  CREATE_BTN: 'Crear',
  TRAFFIC_DIRECTION: 'Traffic Direction',
  EGRESS: 'Salida',
  Ingress: 'Entrada',
  NETWORK_ISOLATION: 'Aislamiento de red',
  'Network Policy': 'Política de red',
  NETWORK_POLICY: 'Política de red',
  NETWORK_POLICY_PL: 'Network Policies',
  NETWORK_POLICY_LOW: 'network policy',
  NETWORK_POLICY_EMPTY_DESC: 'Please create a network policy.',
  EGRESS_TRAFFIC: 'Salida de tráfico',
  INGRESS_TRAFFIC: 'Entrada de Tráfico',
  DESTINATION: 'Destination',

  NETWORK_POLICY_DESC:
    'La configuración de la política de red permite el aislamiento de la red dentro del mismo clúster, lo que significa que se pueden configurar cortafuegos entre ciertas instancias (Pods).',
  NETWORK_ISOLATION_DESC:
    'Al configurar el aislamiento de la red para controlar el tráfico entre Pods dentro del mismo clúster y el tráfico del exterior, las aplicaciones se aíslan y se mejora la seguridad.',
  NETWORK_POLICY_Q: '¿Cómo usar mejor una política de red?',
  NETWORK_ISOLATION_Q: '¿Cómo usar mejor el aislamiento de red?',
  NETWORK_POLICY_A:
    'Hemos compilado varios escenarios de aplicación comunes basados en los escenarios reales, y puedes consultar la documentación para obtener más información.',
  NETWORK_POLICY_Q1:
    'Requisitos del complemento CNI para implementar una política de red',
  NETWORK_ISOLATION_Q1:
    'What are the requirements on the CNI plugin for implementing network isolation?',
  NETWORK_POLICY_A1:
    'Asegúrate de que el plugin de red (CNI) utilizado por el clúster sea compatible con <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/" target="_blank">NetworkPolicy</a>. Existen varios plugins de red (CNI) que soportan NetworkPolicy, incluyendo Calico, Cilium, Kube-router, Romana y Weave Net.',
  NETWORK_POLICY_EMP_TITLE: 'Network Isolation Not Enabled',
  NETWORK_POLICY_EMP_DESC:
    'After the project network access is enabled, other projects will be unable to access the project. But you can allow projects, Services, and external IP addresses to access this project based on your needs.',
  PROJECT_NETWORK_ISOLATION: 'Aislamiento de red de proyecto',
  EXTERNAL_EGRESS_DESC:
    'Pods in the current project are allowed to access the following network segments and ports.',
  EXTERNAL_INGRESS_DESC:
    'Pods in the current project are allowed to be accessed by the following network segments and ports.',
  INTERNAL_EGRESS_DESC:
    'Allows access to resources that match any of the following network policies.',
  INTERNAL_INGRESS_DESC:
    'Allows access from resources that match any of the following network policies.',
  INTERNAL_ALLOWLIST: 'Internal Allowlist',
  INTERNAL_ALLOWLIST_DESC:
    'Specifies the allowed access to and from projects and services in the cluster.',
  INTERNAL_ALLOWLIST_TIP:
    'Add projects and services in the cluster to the allowlist.',
  EXTERNAL_ALLOWLIST: 'External Allowlist',
  EXTERNAL_ALLOWLIST_DESC:
    'Specifies the allowed access to and from network segments outside the cluster.',
  EXTERNAL_ALLOWLIST_TIP:
    'Add network segments outside the cluster to the allowlist.',
  EXTERNAL_TRAFFIC_DIRECTION_DESC:
    'Egress indicates the direction from the current project to outside the cluster. Ingress indicates the direction from outside the cluster to the current project.',
  NETWORK_SEGMENT_DESC: 'Set a network segment (CIDR is supported).',
  CREATE_NETWORK_POLICY_DESC:
    'La política de red está configurada para permitir el aislamiento de la red dentro del mismo clúster, es decir, la capacidad de construir un cortafuegos entre ciertas instancias (pods).',
  CIDR_DESC: 'Basado en la dirección del tráfico',
  SELECT_RULE_DIRECTION_TIP: 'Please select a traffic direction.',
  ENTER_VALID_SEGMENT_DESC: 'Please enter a valid network segment.',
  ENTER_VALID_PORT_NUMBER_DESC: 'Please enter a valid port number.',
  EMPTY_RESOURCE_DESC: 'Please select at least one project or Service.',
  ALLOWLIST_ENTRY: 'Allowlist Entry',
  ALLOWLIST_ENTRY_LOW: 'allowlist entry',
}
