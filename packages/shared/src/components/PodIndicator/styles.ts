/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const Avatar = styled.div`
  display: flex;
`;

const AvatarIcon = styled.div`
  position: relative;
  margin-right: 12px;
`;

const Indicator = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
`;

const Title = styled.div`
  font-size: ${props => props.theme.font.fontSizeBase};
  color: ${props => props.theme.palette.accents_8};
  line-height: 1.67;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  font-weight: bold;
`;

const Desc = styled.div`
  font-size: ${props => props.theme.font.fontSizeBase};
  color: ${props => props.theme.palette.accents_5};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
`;

export { Avatar, AvatarIcon, Indicator, Title, Desc };
