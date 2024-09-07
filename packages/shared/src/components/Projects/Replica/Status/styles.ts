/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Scale = styled.div`
  position: absolute;
  top: 0;
  right: 28px;
  height: 100%;
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  width: 335px;
  padding: 10px 18px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
  overflow: hidden;

  &.dark {
    background-color: ${({ theme }) => theme.palette.colors.dark[3]};
    color: #fff;
  }
`;

export const CardImg = styled.img`
  position: absolute;
  top: 0;
  right: -80px;
  width: 150px;
`;

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

export const StatusTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.43;
  margin-bottom: 5px;
`;

export const StatusDetail = styled.div`
  line-height: 1.67;
  p {
    margin: 0;
  }
`;
