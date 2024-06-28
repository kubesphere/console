import styled from 'styled-components';
import { Banner, Button, FilterInput } from '@kubed/components';

import { HeaderFieldItem, Logo } from '../styles';

export const StyledLogo = styled(Logo)`
  z-index: 2;
`;

export const StyledField = styled(HeaderFieldItem)`
  .field-value {
    font-weight: 500;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 5px 20px;
  border: 1px solid ${({ theme }) => theme.palette.border};
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);

  .filter {
    width: 503px;
  }
`;

export const SearchInput = styled(FilterInput)`
  width: 503px;
`;

export const StyledHeader = styled(Banner)`
  .banner-title {
    display: block;
    padding: 26px;
    background-color: ${({ theme }) => theme.palette.accents_1};

    & > div:first-child {
      margin-top: 0;
      background-color: transparent;
      padding: 0;
      width: unset;
      height: unset;
    }

    & > div:nth-child(2) {
      margin-left: 20px;
    }

    svg {
      display: block;
    }

    h3 {
      font-size: 24px;
      font-weight: 600;
      line-height: 32px;
    }
  }

  .banner-extra {
    border-top: 1px solid ${({ theme }) => theme.palette.border};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border};
    & > div {
      position: relative;
      background-color: ${({ theme }) => theme.palette.accents_0};
    }
  }
`;

export const CloseModal = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  padding: 4px;
  border-radius: 4px;
`;

export const Back = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  font-weight: 500;
  cursor: pointer;

  .kubed-icon {
    width: 20px;
    height: 20px;
  }
`;

export const DeployButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 14px;
`;

export const MainDetail = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 192px);
  overflow-y: auto;
`;

export const LeftContent = styled.div`
  max-width: 548px;
  min-width: 548px;
`;

export const RightContent = styled.div`
  flex: 1;
`;
