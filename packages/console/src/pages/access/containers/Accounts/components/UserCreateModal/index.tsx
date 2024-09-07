/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { merge } from 'lodash';
import { notify } from '@kubed/components';
import { Pattern, validator, userStore } from '@ks-console/shared';

import type { UserActionValues } from '@ks-console/shared';
import type { UserBaseModalProps } from '../UserBaseModal';
import UserBaseModal from '../UserBaseModal';

interface UserCreateModalProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

const { usePostMutation: useCreateUserMutation } = userStore;

export default function UserCreateModal({ visible, onSuccess, onCancel }: UserCreateModalProps) {
  const formFieldProps: UserBaseModalProps['formFieldProps'] = {
    'metadata.name': {
      rules: [
        { required: true, message: t('USERNAME_EMPTY_DESC') },
        {
          pattern: Pattern.PATTERN_USER_NAME,
          message: t('USERNAME_INVALID', { message: t('USERNAME_DESC') }),
        },
        {
          validator: (rule, value) => {
            const params = {
              apiVersion: 'kapis/iam.kubesphere.io/v1beta1',
              name: value,
              module: 'users',
            };
            return validator.nameValidator(params);
          },
        },
      ],
    },
    'spec.email': {
      rules: [
        { required: true, message: t('INPUT_USERNAME_OR_EMAIL_TIP') },
        { type: 'email', message: t('INVALID_EMAIL') },
        { validator: validator.emailValidator },
      ],
    },
  };
  const { mutate, isLoading } = useCreateUserMutation(
    {},
    {
      onSuccess: () => {
        onSuccess();
        onCancel();
        notify.success(t('CREATE_SUCCESSFUL'));
      },
    },
  );

  const handleSubmit = (formValues: UserActionValues) => {
    const data = merge(
      {
        metadata: {
          annotations: {
            'iam.kubesphere.io/uninitialized': 'true',
          },
        },
      } as const,
      formValues,
    );
    mutate({
      data,
    });
  };

  return (
    <UserBaseModal
      visible={visible}
      title={t('CREATE_USER')}
      formFieldProps={formFieldProps}
      confirmLoading={isLoading}
      onOk={handleSubmit}
      onCancel={onCancel}
    />
  );
}
