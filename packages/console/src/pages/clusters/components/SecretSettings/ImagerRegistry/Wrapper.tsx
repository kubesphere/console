/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren } from 'react';

interface Props {
  label?: string;

  desc?: string;
  required?: boolean;
}
import { DefaultWrapper } from '../styles';

function Wrapper({ label, desc, required, children }: PropsWithChildren<Props>) {
  return (
    <DefaultWrapper className="wrapper">
      {label && (
        <label className={'label'}>
          {label}
          {required ? <span className={'requiredIcon'}>*</span> : null}
        </label>
      )}
      <div className={'control'}>
        {children}
        {desc && <div className={'desc'}>{desc}</div>}
      </div>
    </DefaultWrapper>
  );
}

export default Wrapper;
