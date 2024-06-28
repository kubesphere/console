import styled from 'styled-components';

export const SideMenuWrapper = styled.div`
  margin-bottom: 20px;
`;

export const CateTitle = styled.h3`
  font-size: 12px;
  padding: 8px 0;
  text-transform: uppercase;
  font-weight: 400;
  border-bottom: 1px solid ${({ theme }) => theme.palette.accents_2};
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const MenuList = styled.ul`
  font-size: 14px;
  margin: 0;

  li {
    margin: 0;
    line-height: initial;
    position: relative;

    &:before {
      content: '';
    }

    &.active {
      a {
        color: ${({ theme }) => theme.palette.primary};
      }

      &:before {
        position: absolute;
        border-top: 1px solid ${({ theme }) => theme.palette.primary};
        top: 16px;
        left: -20px;
        width: 12px;
      }
    }
  }

  a {
    padding: 5px 0;
    display: flex;
    align-items: center;
    line-height: 21px;
    color: ${({ theme }) => theme.palette.accents_6};

    &:hover {
      color: ${({ theme }) => theme.palette.accents_7};
    }
  }
`;
