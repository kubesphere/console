/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  WORKSPACE_PL: 'Workspaces',
  WORKSPACE_DESC:
    'Los espacios de trabajo son una unidad lógica para organizar tus proyectos de carga de trabajo / namespaces de Kubernetes, proyectos DevOps, administrar el acceso a recursos y compartir información dentro de tu equipo. Es un lugar de trabajo aislado para tu equipo.',
  // List
  CLUSTER_PL: 'Clusters',
  ALL_CLUSTERS: 'All Clusters',
  // List > Create > Basic Information
  CREATE_WORKSPACE: 'Crear espacio de trabajo',
  WORKSPACE_NAME_EMPTY_DESC: 'Introduce el nombre del espacio de trabajo',
  WORKSPACE_CREATE_DESC:
    'Los esapcios de trabajo son una unidad lógica para organizar tus proyectos y proyectos DevOps. El acceso a los recursos y los recursos compartidos del equipo se pueden administrar aquí. Puede servir como un espacio de trabajo independiente para tu equipo.',
  ADMINISTRATOR: 'Administrator',
  WORKSPACE_NAME_EXISTS_DESC: 'The workspace name already exists.',
  INVALID_WORKSPACE_NAME: 'Invalid workspace name.',
  // List > Create > Cluster Settings
  SELECT_CLUSTERS_DESC: 'Selecciona el clúster disponible en el espacio de trabajo.',
  NO_CLUSTER_AVAILABLE: 'No Cluster Available',
  NO_CLUSTER_AVAILABLE_DESC:
    'No hay clústeres públicos disponibles, solicita autorización para clúster al administrador de la plataforma o al administrador del clúster después de crear el espacio de trabajo',
  WORKSPACE_NO_CLUSTER_TIP:
    'You need to contact the platform or cluster administrator to authorize a cluster to the workspace.',
  AVAILABLE_CLUSTERS: 'Clusters Disponibles',
  CLUSTER_SETTINGS: 'Configuraciones de clúster',
  SELECT_HOST_CLUSTER_WARNING:
    'The visibility of the multi-cluster environment will decrease if the host cluster is overloaded. It is not recommended to create resources on the host cluster.',
  // List > Edit Information
  // List > Delete
  DELETE_WORKSPACE: 'Eliminar espacio de trabajo',
  WORKSPACE_LOW: 'workspace',
};
