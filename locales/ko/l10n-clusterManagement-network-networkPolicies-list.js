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
  NETWORK_POLICY: '네트워크 정책',
  NETWORK_POLICY_PL: '네트워크 정책',
  NETWORK_POLICY_DESC: '네트워크 정책 구성을 사용하면 동일한 클러스터 내에서 네트워크를 분리할 수 있습니다. 즉, 특정 인스턴스(파드) 간에 방화벽을 설정할 수 있습니다.',
  NETWORK_POLICY_Q: '네트워크 정책을 더 잘 사용하려면 어떻게 해야 합니까?',
  NETWORK_POLICY_A: '실제 시나리오를 기반으로 몇 가지 일반적인 사용 사례를 확인했으며 자세한 내용은 매뉴얼을 참조할 수 있습니다.',
  NETWORK_POLICY_Q1: '네트워크 정책을 구현하기 위한 CNI 플러그인의 요구 사항은 무엇입니까?',
  NETWORK_POLICY_A1: '클러스터에서 사용하는 CNI 네트워크 플러그인이 <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/" target="_blank">네트워크 정책</a>을 지원하는지 확인합니다. Calico, Cilium, Kube-router, Romana 및 Weave Net을 비롯한 여러 CNI 네트워크 플러그인이 네트워크 정책을 지원합니다.\n',
  // List
  NETWORK_POLICY_EMPTY_DESC: '네트워크 정책을 생성하십시오.',
  // List > Create
  CREATE_NETWORK_POLICY_TCAP: '네트워크 정책 생성',
  CREATE_BTN: '생성',
  CREATE_NETWORK_POLICY_DESC: '네트워크 정책은 동일한 클러스터 내에서 네트워크 분리를 허용하도록 구성됩니다. 즉, 특정 인스턴스(파드) 간에 방화벽을 구축할 수 있는 기능입니다.',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  NETWORK_POLICY_LOW: '네트워크 정책'
};