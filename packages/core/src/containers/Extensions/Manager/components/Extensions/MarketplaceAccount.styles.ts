/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Avatar = styled.img`
  overflow: hidden;
  display: block;
  border-radius: 50%;
`;

export const AvatarButton = styled(Avatar)`
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.palette.accents_1};
  }
`;

export const AvatarLarge = styled(Avatar)`
  width: 32px;
  height: 32px;
`;

export const ConfirmModalContent = styled.p`
  padding: 20px;
`;
