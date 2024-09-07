/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Button } from '@kubed/components';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const Item = styled.div`
  position: relative;
  padding: 6px 68px 6px 17px;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.palette.background};
  border: solid 1px ${({ theme }) => theme.palette.border};

  & + & {
    margin-top: 8px;
  }

  & > input {
    max-width: none !important;
  }
`;

export const DeleteButton = styled(Button)`
  right: 6px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const AddButton = styled(Button)`
  margin-top: 12px;
`;

export const Desc = styled.div`
  position: absolute;
  left: 0;
  bottom: 14px;
  color: ${({ theme }) => theme.palette.accents_5};
`;
