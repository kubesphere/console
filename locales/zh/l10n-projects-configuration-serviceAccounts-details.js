/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // More > Edit YAML
  // More > Change Role
  SERVICE_ACCOUNT_PROJECT_ROLE_DESC: '选择服务帐户在当前项目中的角色。',
  // More > Delete
  SERVICE_ACCOUNT: '服务帐户',
  // Attributes
  // Resource Status
  SECRET_VALUE: '保密字典：{value}',
  // Resource Status > kubeconfig Settings
  SERVICEACCOUNT_KUBECONFIG_DESC:
    '下载 kubeconfig.yaml 文件供其他应用使用，从而为其他应用访问提供可访问当前项目的帐户。如果使用 kubeconfig.yaml 文件的应用部署在当前集群外，您需要将 clusters:cluster:server 参数的值修改为对外暴露的 Kubernetes API 服务器地址。<a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_black">了解更多</a>',
};
