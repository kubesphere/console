import styled from 'styled-components';

export const TitleWithIconStyle = styled.div`
  display: flex;
  align-items: center;
  .kubed-icon {
    margin-left: 6px;
  }
`;

export const ProjectWrapper = styled.div`
  width: 250px;
  margin-right: 12px;

  & > .kubed-select {
    width: 100%;
  }
`;
