/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
  border-radius: 2px;
  background-color: ${props => props.theme.palette.colors.white[0]};
  align-items: center;
  border: solid 1px transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &.disabled {
    opacity: 0.7;

    &:hover {
      box-shadow: none;
      border-color: transparent;
    }
  }

  &:not(:first-child) {
    margin-top: 8px;
  }

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
    border-color: ${props => props.theme.palette.accents_5};
  }
`;

const FieldLabel = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  font-weight: 400;
  color: #79879c;
  max-width: 300px;
`;

export { Wrapper, FieldLabel };
