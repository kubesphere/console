/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import styled from 'styled-components';

export const ModalStyle = styled(Modal)`
  & .kubed-modal-body {
    padding: 20px;
  }
`;

export const Card = styled.div`
  padding: 12px;
  border: 1px solid #ccd3db;
  border-radius: 4px;
  background-color: #fff;
`;

export const Label = styled.div`
  display: block;
  margin-bottom: 4px;
  font-family: 'PingFang SC', 'Lantinghei SC', 'Helvetica Neue', Helvetica, Arial, 'Microsoft YaHei',
    微软雅黑, STHeitiSC-Light, simsun, 宋体, 'WenQuanYi Zen Hei', 'WenQuanYi Micro Hei', sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #36435c;
`;

export const Container = styled.div`
  & > div:not(:first-child) {
    margin-top: 12px;
  }
`;
