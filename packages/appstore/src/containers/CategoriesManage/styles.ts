/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Card, Field } from '@kubed/components';

export const Categories = styled(Card)`
  & > div {
    display: flex;
    flex-direction: column;
    padding: 0;
    min-height: 300px;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 0 20px;
  line-height: 52px;
  font-weight: 700;
  border-radius: 4px 4px 0 0;
  background-color: ${({ theme }) => theme.palette.accents_0};

  svg {
    cursor: pointer;
  }
`;

export const Columns = styled.div`
  display: flex;
  gap: 12px;
`;

export const FirstColumn = styled.div`
  width: 25%;
`;

export const SecondColumn = styled.div`
  flex-grow: 1;
`;

export const TableItemField = styled(Field)`
  .field-label {
    max-width: 300px;
  }
`;
