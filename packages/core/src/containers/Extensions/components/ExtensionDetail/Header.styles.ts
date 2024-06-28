import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 20px;
  margin-bottom: 20px;
`;

export const BackButton = styled.span`
  display: inline-flex;
  align-items: center;
  column-gap: 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
