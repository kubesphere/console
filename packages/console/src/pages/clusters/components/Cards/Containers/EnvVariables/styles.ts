/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const CardWrapper = styled.div`
  margin-bottom: 12px;
  div {
    & > div {
      padding: 20px;
      div {
        padding: 0px;
      }
    }
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  line-height: 20px;
  svg {
    margin-right: 8px;
  }
`;

const Operation = styled.div<{ isExpand?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0px;
  bottom: 0px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(85, 188, 138, 0.1);
  z-index: 0;
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16.5px;
    height: 16.5px;
    background-color: ${props => props.theme.palette.success};
    border-radius: 50%;
    z-index: 1;
  }
  svg {
    transform: ${props => (props.isExpand ? 'rotate(180deg)' : '')};
    transform-origin: ${props => (props.isExpand ? 'center center' : '')};
    position: absolute;
    z-index: 2;
    transition: all 0.3s;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 20px;
`;

const ContentEmpty = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  padding: 0 20px !important;
  color: ${props => props.theme.palette.accents_4};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: ${props => props.theme.palette.accents_0};
  border-radius: 4px;
`;

const UlWrapper = styled.ul`
  width: 100%;
  li {
    display: flex;
    padding: 11px 32px;
    margin-bottom: 8px;
    line-height: 20px;
    background-color: ${props => props.theme.palette.accents_1};
    border: 1px solid ${props => props.theme.palette.accents_3};
    border-radius: 20px;
    font-size: ${props => props.theme.font.fontSizeBase};
    &:last-child {
      margin-bottom: 0;
    }
    & > div:first-of-type {
      width: 40%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    & > div:last-of-type {
      width: 60%;
      word-break: break-all;
    }
  }
`;

export { TitleWrapper, Header, Operation, CardWrapper, ContentWrapper, ContentEmpty, UlWrapper };
