/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { memo } from 'react';
import Panel from '../../Panel';
import { isEmpty } from 'lodash';
import { ValuesStyle, TitleStyle } from './styles';

function Annotations({
  className,
  annotations = {} as { [key: string]: string },
  hiddenKeys = [],
}: {
  className?: string;
  annotations: { [key: string]: string };
  hiddenKeys?: string[];
}) {
  const arrayValues = Object.keys(annotations).filter(
    item => !hiddenKeys.some(hiddenKey => new RegExp(hiddenKey).test(item)),
  );

  if (isEmpty(arrayValues)) {
    return null;
  }

  return (
    <Panel className={className} title={t('ANNOTATION_PL')}>
      <ValuesStyle>
        {arrayValues.map(key => (
          <li key={key}>
            <TitleStyle>{key}</TitleStyle>
            <span>{String(annotations[key])}</span>
          </li>
        ))}
      </ValuesStyle>
    </Panel>
  );
}

export default memo(Annotations);
