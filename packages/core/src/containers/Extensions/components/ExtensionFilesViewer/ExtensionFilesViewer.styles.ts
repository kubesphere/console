/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Root = styled.div`
  overflow: hidden;
  display: flex;
  column-gap: 20px;
  height: 100%;
  padding: 20px;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
`;

export const VersionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const Version = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.accents_7};
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

export const SearchInputWrapper = styled.div`
  margin-bottom: 12px;
`;

export const FilesWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Content = styled.div`
  overflow: hidden;
  flex: 1;
`;
