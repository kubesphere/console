import styled from 'styled-components';
import { TypeSelect } from '@kubed/components';

export const TerminalWrapper = styled.div`
  overflow-y: hidden;
  flex: 1;
  height: 100%;
  padding: 8px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.border};
`;

export const TypeSelectWrapper = styled(TypeSelect)`
  &.is-expand {
    > div {
      top: unset;
      height: unset;
      > div {
        height: unset;
      }
    }
  }
  > div {
    height: unset;
  }
`;

export const Doc = styled.div`
  padding: 12px;

  && {
    ul {
      li {
        padding-left: 14px;

        &::before {
          top: 0;
        }
      }
    }

    code {
      &::before,
      &::after {
        content: '';
      }
    }
  }
`;
