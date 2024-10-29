/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { set, get, noop, merge, cloneDeep } from 'lodash';
import { useMutation, useInfiniteQuery, useQuery } from 'react-query';

import { useUrl } from '../hooks';
import {
  formatTime,
  getBaseInfo,
  getOriginData,
  formatDefault,
  request,
  formatFetchListParams,
} from '../utils';

import {
  PathParams,
  OriginalUser,
  FormattedUser,
  OriginalUserLoginRecord,
  UserStatusMutationType,
  PutUserPasswordRequestData,
  ResponseUser,
} from '../types';
import baseStore from './store';
import type { FetchListParams } from '../utils/formatter';

export const module = 'users';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getPath } = useUrl({ module });

function getModule(params?: PathParams) {
  const cluster = params?.cluster;
  const workspace = params?.workspace;
  const namespace = params?.namespace;
  const devops = params?.devops;

  if (namespace || devops) {
    return 'namespacemembers';
  }

  if (workspace) {
    return 'workspacemembers';
  }

  if (cluster) {
    return 'clustermembers';
  }

  return 'users';
}

function mapper(originalUser: OriginalUser): FormattedUser {
  const lastLoginTime = get(originalUser, 'status.lastLoginTime');
  const displayLastLoginTime = lastLoginTime ? formatTime(lastLoginTime) : t('NOT_LOGIN_YET');

  return {
    ...getBaseInfo<OriginalUser>(originalUser),
    username: get(originalUser, 'metadata.name', ''),
    email: get(originalUser, 'spec.email', ''),
    role: get(originalUser, 'metadata.annotations["iam.kubesphere.io/role"]', ''),
    globalrole: get(originalUser, 'metadata.annotations["iam.kubesphere.io/globalrole"]', ''),
    clusterrole: get(originalUser, 'metadata.annotations["iam.kubesphere.io/clusterrole"]', ''),
    workspacerole: get(originalUser, 'metadata.annotations["iam.kubesphere.io/workspacerole"]', ''),
    roleBind: get(originalUser, 'metadata.annotations["iam.kubesphere.io/role-binding"]', ''),
    groups: get(originalUser, 'spec.groups', []),
    status: get(originalUser, 'status.state', 'Pending'),
    conditions: get(originalUser, 'status.conditions', []),
    lastLoginTime,
    displayLastLoginTime,
    _originData: getOriginData<OriginalUser>(originalUser),
  };
}

const userApiversion = 'iam.kubesphere.io/v1beta1';

function getResourceUrl(params?: PathParams) {
  return `kapis/${userApiversion}${getPath(params)}/${getModule(params)}`;
}

const getListUrl = getResourceUrl;

const BaseStore = baseStore<FormattedUser>({
  module,
  mapper,
  getListUrlFn: getListUrl,
  getResourceUrlFn: getResourceUrl,
});

const { getDetailUrl } = BaseStore;

const getFilterParams = (params: Record<string, any>) => {
  const result = { ...params };
  if (result.app) {
    result.labelSelector = result.labelSelector || '';
    result.labelSelector += `app.kubernetes.io/name=${result.app}`;
    delete result.app;
  }
  return result;
};

function combineUserList(userList: ResponseUser, allList: ResponseUser) {
  const data = cloneDeep(userList);
  const userItems = get(data, 'items', []);
  const allItems = get(allList, 'items', []);
  const mergeData = userItems.map(user => {
    const findUser = allItems.find(
      user2 => get(user2, 'metadata.name') === get(user, 'metadata.name'),
    );
    if (findUser) {
      return merge(user, findUser);
    } else {
      return user;
    }
  });
  set(data, 'items', mergeData);
  return data;
}

function showAction(formattedUser: FormattedUser) {
  const { name } = formattedUser;
  return !globals.config?.presetUsers.includes(name) && globals.user?.username !== name;
}

function getDetailDescription(formattedUser: FormattedUser) {
  const { description } = formattedUser;
  if (globals.config.presetUsers.includes('admin')) {
    return t(description);
  }
  return description;
}

export const fetchList = async (
  { cluster, workspace, namespace, devops, ...params } = {} as FetchListParams,
): Promise<any> => {
  const formattedParams = formatFetchListParams(module, params);
  const { headers, ...params1 } = getFilterParams(formattedParams);
  const result: any = await request.get(getResourceUrl({ cluster, workspace, namespace, devops }), {
    params: params1,
    headers,
  });
  const resultAll: any = await request.get(getResourceUrl({}));
  const combineData = combineUserList(result, resultAll);

  const data = (combineData.items || []).map((item: OriginalUser) => ({
    cluster,
    namespace,
    ...item,
    ...mapper(item),
  }));

  return {
    data: data,
    total: result.totalItems || result.totalCount || result.total_count || data.length || 0,
    ...params,
    limit: Number(params.limit) || 10,
    page: Number(params.page) || 1,
  };
};

function useInfiniteUserList(params: FetchListParams & Record<string, any>) {
  const res = useInfiniteQuery({
    queryKey: ['InfinityUserList', params],
    queryFn: async ({ pageParam = params }) => {
      return fetchList(pageParam);
    },
    getNextPageParam: (lastPage: any) => {
      const { data, total, limit, page, ...rest } = lastPage;
      const hasNextPage = limit * (page - 1) + data.length < total;
      if (!hasNextPage) {
        return;
      }
      return { limit, page: page + 1, ...rest };
    },
  });
  return {
    ...res,
    data: res.data?.pages.flatMap(({ data }) => data) ?? [],
  };
}

