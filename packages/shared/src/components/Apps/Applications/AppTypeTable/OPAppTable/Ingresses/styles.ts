import styled from 'styled-components';
import { Button } from '@kubed/components';

export const AccessButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
`;

export const RulesWrapper = styled.ul`
  & > li {
    position: relative;
    padding: 11px 20px;
    border-radius: 22px;
    background-color: ${({ theme }) => theme.palette.background};
    border: solid 1px ${({ theme }) => theme.palette.border};
    font-family: Robot, ${({ theme }) => theme.font.sans};
    line-height: 20px;

    & + li {
      margin-top: 8px;
    }
  }
`;
