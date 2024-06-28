import styled from 'styled-components';
import { Lock } from '@kubed/icons';

export const TooltipContent = styled.div`
  h6,
  p {
    margin: 0;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
`;

export const Icon = styled(Lock)`
  width: 16px;
  height: 16px;
  outline: 0;
  cursor: pointer;
`;
