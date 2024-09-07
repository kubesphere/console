/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const Title = styled.div`
  display: flex;
  align-items: end;
  position: absolute;
  left: 10px;
  top: 10px;
  height: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_6};
`;

export const Label = styled.div`
  margin-right: 10px;
  color: ${({ theme }) => theme.palette.accents_8};
  font-weight: bold;
  strong {
    font-size: 22px;
  }
`;
