import { intersectionBy, isEmpty } from 'lodash';

export const getTaints = (node: any) => node.taints || [{}];

export const getCommonTaints = (nodes: any[]) => {
  if (isEmpty(nodes) || nodes.length === 1) {
    return [{}];
  }

  const result = nodes.reduce((prev, cur) => ({
    taints: intersectionBy(getTaints(prev), getTaints(cur), 'key'),
  }));

  return isEmpty(result.taints)
    ? [
        {
          key: '',
          value: '',
          effect: 'NoSchedule',
        },
      ]
    : getTaints(result);
};
