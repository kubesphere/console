/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  NETWORK_POLICY: '網路策略',
  NETWORK_POLICY_PL: '網路策略',
  NETWORK_POLICY_DESC:
    'The network policy configuration allows network isolation within the same cluster, which means firewalls can be set up between certain instances (pods).',
  NETWORK_POLICY_Q: '如何更好地使用網路策略?',
  NETWORK_POLICY_A: '根據實際使用場景我们整理了幾種較為常見的應用場景，您可以查閱文件了解更多',
  NETWORK_POLICY_Q1: 'CNI 插件實現網絡策略需滿足哪些必要條件？',
  NETWORK_POLICY_A1:
    'Kubernetes 所使用 CNI 必須支持 Kubernetes 原生<a href="https://kubernetes.io/zh/docs/concepts/services-networking/network-policies/" target="_blank">網路策略</a>，例如 Calico, Cilium, Kube-router, Romana and Weave Net。',
  // List
  NETWORK_POLICY_EMPTY_DESC: '請創建一個網路策略。',
  // List > Create
  CREATE_NETWORK_POLICY_TCAP: '創建網路策略',
  CREATE_BTN: '創建',
  CREATE_NETWORK_POLICY_DESC:
    '通過配置網路策略控制同一集群内 Pod 之間的流量以及來自外部的流量，從而實現隔離應用並增強應用的安全性。',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  NETWORK_POLICY_LOW: '網路策略',
};
