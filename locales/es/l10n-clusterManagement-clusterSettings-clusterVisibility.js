/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */
module.exports = {
  // Banner
  CLUSTER_VISIBILITY: 'Cluster Visibility',
  EDIT_VISIBILITY_DESC: 'Edit the cluster visibility in workspaces.',
  UNAUTHORIZED: 'Unauthorized',
  CLUSTER_VISIBILITY_DESC: 'Cluster visibility controls the cluster authorization to workspaces. After a cluster is authorized to workspaces, you can view and manage the cluster resources in the workspaces.',
  CLUSTER_VISIBILITY_Q1: 'How do I authorize a cluster to specific workspaces?',
  CLUSTER_VISIBILITY_A1: 'You can assign a cluster to specific workspaces by clicking Edit Visibility.',
  CLUSTER_VISIBILITY_Q2: '¿Qué es un clúster público?',
  CLUSTER_VISIBILITY_A2: 'Un clúster público significa que todos los usuarios de la plataforma pueden acceder al clúster, en el que pueden crear y programar recursos.',
  // List
  WORKSPACE: 'Espacio de trabajo',
  CLUSTER_VISIBILITY_SCAP: 'Visibilidad de clúster',
  AUTHORIZATION_TIME_TCAP: 'Authorization Time',
  // List > Edit Visibility
  EDIT_VISIBILITY: 'Editar visibilidad',
  AUTHORIZED: 'Autorizado',
  SET_PUBLIC_CLUSTER: 'Set as Public Cluster',
  HOST_CLUSTER_VISIBILITY_WARNING: 'The visibility of the multi-cluster environment will decrease if the host cluster is overloaded. Exercise caution when assigning the host cluster to workspaces.',
  CLUSTER_VISIBILITY_REMOVE_WARNING: 'After the authorization for a workspace to use the cluster is removed, all resources of the workspace on the cluster will be deleted.',
  REMOVE_WORKSPACE_CONFIRM_TITLE: 'Remove Authorization',
  REMOVE_WORKSPACE_CONFIRM_SI: 'Enter the workspace name <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  REMOVE_WORKSPACE_CONFIRM_PL: 'Enter the workspace names <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  REMOVE_WORKSPACE_CONFIRM_TIP: 'Eliminar el proyecto asociado con el espacio empresarial'
};