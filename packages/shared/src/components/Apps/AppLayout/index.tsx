/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { Outlet, useParams } from 'react-router-dom';

import Banner from './Banner';

const Wrapper = styled.div``;

function AppBaseLayout(): JSX.Element {
  const { appName } = useParams();
  const style: CSSProperties | undefined = appName ? { backgroundColor: '#ffffff' } : undefined;

  return (
    <Wrapper style={style}>
      <Banner />
      <Outlet />
    </Wrapper>
  );
}

export { AppBaseLayout };
