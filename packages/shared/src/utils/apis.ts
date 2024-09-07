/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, set, uniq, isArray } from 'lodash';
import request from './request';
import { getActions } from './nav';
import { PathParams } from '../types';
import { safeParseJSON } from './parser';
import { Constants } from '../constants';

export const getUserModule = ({ cluster, workspace, namespace, devops }: PathParams = {}) => {
  if (namespace || devops) {
    return 'members';
  }

  if (workspace) {
    return 'workspacemembers';
  }

  if (cluster) {
    return 'clustermembers';
  }

  return 'users';
};

type Rules = Record<string, any>;

export const fetchRules = async (params: PathParams): Promise<Rules> => {
  let module = 'globalroles';
  let urlParams = '';
  if (params.namespace || params.devops) {
    module = 'roles';
    urlParams = `scope=namespace&namespace=${params.namespace}`;
  } else if (params.workspace) {
    module = 'workspaceroles';
    urlParams = `scope=workspace&workspace=${params.workspace}`;
  } else if (params.cluster) {
    module = 'clusterroles';
    urlParams = `scope=cluster&cluster=${params.cluster}`;
  } else {
    urlParams = `scope=global`;
  }

  const roletemplatesUrl = `/${
    params.cluster ? `clusters/${params.cluster}/` : ''
  }kapis/iam.kubesphere.io/v1beta1/users/${globals.user?.username}/roletemplates?${urlParams}`;
  const resRoleTemplates = await request.get<any, any>(roletemplatesUrl);
  const roletemplatesList: Record<string, any>[] = get(resRoleTemplates, 'items', []);

  let rules: Rules = {};

  if (roletemplatesList.length > 0) {
    roletemplatesList.forEach(template => {
      const globalRuleName = get(template, 'metadata.name');
      const roleTemplateRules = safeParseJSON(
        get(template, "metadata.annotations['iam.kubesphere.io/role-template-rules']"),
        {},
      );
      Object.keys(roleTemplateRules).forEach(action => {
        rules[action] = rules[action] || [];
        if (isArray(roleTemplateRules[action])) {
          rules[action].push(...roleTemplateRules[action], globalRuleName);
        } else {
          rules[action].push(roleTemplateRules[action], globalRuleName);
        }
        rules[action] = uniq(rules[action]);
      });
    });
  }

  switch (module) {
    case 'globalroles':
      set(globals.user, 'globalRules', rules);
      break;
    case 'clusterroles': {
      const parentActions = getActions({ module: 'clusters' });
      set(globals.user, `clusterRules[${params.cluster}]`, {
        ...rules,
        _: uniq(parentActions),
      });
      break;
    }
    case 'workspaceroles': {
      if (params.workspace === globals.config?.systemWorkspace) {
        set(globals.user, `workspaceRules[${params.workspace}]`, {
          ...globals.config?.systemWorkspaceRules,
        });
        break;
      }

      const parentActions = getActions({ module: 'workspaces' });
      set(globals.user, `workspaceRules[${params.workspace}]`, {
        ...rules,
        _: uniq(parentActions),
      });
      break;
    }
    case 'roles': {
      const obj: Record<string, any> = {};
      if (params.workspace) {
        obj.workspace = params.workspace;
      } else if (params.cluster) {
        obj.cluster = params.cluster;
      }

      if (params.namespace) {
        const parentActions = getActions({
          ...obj,
          module: 'projects',
        });

        if (params.workspace === globals.config?.systemWorkspace) {
          rules = globals.config?.systemWorkspaceProjectRules;
        }

        set(globals.user, `projectRules[${params.cluster}][${params.namespace}]`, {
          ...rules,
          _: uniq(parentActions),
        });
      } else if (params.devops) {
        const parentActions = getActions({
          ...obj,
          module: 'devops',
        });

        set(globals.user, `devopsRules[${params.cluster}][${params.devops}]`, {
          ...rules,
          _: uniq(parentActions),
        });
      }
      break;
    }
    default:
  }

  return rules;
};

export function withTypeSelectParams(params: any, type?: string): any {
  if (type === 'system') {
    params.labelSelector = 'kubesphere.io/workspace=system-workspace';
  } else if (type === 'user') {
    params.labelSelector = 'kubesphere.io/workspace!=system-workspace,kubesphere.io/managed=true';
  } else {
    params.labelSelector = params.labelSelector || `kubesphere.io/managed=true`;
  }

  return params;
}

export function formatQueryParams(params: any, module: string): any {
  const formatParams: any = { ...params };

  if (!formatParams.sortBy && formatParams.ascending === undefined) {
    formatParams.sortBy = Constants.LIST_DEFAULT_ORDER[module] || 'createTime';
  }

  if (formatParams.limit === Infinity || formatParams.limit === -1) {
    formatParams.limit = -1;
    formatParams.page = 1;
  }

  return formatParams;
}
