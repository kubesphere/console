import styled from 'styled-components';

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;

  span {
    margin-left: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

export { ItemIcon };
