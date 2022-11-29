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
  NO_CLUSTER_TIP: 'Lütfen en az bir küme ekleyiniz.',
  // Add Cluster > Basic Information
  CLUSTER_NAME_EMPTY: 'Please enter a cluster name.',
  ADD_CLUSTER: 'Küme Ekle',
  TAG: 'Etiket',
  CLUSTER_TAG_DESC: 'Kümenin amacını belirlemek için bir etiket seçin.',
  CLUSTER_PROVIDER_DESC: 'Küme altyapısının sağlayıcısını seçin.',
  // Add Cluster > Connection Settings
  CONNECTION_SETTINGS: 'Connection Settings',
  CONNECTION_MODE: 'Connection Mode',
  CLUSTER_CONNECT_MODE_DESC: 'Directly connect to the cluster or use an agent.',
  CONNTECT_DIRECT: 'Direk Bağlantı',
  CONNTECT_PROXY: 'Ajan bağlantısı',
  INPUT_KUBECONFIG: 'Member Cluster kubeconfig',
  CLUSTER_DIRECT_IMPORT_TIP: 'KubeSphere\'in çoklu küme kontrol düzlemi, sağlanan kubeconfig aracılığıyla üye kümesine bağlanır. Bu yöntem için ana bilgisayar kümesi, kubeconfig\'deki sunucu adresi aracılığıyla üye kümesine doğrudan erişebilmelidir.</br></br>Bu yöntem genellikle aşağıdaki gibi senaryolar için geçerlidir:</br>1. Ana bilgisayar kümesi ve üye kümesi aynı dahili ağdadır.</br>2. Hem ana bilgisayar kümesinin hem de üye kümesinin ağı, VPN veya diğer teknolojiler (ör. Tünel Açma) aracılığıyla bağlanır.</br>3. Kubeconfig\'deki sunucu adresine genel ağ üzerinden erişilebilir.',
  CLUSTER_AGENT_IMPORT_TIP: 'KubeSphere kontrol düzlemi, bir proxy aracılığıyla üye kümesine bağlanır. Kontrol düzlemi, üye kümesi tarafından oluşturulan bir istemci bileşenine bağlı olan bir ortak proxy hizmeti çalıştırır. Böylece bir yedek proxy oluşturulur. Bu yöntem için kontrol düzlemi ve üye kümesinin aynı ağda olması gerekmez. Üye kümesinin apiserver adresinin açığa çıkarılması gerekmez. Ancak ağ performansı etkilenebilir.</br></br>Bu yöntem genellikle aşağıdaki gibi senaryolar için geçerlidir:</br>1. Ana bilgisayar kümesi ve üye kümesi aynı ağda değil.<br/>2. Hem ana bilgisayar kümesinin hem de üye kümesinin ağı, VPN veya diğer teknolojiler (ör. Tünel Açma) aracılığıyla bağlanamaz.<br/>3. Kümeler içindeki ağ performans eksiklikleri kabul edilebilir.',
  CLUSTER_AGENT_TITLE: 'Lütfen kümede sağlanan aracıya göre üye kümesini ekleyin.',
  CLUSTER_AGENT_DESC: 'Kümede karşılık gelen bir aracının ayarlanması gerekir.',
  HOW_TO_GET_KUBECONFIG: 'How do I obtain kubeconfig?',
  // List
  HOST_CLUSTER_TCAP: 'Host  Kümesi',
  HOST_CLUSTER_PL_TCAP: 'Host  Kümesi',
  MEMBER_CLUSTER_TCAP_PL: 'Member Clusters',
  CLUSTER_CONDITION_INITIALIZED: 'Başlatıldı',
  CLUSTER_CONDITION_AGENTAVAILABLE: 'Agent Available',
  CLUSTER_CONDITION_FEDERATED: 'Federated',
  CLUSTER_CONDITION_EXTERNALACCESSREADY: 'External Access Ready',
  CLUSTER_CONDITION_READY: 'Cluster Ready',
  CLUSTER_CONDITION_OPENPITRIXRUNTIMEREADY: 'App Store Ready',
  CLUSTER_CONDITION_KUBECONFIGCERTEXPIRESINSEVENDAYS: 'kubeconfig About to Expire',
  NODE_COUNT: 'Düğümler',
  ENV_PRODUCTION: '\nÜretim ',
  ENV_DEVELOPMENT: 'Gelişim',
  ENV_TESTING: 'Test yapmak',
  ENV_DEMO: 'Demo',
  UPDATE_KUBECONFIG: 'Kubeconfig\'i Güncelle',
  KUBE_CONFIG_IS_EXPIRED: 'KubeConfig\'in süresi doldu',
  EXPIRE_DATE: 'Sonlanma Süresi',
  LAST_KUBE_CONFIG_EXPIRED: 'KubeConfig\'in süresi',
  VALIDATION_FAILED: 'Validation failed.',
  NO_CLUSTER_TIP_DESC: 'A cluster is a group of nodes (physical or virtual machines) running KubeSphere.',
  // List > Remove Cluster
  RISK_WARNING: 'Risk Warning',
  REMOVE_CLUSTER_TIP_A: 'After the cluster is removed, resources in the cluster will not be cleared automatically.',
  REMOVE_CLUSTER_TIP_B: 'After the cluster is removed, multi-cluster configuration data in the cluster will not be cleared automatically. Uninstalling KubeSphere or deleting related resources may cause user data loss. You must manually clear the multi-cluster configuration data in the removed cluster by refering to the <a href="https://kubesphere.io/docs/">official KubeSphere documentation</a>.',
  CLUSTER_CONFIRM_TEXT: 'I understand the risks of removing the cluster',
  ENTER_CLUSTER_NAME: 'This operation cannot be undone. Enter the cluster name <strong>{name}</strong> to confirm that you understand the risks of this operation.'
};