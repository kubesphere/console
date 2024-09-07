/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { Card, Loading } from '@kubed/components';

import { ItemsWrapper } from '../styles';

type Props = {
  title: string;
  data: any;
  emptyPlaceholder?: ReactNode;
  itemRender: (item: any) => ReactNode;
  className?: string;
  cardLoading?: boolean;
};

function ResourceCard({
  title,
  data,
  itemRender,
  className,
  cardLoading,
  emptyPlaceholder,
}: Props): JSX.Element {
  if (!emptyPlaceholder) {
    return <></>;
  }

  return (
    <Card sectionTitle={title} className={cx(className, { 'card-loading': cardLoading })}>
      {cardLoading ? (
        <Loading />
      ) : (
        <>
          {!data || isEmpty(data) ? (
            emptyPlaceholder
          ) : (
            <ItemsWrapper>{data.map(itemRender)}</ItemsWrapper>
          )}
        </>
      )}
    </Card>
  );
}

export default ResourceCard;
