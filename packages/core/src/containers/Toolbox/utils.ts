/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty } from 'lodash';

import { ENV, hasKSModule, hasPermission } from '@ks-console/shared';
import type { ToolGroup } from './types';
import { INTERNAL_TOOL_NAMES } from './constants';

function isEnableMeterTool() {
  return (
    hasKSModule('metering') &&
    (hasPermission({
      module: 'workspaces',
      action: 'view',
    }) ||
      !isEmpty(globals.user.workspaces) ||
      hasPermission({
        module: 'clusters',
        action: 'view',
      }))
  );
}

const rules: Record<string, any> = {
  'log-query': hasKSModule('whizard-logging'),
  'event-search': hasKSModule('whizard-events'),
  'auditing-search': hasKSModule('whizard-auditing'),
  bill: isEnableMeterTool(),
  kubeconfig: globals.config.enableKubeConfig,
  // kubectl: isPlatformAdmin(),
  kubectl: true, // fix: https://github.com/kubesphere/issues/issues/1695
  docs: ENV.isDevelopment,
};

function getAllToolGroups(): ToolGroup[] {
  const { toolboxNavs = { children: [] } } = globals.config;

  return toolboxNavs.children.map((item: any) => {
    const tools = item?.children?.map((tool: any) => {
      const baseReturns = {
        name: tool.name,
        icon: tool.icon,
        title: t(tool.title),
      };

      if (INTERNAL_TOOL_NAMES.includes(tool.name)) {
        return {
          ...baseReturns,
          description: t(tool.description || tool.desc),
          link: tool.name === 'kubectl' ? '/terminal/kubectl' : `/${tool.name}`,
          isShown: rules[tool.name],
        };
      }

      return {
        ...baseReturns,
        description: t(tool.desc),
        isShown: true,
      };
    });

    return {
      name: item.name,
      title: t(item.title),
      tools,
    };
  });
}

export function getToolGroups() {
  const tools = getAllToolGroups();
  return tools?.filter(group => {
    group.tools = group.tools?.filter(tool => tool.isShown);
    return !isEmpty(group.tools);
  });
}
