/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty, map } from 'lodash';
import React from 'react';

import SchemaItem from './SchemaItem';
import { useCacheStore as useStore } from '../../../../../index';

import { Desc, GroupWrapper, Title } from './styles';

type Props = {
  propObj: Record<string, any>;
  propPath?: string[];
};

function Schema({ propObj, propPath = [] }: Props): JSX.Element {
  const { type, form, hidden, properties, title, description } = propObj;
  const [value] = useStore<any>('valuesJSON');

  const notShow: boolean =
    typeof hidden === 'object'
      ? get(value, hidden.value, null) === hidden.condition
      : get(value, hidden, false);

  if (notShow) {
    return <></>;
  }

  if (type === 'object') {
    const subContent = map(properties, (v, k) => (
      <Schema key={k} propObj={v} propPath={[...propPath, k]} />
    ));

    if (isEmpty(subContent) || subContent.every(item => !item)) {
      return <></>;
    }

    return (
      <GroupWrapper>
        {title && <Title>{title}</Title>}
        {description && <Desc>{description}</Desc>}
        {subContent}
      </GroupWrapper>
    );
  }

  if (!form) {
    return <></>;
  }

  return <SchemaItem propObj={propObj} propPath={propPath} />;
}

export default Schema;
