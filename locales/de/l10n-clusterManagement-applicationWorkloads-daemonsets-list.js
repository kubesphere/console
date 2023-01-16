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
  DAEMONSETS: 'Daemonsets',
  DAEMONSET_EMPTY_DESC: 'Bitte erstellen Sie einen Daemonset.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Update Strategy > Rolling Update Settings
  MIN_READY_SECONDS: 'Mindestlaufzeit für Pod Bereitschaft(n)',
  MAX_UNAVAILABLE_PODS: 'Maximale nicht verfügbare Pods',
  ROLLING_UPDATE_SETTINGS: 'Rollende Aktualisierungseinstellungen',
  MAX_UNAVAILABLE_PODS_DESC: 'Maximale Anzahl oder Prozentsatz nicht verfügbarer Pod Replikate, die während des Aktualisierungsprozesses erlaubt sind.',
  MIN_READY_SECONDS_DESC: 'Minimale stabile Laufzeit, die für ein Pod Replikat benötigt wird, um bereit zu sein.',
  MIN_READY_SECONDS_EMPTY: 'Bitte legen Sie die minimale stabile Laufzeit, die für ein Pod Replikat benötigt wird, um bereit zu sein fest.',
  MAX_UNAVAILABLE_EMPTY: 'Bitte setzen Sie die maximale Anzahl oder Prozentsatz nicht verfügbarer Pod Replikate, die während des Aktualisierungsprozesses erlaubt sind.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > HTTP Request
  FAILURE_THRESHOLD: 'Fehlerschwelle',
  HTTP_REQUEST: 'HTTP Anfrage',
  INITIAL_DELAY_S: 'Anfangsverzögerung (s)',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}s Startverzögerung, {timeout}s Timeout-Zeit',
  PROBE_TIME: '{delay}s Verzögerung, {timeout}s Timeout',
  TIMEOUT_PERIOD_S: 'Timeout (s)',
  CHECK_INTERVAL_S: 'Überprüfungsintervall (s)',
  SUCCESS_THRESHOLD: 'Erfolgsschwelle',
  INITIAL_DELAY_DESC: 'Verzögerung vor Beginn der Sonde nach dem Start des Containers. Der Wert muss eine Ganzzahl sein und der Mindestwert ist 0.',
  TIMEOUT_PERIOD_DESC: 'Timeout Periode nach der die Sonde ausläuft und als fehlgeschlagen angesehen wird. Der Wert muss eine Ganzzahl sein und der Mindestwert ist 1.',
  CHECK_INTERVAL_DESC: 'Intervall zwischen Prüfversuchen. Der Wert muss eine Ganzzahl sein und der Minimalwert ist 1.',
  SUCCESS_THRESHOLD_DESC: 'Minimale Anzahl von aufeinanderfolgenden Erfolgen für die Sonde, die nach einem Fehlschlag als erfolgreich angesehen wird. Der Mindestwert ist 1 und der Wert muss 1 für Lebendigkeit und startup Sonden sein.',
  FAILURE_THRESHOLD_DESC: 'Minimale Anzahl von aufeinanderfolgenden Fehlern für die Sonde, die nach dem Erfolg als fehlgeschlagen angesehen wird. Der Mindestwert ist 1.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > Command
  PROBE_COMMAND_EMPTY: 'Bitte mindestens einen Befehl eingeben.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > TCP Port
  TCP_PORT: 'TCP Port',
  // List > Create > Storage Settings
  MOUNT_PATH_IN_USE: 'Der Mountpfad wird bereits verwendet. Bitte geben Sie einen anderen Mountpfad ein.'
};