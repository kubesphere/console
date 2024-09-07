/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  DEPARTMENT_PL: '部门',
  DEPARTMENT_DESC:
    '企业空间中的部门是用来管理权限的逻辑单元。您可以在部门中设置企业空间角色、多个项目角色以及多个 DevOps 项目角色，还可以将用户分配到部门中以批量管理用户权限。',
  // List
  // List > Not Assigned
  NOT_ASSIGNED_TCAP: '未分配',
  ADD_MEMBER_TIP_SI: '您确定添加成员到部门 <strong>{group}<strong> 吗？',
  ADD_MEMBER_TIP_PL: '您确定添加成员到部门 <strong>{group}<strong> 吗？',
  // List > Assigned
  ASSIGNED: '已分配',
  DEPARTMENT: '部门',
  // List > Set Departments
  SET_DEPARTMENTS: '设置部门',
  DEPARTMENT_EMPTY_DESC: '没有可用部门',
  NO_DEPARTMENT_TIP: '没有可用部门，请在右侧创建部门。',
  CREATE_DEPARTMENT: '创建部门',
  DELETE_GROUP_TIP:
    '确定删除子部门 <strong>{group_name}</strong>？删除该部门的同时，所有成员的授权也将被取消。',
  DELETE_PARENT_GROUP_TIP:
    '确定删除子部门 <strong>{group_name}</strong>？删除该部门的同时，其子部门也会被删除，且所有成员的授权也将被取消。',
  PROJECT_VALUE: '项目：{value}',
  PROJECT_ROLE_VALUE: '项目角色：{value}',
  DEVOPS_VALUE: 'DevOps 项目：{value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps 项目角色：{value}',
  // List > Set Departments > Workspace Role
  WORKSPACE_ROLE: '企业空间角色',
  GROUP_WORKSPACE_ROLE_DESC: '企业空间角色将授予部门中的所有用户。',
  MEMBER_CLUSTER_UPGRADE_TIP:
    '低于 {version} 版本的成员集群不支持此功能, 请将成员集群升级到 {version} 或以上版本。',
  // List > Set Departments > Project Role
  PROJECT_ROLE: '项目角色',
  SELECT_ROLE_TIP: '请选择角色。',
  ADD_PROJECT: '添加项目',
  CLUSTER_UPGRADE_REQUIRED:
    '当前 KubeSphere 版本不支持此功能，请将 KubeSphere 升级到 {version} 或以上版本。',
  // List > Set Departments > DevOps Project Role
  DEVOPS_PROJECT_ROLE: 'DevOps 项目角色',
  ADD_DEVOPS_PROJECT: '添加 DevOps 项目',
};
