import styled from 'styled-components';

export const Root = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_8};

  a.support-action {
    color: #329dce;

    &:hover {
      color: #3385b0;
    }

    &:active {
      color: #326e93;
    }
  }
`;
