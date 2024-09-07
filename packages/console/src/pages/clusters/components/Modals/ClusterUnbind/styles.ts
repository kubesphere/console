/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 20px;
  overflow: hidden;

  .slider-confirm {
    margin-top: 12px;
    margin-bottom: 20px;
  }
`;

export const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;

  .icon-wrapper {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: 0 4px 8px 0 rgba(202, 38, 33, 0.2);
    background-color: #ca2621;
  }
`;

export const Desc = styled.li`
  font-size: 12px;
  line-height: 20px;
  padding-left: 2em;
  position: relative;
  color: ${({ theme }) => theme.palette.colors.red[4]};

  &::before {
    content: '';
    position: absolute;
    width: 0.4em;
    height: 0.4em;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.foreground};
    left: 1em;
    top: 0.6em;
    transform: translateX(-50%);
  }
`;

export const ClusterBox = styled.div`
  margin-top: 12px;
  padding: 12px;
  border: 1px solid #d8dee5;
  border-radius: 4px;
`;

export const Info = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Item = styled.div`
  width: 264px;
  padding: 8px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  background: ${({ theme }) => theme.palette.accents_0};

  &:nth-of-type(4n + 1),
  &:nth-of-type(4n + 2) {
    margin-bottom: 8px;
  }
`;

export const Label = styled.span`
  margin-right: 0.5em;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const Value = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const ConfirmInput = styled.div`
  margin-top: 12px;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.accents_0};
`;

export const InputTitle = styled.p`
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const ConfirmFooter = styled.div`
  margin: 0 -20px;
  padding: 14px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${({ theme }) => theme.palette.accents_0};
`;

export const SliderConfirmWrapper = styled.div`
  padding: 12px 0;
  position: relative;
  z-index: 0;
`;

export const SliderBox = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  background: ${({ theme }) => theme.palette.colors.green[2]};
  opacity: 0;
  display: flex;
  align-items: center;
  padding: 0px 4px;
  z-index: 5;
`;

export const Slider = styled.div`
  position: absolute;
  top: 16px;
  left: 4px;
  width: 48px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(36, 46, 66, 0.06);
  background: ${({ theme }) => theme.palette.background};
  z-index: 20;

  &:hover {
    cursor: pointer;
  }
`;

export const BackGround = styled.div`
  height: 40px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.accents_1};
  user-select: none;

  span {
    display: block;
    z-index: 10;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
