import styled from 'styled-components';

export const Tooltip = styled.span`
  &:hover {
    &::before {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -26px;
      display: inline-block;
      padding: 3px 6px;
      border-radius: 2px;
      background: #000;
      color: #fff;
      white-space: nowrap;
      z-index: 100;
    }
  }
`;
