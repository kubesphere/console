import { apiVersion } from '../monitoring';

type ApiParams = {
  cluster?: string;
};

export const resourceName = 'node';
export const getApi = ({}: ApiParams) => `${apiVersion({})}/node_metrics`;
