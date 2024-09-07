/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Trash } from '@kubed/icons';
import { StyledItem, DeleteButton, ErrorTip } from './styles';

interface IProps {
  name?: string;
  component: React.ReactElement;
  index?: number;
  value?: any;
  arrayValue?: any;
  onChange?: (this: any, index: number) => void;
  onDelete?: () => void;
}

const Item = ({ component, index, value, arrayValue, onChange, onDelete }: IProps) => {
  const [keyErrorTip, setKeyError] = useState('');

  const handleKeyError = (info: any) => {
    const message = info?.message ?? '';
    setKeyError(message);
  };

  const childNode = React.cloneElement(component, {
    ...component.props,
    index,
    value,
    arrayValue,
    onChange,
    handleKeyError,
  });

  return (
    <>
      <StyledItem>
        {childNode}
        <DeleteButton icon="trash" onClick={onDelete}>
          <Trash />
        </DeleteButton>
      </StyledItem>
      {keyErrorTip !== '' && <ErrorTip>{keyErrorTip}</ErrorTip>}
    </>
  );
};

export default Item;
