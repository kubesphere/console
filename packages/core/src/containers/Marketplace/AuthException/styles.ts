import styled from 'styled-components';
import { Empty } from '@kubed/components';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const StyledEmpty = styled(Empty)`
  padding: 32px 0 136px;
  background-color: #fff;
`;

export const EmptyButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding-top: 20px;
`;
