/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Card } from '@kubed/components';
import { Icon } from '@ks-console/shared';
import {
  CardWrapper,
  Header,
  TitleWrapper,
  Operation,
  ContentWrapper,
  ContentEmpty,
  UlWrapper,
} from './styles';
import { isEmpty } from 'lodash';

interface IProps {
  detail: Record<string, any>;
  expand?: boolean;
  loading?: boolean;
  icon?: string;
  emptyText?: string;
  module?: string;
}

const HIDE_RULE = ['password', 'secret'];

const ContainerEnvCard = (props: IProps) => {
  const { icon, detail, expand = false, emptyText } = props;
  const [isExpand, setIsExpand] = useState(expand);

  const renderTitle = () => {
    const { type, name } = detail;

    return (
      <Header style={!isExpand ? { marginBottom: '0px' } : {}}>
        <TitleWrapper>
          <Icon name={icon || 'docker'} size={20} />
          {type
            ? type === 'init'
              ? t('INIT_CONTAINER_VALUE', { value: name })
              : t('CONTAINER_VALUE', { value: name })
            : name}
        </TitleWrapper>
        <Operation onClick={e => e.stopPropagation()} isExpand={isExpand}>
          <Icon name="caret-down" size={12} variant="light" />
        </Operation>
      </Header>
    );
  };

  const handleHideValue = (name: string) => {
    const lowercaseName = name.toLowerCase();
    let isHide = false;

    HIDE_RULE.forEach(item => {
      if (lowercaseName.includes(item)) {
        isHide = true;
      }
    });
    return isHide;
  };

  const renderContent = () => {
    const { variables } = detail;

    return isEmpty(variables) ? (
      <ContentEmpty>
        {emptyText || t('EMPTY_WRAPPER', { resource: t('ENVIRONMENT_VARIABLE') })}
      </ContentEmpty>
    ) : (
      <ContentWrapper
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <UlWrapper>
          {variables.map(({ name, value }: { name: string; value: string }) => {
            const isHider = handleHideValue(name);
            const hideValue = isHider ? '******' : value;

            return (
              <li key={name}>
                <div>{name}</div>
                <div>{hideValue}</div>
              </li>
            );
          })}
        </UlWrapper>
      </ContentWrapper>
    );
  };

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  return (
    <CardWrapper>
      <Card hoverable style={{ cursor: 'pointer' }} onClick={handleExpand}>
        {renderTitle()}
        {isExpand && renderContent()}
      </Card>
    </CardWrapper>
  );
};

export default ContainerEnvCard;
