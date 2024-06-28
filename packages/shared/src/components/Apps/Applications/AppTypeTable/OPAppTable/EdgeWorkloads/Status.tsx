import React from 'react';
import styled from 'styled-components';

import { isUndefined } from 'lodash';

const StatusSpan = styled.span`
  display: inline-block;
  font-family: $font-family-id;
  line-height: 20px;
`;

function Status(props: any) {
  const { style, className, name, type, total, ready, flicker } = props

  return (
    <StatusSpan>
      {/*<Indicator className={styles.indicator} type={type} flicker={flicker} />*/}
      <span className="font-bold">{name}</span>
      {!isUndefined(total) && !isUndefined(ready) && (
        <span>
          &nbsp;({ready}/{total})
        </span>
      )}
    </StatusSpan>
  );
}

export default Status;
