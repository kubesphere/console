/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Card, Field } from '@kubed/components';
import { FullRow, FullCol, StyledEntity, StyledField } from './styles';
import { Nodes } from '@kubed/icons';

interface Props {
  totalCount: Number;
  masterNum: Number;
}

function Count({ totalCount = 0, masterNum = 0 }: Props) {
  return (
    <Card className="mb12">
      <StyledEntity bordered={false}>
        <FullRow>
          <FullCol span={3}>
            <StyledField
              avatar={<Nodes size={40} />}
              label={totalCount === 1 ? t(`NODE_SI`) : t(`NODE_PL`)}
              value={totalCount}
            />
          </FullCol>
          <FullCol span={8}>
            <Field
              label={masterNum === 1 ? t('MASTER_NODE_SI') : t('MASTER_NODE_PL')}
              value={masterNum}
            />
          </FullCol>
        </FullRow>
      </StyledEntity>
    </Card>
  );
}
export default Count;
