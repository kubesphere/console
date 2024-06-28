import { Field } from '@kubed/components';
import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;

  & > div:first-child {
    flex: 1;
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 12px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: ${({ theme }) => theme.palette.accents_7};
  }

  .select {
    width: 160px;
  }
`;

export const List = styled.div`
  margin-top: 12px;
  & > div {
    display: flex;
    padding: 12px;
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.palette.accents_0};
  }
  a {
    display: flex;
  }
`;

export const Cpu = styled(Field)`
  width: 124px;
  padding: 12px;
  margin: -12px;
  margin-left: auto;
  flex-grow: 0;
  background-color: #dbefe2;
`;

export const Footer = styled.div`
  margin: -12px;
  margin-top: 12px;
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.palette.border};

  button {
    width: 100%;
  }
`;

export const Label = styled.div`
  color: #fff;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.colors.dark[2]};
  padding: 0 0.3em;
  margin: 0 0.3em;
`;
