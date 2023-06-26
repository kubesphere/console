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
  ALERTING_POLICY_PL: 'Regelgruppen',
  ALERTING_POLICY_DESC: 'Eine Regelgruppe enthält Warnregeln, die zur Überwachung von Clusterressourcen verwendet werden.',
  REQUESTS_FOR_TRIGGER_AN_ALARM_Q: 'Wie werden Warnungen erzeugt?',
  REQUESTS_FOR_TRIGGER_AN_ALARM_A: 'Sie müssen eine Regelgruppe erstellen und Warnregeln festlegen. Das System generiert Warnungen, wenn Ressourcenmetriken die in Regelgruppen konfigurierten Bedingungen erfüllen.',
  // List
  CUSTOM_POLICIES: 'Benutzerdefinierte Regelgruppen',
  BUILT_IN_POLICIES: 'Integrierte Regelgruppen',
  ALERTING_POLICY_EMPTY_DESC: 'Bitte erstellen Sie eine Regelgruppe.',
  ALERT_RULE_INACTIVE: 'Inaktiv',
  ALERT_RULE_PENDING: 'Ausstehend',
  ALERT_RULE_FIRING: 'Ausgelöst',
  ALERT_RULE_DISABLED: 'Deaktiviert',
  POLICY_STATUS: 'Rule Group Status',
  RULE_STATUS: 'Rule Status',
  TIME_SPENT: 'Time Spent',
  RECENT_DETECT_TIME: 'Last Check',
  EDIT_ALERT_RULES: 'Edit Alert Rules',
  RESET: 'Reset',
  // List > Create > Basic Information
  SEVERITY: 'Schweregrad',
  CREATE_ALERTING_POLICY: 'Regelgruppe erstellen',
  CRITICAL_ALERT: 'Kritisch',
  ERROR_ALERT: 'Fehler',
  WARNING_ALERT: 'Warnung',
  INVALID_TIME_DESC: 'Ungültiger Wert. Bitte geben Sie 0 oder eine positive Zahl ein.',
  ALIAS: 'Alias',
  DURATION_MIN: 'Dauer (Minuten)',
  ALERT_DURATION: 'Stellen Sie das System so ein, dass es eine bestimmte Zeit lang wartet, und prüfen Sie, ob die Alarmsituation fortbesteht, bevor ein Alarm ausgelöst wird.',
  LONG_NAME_DESC: 'Der Name darf nur Kleinbuchstaben, Zahlen und Bindestriche (-) enthalten und muss mit einem Kleinbuchstaben oder einer Zahl beginnen und enden. Die maximale Länge beträgt 253 Zeichen.',
  NAME_EXIST_DESC: 'Der Name existiert bereits. Bitte geben Sie einen anderen Namen ein.',
  ALIAS_NAME_DESC: 'The alias name can contain only letters, numbers, and hyphens (-), and cannot start or end with a hyphen. The maximum length is 63 characters.',
  CHECK_INTERVAL: 'Check Interval',
  ALERTING_POLICY_CHECK_INTERVAL_DESC: 'Set the interval between metric checks. The default value is 1 minute.',
  // List > Create > Rule Settings > Rule List
  ADD_ALERTING_RULE: 'Add Alert Rule',
  ADD_ALERTING_RULE_DESC: 'Add an alert rule to the rule group.',
  ENABLE_RULE: 'Enable Rule',
  DISABLE_RULE: 'Disable Rule',
  // List > Create > Rule Settings > Rule Template
  RULE_NAME: 'Rule Name',
  CUSTOM_RULE_NAME_DESC: 'The rule name can contain any characters. The maximum length is 63 characters.',
  LASTING_MINUTES: 'For {minutes, plural, =1 {1 minute} other {# minutes}}',
  THRESHOLD_REQUIRED: 'Please enter a metric threshold.',
  MESSAGE_SUMMARY_DESC: 'The message summary can contain any characters. The maximum length is 63 characters.',
  MESSAGE_DETAILS_DESC: 'The message details can contain any characters. The maximum length is 256 characters.',
  RULE_TEMPLATE: 'Regelvorlage',
  RULE_SETTINGS: 'Regeleinstellungen',
  MONITORING_TARGETS: 'Überwachungsziele',
  SET_ACTIVATION_CONDITION_DESC: 'Bitte stellen Sie eine Auslösebedingung ein.',
  THRESHOLD: 'Grenzwert',
  UNAVAILABLE_POD_RATIO: 'Verhältnis nicht verfügbarer Pods (%)',
  POD_QUOTA_UTILIZATION_SCAP: 'Pod Nutzungsquote (%)',
  CPU_USAGE_SCAP: 'CPU-Auslastung',
  CPU_UTILIZATION_SCAP: 'CPU-Auslastung (%)',
  CPU_LOAD_1: '1-minute CPU load average',
  CPU_LOAD_5: '5-minute CPU load average',
  CPU_LOAD_15: '15-minute CPU load average',
  MEMORY_AVAILABLE: 'Verfügbarer Speicher',
  MEMORY_UTILIZATION_SCAP: 'Speichernutzung (%)',
  DISK_SPACE_AVAILABLE: 'Verfügbarer lokaler Speicherplatz',
  DISK_SPACE_UTILIZATION: 'Lokale Festplattennutzung (%)',
  INODE_UTILIZATION: 'Inodennutzung (%)',
  DISK_READ_IOPS: 'Lokale Festplatte Lese IOPS',
  DISK_WRITE_IOPS: 'Lokale Festplatte Schreiben IOPS',
  DISK_READ_THROUGHPUT: 'Lokale Festplatten Lesedurchsatz',
  DISK_WRITE_THROUGHPUT: 'Lokale Festplatten Schreibdurchsatz',
  DATA_RECEIVE_RATE: 'Empfangsrate von Netzwerkdaten',
  DATA_SEND_RATE: 'Senderate von Netzwerkdaten',
  MEMORY_USAGE_SCAP: 'Speicherverbrauch',
  MEMORY_USAGE_WO_CACHE_SCAP: 'Speichernutzung ohne Cache',
  UNAVAILABLE_WORKLOAD_REPLICA_RATIO: 'Unavailable replica ratio (%)',
  SELECT_NODE_TIP: 'Bitte wählen Sie mindestens einen Cluster Node aus.',
  // List > Create > Rule Settings > Custom Rule
  CUSTOM_RULE: 'Individuelle Regel',
  RULE_EXPRESSION: 'Regelausdruck',
  ENTER_RULE_EXPRESSION: 'Bitte geben Sie einen Regelausdruck ein.',
  ALERT_RULE_EXPRESSION_DESC: 'Sie können eine benutzerdefinierte Regel mithilfe von PromQL-Anweisungen definieren. <a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer noopener">Mehr erfahren</a>',
  ALERT_FUNCTIONS: 'Funktionen',
  ALERT_METRICS: 'Metriken',
  ALERT_LABELS: 'Labels',
  ALERT_RATE_RANGES: 'Rate Ranges',
  // List > Create > Message Settings
  ALERTING_MESSAGE: 'Alarm',
  MESSAGE_SETTINGS: 'Nachrichteneinstellungen',
  NOTIFICATION_SUMMARY: 'Zusammenfassung',
  NOTIFICATION_DETAILS: 'Details',
  // List > Edit
  EDIT_ALERTING_POLICY: 'Regelgruppe bearbeiten',
  // List > Disable
  DISABLE_ALERTING_POLICY: 'Disable Rule Group',
  // List > Delete
  ALERTING_POLICY: 'Regelgruppe',
  ALERTING_POLICY_LOW: 'regelgruppe',
  // List > reset
  RESET_ALERTING_POLICY: 'Reset Rule Group',
  RESET_ALERTING_POLICY_DESC: 'Are you sure you want to reset the rule group?'
};