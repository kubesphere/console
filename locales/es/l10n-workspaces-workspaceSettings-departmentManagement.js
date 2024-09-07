/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  DEPARTMENT_PL: 'Departments',
  DEPARTMENT_DESC:
    'A department in a workspace is a logical unit used for permission control. You can set a workspace role, multiple project roles, and multiple DevOps project roles in a department, and assign users to the department to control user permissions in batches.',
  // List
  // List > Not Assigned
  NOT_ASSIGNED_TCAP: 'Not Assigned',
  ADD_MEMBER_TIP_SI: 'Are you sure you want to assign the user to <strong>{group}</strong>?',
  ADD_MEMBER_TIP_PL:
    'Are you sure you want to assign the users to the department <strong>{group}</strong>?',
  // List > Assigned
  ASSIGNED: 'Assigned',
  DEPARTMENT: 'Department',
  // List > Set Departments
  SET_DEPARTMENTS: 'Set Departments',
  DEPARTMENT_EMPTY_DESC: 'No Department Available',
  NO_DEPARTMENT_TIP: 'No department available. Please create a department on the right.',
  CREATE_DEPARTMENT: 'Create Department',
  DELETE_GROUP_TIP:
    'Está seguro de eliminar el subdepartamento <strong> {group_name} </strong>? Al eliminar el departamento, también se cancelará la autorización de todos los miembros. ',
  DELETE_PARENT_GROUP_TIP:
    'Está seguro de que desea eliminar el subdepartamento <strong> {group_name} </strong>? Al eliminar el departamento, también se eliminarán sus subdepartamentos y se cancelará la autorización de todos los miembros. ',
  PROJECT_VALUE: 'Project: {value}',
  PROJECT_ROLE_VALUE: 'Project role: {value}',
  DEVOPS_VALUE: 'DevOps project: {value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps project role: {value}',
  // List > Set Departments > Workspace Role
  WORKSPACE_ROLE: 'rol del espacio de trabajo',
  GROUP_WORKSPACE_ROLE_DESC:
    'La función del espacio de trabajo se asignará a todos los miembros del departamento.',
  MEMBER_CLUSTER_UPGRADE_TIP:
    'Member clusters with versions earlier than {version} do not support this function. Please upgrade the member clusters to {version} or later.',
  // List > Set Departments > Project Role
  PROJECT_ROLE: 'Rol del proyecto',
  SELECT_ROLE_TIP: 'Please select a role.',
  ADD_PROJECT: 'Agregar proyecto',
  CLUSTER_UPGRADE_REQUIRED:
    'The cluster version does not support this function. Please upgrade the cluster to {version} or later.',
  // List > Set Departments > DevOps Project Role
  DEVOPS_PROJECT_ROLE: 'DevOps Project Role',
  ADD_DEVOPS_PROJECT: 'Agregar proyecto DevOps',
};
