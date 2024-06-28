import styled from 'styled-components';
import { Card } from '@kubed/components';

export const StyledCard = styled(Card)`
  padding: 20px 20px 0;
  background-color: #ffffff;

  & > div:first-child {
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0;
  }

  .content-tab {
    margin: 0 -20px;
    padding: 20px;
  }
`;

export const TabsWrapper = styled.div`
  margin: 0 -20px;
  padding: 11px 24px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  & > div {
    & > :nth-child(2) {
      display: none;
    }
  }
`;
