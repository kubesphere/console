/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BaseInfo = styled.div`
  background-color: #f9fbfd;
  background-image: url(/assets/detail-info.svg);
  background-repeat: no-repeat;
  background-size: 100% auto;
  border-radius: 4px 4px 0 0;
  padding: 12px;
`;

export const BaseInfoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  overflow: hidden;
  font-size: 20px;
  line-height: 1.4;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-weight: 600;
  color: #36435c;

  .kubed-icon {
    margin-right: 8px;
  }
`;

export const TitleText = styled.span`
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

export const Description = styled.div`
  margin-bottom: 12px;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  color: #79879c;
  word-break: break-all;
`;

export const BackLink = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 2px 20px 2px 36px;
  margin-bottom: 12px;
  border-radius: 12px;
  background-color: #fff;
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: 600;
  color: #36435c;

  .kubed-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8px;
    color: #329dce;
  }
`;

export const DetailInfoWrapper = styled.div`
  padding: 12px;
`;

export const AttributesTitle = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const LabelWrapper = styled.div`
  margin-bottom: 14px;
  .label-list {
    margin: 0 -7px;
  }
`;

export const LabelTitle = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: 600;
`;
