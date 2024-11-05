/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const FieldLabel = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  font-weight: 400;
  color: #79879c;
  max-width: 300px;
`;

export const Wrapper = styled.div`
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const CheckboxWrapper = styled.div`
  margin-top: 12px;
  color: #79879c;
`;
