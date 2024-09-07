/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button } from '@kubed/components';

export const EmptyWrapper = styled.div`
  padding-top: 52px;
`;

export const LinkButton = styled(Button).attrs({
  variant: 'link',
  color: 'blue',
})`
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 20px 0;
`;

export const FilePath = styled.span<{ $isSelected: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $isSelected }) => ($isSelected ? '#fff' : theme.palette.accents_7)};
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

export const File = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 64px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.palette.accents_8 : theme.palette.accents_0};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? undefined : theme.palette.accents_1};
  }
`;

export const FileType = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.accents_5};
  font-size: 12px;
  line-height: 20px;
`;
