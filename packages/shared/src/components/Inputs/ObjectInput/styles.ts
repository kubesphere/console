import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  .item {
    & + .item {
      margin-left: 12px;
    }
  }
`;
