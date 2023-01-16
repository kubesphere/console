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
  SERVICE_PL: 'Dienste',
  SERVICE_DESC: 'Dienste bieten eine abstrakte Möglichkeit, Anwendungen, die auf einem Pod ausgeführt werden, als Netzwerkdienste bereitzustellen.',
  // List
  SERVICE_EMPTY_DESC: 'Bitte erstellen Sie einen Dienst.',
  UNKNOWN: 'Unbekannt',
  EXTERNAL_ACCESS: 'External Access',
  INTERNAL_ACCESS: 'Internal Access',
  // List > Edit YAML
  // List > Edit Service
  UNKNOWN_SERVICE_TYPE: 'Unknown Service Type',
  // List > Delete
  SERVICE: 'Dienst',
  SERVICE_LOW: 'dienst',
  // List > Create
  INTERNAL_ACCESS_MODE: 'Interner Zugriffsmodus',
  CREATE_SERVICE: 'Dienst erstellen',
  // List > Create > Basic Information
  SERVICE_NAME_DESC: 'Der Name darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten (-), muss mit einem Kleinbuchstaben beginnen und mit einem Kleinbuchstaben oder einer Zahl enden. Die Maximallänge beträgt 63 Zeichen.',
  // List > Create > Service Settings
  VIRTUAL_IP_TITLE: 'Virtuelle IP-Adresse',
  INTERNAL_DOMAIN_NAME: 'Interner Domainname',
  CONTAINER_PORT: 'Container Port',
  INVALID_PORT: 'Ungültiger Port.',
  PORT_EMPTY: 'Bitte legen Sie mindestens einen Port fest.',
  ENTER_SELECTOR_TIP: 'Please set a workload selector.',
  Ports: 'Ports',
  SPECIFY_WORKLOAD: 'Specify Workload',
  SELECT_WORKLOAD_DESC: 'Use labels of a workload as the selector.',
  VIRTUAL_IP_DESC: 'Dem Dienst wird eine virtuelle IP-Adresse zugewiesen. Der Dienst kann innerhalb des Clusters über die virtuelle IP-Adresse erreicht werden.',
  INTERNAL_DOMAIN_NAME_DESC: 'Dem Dienst ist keine IP-Adresse zugewiesen. Der Dienst kann innerhalb des Clusters über den Cluster-DNS-Mechanismus aufgerufen werden.',
  SERVICE_PORTS_DESC: 'Legen Sie die Container und Service Ports fest.',
  NO_WORKLOAD_MATCH_SELECTOR: 'The current selector matches no workload.',
  WORKLOADS_MATCH_SELECTOR_SI: 'The current selector ({selector}) matches {count} workload.',
  WORKLOADS_MATCH_SELECTOR_PL: 'The current selector ({selector}) matches {count} workloads.',
  WORKLOAD_SELECTOR: 'Workload Selector',
  SERVICE_SETTINGS: 'Diensteinstellungen',
  // List > Create > Service Settings > Workload Selector > View Details
  TOTAL_WORKLOADS_VALUE: 'Total Workloads: {count}',
  // List > Create > Advanced Settings
  OPENELB_NOT_READY: 'OpenELB ist nicht installiert. Bitte installieren Sie OpenELB.',
  SESSION_PERSISTENCE: 'Sitzungspersistenz',
  MAXIMUM_STICKINESS_DURATION: 'Maximale Klebrigkeitsdauer (s)',
  SESSION_PERSISTENCE_DESC: 'Stellen das System so ein, dass alle Anfragen vom gleichen Client innerhalb einer bestimmten Zeit an den gleichen Pod weitergeleitet werden.',
  SERVICE_EXTERNAL_ACCESS_DESC: 'Legen Sie die Methode für den Zugriff auf den Dienst von außerhalb des Clusters fest.',
  ACCESS_NODEPORT_TIP: 'Verwenden Sie einen Port der Cluster Nodes, um auf den Dienst zuzugreifen.',
  ACCESS_LOADBALANCER_TIP: 'Verwenden Sie einen Lastverteiler, um auf den Dienst zuzugreifen.',
  WORKLOAD_ANNOTATIONS: 'Workload Annotations',
  LABEL_FORMAT_DESC: 'Der Schlüssel und der Wert eines Labels können nur Buchstaben, Zahlen, Bindestriche (-), Unterstriche (_) und Punkte (.) enthalten, und muss mit einem Buchstaben oder einer Zahl beginnen und enden. Die maximale Länge jedes Schlüssels und jeden Wert beträgt 63 Zeichen (wenn der Schlüssel einen Domainnamen enthält, die maximale Länge ist 253 Zeichen).'
};