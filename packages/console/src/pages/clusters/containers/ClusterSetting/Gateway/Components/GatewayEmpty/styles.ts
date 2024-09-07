/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Empty = styled.div`
  padding: 32px 0;
  text-align: center;
`;

export const Icon = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 100px 0 100px 100px;
  background-color: ${({ theme }) => theme.palette.background};
`;

export const Text = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    & > div {
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
    }

    & > p {
      margin: 0 auto;
      color: #79879c;
    }
  }
`;
