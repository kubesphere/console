import styled from 'styled-components';
import { Field, Row } from '@kubed/components';

export const StyledRow = styled(Row)`
  flex-wrap: nowrap;
`;

export const Level = styled.div`
  display: flex;

  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const StyledField = styled(Field)`
  min-width: 120px;
  flex-grow: 0;
  &:not(:first-child) {
    margin-left: 12px;
  }
`;

export const AreaWrapper = styled.div<{ columns?: number; gap?: number }>`
  display: grid;
  grid-row-gap: ${({ gap }) => gap || 12}px;
  grid-column-gap: ${({ gap }) => gap || 12}px;
  grid-template-columns: repeat(${({ columns }) => columns || 3}, 1fr);
`;

export const Area = styled.div`
  padding: 12px;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.colors.white[0]};
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.colors.white[1]};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.colors.white[2]};
  }

  .field-label {
    white-space: break-spaces;
  }
`;

export const Text = styled.div<{ fontSize?: number }>`
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || 16}px;
  line-height: 1.5;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const DarkWrapper = styled.div`
  padding: 12px;
  margin-bottom: 12px;
  background: ${({ theme }) => theme.palette.accents_8};
`;
