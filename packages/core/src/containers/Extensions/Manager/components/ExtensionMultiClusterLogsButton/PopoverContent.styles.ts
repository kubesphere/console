import styled from 'styled-components';
import { Button, themeUtils } from '@kubed/components';

const { getColor } = themeUtils;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h6`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  margin: 0;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 4px;
  row-gap: 8px;
  align-items: center;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusText = styled.span`
  margin: 0;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ViewLogButton = styled(Button).attrs({
  variant: 'text',
  color: 'blue',
})`
  height: 20px;
  padding: 8px;

  &:hover {
    color: ${({ theme }) => getColor('blue[4]', theme)};
    background-color: transparent;
  }
`;
