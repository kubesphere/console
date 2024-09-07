/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div<{ disabled?: boolean }>`
  border-radius: 4px;
  border: 1px solid $border-color;
  background-color: #ffffff;
  cursor: pointer;
  transition: all $trans-speed ease-in-out;

  &:hover,
  &:focus {
    border-color: $input-hover-color;
  }

  ${props =>
    props.disabled
      ? ` border-color: $border-color !important;
    cursor: default;
    `
      : ''}
`;

export const Control = styled.div<{ hasIcon?: boolean }>`
  height: 64px;
  padding: 12px 16px;
  border: 1px solid #ccd3db;
  display: grid;
  grid-template-columns: ${({ hasIcon = false }) => (hasIcon ? '40px' : '')} 40px minmax(0, 1fr) auto;
  cursor: pointer;
  align-items: center;
`;

export const OptionsWrapper = styled.div`
  padding: 0 4px 4px;
`;

export const Options = styled.div<{ hasIcon?: boolean }>`
  max-height: 193px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  border: 1px solid #79879c;
  border-top: none;
  overflow: auto;
`;

export const Option = styled.div<{ hasIcon?: boolean }>`
  ${props =>
    props.hasIcon
      ? `
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    grid-gap: 8px;
    align-items: center;
    `
      : ''}
  height: 64px;
  padding: 12px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f9fbfd;
  }
`;
