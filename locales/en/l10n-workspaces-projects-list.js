/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  PROJECT_EMPTY_DESC: 'Please create a project.',
  // List > Projects > Create
  CREATE_PROJECT: 'Create Project',
  // List > Multi-cluster Projects > Create
  CREATE_MULTI_CLUSTER_PROJECT: 'Create Multi-cluster Project',
  CREATE_MULTI_CLUSTER_PROJECT_DESC:
    'A multi-cluster project runs across different clusters, which helps you to build a container environment for rapid iteration of applications and achieve high availability.',
  MULTI_CLUSTER_PROJECT_PL: 'Multi-cluster Projects',
  FED_HOST_NAMESPACE_TIP:
    'Do not change resources in this project because it is related to a multi-cluster project.',
  MULTI_CLUSTER_PROJECT: 'Multi-cluster Project',
  PROJECT_NAME_EXISTS_IN_HOST:
    'The project name already exists in the host cluster. Please enter another project name.',
  SELECT_CLUSTER_DESC: 'Select the cluster in which the project is to be created.',
  CLUSTER_EMPTY_DESC: 'Please select a cluster.',
  PROJECT_NAME_EXISTS_IN_CLUSTER:
    'The project name already exists in the {cluster} cluster. Please enter another project name.',
  PROJECT_CLUSTER_SETTINGS_DESC:
    'Select at least one cluster for the project. If you select multiple clusters, a project with the same name will be created in the host cluster.',
  // List > Edit Information
  // List > Edit Quotas
  // List > Delete
  // List > Add Cluster
  FEDPROJECT_CANNOT_ADD_CLUSTER: 'No cluster is available.',
};
