import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const CodeEditorWrapper = styled.div`
  padding: 8px;
  height: calc(100vh - 500px);
  min-height: 500px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.border};
  box-sizing: content-box;
`;
