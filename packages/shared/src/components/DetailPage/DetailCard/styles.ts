/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BaseWrapper = styled.div`
  background-color: #f9fbfd;
  background-image: url(/assets/detail-info.svg);
  background-repeat: no-repeat;
  background-size: 100% auto;
  border-radius: 4px 4px 0 0;
  padding: 12px;
`;

const BaseTitle = styled.div`
  margin-bottom: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  font-size: 20px;
  line-height: 1.4;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  font-weight: 600;
  color: #36435c;
  display: flex;
  align-items: center;
  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }

  .kubed-icon {
    margin-right: 8px;
  }
`;

const Description = styled.div`
  margin-bottom: 12px;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #79879c;
  word-break: break-all;
`;

const BackLink = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 2px 20px 2px 36px;
  margin-bottom: 12px;
  border-radius: 12px;
  background-color: #fff;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #36435c;

  .kubed-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8px;
    color: #329dce;
  }
`;

const BtnGroupWrapper = styled.div`
  margin: -6px;
`;

const ExtraWrapper = styled.div`
  padding: 12px;
`;

const AttributesTitle = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: 600;
`;

const LabelWrapper = styled.div`
  margin-bottom: 14px;
  .label-list {
    margin: 0 -7px;
  }
`;

const LabelTitle = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: 600;
`;

export {
  BaseWrapper,
  BaseTitle,
  Description,
  BackLink,
  BtnGroupWrapper,
  ExtraWrapper,
  AttributesTitle,
  LabelWrapper,
  LabelTitle,
};
