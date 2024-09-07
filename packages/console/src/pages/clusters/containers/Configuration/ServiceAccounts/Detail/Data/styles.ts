/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  & > ul > li {
    h6 {
      font-size: 14px;
      line-height: 1.43;
    }

    pre {
      margin-top: 8px;
      padding: 12px;
      border-radius: 4px;
      background-color: #ffffff;
      border: solid 1px ${({ theme }) => theme.palette.accents_2};
    }

    & + li {
      margin-top: 12px;
    }
  }
`;

export const CardTitle = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  @include clearfix;

  & > button {
    position: absolute;
    @include vertical-center;
    right: 0;
    z-index: 10;
  }
`;

export const SecretCardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Title = styled.h6`
  font-size: 14px;
  display: block;
  line-height: 20px;
  font-weight: 600;
  font-style: normal;
  color: ${({ theme }) => theme.palette.accents_8};
  text-shadow: 0 4px 8px rgb(36 46 66 / 10%);
`;

export const DefaultWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 1px ${({ theme }) => theme.palette.accents_2};
  margin-bottom: 20px;

  ul > li {
    display: flex;
    padding: 12px 20px;
    border-radius: 22px;
    background-color: ${({ theme }) => theme.palette.accents_1};
    border: solid 1px ${({ theme }) => theme.palette.border};

    & + li {
      margin-top: 8px;
    }

    & > span {
      word-break: break-all;

      &:first-child {
        min-width: 160px;
        margin-right: 80px;
        color: ${({ theme }) => theme.palette.accents_5};
      }

      & > pre {
        color: ${({ theme }) => theme.palette.accents_8};
        margin: 0;
        border: none;
        padding: 0;
        font-size: 12px;
        font-family: Roboto, ${({ theme }) => theme.font.sans};
        background: transparent;
        white-space: pre-wrap;
      }
    }
  }
`;

export const TextDesc = styled.div`
  margin-top: 0;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.accents_5};

  a {
    color: ${({ theme }) => theme.palette.colors.blue[2]};
  }
`;

export const CodeEditorWrapper = styled.div`
  position: relative;
`;

export const CodeEditorOperations = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 2;
  height: 32px;
  padding: 6px 10px;
  border-radius: 16px;
  color: #ffffff;
  background-color: ${({ theme }) => theme.palette.accents_7};

  svg {
    opacity: 0.6;
    margin-top: -1px;
    color: #ffffff;

    &:hover {
      opacity: 1;
      background-color: transparent;
    }
  }
`;
