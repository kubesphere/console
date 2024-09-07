/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled, { css } from 'styled-components';

export const columnsWithSuffix = css<{ $len?: number; $withSuffix?: boolean }>`
  display: grid;
  grid-template-columns:
    repeat(${({ $len = 1 }) => $len ?? 1}, minmax(0, 1fr))
    ${({ $withSuffix = true }) => ($withSuffix ? 'auto' : '')};
  align-items: center;
`;
export const ContainerItem = styled.div`
  ${columnsWithSuffix};
  gap: 8px;
  padding: 6px 6px 6px 17px;
  border-radius: 60px;
  background-color: #eff4f9;
  border: 1px solid #ccd3db;
  & + & {
    margin-top: 4px;
  }
`;

export const Footer = styled.div`
  ${columnsWithSuffix};
  align-items: center;
  margin-top: 12px;
`;

export const HelperText = styled.div`
  color: #ca2621;
`;

export const RecordItemWrapper = styled.div`
  ${columnsWithSuffix};
  gap: 12px;
`;
RecordItemWrapper.defaultProps = {
  $len: 2,
  $withSuffix: false,
};
