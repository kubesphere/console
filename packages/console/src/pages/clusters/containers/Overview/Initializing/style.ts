import { Button, Menu } from '@kubed/components';
import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px;

  .loading {
    margin-right: 18px;
  }
`;

export const DarkMenu = styled(Menu)`
  color: #ffffff;
  background-color: ${({ theme }) => theme.palette.colors.dark[3]};

  .item-label {
    color: #ffffff;
  }

  button {
    padding: 6px 19px 6px 12px;
    .item-label {
      display: flex;
      align-items: center;
      .kubed-icon {
        margin-right: 12px;
      }
    }
    &:hover {
      background-color: ${({ theme }) => theme.palette.colors.dark[2]};
    }
  }
`;

export const Content = styled.div`
  padding: 12px;
  margin-top: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  .code {
    display: inline-block;
    height: 20px;
    padding: 0 4px;
    border-radius: 1px;
    background-color: #d8dee5;
    font-family: 'Monaco', sans-serif;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2;
    letter-spacing: normal;
    color: #363e4a;
    line-height: 20px;
  }
`;

export const CardContainer = styled.div`
  position: relative;
  padding: 12px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.colors.white[3]};
  background-color: #ffffff;
  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const CopyButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 12px;
`;

export const Actions = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
`;
