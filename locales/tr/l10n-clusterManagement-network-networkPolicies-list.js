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
  NETWORK_POLICY: 'Ağ Politikası',
  NETWORK_POLICY_PL: 'Ağ Politikası',
  NETWORK_POLICY_DESC: 'The network policy configuration allows network isolation within the same cluster, which means firewalls can be set up between certain instances (pods).',
  NETWORK_POLICY_Q: 'Bir ağ politikasını nasıl daha iyi kullanırım?',
  NETWORK_POLICY_A: 'Gerçek senaryolara dayalı olarak birkaç yaygın kullanım durumu belirledik ve daha fazla bilgi için belgelere başvurabilirsiniz.',
  NETWORK_POLICY_Q1: 'Bir ağ politikasını uygulamak için CNI eklentisindeki gereksinimler nelerdir?',
  NETWORK_POLICY_A1: 'Küme tarafından kullanılan CNI ağ eklentisinin <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/" target="_blank">Ağ Politikalarını</a> desteklediğinden emin olun. Calico, Cilium, Kube-router, Romana ve Weave Net dahil olmak üzere bir dizi CNI ağ eklentisi Ağ İlkelerini destekler.',
  // List
  NETWORK_POLICY_EMPTY_DESC: 'Lütfen bir ağ politikası oluşturun.',
  // List > Create
  CREATE_NETWORK_POLICY_TCAP: 'Ağ Politikası Oluştur',
  CREATE_BTN: 'Oluştur',
  CREATE_NETWORK_POLICY_DESC: 'Ağ ilkesi, aynı küme içinde ağ yalıtımına, yani belirli örnekler (kapsüller) arasında bir güvenlik duvarı oluşturma becerisine izin verecek şekilde yapılandırılır.',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  NETWORK_POLICY_LOW: 'Ağ Politikası'
};