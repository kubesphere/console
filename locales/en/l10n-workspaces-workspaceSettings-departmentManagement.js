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
  ADD_MEMBER_TIP_SI:
    'Are you sure you want to assign the user to the department <strong>{group}</strong>?',
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
    'Are you sure you want to delete the department <strong>{group_name}</strong>? The associated roles will be unbound from the users.',
  DELETE_PARENT_GROUP_TIP:
    'Are you sure you want to delete the department <strong>{group_name}</strong>? Its subdepartments will also be deleted and the associated roles will be unbound from the users.',
  PROJECT_VALUE: 'Project: {value}',
  PROJECT_ROLE_VALUE: 'Project role: {value}',
  DEVOPS_VALUE: 'DevOps project: {value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps project role: {value}',
  // List > Set Departments > Workspace Role
  WORKSPACE_ROLE: 'Workspace Role',
  GROUP_WORKSPACE_ROLE_DESC:
    'The workspace role will be assigned to all members in the department.',
  MEMBER_CLUSTER_UPGRADE_TIP:
    'Member clusters with versions earlier than {version} do not support this function. Please upgrade the member clusters to {version} or later.',
  // List > Set Departments > Project Role
  PROJECT_ROLE: 'Project Role',
  SELECT_ROLE_TIP: 'Please select a role.',
  ADD_PROJECT: 'Add Project',
  CLUSTER_UPGRADE_REQUIRED:
    'The current KubeSphere version does not support this feature. Please upgrade KubeSphere to {version} or later.',
  // List > Set Departments > DevOps Project Role
  DEVOPS_PROJECT_ROLE: 'DevOps Project Role',
  ADD_DEVOPS_PROJECT: 'Add DevOps Project',
};
