/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { EmptyProps } from '@kubed/components';

import type { DescriptionProps } from './Description';
import { Description } from './Description';
import { StyledEmpty } from './styles';

export type TableFilteredEmptyProps = EmptyProps & DescriptionProps;

export function TableFilteredEmpty({
  refetch,
  clearAndRefetch,
  ...emptyProps
}: TableFilteredEmptyProps) {
  return (
    <StyledEmpty
      title={t('NO_MATCHING_RESULT_FOUND')}
      description={<Description refetch={refetch} clearAndRefetch={clearAndRefetch} />}
      {...emptyProps}
    />
  );
}
