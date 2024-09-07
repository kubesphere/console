/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const UserSettingWrapper = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.background};
`;

export const InnerWrapper = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const TabButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 196px;

  .tab-button {
    font-size: 12px;
    overflow: initial;

    & > div {
      justify-content: flex-start;
      text-align: left;
    }

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    &.btn-secondary {
      background-color: ${({ theme }) => theme.palette.accents_7};
      border-color: transparent;
    }
  }
`;

export const TabContent = styled.div`
  position: relative;
  width: calc(100% - 208px);
  padding: 12px;
  min-height: 520px;
  margin-left: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background};
  border: 1px solid ${({ theme }) => theme.palette.accents_2};
  overflow: hidden;

  .form-title {
    margin: 12px 12px 25px;
    text-shadow: 0 4px 8px rgba(36, 46, 66, 0.1); // todo addColorAlpha
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
  }

  .setting-form {
    margin: 0 12px 12px;
    width: 455px;
  }
`;
