import styled from 'styled-components';
import { Collapse, Field } from '@kubed/components';

export const Header = styled.div`
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.palette.accents_0};
`;

export const Logo = styled.img`
  position: absolute;
  width: 210px;
  height: 207px;
`;

export const HeaderFieldItem = styled(Field)`
  padding-top: 46px;
  padding-left: 250px;
  padding-right: 32px;

  .field-value {
    font-size: 20px;
    line-height: 28px;
    font-weight: 400;
    margin-bottom: 12px;
  }
`;

export const TableItemField = styled(Field)`
  .field-label {
    max-width: 300px;
  }
`;

export const StyledCollapse = styled(Collapse)`
  margin-top: 38px;
  padding: 12px 24px 20px;
  border-top: 1px solid #d8dee5;
  background-color: ${({ theme }) => theme.palette.accents_1};
  font-weight: 500;

  .kubed-collapse-content {
    margin-left: 32px;
  }
`;

export const Note = styled.div`
  margin-top: 8px;
`;

export const Desc = styled.div`
  color: ${({ theme }) => theme.palette.accents_5};
`;
