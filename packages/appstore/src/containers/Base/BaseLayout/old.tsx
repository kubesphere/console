/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import Banner from '../../../components/Banner';

const Wrapper = styled.div`
  margin-top: -68px;
`;

function BaseLayout(): JSX.Element {
  const { appName } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useStore<number>('currentStep', -2);
  const style: CSSProperties | undefined = appName ? { backgroundColor: '#ffffff' } : undefined;

  function handleBack(): void {
    if (currentStep === -1) {
      return navigate('/apps');
    }

    if (currentStep === 0) {
      return navigate(`/apps/${appName}`);
    }

    setCurrentStep(Math.max(0, currentStep - 1));
  }

  return (
    <Wrapper style={style}>
      <Banner onBack={handleBack} />
      <Outlet />
    </Wrapper>
  );
}

export default BaseLayout;
