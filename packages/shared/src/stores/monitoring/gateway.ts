import { isEmpty } from 'lodash';
import { apiVersion } from '../monitoring';

export const resourceName = 'gateways';

export const getApi = ({ cluster, namespace }: { cluster?: string; namespace?: string }) => {
  // return `${apiVersion(cluster)}/namespaces/${namespace || 'kubesphere-system'}/ingresses`; //TODO:
  return `${apiVersion({ cluster, namespace })}/ingresses`;
};

export const getGatewayParams = ({
  resources = [],
  metrics = [],
  ...rest
}: {
  resources?: string[];
  metrics?: string[];
  [key: string]: any;
} = {}) => {
  const params: Record<string, any> = {
    ...rest,
  };

  if (!isEmpty(resources)) {
    params.resources_filter = `${resources.join('|')}$`;
  }

  if (!isEmpty(metrics)) {
    params.metrics_filter = `${metrics.join('|')}$`;
  }

  params.time = Math.floor(Date.now() / 1000);

  return params;
};