function formatUserLoginRecord(originalUserLoginRecord: OriginalUserLoginRecord) {
  const formattedUserLoginRecord = formatDefault<OriginalUserLoginRecord>(originalUserLoginRecord);
  const { createTime } = formattedUserLoginRecord;
  const displayCreateTime = createTime ? formatTime(createTime) : '';

  return { ...formattedUserLoginRecord, displayCreateTime };
}

interface UseModifyUserPasswordMutationOptions {
  name: string;
  onSuccess?: (
    data: OriginalUser,
    variables: PutUserPasswordRequestData,
  ) => Promise<unknown> | void;
}

function useModifyUserPasswordMutation({
  name,
  onSuccess = noop,
}: UseModifyUserPasswordMutationOptions) {
  const url = `${getDetailUrl({ name })}/password`;
  return useMutation<OriginalUser, unknown, PutUserPasswordRequestData>(
    variables => request.put<never, OriginalUser, PutUserPasswordRequestData>(url, variables),
    {
      onSuccess,
    },
  );
}

function getStatus(formattedUser: FormattedUser, type?: UserStatusMutationType) {
  if (type === 'active') {
    return 'Active';
  }

  if (type === 'disabled') {
    return 'Disabled';
  }

  return formattedUser.status === 'Active' ? 'Disabled' : 'Active';
}

function userStatusMutationFn(formattedUser: FormattedUser, type?: UserStatusMutationType) {
  const url = getDetailUrl(formattedUser);
  const params = merge(
    {
      apiVersion: userApiversion,
      kind: 'User',
    },
    formattedUser._originData,
    {
      status: {
        state: getStatus(formattedUser, type),
      },
      metadata: {
        resourceVersion: formattedUser.resourceVersion,
      },
    },
  );
  return request.put<never, OriginalUser>(url, params);
}

function useUserStatusMutation(options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation<OriginalUser, unknown, FormattedUser>(userStatusMutationFn, { onSuccess });
}

function useUsersStatusMutation(options?: { onSuccess?: () => void }) {
  const onSuccess = options?.onSuccess;
  return useMutation(
    ({
      formattedUsers,
      type,
    }: {
      formattedUsers: FormattedUser[];
      type?: UserStatusMutationType;
    }) => {
      const promises = formattedUsers.map(formattedUser =>
        userStatusMutationFn(formattedUser, type),
      );
      return Promise.allSettled(promises);
    },
    { onSuccess },
  );
}

interface FetchMemberUsersOptions extends FetchListParams {
  roleKey: string;
}

async function fetchMemberUsers({
  roleKey,
  name,
  cluster,
  workspace,
  namespace,
  devops,
  sortBy,
  ascending,
  limit,
  page,
}: FetchMemberUsersOptions) {
  const pathParams = { cluster, workspace, namespace, devops };
  const moduleName = getModule(pathParams);

  const fetchListParams = formatFetchListParams(moduleName, {
    sortBy,
    ascending,
    limit,
    page,
  });
  const filterParams = getFilterParams(fetchListParams);

  const membersUrl = getResourceUrl(pathParams);
  const memberList = await request.get<never, ResponseUser>(membersUrl, {
    params: { [roleKey]: name, namespace, workspace, cluster, ...filterParams },
  });
  const members = memberList?.items ?? [];

  let result: ResponseUser;

  if (moduleName === 'users' || members.length === 0) {
    result = memberList;
  } else {
    const usersUrl = getResourceUrl();
    const names = members.map(member => member?.metadata?.name);
    const userList = await request.get<never, ResponseUser>(usersUrl, {
      params: { names: names.join(','), limit: -1 },
    });
    result = combineUserList(memberList, userList);
  }

  const totalItems = result?.totalItems ?? 0;
  const originalUsers = result?.items ?? [];
  const formattedUsers = originalUsers.map(originalUser => ({
    ...pathParams,
    ...originalUser,
    ...mapper(originalUser),
  }));

  return { totalItems, originalUsers, formattedUsers };
}

type UseFetchMembersListOptions = FetchMemberUsersOptions;

function useFetchMembersList(options: UseFetchMembersListOptions) {
  const { sortBy, ascending, limit, page, ...pathParams } = options;
  const filterParams = { sortBy, ascending, limit, page };
  const queryKey = ['fetchMembersList', pathParams, filterParams];

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () => fetchMemberUsers(options),
  });
  const totalItems = data?.totalItems ?? 0;
  const originalUsers = data?.originalUsers ?? [];
  const formattedUsers = data?.formattedUsers ?? [];

  return {
    ...rest,
    data: originalUsers,
    totalItems,
    originalUsers,
    formattedUsers,
  };
}

function useAllUserListQuery() {
  const queryKey = ['getAllUserList'];
  return useQuery(queryKey, () => request.get(getResourceUrl()));
}

const store = {
  ...BaseStore,
  fetchList,
  module,
  mapper,
  showAction,
  getDetailDescription,
  useInfiniteUserList,
  formatUserLoginRecord,
  useUserStatusMutation,
  useUsersStatusMutation,
  useModifyUserPasswordMutation,
  useFetchMembersList,
  useAllUserListQuery,
  combineUserList,
};

export default store;
