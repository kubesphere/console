import styled from 'styled-components';
import { Col, Field, Form, Button } from '@kubed/components';
import { CodeEditor } from '@kubed/code-editor';

export const Header = styled.div`
  width: 100%;
  height: 180px;
`;

export const Logo = styled.img`
  position: absolute;
  width: 230px;
  height: 218px;
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

export const FieldItem = styled(Field)`
  margin-bottom: 12px;
  padding: 8px 10px 8px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;

export const ItemsWrapper = styled.div`
  padding: 20px 20px 20px;
`;

export const Label = styled.div`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.accents_7};
`;

export const ReadOnlyCodeEditor = styled(CodeEditor)`
  opacity: 0.8;
`;

export const StyledCol = styled(Col)`
  .input-item {
    width: 100%;
    max-width: 455px;
  }
`;

export const EditForm = styled(Form)`
  padding: 20px;
  .form-item {
    .input-wrapper {
      width: 100%;
      max-width: 455px;
    }
  }
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ItemWrapper = styled.div`
  padding: 12px;
  border: solid 1px ${({ theme }) => theme.palette.accents_2};
  border-radius: 4px;
  background: #fff;

  .condition-setting {
    display: inline-flex;
    max-width: 350px;

    .field-avatar {
      margin-top: -18px;
    }

    .field-value {
      cursor: pointer;
    }
  }
`;

export const EmptyTips = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.palette.accents_4};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
`;

export const FlexDiv = styled.div`
  display: flex;
  padding: 12px;
  border: solid 1px ${({ theme }) => theme.palette.border};
`;

export const SelectDiv = styled.div`
  width: 50px;
  padding-top: 12px;
`;

export const ItemWrappers = styled.div`
  flex: 1;
  display: grid;
  gap: 12px;
  grid-template-columns: 2fr repeat(3, minmax(0, 1fr));
  margin-bottom: 8px;
  background-color: #ffffff;
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StatusDesc = styled.span`
  margin-left: 2px;
`;

export const SelectAll = styled.div`
  display: flex;
  line-height: 32px;
  padding: 0 32px;
`;

export const DeleteBtn = styled(Button)`
  margin-left: 12px;
`;

export const ItemWrapperGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 2fr repeat(3, minmax(0, 1fr));
  padding: 12px;
  margin-bottom: 8px;
  background-color: #ffffff;
  border: solid 1px ${({ theme }) => theme.palette.border};
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

