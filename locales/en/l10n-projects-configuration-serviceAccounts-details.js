/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // More > Edit YAML
  // More > Change Role
  SERVICE_ACCOUNT_PROJECT_ROLE_DESC:
    'Select the role of the service account in the current project.',
  // More > Delete
  SERVICE_ACCOUNT: 'Service Account',
  // Attributes
  // Resource Status
  SECRET_VALUE: 'Secret: {value}',
  // Resource Status > kubeconfig Settings
  SERVICEACCOUNT_KUBECONFIG_DESC:
    'Download the kubeconfig.yaml file to provide other apps with an account that can access the current project. If the apps to use the kubeconfig.yaml file are deployed outside the current cluster, you need to change the value of clusters:cluster:server to the Kubernetes API server address exposed to the outside. <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_black">Learn More</a>',
};
