/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Button, Select } from '@kubed/components';
import styled from 'styled-components';

export const Overview = styled.div`
  background: ${({ theme }) => theme.palette.accents_0};
  padding: 12px;
  margin-bottom: 12px;
  p {
    margin: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Operations = styled.div`
  position: relative;
  display: flex;
`;

export const FlexWrapper = styled.div`
  display: flex;
`;

export const LeftContainer = styled.div`
  flex: 1;
`;

export const Item = styled.div`
  display: flex;
  padding: 0 20px;
  background: #fff;

  .kubed-icon {
    align-self: center;
  }

  & > div {
    margin-left: 19px;
    padding-top: 38px;
    line-height: 1;

    p {
      font-size: 12px;
      color: ${({ theme }) => theme.palette.accents_5};
      margin-bottom: 6px;
      margin-top: 0;
      line-height: 1;
    }

    & > span {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.colors.dark[3]};
    }
  }
`;

export const LeftItem = styled(Item)`
  height: 115px;

  &:first-child {
    margin-bottom: 12px;
  }
`;

export const SelectWithoutBorder = styled(Select)`
  display: block;
  border: none;
  height: 20px;
  width: 120px;
  .kubed-select-selector {
    width: 110px;
    height: 20px !important;
    align-items: center;
    border: none;
    padding: 0;
  }
`;

export const StyledButton = styled(Button)`
  padding: 5px 10px;
  margin-left: 12px;
  border-radius: 4px;
  box-shadow: none;
`;

export const MiddleContainer = styled.div`
  flex: 1;
  margin: 0 12px;
  padding: 14px 20px;
  background: #fff;
  text-align: center;

  & > div {
    display: inline-block;
    & > div:first-child {
      top: 50% !important;
    }
  }
`;

export const RightContainer = styled.div`
  flex: 1;
  height: 86px;
`;

export const ImageIcon = styled.img`
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-self: center;
  vertical-align: middle;

  svg {
    width: 48px;
    height: 48px;
  }
`;

export const RightItem = styled(Item)`
  height: 86px;

  & > div {
    margin-left: 19px;
    padding-top: 18px;
  }
`;

export const SmallItem = styled.div`
  height: 44px;
  width: 100%;
  margin-top: 8px;
  padding: 0 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: ${({ theme }) => theme.palette.accents_5};
  }

  & > span:last-child {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;

    color: ${({ theme }) => theme.palette.colors.dark[3]};
  }
`;

export const SimpleContent = styled.div`
  & > p {
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    color: #79879c;
  }

  & > span {
    font-size: 24px !important;
    font-weight: 600;
  }
`;
