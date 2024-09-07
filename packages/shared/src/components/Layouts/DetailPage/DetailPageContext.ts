/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import type { PathParams } from '../../../types';

export interface DetailContextConfig<T> {
  detail?: T;
  params?: PathParams;
  refetch?: () => Promise<any>;
  store: any;
  authKey?: string;
}

const defaultContext = {
  detail: {},
  store: {},
};

export const DetailPageContext = React.createContext<DetailContextConfig<any>>(defaultContext);

export const useDetailPage = <T>(): DetailContextConfig<T> =>
  React.useContext<DetailContextConfig<T>>(DetailPageContext);
