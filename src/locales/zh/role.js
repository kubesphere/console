/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

export default {
  roles: '角色',
  Roles: '角色',
  Role: '角色',
  'Role Management': '角色管理',
  'Platform Role': '平台角色',
  'Platform Roles': '平台角色',
  Terminating: '删除中',
  'Create Role': '创建角色',
  'Edit Role': '编辑角色',
  'Project Details': '项目详情',
  'Project Roles': '项目角色',
  'Cluster Role': '集群角色',
  'Authority List': '权限列表',
  'Authorized Users': '授权用户',
  'Authority Settings': '权限设置',
  'User Name': '用户名',
  Cluster: '集群',
  Member: '成员',

  'Create Project Role': '创建项目角色',
  'Edit Project Role': '编辑项目角色',
  'Create Platform Role': '创建平台角色',
  'Edit Platform Role': '编辑平台角色',

  'Role Name': '角色名称',
  'Role Type': '角色类型',
  'Please input role name': '请输入角色名称',
  'Invalid role name': '角色名称格式不合法',
  'Role name exists': '角色名已存在',
  Modules: '功能模块',
  'Authorized Actions': '可执行操作',
  'No Authority': '暂无权限规则',
  NO_AVAILABLE_ROLE: '当前项目无可用角色',
  JOIN_PROJECT_PLACEHOLDER: '输入用户名或者邮箱邀请用户加入到项目中',
  ROLE_DELETE_TIP: '当前角色已有用户绑定, 请解绑后重试',
  ROLE_NO_AVAILABLE_TIP: '当前项目无可用角色',
  ROLE_PROJECTS_JOIN_TIP: '输入用户名或者邮箱邀请用户加入到项目中',
  ROLE_TYPE_DESC:
    '角色类型根据权限范围分为集群、项目两类，当前角色的授权为该项目范围。',

  DELETE_ROLE_TIP: '确定删除角色 <strong>{resource}</strong>?',
  ROLE_USERS_TIP:
    '当前角色有 <strong>{count}</strong> 名授权用户, 请先移除授权用户或更改角色后再删除。',

  RULE_WORKSPACES: '企业空间',
  RULE_KUBECTL: 'Kubectl',
  RULE_MONITORING: '监控管理',
  RULE_ORGANIZATIONS: '组织架构管理',
  RULE_DEVOPS: 'DevOps 工程管理',
  RULE_PROJECTS: '项目管理',
  RULE_ACCOUNTS: '账户管理',
  RULE_USERS: '用户管理',
  RULE_ROLES: '角色管理',
  RULE_REGISTRYS: '镜像仓库',
  RULE_PERSISTENTVOLUMECLAIMS: '存储卷管理',
  RULE_STORAGECLASSES: '存储类型管理',
  RULE_REGISTRIES: '镜像管理',
  RULE_NODES: '主机管理',
  RULE_REPOS: '应用仓库管理',
  RULE_APPS: '应用管理',
  RULE_DEPLOYMENTS: '部署',
  RULE_STATEFULSETS: '有状态副本集',
  RULE_DAEMONSETS: '守护进程集',
  RULE_SERVICES: '服务管理',
  RULE_ROUTES: '应用路由管理',
  RULE_VIEW: '查看',
  RULE_CREATE: '创建',
  RULE_EDIT: '编辑',
  RULE_DELETE: '删除',
  RULE_ROLE_BINDING: '绑定角色',
  RULE_PODSCALE: '容器组规模管理',
  RULE_SCALE: '横向伸缩',
  RULE_MEMBERS: '成员管理',
  RULE_MEMBER_ROLES: '成员角色',
  RULE_COMPONENTS: '服务组件',
  RULE_VOLUMES: '存储卷',
  RULE_PODS: '容器组管理',
  RULE_TERMINAL: '远程连接',
  RULE_DRAIN: '驱散',
  RULE_APPLICATIONS: '应用管理',
  RULE_JOBS: '任务管理',
  RULE_CRONJOBS: '定时任务管理',
  RULE_SECRETS: '密钥管理',
  RULE_CONFIGMAPS: '配置管理',
  RULE_CORDON: '停用/启用',
  RULE_TAINT: '污点管理',
  RULE_INTERNET: '外网访问管理',
  RULE_LOGGING: '日志管理',
  RULE_ALERTING: '告警管理',
  RULE_MANAGE: '管理',
  RULE_ADVANCED: '高级设置',
  RULE_S2IBUILDERS: '构建镜像',

  'Default user role which allows a user to manage resources within the projects created by the user himself or invited by others. It does not allow the user to manage unauthorized resources in the cluster.':
    '默认用户角色，仅允许对自己创建或受邀加入的项目中的资源进行管理，无权操作集群范围内其他资源。',

  'No authorized users': '暂无授权用户',

  'Unable to delete preset role': '无法删除预置角色',

  'Allows cluster-admin access to perform any action on any resource, it gives full control over every resource in the cluster and in all namespaces.':
    '集群管理员，可以管理集群中所有的资源。',
  'Normal user in the cluster, there is no permission for any resource operations until he is invited to the workspace.':
    '集群中的普通用户，在被邀请加入企业空间之前没有任何资源操作权限。',
  'Allows workspace-manager access to manage all the workspaces in the cluster.':
    '集群中企业空间管理员，可以管理集群中所有的企业空间。',
  'Allows admin access to perform any action on any resource, it gives full control over every resource in the workspace.':
    '企业空间管理员，可以管理企业空间下所有的资源。',
  'Normal user in the workspace, can create namespace and DevOps project.':
    '企业空间普通成员，可以在企业空间下创建工程和项目。',
  'Allows viewer access to view all resources in the workspace.':
    '企业空间的观察者，可以查看企业空间下所有的资源信息。',
  'Allows admin access to perform any action on any resource, it gives full control over every resource in the namespace.':
    '	项目管理员，可以管理项目下所有的资源。',
  'The maintainer of the namespace who can manage resources other than users and roles in the namespace.':
    '项目维护者，可以管理项目下除用户和角色之外的资源。',
  'Allows viewer access to view all resources in the namespace.':
    '项目观察者，可以查看项目下所有的资源。',
}
