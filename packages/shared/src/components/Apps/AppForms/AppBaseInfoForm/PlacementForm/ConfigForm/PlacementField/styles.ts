import styled from 'styled-components';

const PlacementWrapper = styled.div`
  position: relative;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.palette.accents_5};
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > div {
    min-width: 200px;
    margin-right: 12px;
  }
`;

export { Wrapper, PlacementWrapper };
