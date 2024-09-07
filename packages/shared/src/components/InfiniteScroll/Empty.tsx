/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { EmptyWrapper, StyledEmpty, Image } from './Empty.styles';

export default function Empty() {
  return (
    <EmptyWrapper>
      <StyledEmpty
        image={<Image />}
        imageStyle={{
          width: '154px',
          height: '120px',
          marginBottom: '30px',
          backgroundColor: 'none',
        }}
        title={t('NO_DATA')}
      />
    </EmptyWrapper>
  );
}
