/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const DefaultAvatar = styled.span`
  display: inline-block;
  text-align: center;
  padding: 12px;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  border-radius: 4px;
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  margin-right: 12px;
`;

export const ImageAvatar = styled.img`
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
`;

export const Wrapper = styled.div`
  position: relative;
`;
