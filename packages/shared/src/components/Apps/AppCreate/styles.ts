/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Field } from '@kubed/components';

export const Header = styled.div`
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.palette.accents_0};
`;

export const Logo = styled.img`
  position: absolute;
  width: 210px;
  height: 207px;
`;

export const HeaderFieldItem = styled(Field)`
  padding-top: 46px;
  padding-left: 250px;
  padding-right: 32px;

  .field-value {
    font-size: 20px;
    line-height: 28px;
    font-weight: 400;
    margin-bottom: 12px;
  }
`;

export const TableItemField = styled(Field)`
  .field-label {
    max-width: 300px;
  }
`;

export const Note = styled.div`
  margin-top: 8px;
`;

export const Desc = styled.div`
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const FieldItem = styled(Field)`
  margin-bottom: 12px;
  padding: 8px 10px 8px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;
