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
  LOG_RECEIVER_PL: 'Log Empfänger',
  LOG_COLLECTION_DESC: 'Das System sammelt Standardausgabe- (stdout) und Standardfehlerprotokolle (stderr) von jedem Container und sendet sie an einen oder mehrere Zieldienste.',
  // Banner > Add Log Receiver
  ADD_LOG_RECEIVER: 'Log Empfänger hinzufügen',
  LOG_COLLECTION_TIPS: 'Sie können für jeden Typ einen Log Empfänger hinzufügen.',
  ES_DESC: 'Elasticsearch ist eine verteilte, REST-konforme Such- und Analyse-Engine.',
  KAFKA_DESC: 'Kafka ist eine beliebte Open-Source-Plattform für Daten Stream Verarbeitung.',
  FLUENTD_DESC: 'Fluentd ist ein Open-Source-Datensammler für eine einheitliche Protokollschicht.',
  // Banner > Add Log Receiver > Elasticsearch
  LOG_COLLECTION_ES_URL_TIPS: 'Standardmäßig wird der integrierte Elasticsearch-Dienst verwendet. Sie können auch die IP-Adresse von Elasticsearch eingeben, das unabhängig innerhalb oder außerhalb des Clusters bereitgestellt wird.',
  LOG_COLLECTION_ES_INDEX_TIPS: 'Verwenden Sie das Indexpräfix, um Abfragen zu beschleunigen. Das Indexpräfix wird automatisch im Format <Index prefix><Year-month-date> generiert.',
  ADDRESS_VALUE: 'Adresse: {value}',
  // Banner > Add Log Receiver > Kafka
  TOPIC: 'Thema',
  ADD_SERVICE_ADDRESS: 'Hinzufügen',
  SERVICE_ADDRESS: 'Serviceadresse',
  ENTER_SERVICE_ADDRESS: 'Bitte geben Sie eine Service Adresse ein.',
  INVALID_SERVICE_ADDRESS: 'Bitte geben Sie eine korrekte Serviceadresse ein.',
  SERVICE_ADDRESS_EXIST: 'Die Serviceadresse existiert bereits. Bitte geben Sie eine andere Serviceadresse ein.',
  EXAMPLE_VALUE: 'Beispiel: {value}',
  // Banner > Add Log Receiver > Fluentd
  LOG_COLLECTION_FLUENTD_URL_TIPS: 'Geben Sie die Adresse des Fluentd-Dienstes ein, der Logs empfängt.',
  // Container Logs
  EMPTY_LOG_COLLECTIONS: 'Es wurde kein Log-Empfänger gefunden. Sie können Log-Empfänger hinzufügen und Logs an externe Log-Empfänger senden.',
  // Resource Events
  RESOURCE_EVENTS: 'Ressourcenereignisse',
  // Audit Logs
  AUDIT_LOGS: 'Audit-Protokolle'
};