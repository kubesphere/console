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
  NO_CLUSTER_TIP: 'Bitte fügen Sie mindestens einen Cluster hinzu.',
  // Add Cluster > Basic Information
  CLUSTER_NAME_EMPTY: 'Bitte geben Sie einen Clusternamen ein.',
  ADD_CLUSTER: 'Cluster hinzufügen',
  TAG: 'Tag',
  CLUSTER_TAG_DESC: 'Wählen Sie ein Tag aus, um den Zweck des Clusters zu identifizieren.',
  CLUSTER_PROVIDER_DESC: 'Wählen Sie den Anbieter der Cluster-Infrastruktur aus.',
  // Add Cluster > Connection Settings
  CONNECTION_SETTINGS: 'Verbindungseinstellungen',
  CONNECTION_MODE: 'Verbindungsmodus',
  CLUSTER_CONNECT_MODE_DESC: 'Stellen Sie eine direkte Verbindung zum Cluster her oder verwenden Sie einen Agenten.',
  CONNTECT_DIRECT: 'Direkte Verbindung',
  CONNTECT_PROXY: 'Agentenverbindung',
  INPUT_KUBECONFIG: 'Mitglied Cluster kubeconfig',
  CLUSTER_DIRECT_IMPORT_TIP: 'Die Multi-Cluster-Steuerungsebene von KubeSphere stellt über die bereitgestellte kubeconfig-Datei eine Verbindung zum Mitgliedscluster her. Für diese Methode muss der Hostcluster über die Serveradresse in der kubeconfig direkt auf den Mitgliedscluster zugreifen können.</br></br>Diese Methode gilt im Allgemeinen für Szenarien wie die folgenden:</br>1. Der Hostcluster und der Mitgliedscluster befinden sich im selben internen Netzwerk.</br>2. Das Netzwerk sowohl des Host-Clusters als auch des Member-Clusters ist über VPN oder andere Technologien (z. B. Tunneling) verbunden.</br>3. Auf die Serveradresse in der kubeconfig kann über ein öffentliches Netzwerk zugegriffen werden.',
  CLUSTER_AGENT_IMPORT_TIP: 'Die KubeSphere-Steuerungsebene stellt über einen Proxy eine Verbindung zum Mitgliedscluster her. Die Steuerungsebene führt einen öffentlichen Proxydienst aus, der mit einer Clientkomponente verbunden ist, die vom Mitgliedscluster erstellt wurde. Somit wird ein Reserve-Proxy geschaffen. Bei dieser Methode müssen sich die Steuerungsebene und der Mitgliedscluster nicht im selben Netzwerk befinden. Die apiserver-Adresse des Mitgliedsclusters muss nicht verfügbar gemacht werden. Die Netzwerkleistung kann jedoch beeinträchtigt werden.</br></br>Diese Methode gilt im Allgemeinen für die folgenden Szenarien:</br>1. Der Hostcluster und der Mitgliedscluster befinden sich nicht im selben Netzwerk.<br/>2. Das Netzwerk des Hostclusters und des Mitgliedsclusters kann nicht über VPN oder andere Technologien (z. B. Tunneling) verbunden werden.<br/>3. Leistungsmängel des Netzwerks innerhalb von Clustern können akzeptiert werden.',
  CLUSTER_AGENT_TITLE: 'Bitte fügen Sie den Mitgliedscluster basierend auf dem im Cluster bereitgestellten Agenten hinzu.',
  CLUSTER_AGENT_DESC: 'Im Cluster muss ein entsprechender Agent eingestellt werden.',
  HOW_TO_GET_KUBECONFIG: 'Wie erhalte ich die kubeconfig?',
  // List
  HOST_CLUSTER_TCAP: 'Host-Cluster',
  HOST_CLUSTER_PL_TCAP: 'Host-Clusters',
  MEMBER_CLUSTER_TCAP_PL: 'Mitglieder-Cluster',
  CLUSTER_CONDITION_INITIALIZED: 'Initialisiert',
  CLUSTER_CONDITION_AGENTAVAILABLE: 'Agent verfügbar',
  CLUSTER_CONDITION_FEDERATED: 'Föderiert',
  CLUSTER_CONDITION_EXTERNALACCESSREADY: 'Externer Zugriff bereit',
  CLUSTER_CONDITION_READY: 'Cluster bereit',
  CLUSTER_CONDITION_OPENPITRIXRUNTIMEREADY: 'App Store bereit',
  CLUSTER_CONDITION_KUBECONFIGCERTEXPIRESINSEVENDAYS: 'kubeconfig läuft bald ab',
  NODE_COUNT: 'Nodes',
  ENV_PRODUCTION: 'Produktion',
  ENV_DEVELOPMENT: 'Entwicklung',
  ENV_TESTING: 'Testen',
  ENV_DEMO: 'Demo',
  UPDATE_KUBECONFIG: 'Kubeconfig aktualisieren',
  KUBE_CONFIG_IS_EXPIRED: 'KubeConfig ist abgelaufen',
  EXPIRE_DATE: 'Ablaufzeit',
  LAST_KUBE_CONFIG_EXPIRED: 'KubeConfig läuft in <span class="kubeConfig_expired">{count}</span> Tagen ab',
  VALIDATION_FAILED: 'Überprüfung fehlgeschlagen.',
  NO_CLUSTER_TIP_DESC: 'Ein Cluster ist eine Gruppe von Nodes (physische oder virtuelle Maschinen), auf denen KubeSphere ausgeführt wird.',
  // List > Remove Cluster
  RISK_WARNING: 'Risikowarnung',
  REMOVE_CLUSTER_TIP_A: 'Nachdem der Cluster entfernt wurde, werden Ressourcen im Cluster nicht automatisch gelöscht.',
  REMOVE_CLUSTER_TIP_B: 'Nachdem der Cluster entfernt wurde, werden Multi-Cluster-Konfigurationsdaten im Cluster nicht automatisch gelöscht. Das Deinstallieren von KubeSphere oder das Löschen zugehöriger Ressourcen kann zu Benutzerdatenverlust führen. Sie müssen die Multi-Cluster-Konfigurationsdaten im entfernten Cluster manuell löschen, durch Bezugnahme auf die <a href="https://kubesphere.io/docs/">offizielle KubeSphere-Dokumentation</a>.',
  CLUSTER_CONFIRM_TEXT: 'Ich verstehe die Risiken beim Entfernen des Clusters',
  ENTER_CLUSTER_NAME: 'Dieser Vorgang kann nicht rückgängig gemacht werden. Geben Sie den Clusternamen <strong>{name}</strong> ein, um zu bestätigen, dass Sie die Risiken dieses Vorgangs verstehen.'
};