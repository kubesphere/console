/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  NETWORK_POLICY: 'Política de red',
  NETWORK_POLICY_PL: 'Network Policies',
  NETWORK_POLICY_DESC:
    'The network policy configuration allows network isolation within the same cluster, which means firewalls can be set up between certain instances (pods).',
  NETWORK_POLICY_Q: '¿Cómo usar mejor una política de red?',
  NETWORK_POLICY_A:
    'Hemos compilado varios escenarios de aplicación comunes basados en los escenarios reales, y puedes consultar la documentación para obtener más información.',
  NETWORK_POLICY_Q1: 'Requisitos del complemento CNI para implementar una política de red',
  NETWORK_POLICY_A1:
    'Asegúrate de que el plugin de red (CNI) utilizado por el clúster sea compatible con <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/" target="_blank">NetworkPolicy</a>. Existen varios plugins de red (CNI) que soportan NetworkPolicy, incluyendo Calico, Cilium, Kube-router, Romana y Weave Net.',
  // List
  NETWORK_POLICY_EMPTY_DESC: 'Please create a network policy.',
  // List > Create
  CREATE_NETWORK_POLICY_TCAP: 'Crear política de red',
  CREATE_BTN: 'Crear',
  CREATE_NETWORK_POLICY_DESC:
    'La política de red está configurada para permitir el aislamiento de la red dentro del mismo clúster, es decir, la capacidad de construir un cortafuegos entre ciertas instancias (pods).',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  NETWORK_POLICY_LOW: 'network policy',
};
