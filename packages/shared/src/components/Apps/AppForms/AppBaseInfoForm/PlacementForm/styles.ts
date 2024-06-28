import styled from 'styled-components';

export const StaticPlacement = styled.div`
  position: relative;
  padding: 12px;
  opacity: 0.7;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.border};
  background-color: #ffffff;
  transition: all 0.3s ease-in-out;
`;

export const PlacementContent = styled.div`
  display: flex;

  & > div {
    min-width: 200px;
    margin-right: 12px;
  }
`;
