import styled from 'styled-components';
import { Field } from '@kubed/components';

import ImgIconUpload from '../ImgIconUpload';

export const Title = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.accents_7};
  margin-bottom: 12px;
`;

export const StyledDropzone = styled(ImgIconUpload)`
  border: none;
  padding: 0;
  text-align: right;
`;

export const AppContentWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

export const Label = styled(Title)`
  font-weight: normal;
  color: ${({ theme }) => theme.palette.colors.blue[2]};
`;

export const Note = styled.p`
  width: 100px;
  color: ${({ theme }) => theme.palette.accents_5};
  text-align: center;
`;

export const StyledField = styled(Field)`
  margin-bottom: 8px;

  .field-value {
    color: ${({ theme }) => theme.palette.accents_7};
  }
`;

export const ErrorTips = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  line-height: 20px;
  background-color: ${({ theme }) => theme.palette.colors.red[0]};
  color: ${({ theme }) => theme.palette.colors.red[4]};
`;
