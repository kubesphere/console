/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export { TerminalWrapper } from '../KubeCtl/styles';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const InfosContainer = styled.div`
  position: relative;
`;

export const InfosTitle = styled.h6`
  margin: 0;
  padding: 12px 0 8px;
  line-height: 20px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Infos = styled.dl`
  margin: 0;

  & > dt,
  & > dd {
    display: inline-block;
    margin: 0;
    padding: 6px 12px;
    font-size: 12px;
    line-height: 20px;
  }
`;

export const InfoLabel = styled.dt`
  width: 40%;
  color: ${({ theme }) => theme.palette.accents_5};

  &:after {
    content: ':';
  }
`;

export const InfoHelp = styled.div`
  padding: 0px 20px;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const InfoValue = styled.dd`
  width: 60%;
  vertical-align: top;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  color: ${({ theme }) => theme.palette.accents_8};
  word-wrap: break-word;
`;
