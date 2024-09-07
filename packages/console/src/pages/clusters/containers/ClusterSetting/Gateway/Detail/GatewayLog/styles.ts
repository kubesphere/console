/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { FilterInput } from '@kubed/components';
import { Close } from '@kubed/icons';
import styled from 'styled-components';

export const Title = styled.div`
  position: relative;
  width: 100%;
  min-height: 52px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.palette.colors.white[0]};
  letter-spacing: normal;
  color: #36435c;
  outline: none;
  display: flex;
`;

export const SearchWrapper = styled.div<{ focus: boolean }>`
  display: flex;
  flex: 1 1;
  min-height: 32px;
  margin-right: 12px;
  background: ${({ theme }) => theme.palette.colors.white[1]};
  border-radius: 18px;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.palette.colors.white[3]};
  }

  ${({ focus, theme }) =>
    focus &&
    `
    border-color: ${theme.palette.colors.white[3]} !important;
    background: #fff !important;
  `}
`;

export const CloseIcon = styled(Close)`
  cursor: pointer;

  &:hover {
    background-color: #eff4f9;
  }
`;

export const SearchInput = styled(FilterInput)`
  flex: 1 1 auto;
  border: none;
  min-height: 20px;
  background: none;
  line-height: 20px;

  & > span {
    line-height: 24px;
    margin-top: -2px;
    height: 24px;
  }

  input {
    background: none;
  }
`;

export const Filter = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(4, auto);
  height: 32px;
`;

export const FilterDarkWrapper = styled.div`
  display: inline-block;
  border-radius: 4px;
  background: #2a354b;
  cursor: pointer;
  color: #fff;
  padding: 0 12px;
`;

export const FilterButton = styled(FilterDarkWrapper)`
  display: flex;
  width: 34px;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export const FilterFrequencyOptions = styled(FilterDarkWrapper)`
  border-radius: 3px;
  background-color: #2a354b;
  width: 200px;
  padding: 0;
`;

export const Suggestion = styled.div`
  display: flex;
  align-items: center;
  .kubed-icon {
    margin-right: 8px;
  }
`;

export const TimeWrapper = styled.div`
  display: flex;
  width: 760px;
  padding: 20px;
  position: relative;
  height: 240px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  & > div {
    width: 50%;
  }
  .kubed-picker {
    width: 100%;
  }
  .kubed-select {
    width: 160px !important;
  }
  .form-item-wrapper {
    margin-bottom: 0;
    margin-top: 12px;
    &:first-child {
      margin-top: 0;
    }
  }
  .form-vertical {
    padding: 0;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 16px;
  left: 11px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.div`
  text-align: center;
  margin-top: 10%;

  & > div {
    font-size: 14px;
    line-height: 1.43;
    color: #36435c;
    font-family: ${({ theme }) => theme.font.sans}
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-weight: 600;
  }

  & > p {
    font-family: ${({ theme }) => theme.font.sans}
    font-size: 12px;
    margin: 0;
    margin-top: 4px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: #79879c;
  }
`;

export const EmptyTipIcon = styled.span`
  width: 60px;
  height: 60px;
  border-radius: 50% 0 50% 50%;
  background: #eff4f9;
  display: inline-block;
  line-height: 50px;
  margin-bottom: 20px;
`;

export const Action = styled.span`
  color: #329dce;
  padding: 0 4px;
  cursor: pointer;
  font-weight: 600;
`;

export const Body = styled.div`
  height: 720px;
  border-radius: 4px;
  background-color: #ffffff;
  flex: 1;
  overflow: auto;
`;

export const LogItem = styled.div`
  flex: 3.8;
  white-space: pre-line;
`;

export const HightLightMatch = styled.span`
  background: #ffc781;
`;
