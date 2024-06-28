import styled from 'styled-components';

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  & > span {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
