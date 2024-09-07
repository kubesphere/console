/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  DEVOPS_TIP_GITOPS_Q: '如何落地 DevOps？',
  DEVOPS_TIP_GITOPS_A:
    '创建关联代码仓库的流水线，并积极使用部署 Kubernetes 部署步骤，就可以实现 DevOps 了。',
  DEVOPS_TIP_TYPE_Q: '流水线 (Pipeline) 支持哪些代码仓库类？',
  DEVOPS_TIP_TYPE_A: '流水线支持 Git、GitHub、Gitlab、SVN、以及 Bitbucket 代码仓库.',
  // List
  DEVOPS_PROJECT_EMPTY_DESC: '请创建一个 DevOps 项目。',
  // List > Create
  CREATE_DEVOPS_PROJECT: '创建 DevOps 项目',
  DEVOPS_PROJECT_CREATE_DESC:
    'DevOps 是一个独立的命名空间，其中定义了一组的流水线；用户可以按照自己的方式对流水线进行分组 (例如：项目类型、组织类型)。',
  DEVOPS_BASEINFO_DESC: '请设置 DevOps 项目的基本信息',
  PATTERN_NAME_INVALID_TIP: '名称无效。名称只能包含小写字母、数字、或连字符（-）。',
  // List > Create > Cluster Settings
  NO_DEVOPS_INSTALL: '未安装 DevOps',
  // List > Edit
  DEVOPS_ADMIN_DESC: '选择一个项目成员作为项目管理员。',
  // List > Delete
  DELETE_MULTIPLE_DEVOPS_PROJECTS: '批量删除 DevOps 项目',
  DELETE_DEVOPS_PROJECT: '删除 DevOps 项目',
  DELETE_DEVOPS_PROJECT_TIP:
    '请输入 DevOps 项目名称 <strong>{resource}</strong> 以确认您了解此操作的风险。',
  DELETE_DEVOPS_PROJECT_TIP_PL:
    '请输入 DevOps 项目名称 <strong>{resource}</strong> 以确认您了解此操作的风险。',
};
