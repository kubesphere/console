import styled from 'styled-components';

export const Card = styled.div`
  padding: 4px 24px;
  border-radius: 60px;
  background-color: #eff4f9;
  border: solid 1px #ccd3db;
  & + & {
    margin-top: 8px;
  }

  p {
    font-size: 14px;
    line-height: 1.43;
    margin: 0;
  }

  span {
    font-size: 12px;
    line-height: 1.67;
    color: #79879c;
    margin-right: 8px;
  }
`;
