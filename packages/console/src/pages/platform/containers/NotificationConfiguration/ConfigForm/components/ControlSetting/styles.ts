/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ConditionEditorWrapper = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.accents_0};

  & > div {
    margin-top: 4px;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-top: 12px;
    }
  }
`;

export const ErrorText = styled.div`
  padding: 3px 68px 3px 17px;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${({ theme }) => theme.palette.colors.red[2]};
`;

export const ConditionsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Desc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const Annotation = styled.div`
  display: flex;
  flex: 1;
  padding-left: 12px;
  color: ${({ theme }) => theme.palette.accents_7};

  svg {
    margin-top: 2px;
    margin-right: 6px;
    flex-shrink: 0;
  }
`;

export const ConditionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 6px 6px 17px;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  border: solid 1px ${({ theme }) => theme.palette.border};
`;

export const SelectWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 4px;

  & > div + div {
    margin-left: 12px;
  }

  & > div {
    &:nth-child(1) {
      width: 200px;
    }

    &:nth-child(2) {
      width: 180px;
    }

    &:nth-child(3) {
      flex: 1;
    }
  }
`;

export const OptionsContainer = styled.div`
  position: relative;
`;

export const OptionsListWrapper = styled.div`
  max-height: 175px;
  overflow-y: auto;
`;

export const CustomSelect = styled.div`
  display: flex;
  padding: 8px 12px;
  border-top: 1px solid ${({ theme }) => theme.palette.colors.dark[0]};

  .input-wrapper {
    border-color: ${({ theme }) => theme.palette.colors.dark[1]};
    flex: 1;
    background-color: transparent;
    input {
      color: #fff;
    }
  }
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.palette.colors.dark[1]};
  &:hover {
    background-color: ${({ theme }) => theme.palette.colors.dark[2]};
  }
`;
