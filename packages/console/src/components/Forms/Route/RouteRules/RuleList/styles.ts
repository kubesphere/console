/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const ItemWrapper = styled.div`
  position: relative;
  padding: 11px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #fff;
  border: solid 1px ${({ theme }) => theme.palette.accents_3};
  transition: all 0.3s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  .buttons {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    height: 62px;
    padding: 16px 4px;
    border-radius: 4px;
    background-color: #fff;

    & > button {
      width: 56px;
      margin-left: 4px;
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.palette.accents_5};
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);

    .buttons {
      display: block;
    }
  }
`;

export const TextsWrapper = styled.div`
  display: flex;

  & > div:first-of-type {
    min-width: 200px;
  }

  & > div + div {
    margin-left: 12px;
  }
`;

export const Description = styled.div`
  span + span {
    margin-left: 12px;
  }
`;

export const Paths = styled.div`
  margin-top: 12px;
`;

export const Path = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_1};

  & + .path {
    margin-top: 4px;
  }

  span {
    display: inline-block;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2;
    letter-spacing: normal;
    color: ${({ theme }) => theme.palette.accents_5};

    & + span {
      color: ${({ theme }) => theme.palette.accents_8};
      margin-left: 5px;
    }
  }
`;

export const AddWrapper = styled.div`
  position: relative;
  padding: 11px 12px;
  border-radius: 4px;
  border: 1px dashed ${({ theme }) => theme.palette.accents_3};
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
    border-color: ${({ theme }) => theme.palette.accents_5};
  }
`;
