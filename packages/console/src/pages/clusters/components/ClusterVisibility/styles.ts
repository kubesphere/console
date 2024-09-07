/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const ModalWrapper = styled.div`
  padding: 20px;
`;

const Wrapper = styled.div`
  border-radius: 4px;
  background-color: ${props => props.theme.palette.accents_0};
`;

const Title = styled.div`
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #242e42;
`;

const Content = styled.div`
  border-radius: 3px;
  border: solid 1px ${props => props.theme.palette.accents_3};
  background-color: ${props => props.theme.palette.accents_1};
  overflow: hidden;
`;

const Search = styled.div`
  padding: 8px;
  background-color: #fff;
`;

const List = styled.div`
  padding: 8px;
  max-height: calc(100vh - 388px);
  min-height: 352px;
  overflow: scroll;
`;

const AuthedList = styled.div`
  padding: 8px;
  max-height: calc(100vh - 340px);
  min-height: 400px;
  overflow: scroll;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 6px 8px;
  background-color: #fff;
  border-top: 1px solid ${props => props.theme.palette.border};
  box-sizing: border-box;

  & > span,
  .kubed-icon {
    margin-left: 4px;
  }
`;

export { ModalWrapper, Wrapper, Title, Content, Search, List, AuthedList, Footer };
