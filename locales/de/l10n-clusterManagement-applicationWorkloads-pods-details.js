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
  // Attributes
  NODE_IP_ADDRESS: 'Node IP-Adresse',
  CLUSTER: 'Cluster',
  // Resource Status > Containers
  CONTAINER_PL: 'Container',
  PROBE_PL: 'Sonden',
  HOOK_PL: 'Hooks',
  // Resource Status > Containers > Container Logs
  CONTAINER_LOGS_NOT_SUPPORTED: 'Der Container unterstützt derzeit keine Echtzeit Logs. Bitte versuchen Sie es später erneut.',
  CONTAINER_LOGS: 'Container Logs',
  // Resource Status > Details > Container Details > Attributes
  COMMAND: 'Befehl',
  IMAGE_ID: 'Abbild ID',
  IMAGE_PULL_POLICY: 'Abbild Pull Richtlinie',
  CONTAINER_DETAILS_PAGE_SCAP: 'Container Detailseite.',
  CPU_VALUE: 'CPU: {value, plural, =1 {1 Kern} other {# Kerne}}',
  MEMORY_VALUE: 'Arbeitsspeicher: {value}',
  NVIDIA_COM_GPU_VALUE: 'GPU: {value}',
  // Resource Status > Details > Container Details > Terminal
  LOADING: 'Wird geladen...',
  RESOURCE_LIMITS: 'Ressourcengrenzen',
  RESOURCE_REQUESTS: 'Ressourcenanfragen',
  TERMINAL: 'Terminal',
  // Resource Status > Details > Container Details > Resource Status
  RESTART_PL: 'Neustarts',
  RESTART: 'Restart',
  STORAGE_DEVICES: 'Speichergeräte',
  LIVENESS_PROBE: 'Lebendigkeitsprobe',
  READINESS_PROBE: 'Bereitschaftssonde',
  STARTUP_PROBE: 'Startup Probe',
  REQUEST_TYPE: 'Anfragetyp',
  // Resource Status > Details > Container Details > Monitoring
  // Resource Status > Details > Container Details > Environment Variables
  // Resource Status > Details > Container Details > Container Logs
  NO_LOG_DATA_FOUND: 'Keine Logdaten gefunden',
  NO_LOG_DATA_FOUND_TIP: 'Es wurden keine Logdaten gefunden.',
  // Resource Status > Volumes
  VOLUME_PL: 'Volumen',
  TYPE_CONFIGMAP: 'Volume-Typ: configmap',
  TYPE_SECRET: 'Volume-Typ: Secret',
  TYPE_EMPTYDIR: 'Volume-Typ: leeres Verzeichnis',
  TYPE_HOSTPATH: 'Volume-Typ: Host Pfad',
  // Scheduling Information
  REASON_VALUE: 'Grund: {value}',
  MESSAGE_VALUE: 'Nachricht: {value}',
  UPDATED_AT_VALUE: 'Aktualisiert am: {value}',
  // Metadata
  // Monitoring
  NO_MONITORING_DATA: 'Keine Überwachungsdaten',
  OUTBOUND: 'Ausgehend',
  INBOUND: 'Eingehend'
};