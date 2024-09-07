/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { merge } from 'lodash';
import { notify } from '@kubed/components';
import { userStore, FormattedUser, UserActionValues, request, cookie } from '@ks-console/shared';

import type { UserBaseModalProps } from '../UserBaseModal';
import UserBaseModal from '../UserBaseModal';
import { useParams } from 'react-router-dom';

const { usePutMutation: useEditUserMutation } = userStore;

interface UserCreateModalProps {
  visible: boolean;
  formattedUser: FormattedUser;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UserEditModal({
  visible,
  formattedUser,
  onSuccess,
  onCancel,
}: UserCreateModalProps) {
  const pathParams: Record<string, any> = useParams();
  const formFieldProps: UserBaseModalProps['formFieldProps'] = {
    'metadata.name': {
      disabled: true,
      rules: [{ required: true, message: t('USERNAME_EMPTY_DESC') }],
    },
    'spec.email': {
      rules: [
        {
          required: true,
          message: t('INPUT_USERNAME_OR_EMAIL_TIP'),
        },
      ],
    },
    'spec.password': {
      isExclude: true,
    },
  };
  const { mutate, isLoading } = useEditUserMutation(
    {
      ...formattedUser,
      ...pathParams,
    },
    {
      onSuccess: async (data, params) => {
        const { name } = formattedUser;

        if (params?.password && name === globals.user.username) {
          await request.post('logout');
        } else {
          const lang = params?.spec?.lang;
          if (lang && params.lang !== cookie('lang')) {
            window.location.reload();
          }
        }

        onSuccess();
        onCancel();
        notify.success(t('UPDATE_SUCCESSFUL'));
      },
    },
  );

  const handleSubmit = (formValues: UserActionValues) => {
    const data = merge(
      {},
      formattedUser._originData,
      {
        metadata: {
          resourceVersion: formattedUser.resourceVersion,
        },
      },
      formValues,
    );
    mutate({
      data,
    });
  };

  return (
    <UserBaseModal
      key={formattedUser.name}
      visible={visible}
      title={t('EDIT_USER')}
      formFieldProps={formFieldProps}
      confirmLoading={isLoading}
      formattedUser={formattedUser}
      onOk={handleSubmit}
      onCancel={onCancel}
    />
  );
}
