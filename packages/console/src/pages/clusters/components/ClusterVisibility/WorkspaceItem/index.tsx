/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import cs from 'classnames';
import { FormattedWorkspace } from '@ks-console/shared';
import { Field } from '@kubed/components';
import { ChevronLeft, ChevronRight, Enterprise } from '@kubed/icons';
import { FieldLabel, Wrapper } from './styles';

interface Props {
  workspace: FormattedWorkspace;
  disabled?: boolean;
  onClick: (workspace: FormattedWorkspace) => void;
  type: 'authed' | 'all';
}

function WorkspaceItem({ workspace, disabled, type, onClick }: Props) {
  const handleClick = () => {
    if (disabled) {
      return;
    }
    onClick(workspace);
  };

  if (workspace.name === globals.config.systemWorkspace) {
    return null;
  }
  return (
    <Wrapper className={cs({ disabled })} onClick={handleClick}>
      {!disabled && type === 'authed' && <ChevronLeft size={20} />}
      {
        <Field
          avatar={<Enterprise size={40} />}
          value={workspace.name}
          label={<FieldLabel>{workspace.description || '-'}</FieldLabel>}
        />
      }
      {
        <div>
          <Field value={workspace.manager} label={t('MANAGER')} />
        </div>
      }
      {!disabled && type !== 'authed' && <ChevronRight size={20} />}
    </Wrapper>
  );
}

export default WorkspaceItem;
