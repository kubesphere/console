/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 240px;
  padding-right: 40px;
`;

export const Title = styled.h4`
  padding-bottom: 23px;
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const FilterTitle = styled.h5`
  padding-bottom: 16px;
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const FilterItems = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const FilterItem = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 12px;
`;

export const FilterItemLabel = styled.label`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 12px;
  flex: 1;
  cursor: pointer;
`;

export const FilterItemName = styled.div`
  overflow: hidden;
  display: flex;
  align-content: center;
  flex: 1;
`;

export const FilterItemNameInner = styled.span`
  display: inline-block;
  max-width: 100%;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.accents_8};

  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

export const FilterItemCount = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_5};
`;
