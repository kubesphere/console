/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { UseMutateFunction } from 'react-query';
import { notify } from '@kubed/components';

import type {
  OriginalUser,
  FormattedUser,
  UserStatusMutationType,
  PutUserPasswordRequestData,
} from '@ks-console/shared';

interface ModifyUserPasswordOptions {
  params: PutUserPasswordRequestData;
  mutate: UseMutateFunction<OriginalUser, unknown, PutUserPasswordRequestData>;
  onSuccess?: (data: OriginalUser, variables: PutUserPasswordRequestData, context: unknown) => void;
}

export function modifyUserPassword({ params, mutate, onSuccess }: ModifyUserPasswordOptions) {
  mutate(params, {
    onSuccess: (data, variables, context) => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      onSuccess?.(data, variables, context);
    },
  });
}

interface ModifyUserStatusOptions {
  formattedUser: FormattedUser;
  // type?: UserStatusMutationType;
  mutate: UseMutateFunction<OriginalUser, unknown, FormattedUser>;
  onSuccess?: (data: OriginalUser, variables: FormattedUser, context: unknown) => void;
}

export function modifyUserStatus({ formattedUser, mutate, onSuccess }: ModifyUserStatusOptions) {
  mutate(formattedUser, {
    onSuccess: (data, variables, context) => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      onSuccess?.(data, variables, context);
    },
  });
}

interface ModifyUsersStatusVariables {
  formattedUsers: FormattedUser[];
  type?: UserStatusMutationType;
}

interface ModifyUsersStatusOptions {
  formattedUsers: FormattedUser[];
  type?: UserStatusMutationType;
  mutate: UseMutateFunction<
    PromiseSettledResult<OriginalUser>[],
    unknown,
    ModifyUsersStatusVariables
  >;
  onSuccess?: (
    data: PromiseSettledResult<OriginalUser>[],
    variables: ModifyUsersStatusVariables,
    context: unknown,
  ) => void;
}

export function modifyUsersStatus({
  formattedUsers,
  type,
  mutate,
  onSuccess,
}: ModifyUsersStatusOptions) {
  if (formattedUsers.length > 0) {
    mutate(
      { formattedUsers, type },
      {
        onSuccess: (data, variables, context) => {
          notify.success(t('UPDATE_SUCCESSFUL'));
          onSuccess?.(data, variables, context);
        },
      },
    );
  }
}
