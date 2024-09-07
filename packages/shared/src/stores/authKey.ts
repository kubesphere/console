/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useMutation, useQuery } from 'react-query';
import { request } from '../utils';

const module = 'authkey';

const getPath = (params: { user: string }) => {
  return `kapis/iam.kubesphere.io/v1beta1/users/${params.user}/${module}`;
};

const getDetail = async (params: { user: string }) => {
  return request.get(getPath(params)).then(res => (res as any).authKey);
};

const post = async (params: { user: string }, data: { otp: string; authKey: string }) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ message: 'success' });
  //   }, 100);
  // });
  return request.post(getPath(params), data);
};

const deleteFn = async (params: { user: string }, data: { otp: string }) => {
  return request.delete(getPath(params), {
    params: data,
  });
};

export const useQueryDetail = (params: { user: string }) => {
  return useQuery([module, params], () => getDetail(params));
};

export const usePost = (params: { user: string }, callback?: () => void) => {
  return useMutation((data: { otp: string; authKey: string }) => post(params, data), {
    onSuccess: () => {
      if (callback) {
        callback();
      }
    },
  });
};

export const useDelete = (params: { user: string }, callback?: () => void) => {
  return useMutation((data: { otp: string }) => deleteFn(params, data), {
    onSuccess: () => {
      if (callback) {
        callback();
      }
    },
  });
};
