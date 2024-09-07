/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Checkbox } from '@kubed/components';

import type { DeleteConfirmModalProps } from '@ks-console/shared';
import { DeleteConfirmModal } from '@ks-console/shared';

import { DescribeWrapper } from './styles';

type OnOk = DeleteConfirmModalProps['onOk'];

type OnOkParameters = Parameters<OnOk>;

type Ev = OnOkParameters[0];

type Data = OnOkParameters[1];

interface D extends Data {
  shouldDeleteResource: boolean;
}

interface DeleteWorkspaceModalProps extends Omit<DeleteConfirmModalProps, 'onOk'> {
  onOk: (event: Ev, data: D) => void;
}

function DeleteWorkspaceModal({ onOk, ...rest }: DeleteWorkspaceModalProps) {
  const [shouldDeleteResource, setShouldDeleteResource] = useState<boolean>(false);

  return (
    <DeleteConfirmModal
      {...rest}
      desc={
        <DescribeWrapper>
          <Checkbox
            onChange={e => setShouldDeleteResource(e.target.checked)}
            label={t('DELETE_WORKSPACE_PROJECTS_DESC')}
          />
        </DescribeWrapper>
      }
      onOk={(event, data) => {
        onOk(event, { ...data, shouldDeleteResource });
      }}
    />
  );
}

export type { DeleteWorkspaceModalProps };
export { DeleteWorkspaceModal };
