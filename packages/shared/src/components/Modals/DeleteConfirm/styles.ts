import styled from 'styled-components';
import { Text, Input, Button } from '@kubed/components';

export const Body = styled.div`
  padding: 12px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled(Text)`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${props => props.theme.palette.accents_7};
`;

export const CloseIconWrapper = styled.div`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(202, 38, 33, 0.2);
  background-color: ${props => props.theme.palette.colors.red[2]};
`;

export const Content = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.accents_0};
`;

export const Tip = styled(Text)`
  margin: 0;
  font-size: 12px;
  line-height: 1.67;
  color: ${props => props.theme.palette.accents_6};
  word-break: normal;
`;

export const StyledInput = styled(Input)`
  margin-top: 12px;
`;

export const Footer = styled.div`
  padding: 10px 20px;
  border-radius: 0 0 4px 4px;
  background-color: ${props => props.theme.palette.accents_1};
  text-align: right;
`;

export const StyledButton = styled(Button)`
  margin-left: 10px;

  &:first-of-type {
    margin-left: 0;
  }
`;
