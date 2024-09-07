/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const NotLogin = styled.div`
  display: flex;
  align-items: center;

  .icon-human {
    color: ${({ theme }) => theme.palette.warning};
    fill: ${({ theme }) => theme.palette.colors.yellow[4]};
  }

  a {
    margin-left: 12px;
    color: ${({ theme }) => theme.palette.warning};
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;

  .username {
    margin: 0 12px;
  }

  .caret-down {
    margin-left: 12px;
  }

  .field-label {
    height: 16px;
    line-height: 16px;
  }

  .field-value {
    height: 16px;
    line-height: 16px;
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: solid 2px #ffffff;
`;

export const NotifiContext = styled.span`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
