import React from 'react';
import { Item } from './style';
import { Icon, Constants } from '@ks-console/shared';

const ICON_TYPES: Record<string, any> = Constants.ICON_TYPES;

interface IProps {
  onClick?: any;
  detail?: Record<string, any>;
  module: string;
  selected: boolean;
}

const WorkloadItem = ({ module, detail, onClick, selected }: IProps) => {
  const handleClick = () => {
    onClick(detail);
  };

  return (
    <Item onClick={handleClick} selected={selected}>
      <Icon name={ICON_TYPES[module]} size={16} />
      <div className="ring"></div>
      <span className="name">{detail?.name}</span>
    </Item>
  );
};

export default WorkloadItem;
